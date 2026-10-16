import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ActivityRow } from "@/components/layouts/app/activity-row"
import { EmptyState } from "@/components/layouts/app/empty-state"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { Text } from "@/components/ui/text"
import { formatRelativeTime } from "@/lib/format"
import type { Exchange } from "@/lib/api/types"

type RecentActivityCardProps = {
  exchanges?: Exchange[]
  isLoading?: boolean
  error?: unknown
  onRetry?: () => void
}

function RecentActivityCard({ exchanges, isLoading, error, onRetry }: RecentActivityCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <div className="flex items-center justify-between">
        <Text size="sm" weight="medium">
          Recent Activity
        </Text>
        <Link href="/app/exchanges" className="inline-flex items-center gap-1">
          <Text size="sm" muted>
            View All
          </Text>
          <ChevronRight className="size-3.5 text-muted-foreground" />
        </Link>
      </div>

      {isLoading ? (
        <LoadingState label="Loading activity..." />
      ) : error ? (
        <QueryErrorState error={error} onRetry={onRetry} />
      ) : !exchanges || exchanges.length === 0 ? (
        <EmptyState title="No activity yet" description="Your exchanges will show up here." />
      ) : (
        <div className="mt-1 divide-y divide-border">
          {exchanges.map((exchange) => (
            <Link key={exchange.id} href="/app/exchanges">
              <ActivityRow
                name={exchange.agent_name}
                subtitle={`${exchange.status.replace("_", " ")} \u2022 ${formatRelativeTime(exchange.created_at)}`}
                usdcAmount={`${exchange.usdc_amount} USDC`}
                ngnAmount={`${exchange.fiat_amount} ${exchange.fiat_currency}`}
                accent={exchange.status === "RELEASED" ? "green" : "orange"}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export { RecentActivityCard }
