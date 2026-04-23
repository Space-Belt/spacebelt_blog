"use client";

import { useState } from "react";
import { GameConsole } from "@/components/games/GameConsole";
import { GameSelector } from "@/components/games/GameSelector";
import type { GameId } from "@/components/games/gameTypes";

export function GamesPageClient() {
  const [activeGame, setActiveGame] = useState<GameId>("signal-defense");

  return (
    <div className="shell games-page-shell">
      <section className="games-page-copy">
        <span className="eyebrow">FRONTEND PLAYGROUND / MINI GAMES</span>
        <h1>작지만 즐거운 인터랙션 실험실.</h1>
        <p>마우스 움직임, 클릭, 드래그 같은 작은 행동으로 화면이 살아나는 미니 게임들입니다.</p>
        <GameSelector activeGame={activeGame} onSelect={setActiveGame} />
      </section>

      <div className="games-page-console">
        <GameConsole activeGame={activeGame} mode="games-page" />
      </div>
    </div>
  );
}
