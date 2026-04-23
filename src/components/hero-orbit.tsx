"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const flowItems = ["event", "state", "query", "render", "motion", "log"];

const codeLines = [
  "const flow = createUserExperience();",
  "sync(api.state, screen.intent);",
  "render(<ProductInterface />);"
];

const signals = ["tap", "scroll", "fetch", "paint"];

export function HeroOrbit() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function handlePointerMove(event: PointerEvent) {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;

        rootRef.current?.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
        rootRef.current?.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
        rootRef.current?.style.setProperty("--tilt-x", `${((y - 0.5) * -10).toFixed(2)}deg`);
        rootRef.current?.style.setProperty("--tilt-y", `${((x - 0.5) * 12).toFixed(2)}deg`);
        frame = 0;
      });
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-orbit frontend-hero-visual" ref={rootRef} aria-hidden="true">
      <div className="cursor-glow" />
      <div className="visual-grid" />
      <div className="visual-rail visual-rail-one" />
      <div className="visual-rail visual-rail-two" />
      <div className="signal-orbit signal-orbit-one" />
      <div className="signal-orbit signal-orbit-two" />

      <div className="code-window">
        <div className="code-window-top">
          <span />
          <span />
          <span />
        </div>
        <div className="code-window-body">
          {codeLines.map((line) => (
            <code key={line}>{line}</code>
          ))}
        </div>
      </div>

      <div className="interaction-console">
        {signals.map((signal, index) => (
          <span style={{ "--delay": `${index * 0.18}s` } as CSSProperties} key={signal}>
            {signal}
          </span>
        ))}
      </div>

      <div className="flow-board">
        {flowItems.map((item, index) => (
          <span style={{ "--delay": `${index * 0.22}s` } as CSSProperties} key={item}>
            {item}
          </span>
        ))}
      </div>

      <div className="device-frame">
        <span />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
