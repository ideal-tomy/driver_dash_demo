import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { checkDutyRest } from "../domain/checkDutyRest";
import { matchReturnLoads } from "../domain/matchReturnLoads";
import { createMemoryKnowledgeRepository } from "../knowledge/memory";
import type {
  BoardSegment,
  BoardSnapshot,
  BoardVehicle,
  DutyAlert,
  FleetSnapshot,
  Order,
  PastCase,
  ReturnDecision,
  RulesSnapshot,
} from "../knowledge/types";

export type FlowStep = "today" | "part1" | "board" | "part3" | "part4";

export type ConsoleTab = "today" | "orders" | "board" | "alerts";

type DemoContextValue = {
  step: FlowStep;
  setStep: (s: FlowStep) => void;
  consoleTab: ConsoleTab;
  setConsoleTab: (t: ConsoleTab) => void;
  orders: Order[];
  pastCases: PastCase[];
  fleet: FleetSnapshot;
  rules: RulesSnapshot;
  board: BoardSnapshot;
  displayVehicles: BoardVehicle[];
  suggestionVisible: boolean;
  returnDecision: ReturnDecision;
  acceptReturn: () => void;
  rejectReturn: () => void;
  resetReturn: () => void;
  confirmFax: (orderId: string) => void;
  dutyAlerts: DutyAlert[];
  similarForDetail: PastCase[];
  leisureCases: PastCase[];
  detailOrder: Order | null;
  idleCount: number;
  openCount: number;
  confirmCount: number;
  candidateCount: number;
};

const DemoContext = createContext<DemoContextValue | null>(null);
const repo = createMemoryKnowledgeRepository();

function applyAccepted(
  vehicles: BoardVehicle[],
  suggestion: BoardSnapshot["suggestion"],
): BoardVehicle[] {
  return vehicles.map((v) => {
    if (v.id !== suggestion.targetVehicleId) return v;
    const segments: BoardSegment[] = v.segments.map((s) => {
      if (s.id !== suggestion.idleSegmentId) return s;
      return {
        ...s,
        kind: "run",
        label: suggestion.label.replace(/^帰り荷\s*/, ""),
        orderId: suggestion.orderId,
      };
    });
    return { ...v, segments };
  });
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<FlowStep>("today");
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("today");
  const [returnDecision, setReturnDecision] =
    useState<ReturnDecision>("pending");
  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);

  const baseBoard = useMemo(() => repo.getBoard(), []);
  const rules = useMemo(() => repo.getRules(), []);
  const fleet = useMemo(() => repo.getFleet(), []);
  const pastCases = useMemo(() => repo.getPastCases(), []);
  const leisureCases = useMemo(() => repo.getLeisureCases(), []);
  const allOrders = useMemo(() => repo.getOrders(), []);

  const orders = useMemo(() => {
    return allOrders
      .filter((o) => !o.isReturnCandidate)
      .map((o) =>
        confirmedIds.includes(o.id)
          ? {
              ...o,
              needsConfirm: false,
              status: "done" as const,
              confirmNote: null,
            }
          : o,
      );
  }, [allOrders, confirmedIds]);

  const detailOrder =
    allOrders.find((o) => o.id === "ord-1058695") ?? allOrders[0] ?? null;
  const similarForDetail = useMemo(
    () => (detailOrder ? repo.getSimilarCases(detailOrder.id) : []),
    [detailOrder],
  );

  const match = useMemo(() => matchReturnLoads(baseBoard), [baseBoard]);

  const displayVehicles = useMemo(() => {
    if (returnDecision === "accepted" && match) {
      return applyAccepted(baseBoard.vehicles, match.suggestion);
    }
    return baseBoard.vehicles;
  }, [baseBoard.vehicles, match, returnDecision]);

  const suggestionVisible =
    returnDecision === "pending" && Boolean(match);

  const dutyAlerts = useMemo(
    () => checkDutyRest({ ...baseBoard, vehicles: displayVehicles }, rules),
    [baseBoard, displayVehicles, rules],
  );

  const openCount = orders.filter((o) => o.status === "open").length;
  const confirmCount = orders.filter((o) => o.needsConfirm).length;
  const idleCount = displayVehicles.filter((v) =>
    v.segments.some((s) => s.kind === "idle"),
  ).length;
  const candidateCount = suggestionVisible ? 1 : 0;

  const acceptReturn = useCallback(() => setReturnDecision("accepted"), []);
  const rejectReturn = useCallback(() => setReturnDecision("rejected"), []);
  const resetReturn = useCallback(() => setReturnDecision("pending"), []);
  const confirmFax = useCallback((orderId: string) => {
    setConfirmedIds((ids) =>
      ids.includes(orderId) ? ids : [...ids, orderId],
    );
  }, []);

  const value: DemoContextValue = {
    step,
    setStep,
    consoleTab,
    setConsoleTab,
    orders,
    pastCases,
    fleet,
    rules,
    board: baseBoard,
    displayVehicles,
    suggestionVisible,
    returnDecision,
    acceptReturn,
    rejectReturn,
    resetReturn,
    confirmFax,
    dutyAlerts,
    similarForDetail,
    leisureCases,
    detailOrder,
    idleCount,
    openCount,
    confirmCount,
    candidateCount,
  };

  return (
    <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
