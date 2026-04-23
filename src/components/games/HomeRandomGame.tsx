"use client";

import { useEffect, useState } from "react";
import { GameConsole } from "@/components/games/GameConsole";
import type { GameId } from "@/components/games/gameTypes";
import { games } from "@/components/games/gameTypes";

export function HomeRandomGame() {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  useEffect(() => {
    const selected = games[Math.floor(Math.random() * games.length)];
    setActiveGame(selected.id);
  }, []);

  if (!activeGame) {
    return (
      <section className="games-console games-console-home" aria-label="랜덤 미니 게임 불러오는 중">
        <div className="games-console-glow" />
        <header className="games-console-header">
          <div>
            <span>SPACEBELT MINI GAMES</span>
            <strong>미니 게임 준비 중</strong>
          </div>
        </header>
        <div className="games-console-stage games-console-skeleton" />
        <footer className="games-console-footer">
          <span>랜덤 미니 게임</span>
        </footer>
      </section>
    );
  }

  return <GameConsole activeGame={activeGame} mode="home" />;
}
