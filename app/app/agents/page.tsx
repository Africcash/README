"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"
import { AgentRow } from "@/components/layouts/app/agent-row"
import { EmptyState } from "@/components/layouts/app/empty-state"
import { FilterPill } from "@/components/layouts/app/filter-pill"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MapPlaceholder } from "@/components/layouts/app/map-placeholder"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useAgents } from "@/lib/api/hooks/use-agents"

type Filter = "all" | "verified" | "available"

export default function AgentsDiscoveryPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  const agents = useAgents({
    search: search || undefined,
    verified: filter === "verified" ? true : undefined,
    available: filter === "available" ? true : undefined,
  })

  return (
    <div>
      <Text size="sm" muted>
        Home / <span className="text-foreground">Agents</span>
      </Text>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3">
        <Search className="size-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Nearby Agents by name, city, or address"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="flex gap-2 overflow-x-auto">
            <FilterPill label="All Agents" active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterPill label="Available Now" active={filter === "available"} onClick={() => setFilter("available")} />
            <FilterPill label="Verified Only" active={filter === "verified"} onClick={() => setFilter("verified")} />
          </div>

          <div className="mt-4 rounded-2xl bg-white px-5">
            {agents.isLoading ? (
              <LoadingState label="Searching agents..." />
            ) : agents.isError ? (
              <QueryErrorState error={agents.error} onRetry={() => agents.refetch()} />
            ) : agents.data && agents.data.length > 0 ? (
              <div className="divide-y divide-border">
                {agents.data.map((agent) => (
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
            ) : (
              <EmptyState title="No agents found" description="Try a different search or filter." />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:col-span-2">
          <MapPlaceholder />
          <Button size="lg" className="w-full rounded-full">
            Use Map Search
          </Button>
        </div>
      </div>
    </div>
  )
}
