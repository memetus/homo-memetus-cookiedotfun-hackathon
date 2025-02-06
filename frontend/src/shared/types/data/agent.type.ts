export type AllAgentType = {
  totalCount: number;
  results: AllAgentItem[];
};

export type AllAgentItem = {
  nav: number;
  fundId: number;
  name: string;
  realizedProfit: number;
  totalPnL: number;
  unrealizedProfit: number;
  createdAt: string;
};

export type AgentMetadataType = {
  name: string;
  strategy: string;
  fundAmount: number;
  fundId: string;
  createdAt: string;
};

export type AgentStatType = {
  fundId: string;
  nav: number;
  realizedProfit: number;
  unrealizedProfit: number;
  totalPnL: number;
};
