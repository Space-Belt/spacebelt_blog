"use client";

import type { GameId } from "@/components/games/gameTypes";
import { games } from "@/components/games/gameTypes";

type GameSelectorProps = {
  activeGame: GameId;
  onSelect: (game: GameId) => void;
};

export function GameSelector({ activeGame, onSelect }: GameSelectorProps) {
  return (
    <div className="games-selector" aria-label="게임 선택">
      {games.map((game) => {
        const Icon = game.icon;
        return (
          <button
            className={activeGame === game.id ? "games-selector-card active" : "games-selector-card"}
            type="button"
            key={game.id}
            onClick={() => onSelect(game.id)}
          >
            <Icon size={21} />
            <span>{game.title}</span>
            <p>{game.description}</p>
          </button>
        );
      })}
    </div>
  );
}
