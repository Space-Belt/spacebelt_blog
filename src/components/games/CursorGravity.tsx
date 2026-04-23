"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { GameMode } from "@/components/games/gameTypes";
import { clamp, randomBetween, setupCanvas, useCanvasSize } from "@/components/games/gameUtils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
};

export function CursorGravity({ mode }: { mode: GameMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = useCanvasSize(canvasRef);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: size.width / 2, y: size.height / 2, down: false, active: false, speed: 0 });
  const rafRef = useRef(0);
  const lastPointerRef = useRef({ x: size.width / 2, y: size.height / 2 });
  const [energy, setEnergy] = useState(0);

  function seedParticles() {
    const count = mode === "home" ? 54 : 80;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: randomBetween(20, size.width - 20),
      y: randomBetween(20, size.height - 20),
      vx: randomBetween(-0.45, 0.45),
      vy: randomBetween(-0.45, 0.45),
      size: randomBetween(1.7, 3.5),
      hue: Math.random() > 0.72 ? 48 : 171
    }));
  }

  function burst(x: number, y: number, power = 4.2) {
    particlesRef.current.forEach((particle) => {
      const dx = particle.x - x;
      const dy = particle.y - y;
      const dist = Math.max(18, Math.hypot(dx, dy));
      particle.vx += (dx / dist) * power;
      particle.vy += (dy / dist) * power;
    });
  }

  function updatePointer(event: ReactPointerEvent<HTMLCanvasElement>, down?: boolean) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const previous = lastPointerRef.current;
    const speed = Math.hypot(x - previous.x, y - previous.y);
    pointerRef.current = { x, y, down: down ?? pointerRef.current.down, active: true, speed };
    lastPointerRef.current = { x, y };
    setEnergy((value) => clamp(value * 0.65 + speed * 0.45 + (down ? 18 : 0), 0, 100));
  }

  useEffect(() => {
    seedParticles();
  }, [size.width, size.height]);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;
    const canvas = currentCanvas;

    function draw() {
      const ctx = setupCanvas(canvas, size);
      if (!ctx) return;
      ctx.clearRect(0, 0, size.width, size.height);

      ctx.fillStyle = "rgba(88, 224, 196, 0.045)";
      for (let x = 0; x < size.width; x += 30) ctx.fillRect(x, 0, 1, size.height);
      for (let y = 0; y < size.height; y += 30) ctx.fillRect(0, y, size.width, 1);

      const pointer = pointerRef.current;
      particlesRef.current.forEach((particle, index) => {
        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const dist = Math.max(26, Math.hypot(dx, dy));
          const pull = pointer.down ? 9.4 : 4.8;
          particle.vx += (dx / dist) * (pull / dist);
          particle.vy += (dy / dist) * (pull / dist);
        }

        particle.vx *= 0.986;
        particle.vy *= 0.986;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > size.width) particle.vx *= -0.86;
        if (particle.y < 0 || particle.y > size.height) particle.vy *= -0.86;
        particle.x = clamp(particle.x, 0, size.width);
        particle.y = clamp(particle.y, 0, size.height);

        for (let i = index + 1; i < particlesRef.current.length; i += 1) {
          const other = particlesRef.current[i];
          const d = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (d < 54) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(88, 224, 196, ${0.12 * (1 - d / 54)})`;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.hue === 48 ? "rgba(247, 201, 72, 0.82)" : "rgba(88, 224, 196, 0.78)";
        ctx.fill();
      });

      if (pointer.active) {
        const radius = pointer.down ? 82 : 48 + pointer.speed * 0.4;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = pointer.down ? "rgba(247, 201, 72, 0.38)" : "rgba(88, 224, 196, 0.26)";
        ctx.lineWidth = 2;
        ctx.stroke();
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
        onPointerMove={(event) => updatePointer(event)}
        onPointerDown={(event) => {
          updatePointer(event, true);
          burst(pointerRef.current.x, pointerRef.current.y, 5.2);
        }}
        onPointerUp={(event) => {
          updatePointer(event, false);
          burst(pointerRef.current.x, pointerRef.current.y, 2.4);
        }}
        onPointerLeave={() => {
          pointerRef.current.active = false;
          pointerRef.current.down = false;
        }}
      />
      <div className="games-hud">
        <span>중력장 활성화</span>
        <span>모션 에너지 {Math.round(energy)}%</span>
      </div>
      <button className="games-stage-button" type="button" onClick={() => burst(size.width / 2, size.height / 2, 6)}>
        퍼뜨리기
      </button>
      {mode === "home" ? <span className="games-home-hint">움직이고, 누르고, 놓아보세요</span> : null}
    </div>
  );
}
