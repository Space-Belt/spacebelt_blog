"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { CursorGravity } from "@/components/games/CursorGravity";
import { DebugCombo } from "@/components/games/DebugCombo";
import { SignalDefense } from "@/components/games/SignalDefense";
import type { GameId, GameMode } from "@/components/games/gameTypes";
import { gameMap } from "@/components/games/gameTypes";

type GameConsoleProps = {
  activeGame: GameId;
  mode: GameMode;
  eyebrow?: string;
};

export function GameConsole({ activeGame, mode, eyebrow = "SPACEBELT MINI GAMES" }: GameConsoleProps) {
  const [resetKey, setResetKey] = useState(0);
  const game = gameMap[activeGame];

  function replay() {
    setResetKey((key) => key + 1);
  }

  return (
    <section className={mode === "home" ? "games-console games-console-home" : "games-console"}>
      <div className="games-console-glow" />
      <header className="games-console-header">
        <div>
          <span>{eyebrow}</span>
          <strong>{game.title}</strong>
        </div>
        <button type="button" onClick={replay} aria-label="게임 다시하기">
          <RotateCcw size={17} />
        </button>
      </header>

      <div className="games-console-stage">
        {activeGame === "signal-defense" ? <SignalDefense key={resetKey} mode={mode} /> : null}
        {activeGame === "cursor-gravity" ? <CursorGravity key={resetKey} mode={mode} /> : null}
        {activeGame === "debug-combo" ? <DebugCombo key={resetKey} mode={mode} /> : null}
      </div>

      <footer className="games-console-footer">
        <button type="button" onClick={replay}>
          다시하기
        </button>
        <span>{mode === "home" ? "랜덤 미니 게임" : game.description}</span>
      </footer>
    </section>
  );
}
