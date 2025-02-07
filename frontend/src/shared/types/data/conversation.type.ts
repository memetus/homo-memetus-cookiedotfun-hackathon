export type ConversationType = {
  type: "user" | "assistant";
  content: string;
  handler?: {
    name: "confirm" | "confirmed" | "restart" | "start";
    onClick: () => void;
  };
};

export type ConversationStatus =
  | "start"
  | "end"
  | "processing"
  | "confirm"
  | "token";

export type ConversationTokenResult = {
  coins: {
    address: string;
    allocation: number;
    name: string;
    analysis: string;
    symbol: string;
    recommendation: string;
  }[];
};
