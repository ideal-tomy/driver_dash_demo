export type Channel = "ネット" | "FAX" | "電話";

export type OrderStatus = "open" | "done";

export type RoutePoint = {
  from: string;
  to: string;
};

export type Order = {
  id: string;
  channel: Channel;
  receivedAt: string;
  status: OrderStatus;
  needsConfirm: boolean;
  confirmNote: string | null;
  route: RoutePoint;
  loadDate: string;
  vehicleType: string;
  cargoSummary: string;
  pickup: {
    when: string;
    place: string;
    driverWork: string;
  } | null;
  dropoff: {
    when: string;
    place: string;
    driverWork: string;
  } | null;
  cargoDetail: string | null;
  vehicleNote: string | null;
  surchargeListed: boolean | null;
  lane: string;
  isReturnCandidate?: boolean;
};

export type PastCase = {
  id: string;
  route: RoutePoint;
  vehicleType: string;
  date: string;
  fare: number | null;
  surcharge: number | null;
  relatedOrderId: string | null;
  leisure?: {
    kind: string;
    machines: number;
    staff: string;
    hours: number;
    sourcing: string;
  };
};

export type FleetFilter = {
  label: string;
  count: number;
  barWidth: number;
};

export type FleetSnapshot = {
  total: number;
  filters: FleetFilter[];
  restWarning: {
    ruleId: string;
    text: string;
  };
  remainingReason: string;
};

export type SegmentKind = "run" | "idle" | "sug";

export type BoardSegment = {
  id: string;
  kind: SegmentKind;
  label: string;
  startHour: number;
  endHour: number;
  orderId?: string;
};

export type BoardVehicle = {
  id: string;
  name: string;
  lane: string;
  segments: BoardSegment[];
  restShortfall: boolean;
  continuousDriveOver?: boolean;
};

export type ReturnSuggestion = {
  id: string;
  targetVehicleId: string;
  idleSegmentId: string;
  orderId: string;
  label: string;
  startHour: number;
  endHour: number;
  ruleId: string;
  reason: string;
};

export type BoardSnapshot = {
  dateLabel: string;
  hourStart: number;
  hourEnd: number;
  pxPerHour: number;
  vehicles: BoardVehicle[];
  suggestion: ReturnSuggestion;
};

export type RuleDef = {
  id: string;
  summary: string;
};

export type RulesSnapshot = {
  restMinHours: number;
  restPreferredHours: number;
  continuousDriveMaxHours: number;
  staffCandidateMinCases: number;
  rules: RuleDef[];
  leisureJob: {
    title: string;
    window: string;
    site: string;
    vehiclesNeeded: number;
    vehicleCandidates: string[];
    staffNeeded: string;
    staffRecordCount: number;
  };
};

export type DutyAlert = {
  vehicleId: string;
  vehicleName: string;
  ruleId: string;
  message: string;
};

export type ReturnDecision = "pending" | "accepted" | "rejected";

export type DemoConfig = {
  demoId: string;
  demoName: string;
  brandId: string;
  demoType: string;
  defaultMode: string;
};

export const demoConfig: DemoConfig = {
  demoId: "driver-dash",
  demoName: "運送 配車ナレッジ デモ",
  brandId: "ideal",
  demoType: "workflow-dashboard",
  defaultMode: "sample",
};
