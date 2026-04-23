import { useEffect, useState, type RefObject } from "react";

export type CanvasSize = {
  width: number;
  height: number;
  dpr: number;
};

export function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function distance(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

export function useCanvasSize(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const [size, setSize] = useState<CanvasSize>({ width: 640, height: 390, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const currentCanvas = canvas;

    function resize() {
      const rect = currentCanvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(240, Math.floor(rect.height));
      currentCanvas.width = Math.floor(width * dpr);
      currentCanvas.height = Math.floor(height * dpr);
      setSize({ width, height, dpr });
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(currentCanvas);
    return () => observer.disconnect();
  }, [canvasRef]);

  return size;
}

export function setupCanvas(canvas: HTMLCanvasElement, size: CanvasSize) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
  return ctx;
}
