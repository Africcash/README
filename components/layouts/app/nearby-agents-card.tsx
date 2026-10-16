import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { AgentRow } from "@/components/layouts/app/agent-row"
import { EmptyState } from "@/components/layouts/app/empty-state"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { Text } from "@/components/ui/text"
import type { AgentProfile } from "@/lib/api/types"

type NearbyAgentsCardProps = {
  agents?: AgentProfile[]
  isLoading?: boolean
  error?: unknown
  onRetry?: () => void
}

function NearbyAgentsCard({ agents, isLoading, error, onRetry }: NearbyAgentsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <div className="flex items-center justify-between">
        <Text size="sm" weight="medium">
          Nearby Agents
        </Text>
        <Link href="/app/agents" className="inline-flex items-center gap-1">
          <Text size="sm" muted>
            See All
          </Text>
          <ChevronRight className="size-3.5 text-muted-foreground" />
        </Link>
      </div>

      {isLoading ? (
        <LoadingState label="Finding agents near you..." />
      ) : error ? (
        <QueryErrorState error={error} onRetry={onRetry} />
      ) : !agents || agents.length === 0 ? (
        <EmptyState title="No agents found" description="Check back soon for agents in your area." />
      ) : (
        <div className="mt-1 divide-y divide-border">
          {agents.map((agent) => (
            <Link key={agent.id} href={`/app/agents/${agent.id}`}>
              <AgentRow
                name={agent.name}
                verified={agent.is_verified}
                location={`${agent.city}, ${agent.country}`}
                completedTrades={agent.completed_trades}
                feePercentage={agent.fee_percentage}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export { NearbyAgentsCard }
