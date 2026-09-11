import type {
  BoardSnapshot,
  FleetSnapshot,
  Order,
  PastCase,
  RulesSnapshot,
} from "./types";

export type KnowledgeRepository = {
  getOrders: () => Order[];
  getPastCases: () => PastCase[];
  getFleet: () => FleetSnapshot;
  getBoard: () => BoardSnapshot;
  getRules: () => RulesSnapshot;
  getSimilarCases: (orderId: string) => PastCase[];
  getLeisureCases: () => PastCase[];
};
