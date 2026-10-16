"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { EmptyState } from "@/components/layouts/app/empty-state"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { StatusPill } from "@/components/layouts/app/status-pill"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useExchanges } from "@/lib/api/hooks/use-exchanges"
import { formatRelativeTime } from "@/lib/format"

const statusRoutes: Record<string, string> = {
  INITIATED: "/app/exchanges/sign",
  FUNDED: "/app/exchanges/escrow",
  CASH_PENDING: "/app/exchanges/handover",
  CASH_CONFIRMED: "/app/exchanges/handover",
  RELEASED: "/app/exchanges/complete",
  CANCELLED: "/app/exchanges/cancelled",
  REFUNDED: "/app/exchanges/cancelled",
  DISPUTED: "/app/exchanges/disputed",
}

export default function ExchangeHistoryPage() {
  const exchanges = useExchanges()

  return (
    <div>
      <MobilePageHeader title="Exchanges" />

      <div className="hidden items-center justify-between md:flex">
        <Text size="sm" muted>
          Home / <span className="text-foreground">Exchanges</span>
        </Text>
        <Button size="default" className="rounded-full" render={<Link href="/app/agents/find">New Exchange</Link>} />
      </div>

      {exchanges.isLoading ? (
        <LoadingState label="Loading exchanges..." />
      ) : exchanges.isError ? (
        <QueryErrorState error={exchanges.error} onRetry={() => exchanges.refetch()} />
      ) : !exchanges.data || exchanges.data.length === 0 ? (
        <EmptyState title="No exchanges yet" description="Start your first cash-out exchange with a nearby agent." />
      ) : (
        <div className="mt-6 divide-y divide-border rounded-2xl bg-white md:bg-transparent">
          {exchanges.data.map((exchange) => (
            <Link
              key={exchange.id}
              href={`${statusRoutes[exchange.status] ?? "/app/exchanges"}?id=${exchange.id}`}
              className="flex items-center justify-between gap-3 px-5 py-4 md:px-0"
            >
              <div>
                <Text size="sm" weight="medium">
                  {exchange.agent_name}
                </Text>
                <Text size="sm" muted>
                  #{exchange.exchange_id} &bull; {formatRelativeTime(exchange.created_at)}
                </Text>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Text size="sm" weight="medium">
                    {exchange.usdc_amount} USDC
                  </Text>
                  <Text size="sm" muted>
                    {exchange.fiat_amount} {exchange.fiat_currency}
                  </Text>
                </div>
                <StatusPill status={exchange.status} />
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-white p-4 md:hidden">
        <Button size="lg" className="w-full rounded-full" render={<Link href="/app/agents">New Exchange</Link>} />
      </div>
    </div>
  )
}
