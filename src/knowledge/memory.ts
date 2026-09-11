import boardJson from "./fixtures/board.json";
import fleetJson from "./fixtures/fleet.json";
import ordersJson from "./fixtures/orders.json";
import pastCasesJson from "./fixtures/pastCases.json";
import rulesJson from "./fixtures/rules.json";
import type { KnowledgeRepository } from "./repository";
import type {
  BoardSnapshot,
  FleetSnapshot,
  Order,
  PastCase,
  RulesSnapshot,
} from "./types";

const orders = ordersJson as Order[];
const pastCases = pastCasesJson as PastCase[];
const fleet = fleetJson as FleetSnapshot;
const board = boardJson as BoardSnapshot;
const rules = rulesJson as RulesSnapshot;

export function createMemoryKnowledgeRepository(): KnowledgeRepository {
  return {
    getOrders: () => orders.map((o) => ({ ...o })),
    getPastCases: () => pastCases.map((c) => ({ ...c })),
    getFleet: () => ({
      ...fleet,
      filters: fleet.filters.map((f) => ({ ...f })),
      restWarning: { ...fleet.restWarning },
    }),
    getBoard: () => ({
      ...board,
      vehicles: board.vehicles.map((v) => ({
        ...v,
        segments: v.segments.map((s) => ({ ...s })),
      })),
      suggestion: { ...board.suggestion },
    }),
    getRules: () => ({
      ...rules,
      rules: rules.rules.map((r) => ({ ...r })),
      leisureJob: {
        ...rules.leisureJob,
        vehicleCandidates: [...rules.leisureJob.vehicleCandidates],
      },
    }),
    getSimilarCases: (orderId: string) =>
      pastCases.filter((c) => c.relatedOrderId === orderId && !c.leisure),
    getLeisureCases: () => pastCases.filter((c) => Boolean(c.leisure)),
  };
}
