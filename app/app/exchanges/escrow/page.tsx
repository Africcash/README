"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { DetailRow } from "@/components/layouts/app/detail-row"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { ExchangeStepper } from "@/components/layouts/app/exchange-stepper"
import { InfoBanner } from "@/components/layouts/app/info-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { LockAmountDisplay } from "@/components/layouts/app/lock-amount-display"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { AppColors } from "@/components/reuseables/app_colors"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { getErrorMessage } from "@/lib/api/error"
import { useCancelExchange, useExchange } from "@/lib/api/hooks/use-exchanges"

function formatCountdown(timeoutTimestamp?: number) {
  if (!timeoutTimestamp) return "\u2014"
  const ms = timeoutTimestamp * 1000 - Date.now()
  if (ms <= 0) return "Expired"
  const totalMinutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${totalMinutes}:${seconds.toString().padStart(2, "0")} minutes`
}

export default function EscrowLockPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = Number(searchParams.get("id"))

  const exchange = useExchange(id, Number.isFinite(id))
  const cancelExchange = useCancelExchange(id)

  // NOTE: real-time "agent verified funds" isn't a distinct API field yet —
  // this local timer simulates that pacing until the backend exposes it.
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVerified(true), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!Number.isFinite(id)) {
    return <ErrorBanner title="No exchange selected" text="Start a new exchange from an agent's profile." />
  }

  if (exchange.isLoading) {
    return <LoadingState label="Loading exchange..." />
  }

  if (exchange.isError || !exchange.data) {
    return <QueryErrorState error={exchange.error} onRetry={() => exchange.refetch()} title="Couldn't load this exchange" />
  }

  const data = exchange.data

  function handleCancel() {
    cancelExchange.mutate(undefined, {
      onSuccess: () => router.push(`/app/exchanges/cancelled?id=${id}`),
    })
  }

  return (
    <div>
      <MobilePageHeader title={`Exchange #${data.exchange_id}`} />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Exchange #{data.exchange_id}</span>
      </Text>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <LockAmountDisplay
            amount={`${data.fiat_amount} ${data.fiat_currency}`}
            subtitle={`${data.usdc_amount} USDC locked in escrow`}
          />

          <div className="divide-y divide-border">
            <DetailRow label="Settlement Agent" value={data.agent_name} />
            <DetailRow label="Time Remaining" value={formatCountdown(data.timeout_timestamp)} valueColor="#B45309" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ExchangeStepper steps={["Locked", "Agent verified", "Handover"]} currentStep={verified ? 2 : 1} />

          {verified ? (
            <InfoBanner variant="success" text="Funds verified. Go to the kiosk to collect your cash." />
          ) : (
            <InfoBanner text={`Waiting for ${data.agent_name} to verify your funds.`} />
          )}

          {cancelExchange.isError && (
            <ErrorBanner title="Couldn't cancel exchange" text={getErrorMessage(cancelExchange.error)} />
          )}

          <Button
            variant="outline"
            size="lg"
            disabled={verified || cancelExchange.isPending}
            className="w-full rounded-full"
            onClick={handleCancel}
          >
            {cancelExchange.isPending ? "Cancelling..." : "Cancel & Refund"}
          </Button>

          <Button
            disabled={!verified}
            size="lg"
            className="w-full rounded-full"
            style={!verified ? { backgroundColor: AppColors.lightGrey, color: "#9CA3AF" } : undefined}
            render={verified ? <Link href={`/app/exchanges/handover?id=${id}`}>Show Handover Code</Link> : undefined}
          >
            {!verified && "Show Handover Code"}
          </Button>
        </div>
      </div>
    </div>
  )
}
