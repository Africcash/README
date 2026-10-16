"use client"

import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useAuthMe } from "@/lib/api/hooks/use-auth"
import { useConfig } from "@/lib/api/hooks/use-config"

export type StellarBalances = {
  xlm: string
  usdc: string
  /** whether a USDC trustline/balance line exists at all, vs. just a zero balance */
  hasUsdc: boolean
}

type HorizonBalance = {
  asset_type: string
  asset_code?: string
  balance: string
}

type HorizonAccount = {
  balances: HorizonBalance[]
}

/** Reads live XLM/USDC balances directly from Horizon for the signed-in wallet. */
export function useStellarBalances() {
  const me = useAuthMe()
  const config = useConfig()
  const address = me.data?.stellar_address
  const horizonUrl = config.data?.horizon_url

  return useQuery({
    queryKey: ["stellar-balances", address, horizonUrl],
    queryFn: async (): Promise<StellarBalances> => {
      try {
        const res = await axios.get<HorizonAccount>(`${horizonUrl}/accounts/${address}`)
        const native = res.data.balances.find((b) => b.asset_type === "native")
        const usdc = res.data.balances.find((b) => b.asset_code === "USDC")
        return { xlm: native?.balance ?? "0", usdc: usdc?.balance ?? "0", hasUsdc: Boolean(usdc) }
      } catch (error) {
        // Unfunded/unknown testnet accounts 404 on Horizon — treat as zero balance.
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return { xlm: "0", usdc: "0", hasUsdc: false }
        }
        throw error
      }
    },
    enabled: Boolean(address && horizonUrl),
  })
}
