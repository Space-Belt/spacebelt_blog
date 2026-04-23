"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { GameMode, GamePhase } from "@/components/games/gameTypes";
import { clamp, distance, randomBetween, setupCanvas, useCanvasSize } from "@/components/games/gameUtils";

type Enemy = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hp: number;
};

type Burst = {
  x: number;
  y: number;
  age: number;
  label?: string;
};

const labels = ["렌더 최적화", "상태 누수 해결", "입력 지연 감소", "리플로우 차단", "상태 동기화"];
const roundMs = 18000;

export function SignalDefense({ mode }: { mode: GameMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = useCanvasSize(canvasRef);
  const enemiesRef = useRef<Enemy[]>([]);
  const burstsRef = useRef<Burst[]>([]);
  const phaseRef = useRef<GamePhase>("idle");
  const startedAtRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const lastHudRef = useRef(0);
  const enemyIdRef = useRef(0);
  const stabilityRef = useRef(100);
  const scoreRef = useRef(0);
  const rafRef = useRef(0);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [hud, setHud] = useState({ stability: 100, score: 0, time: Math.round(roundMs / 1000) });

  function reset() {
    enemiesRef.current = [];
    burstsRef.current = [];
    stabilityRef.current = 100;
    scoreRef.current = 0;
    lastSpawnRef.current = 0;
    phaseRef.current = "idle";
    setPhase("idle");
    setHud({ stability: 100, score: 0, time: Math.round(roundMs / 1000) });
  }

  function start() {
    reset();
    phaseRef.current = "playing";
    startedAtRef.current = performance.now();
    setPhase("playing");
  }

  function spawnEnemy(now: number) {
    const centerX = size.width / 2;
    const centerY = size.height / 2;
    const edge = Math.floor(Math.random() * 4);
    const x = edge === 0 ? -20 : edge === 1 ? size.width + 20 : randomBetween(0, size.width);
    const y = edge === 2 ? -20 : edge === 3 ? size.height + 20 : randomBetween(0, size.height);
    const angle = Math.atan2(centerY - y, centerX - x);
    const elapsed = now - startedAtRef.current;
    const speed = randomBetween(0.55, 0.95) + elapsed / roundMs * 0.55;
    enemyIdRef.current += 1;
    enemiesRef.current.push({
      id: enemyIdRef.current,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: randomBetween(8, 12),
      hp: 1
    });
  }

  function hitAt(x: number, y: number) {
    if (phaseRef.current !== "playing") {
      start();
      return;
    }

    const centerX = size.width / 2;
    const centerY = size.height / 2;
    let hit = false;

    enemiesRef.current = enemiesRef.current.filter((enemy) => {
      if (distance(x, y, enemy.x, enemy.y) < enemy.radius + 18) {
        hit = true;
        scoreRef.current += 12;
        burstsRef.current.push({ x: enemy.x, y: enemy.y, age: 0, label: labels[scoreRef.current % labels.length] });
        return false;
      }
      return true;
    });

    if (!hit && distance(x, y, centerX, centerY) < 74) {
      burstsRef.current.push({ x: centerX, y: centerY, age: 0 });
      enemiesRef.current = enemiesRef.current.filter((enemy) => {
        const pushed = distance(enemy.x, enemy.y, centerX, centerY) < 126;
        if (pushed) scoreRef.current += 4;
        return !pushed;
      });
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    hitAt(event.clientX - rect.left, event.clientY - rect.top);
  }

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;
    const canvas = currentCanvas;

    function draw(now: number) {
      const ctx = setupCanvas(canvas, size);
      if (!ctx) return;

      ctx.clearRect(0, 0, size.width, size.height);
      const centerX = size.width / 2;
      const centerY = size.height / 2;

      ctx.fillStyle = "rgba(88, 224, 196, 0.05)";
      for (let x = 0; x < size.width; x += 28) {
        ctx.fillRect(x, 0, 1, size.height);
      }
      for (let y = 0; y < size.height; y += 28) {
        ctx.fillRect(0, y, size.width, 1);
      }

      if (phaseRef.current === "playing") {
        const elapsed = now - startedAtRef.current;
        const spawnGap = clamp(920 - elapsed / roundMs * 430, 420, 920);
        if (now - lastSpawnRef.current > spawnGap) {
          spawnEnemy(now);
          lastSpawnRef.current = now;
        }

        enemiesRef.current = enemiesRef.current.filter((enemy) => {
          enemy.x += enemy.vx;
          enemy.y += enemy.vy;
          if (distance(enemy.x, enemy.y, centerX, centerY) < enemy.radius + 30) {
            stabilityRef.current = clamp(stabilityRef.current - 9, 0, 100);
            burstsRef.current.push({ x: centerX, y: centerY, age: 0 });
            return false;
          }
          return true;
        });

        if (elapsed >= roundMs || stabilityRef.current <= 0) {
          phaseRef.current = "finished";
          setPhase("finished");
        }
      }

      const pulse = Math.sin(now / 260) * 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 34 + pulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(88, 224, 196, 0.42)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(88, 224, 196, 0.28)";
      ctx.fill();
      ctx.fillStyle = "#f4f7f8";
      ctx.font = "700 11px Arial";
      ctx.textAlign = "center";
      ctx.fillText("CORE", centerX, centerY + 4);

      enemiesRef.current.forEach((enemy) => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius + 5, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(247, 201, 72, 0.28)";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(247, 201, 72, 0.82)";
        ctx.fill();
      });

      burstsRef.current = burstsRef.current.filter((burst) => {
        burst.age += 1;
        const radius = burst.age * 3;
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(88, 224, 196, ${Math.max(0, 0.45 - burst.age / 50)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        if (burst.label) {
          ctx.fillStyle = `rgba(244, 247, 248, ${Math.max(0, 1 - burst.age / 44)})`;
          ctx.font = "700 11px Arial";
          ctx.fillText(burst.label, burst.x, burst.y - 22 - burst.age * 0.4);
        }
        return burst.age < 38;
      });

      if (phaseRef.current === "idle" || phaseRef.current === "finished") {
        ctx.fillStyle = "rgba(8, 10, 13, 0.54)";
        ctx.fillRect(0, 0, size.width, size.height);
        ctx.fillStyle = "#f4f7f8";
        ctx.font = "800 18px Arial";
        ctx.fillText(phaseRef.current === "idle" ? "클릭해서 코어를 지켜보세요" : `UI 안정도: ${Math.round(stabilityRef.current)}%`, centerX, centerY - 54);
        ctx.fillStyle = "rgba(247, 201, 72, 0.92)";
        ctx.font = "700 13px Arial";
        ctx.fillText(phaseRef.current === "idle" ? "버그 디펜스" : "지연 감소 · 프레임 드롭 차단", centerX, centerY - 30);
      }

      if (now - lastHudRef.current > 160) {
        lastHudRef.current = now;
        setHud({
          stability: Math.round(stabilityRef.current),
          score: scoreRef.current,
          time: Math.max(0, Math.ceil((roundMs - (now - startedAtRef.current)) / 1000))
        });
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  return (
    <div className="games-play-surface">
      <canvas ref={canvasRef} className="games-canvas" onPointerDown={handlePointerDown} />
      <div className="games-hud">
        <span>안정도 {hud.stability}%</span>
        <span>차단 {hud.score}</span>
        <span>{phase === "playing" ? `${hud.time}초` : phase === "idle" ? "대기" : "종료"}</span>
      </div>
      <button className="games-stage-button" type="button" onClick={phase === "playing" ? reset : start}>
        {phase === "playing" ? "다시하기" : "시작하기"}
      </button>
      {mode === "home" ? <span className="games-home-hint">버그가 코어에 닿기 전에 클릭</span> : null}
    </div>
  );
}
