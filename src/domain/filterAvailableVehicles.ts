import type { FleetSnapshot } from "../knowledge/types";

export type VehicleFilterStep = {
  label: string;
  count: number;
  barWidth: number;
};

/** 保有 → 車種 → 空き → 乗れる、の絞り（fixtures の filters を返す） */
export function filterAvailableVehicles(
  fleet: FleetSnapshot,
): VehicleFilterStep[] {
  return fleet.filters.map((f) => ({ ...f }));
}
