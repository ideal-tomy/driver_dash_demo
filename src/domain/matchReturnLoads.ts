import type { BoardSnapshot, ReturnSuggestion } from "../knowledge/types";

export type ReturnMatch = {
  suggestion: ReturnSuggestion;
  idleSegmentId: string;
  targetVehicleId: string;
};

/** 空区間に向きの合う未割当荷物があれば候補を返す（v1は board の suggestion を正とする） */
export function matchReturnLoads(board: BoardSnapshot): ReturnMatch | null {
  const { suggestion, vehicles } = board;
  const vehicle = vehicles.find((v) => v.id === suggestion.targetVehicleId);
  if (!vehicle) return null;
  const idle = vehicle.segments.find(
    (s) => s.id === suggestion.idleSegmentId && s.kind === "idle",
  );
  if (!idle) return null;
  return {
    suggestion,
    idleSegmentId: idle.id,
    targetVehicleId: vehicle.id,
  };
}
