import type { ComponentType } from "react";
import { Bug, MousePointer2, Orbit } from "lucide-react";

export type GameId = "signal-defense" | "cursor-gravity" | "debug-combo";
export type GameMode = "home" | "games-page";
export type GamePhase = "idle" | "playing" | "finished";

export type GameMeta = {
  id: GameId;
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

export const games: GameMeta[] = [
  {
    id: "signal-defense",
    title: "버그 디펜스",
    description: "버그가 코어에 닿기 전에 막아내세요.",
    icon: Bug
  },
  {
    id: "cursor-gravity",
    title: "커서 그래비티",
    description: "커서로 파티클의 흐름을 바꿔보세요.",
    icon: Orbit
  },
  {
    id: "debug-combo",
    title: "디버그 콤보",
    description: "올바른 액션으로 버그를 연속 처리하세요.",
    icon: MousePointer2
  }
];

export const gameMap = Object.fromEntries(games.map((game) => [game.id, game])) as Record<GameId, GameMeta>;
