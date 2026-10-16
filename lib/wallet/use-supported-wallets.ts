"use client"

import { useQuery } from "@tanstack/react-query"
import { listSupportedWallets } from "@/lib/wallet/kit"

export function useSupportedWallets() {
  return useQuery({
    queryKey: ["supported-wallets"],
    queryFn: listSupportedWallets,
    staleTime: Infinity,
  })
}
