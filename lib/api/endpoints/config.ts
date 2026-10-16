import { apiClient } from "@/lib/api/client"
import type { Config } from "@/lib/api/types"

export function getConfig() {
  return apiClient.get<Config>("/config/").then((res) => res.data)
}
