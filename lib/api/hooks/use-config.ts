"use client"

import { useQuery } from "@tanstack/react-query"
import { getConfig } from "@/lib/api/endpoints/config"
import { queryKeys } from "@/lib/api/query-keys"

export function useConfig() {
  return useQuery({
    queryKey: queryKeys.config,
    queryFn: getConfig,
    staleTime: Infinity,
  })
}
