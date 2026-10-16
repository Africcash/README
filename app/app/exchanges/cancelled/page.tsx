"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { DetailRow } from "@/components/layouts/app/detail-row"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useExchange } from "@/lib/api/hooks/use-exchanges"
import { truncateAddress } from "@/lib/format"

export default function ExchangeCancelledPage() {
  const searchParams = useSearchParams()
  const id = Number(searchParams.get("id"))

  const exchange = useExchange(id, Number.isFinite(id))

  if (!Number.isFinite(id)) {
    return <ErrorBanner title="No exchange selected" text="Return to your exchange history to view details." />
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
      <MobilePageHeader title="Exchange Cancelled" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Exchange Cancelled</span>
      </Text>

      <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="size-5 text-amber-600" />
        </div>
        <Text size="lg" weight="semibold">
          Exchange Cancelled
        </Text>

        <div className="w-full rounded-2xl bg-zinc-100 p-5 text-left">
          <Text size="sm" weight="medium" className="text-amber-600">
            Cancellation Reason
          </Text>
          <Text size="sm" muted className="mt-1">
            {data.cancellation_reason || `Your ${data.usdc_amount} USDC is being returned to your wallet.`}
          </Text>

          <div className="mt-4 divide-y divide-border">
            <DetailRow label="Refund Amount" value={`${data.usdc_amount} USDC`} />
            <DetailRow label="Destination Wallet" value={truncateAddress(data.user_address)} />
            <DetailRow label="Status" value={data.status === "REFUNDED" ? "Refunded" : "Processing"} />
          </div>
        </div>

        <div className="flex w-full gap-3">
          <Button variant="outline" size="lg" className="flex-1 rounded-full" render={<Link href="/app/agents">Find an Agent</Link>} />
          <Button size="lg" className="flex-1 rounded-full" render={<Link href="/app/home">Back to Home</Link>} />
        </div>
      </div>
    </div>
  )
}
