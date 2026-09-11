import type {
  BoardSnapshot,
  DutyAlert,
  RulesSnapshot,
} from "../knowledge/types";

export function checkDutyRest(
  board: BoardSnapshot,
  rules: RulesSnapshot,
): DutyAlert[] {
  const alerts: DutyAlert[] = [];
  for (const v of board.vehicles) {
    if (v.restShortfall) {
      alerts.push({
        vehicleId: v.id,
        vehicleName: v.name,
        ruleId: "REST-MIN-09",
        message: `翌朝の出庫まで、休息の時間が${rules.restMinHours}時間を下回ります。`,
      });
    }
    if (v.continuousDriveOver) {
      alerts.push({
        vehicleId: v.id,
        vehicleName: v.name,
        ruleId: "DRIVE-CONT-04",
        message: `連続して運転する時間が${rules.continuousDriveMaxHours}時間を超える区間があります。`,
      });
    }
  }
  return alerts;
}
