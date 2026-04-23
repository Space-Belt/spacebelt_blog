"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { GameMode, GamePhase } from "@/components/games/gameTypes";
import { clamp, distance, randomBetween, setupCanvas, useCanvasSize } from "@/components/games/gameUtils";

type BugKind = "click" | "drag" | "hold";

type DebugBug = {
  id: number;
  kind: BugKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hold: number;
};

type Pop = {
  x: number;
  y: number;
  age: number;
  text: string;
};

const roundMs = 20000;
const phrases = ["콤보 +1", "렌더 수정", "이벤트 처리", "입력 정리", "버그 패치"];

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const segments = text.includes(" ") ? text.split(" ") : Array.from(text);
  const lines: string[] = [];
  let currentLine = "";

  segments.forEach((segment) => {
    const joiner = text.includes(" ") && currentLine ? " " : "";
    const testLine = `${currentLine}${joiner}${segment}`;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = segment;
      return;
    }
    currentLine = testLine;
  });

  if (currentLine) lines.push(currentLine);

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

export function DebugCombo({ mode }: { mode: GameMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = useCanvasSize(canvasRef);
  const bugsRef = useRef<DebugBug[]>([]);
  const popsRef = useRef<Pop[]>([]);
  const rafRef = useRef(0);
  const phaseRef = useRef<GamePhase>("idle");
  const startedAtRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const lastHudRef = useRef(0);
  const bugIdRef = useRef(0);
  const comboRef = useRef(0);
  const bestRef = useRef(0);
  const draggingRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, down: false });
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [hud, setHud] = useState({ combo: 0, best: 0, time: Math.round(roundMs / 1000) });

  function reset() {
    bugsRef.current = [];
    popsRef.current = [];
    comboRef.current = 0;
    draggingRef.current = null;
    phaseRef.current = "idle";
    setPhase("idle");
    setHud({ combo: 0, best: bestRef.current, time: Math.round(roundMs / 1000) });
  }

  function start() {
    reset();
    phaseRef.current = "playing";
    startedAtRef.current = performance.now();
    setPhase("playing");
  }

  function spawnBug(now: number) {
    const kinds: BugKind[] = ["click", "drag", "hold"];
    bugIdRef.current += 1;
    bugsRef.current.push({
      id: bugIdRef.current,
      kind: kinds[Math.floor(Math.random() * kinds.length)],
      x: randomBetween(42, size.width - 42),
      y: randomBetween(44, size.height - 64),
      vx: randomBetween(-0.35, 0.35) + (now - startedAtRef.current) / roundMs * randomBetween(-0.28, 0.28),
      vy: randomBetween(-0.35, 0.35),
      radius: 16,
      hold: 0
    });
  }

  function resolveBug(bug: DebugBug) {
    comboRef.current += 1;
    bestRef.current = Math.max(bestRef.current, comboRef.current);
    popsRef.current.push({ x: bug.x, y: bug.y, age: 0, text: phrases[comboRef.current % phrases.length] });
    bugsRef.current = bugsRef.current.filter((item) => item.id !== bug.id);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointerRef.current = { x, y, down: true };

    if (phaseRef.current !== "playing") {
      start();
      return;
    }

    const bug = bugsRef.current.find((item) => distance(x, y, item.x, item.y) < item.radius + 10);
    if (!bug) return;
    if (bug.kind === "click") resolveBug(bug);
    if (bug.kind === "drag") draggingRef.current = bug.id;
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointerRef.current = { x, y, down: pointerRef.current.down };
    const dragged = bugsRef.current.find((bug) => bug.id === draggingRef.current);
    if (dragged) {
      dragged.x = x;
      dragged.y = y;
      if (x > size.width - 86 && y > size.height - 86) resolveBug(dragged);
    }
  }

  function handlePointerUp() {
    pointerRef.current.down = false;
    draggingRef.current = null;
  }

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;
    const canvas = currentCanvas;

    function draw(now: number) {
      const ctx = setupCanvas(canvas, size);
      if (!ctx) return;

      ctx.clearRect(0, 0, size.width, size.height);
      ctx.fillStyle = "rgba(88, 224, 196, 0.045)";
      for (let x = 0; x < size.width; x += 28) ctx.fillRect(x, 0, 1, size.height);
      for (let y = 0; y < size.height; y += 28) ctx.fillRect(0, y, size.width, 1);

      const elapsed = now - startedAtRef.current;
      if (phaseRef.current === "playing") {
        const spawnGap = clamp(1180 - elapsed / roundMs * 520, 520, 1180);
        if (now - lastSpawnRef.current > spawnGap && bugsRef.current.length < 7) {
          spawnBug(now);
          lastSpawnRef.current = now;
        }
        if (elapsed >= roundMs) {
          phaseRef.current = "finished";
          setPhase("finished");
        }
      }

      ctx.strokeStyle = "rgba(247, 201, 72, 0.46)";
      ctx.strokeRect(size.width - 86, size.height - 86, 58, 58);
      ctx.fillStyle = "rgba(247, 201, 72, 0.82)";
      ctx.font = "800 10px Arial";
      ctx.fillText("DROP", size.width - 74, size.height - 52);

      bugsRef.current.forEach((bug) => {
        if (phaseRef.current === "playing" && draggingRef.current !== bug.id) {
          bug.x += bug.vx;
          bug.y += bug.vy;
          if (bug.x < 24 || bug.x > size.width - 24) bug.vx *= -1;
          if (bug.y < 24 || bug.y > size.height - 24) bug.vy *= -1;
        }

        if (bug.kind === "hold" && pointerRef.current.down && distance(pointerRef.current.x, pointerRef.current.y, bug.x, bug.y) < 26) {
          bug.hold += 1;
          if (bug.hold > 34) resolveBug(bug);
        } else if (bug.kind === "hold") {
          bug.hold = Math.max(0, bug.hold - 0.6);
        }

        const color = bug.kind === "click" ? "88, 224, 196" : bug.kind === "drag" ? "247, 201, 72" : "255, 107, 107";
        ctx.beginPath();
        ctx.arc(bug.x, bug.y, bug.radius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color}, 0.34)`;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bug.x, bug.y, bug.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.76)`;
        ctx.fill();
        ctx.fillStyle = "#080a0d";
        ctx.font = "900 10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(bug.kind === "click" ? "C" : bug.kind === "drag" ? "D" : "H", bug.x, bug.y + 4);
        if (bug.kind === "hold") {
          ctx.beginPath();
          ctx.arc(bug.x, bug.y, bug.radius + 10, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * bug.hold) / 34);
          ctx.strokeStyle = "rgba(244, 247, 248, 0.72)";
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });

      popsRef.current = popsRef.current.filter((pop) => {
        pop.age += 1;
        ctx.fillStyle = `rgba(244, 247, 248, ${Math.max(0, 1 - pop.age / 42)})`;
        ctx.font = "800 12px Arial";
        ctx.fillText(pop.text, pop.x, pop.y - pop.age * 0.7);
        return pop.age < 40;
      });

      if (phaseRef.current === "idle" || phaseRef.current === "finished") {
        ctx.fillStyle = "rgba(8, 10, 13, 0.56)";
        ctx.fillRect(0, 0, size.width, size.height);
        ctx.fillStyle = "#f4f7f8";
        ctx.font = size.width < 420 ? "800 15px Arial" : "800 17px Arial";
        drawWrappedText(
          ctx,
          phaseRef.current === "idle" ? "클릭, 드래그, 홀드로 버그를 처리하세요" : `디버그 콤보: ${bestRef.current}`,
          size.width / 2,
          size.height / 2 - 44,
          size.width * 0.58,
          19
        );
        ctx.fillStyle = "rgba(247, 201, 72, 0.9)";
        ctx.font = "700 13px Arial";
        drawWrappedText(
          ctx,
          phaseRef.current === "idle" ? "디버그 콤보" : `시스템 정리 완료 · 인터랙션 점수 ${Math.min(100, bestRef.current * 8)}%`,
          size.width / 2,
          size.height / 2 + 14,
          size.width * 0.62,
          16
        );
      }

      if (now - lastHudRef.current > 160) {
        lastHudRef.current = now;
        setHud({
          combo: comboRef.current,
          best: bestRef.current,
          time: Math.max(0, Math.ceil((roundMs - elapsed) / 1000))
        });
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  return (
    <div className="games-play-surface">
      <canvas
        ref={canvasRef}
        className="games-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      <div className="games-hud">
        <span>콤보 {hud.combo}</span>
        <span>최고 {hud.best}</span>
        <span>{phase === "playing" ? `${hud.time}초` : phase === "idle" ? "대기" : "종료"}</span>
      </div>
      <button className="games-stage-button" type="button" onClick={phase === "playing" ? reset : start}>
        {phase === "playing" ? "다시하기" : "시작하기"}
      </button>
      {mode === "home" ? <span className="games-home-hint">C 클릭 · D 드래그 · H 홀드</span> : null}
    </div>
  );
}
