"use client"

import Link from "next/link"
import { AvailableBalanceCard } from "@/components/layouts/app/available-balance-card"
import { EscrowBanner } from "@/components/layouts/app/escrow-banner"
import { MobileGreetingHeader } from "@/components/layouts/app/mobile-greeting-header"
import { NearbyAgentsCard } from "@/components/layouts/app/nearby-agents-card"
import { RecentActivityCard } from "@/components/layouts/app/recent-activity-card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useAgents } from "@/lib/api/hooks/use-agents"
import { useExchanges } from "@/lib/api/hooks/use-exchanges"
import { useStellarBalances } from "@/lib/api/hooks/use-stellar-balances"

const TERMINAL_STATUSES = ["RELEASED", "CANCELLED", "REFUNDED", "DISPUTED"]

export default function UserDashboardPage() {
  const balances = useStellarBalances()
  const agents = useAgents({ available: true })
  const exchanges = useExchanges()

  const activeExchange = exchanges.data?.find((e) => !TERMINAL_STATUSES.includes(e.status)) ?? null

  return (
    <div>
      {/* Mobile layout */}
      <div className="flex flex-col gap-4 pb-28 md:hidden">
        <MobileGreetingHeader />
        <AvailableBalanceCard usdc={balances.data?.usdc} isLoading={balances.isLoading} />
        <EscrowBanner exchange={activeExchange} />
        <NearbyAgentsCard
          agents={agents.data?.slice(0, 4)}
          isLoading={agents.isLoading}
          error={agents.error}
          onRetry={() => agents.refetch()}
        />
        <RecentActivityCard
          exchanges={exchanges.data?.slice(0, 2)}
          isLoading={exchanges.isLoading}
          error={exchanges.error}
          onRetry={() => exchanges.refetch()}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-white p-4 md:hidden">
        <Button size="lg" className="w-full rounded-full" render={<Link href="/app/agents">Find an Agent</Link>} />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <Text size="sm" muted>
          Home / <span className="text-foreground">Dashboard</span>
        </Text>

        <div className="mt-4">
          <EscrowBanner exchange={activeExchange} />
        </div>

        <div className="mt-6 grid grid-cols-5 gap-6">
          <div className="col-span-3 flex flex-col gap-4">
            <AvailableBalanceCard usdc={balances.data?.usdc} isLoading={balances.isLoading} />
            <Button size="lg" className="w-full rounded-full" render={<Link href="/app/agents">Find an Agent</Link>} />
          </div>
          <div className="col-span-2">
            <NearbyAgentsCard
              agents={agents.data?.slice(0, 4)}
              isLoading={agents.isLoading}
              error={agents.error}
              onRetry={() => agents.refetch()}
            />
          </div>
        </div>

        <div className="mt-8">
          <RecentActivityCard
            exchanges={exchanges.data}
            isLoading={exchanges.isLoading}
            error={exchanges.error}
            onRetry={() => exchanges.refetch()}
          />
        </div>
      </div>
    </div>
  )
}
