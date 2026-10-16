import type { AgentListParams, AgentReviewListParams, ExchangeListParams } from "@/lib/api/types"

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  agents: {
    list: (params?: AgentListParams) => ["agents", "list", params] as const,
    detail: (id: number) => ["agents", "detail", id] as const,
    me: ["agents", "me"] as const,
    stats: ["agents", "stats"] as const,
    reviews: (id: number, params?: AgentReviewListParams) =>
      ["agents", id, "reviews", params] as const,
  },
  exchanges: {
    list: (params?: ExchangeListParams) => ["exchanges", "list", params] as const,
    detail: (id: number) => ["exchanges", "detail", id] as const,
  },
  config: ["config"] as const,
}
