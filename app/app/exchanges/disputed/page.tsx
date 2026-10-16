"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShieldAlert } from "lucide-react"
import { DetailRow } from "@/components/layouts/app/detail-row"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useExchange } from "@/lib/api/hooks/use-exchanges"

export default function ExchangeDisputedPage() {
  const searchParams = useSearchParams()
  const id = Number(searchParams.get("id"))

  const exchange = useExchange(id, Number.isFinite(id))

  if (!Number.isFinite(id)) {
    return <ErrorBanner title="No exchange selected" text="Open a dispute from an active exchange." />
  }

  if (exchange.isLoading) {
    return <LoadingState label="Loading exchange..." />
  }

  if (exchange.isError || !exchange.data) {
    return <QueryErrorState error={exchange.error} onRetry={() => exchange.refetch()} title="Couldn't load this exchange" />
  }

  const data = exchange.data

  return (
    <div>
      <MobilePageHeader title="Exchange Disputed" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Exchange Disputed</span>
      </Text>

      <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert className="size-5 text-red-600" />
        </div>
        <Text size="lg" weight="semibold">
          Exchange Disputed
        </Text>
        <Text size="sm" muted>
          Your report has been received. Funds remain locked in escrow while
          our support team reviews this exchange.
        </Text>

        <div className="w-full rounded-2xl bg-zinc-100 p-5 text-left">
          <Text size="sm" weight="medium" className="text-red-600">
            Dispute Status
          </Text>
          <Text size="sm" muted className="mt-1">
            {data.notes || "A support agent will contact you within 24 hours."}
          </Text>

          <div className="mt-4 divide-y divide-border">
            <DetailRow label="Locked Amount" value={`${data.usdc_amount} USDC`} />
            <DetailRow label="Agent" value={data.agent_name} />
            <DetailRow label="Case ID" value={`#${data.exchange_id}`} />
          </div>
        </div>

        <div className="flex w-full gap-3">
          <Button variant="outline" size="lg" className="flex-1 rounded-full" render={<Link href="/app/exchanges">View Exchanges</Link>} />
          <Button size="lg" className="flex-1 rounded-full" render={<Link href="/app/home">Back to Home</Link>} />
        </div>
      </div>
    </div>
  )
}
