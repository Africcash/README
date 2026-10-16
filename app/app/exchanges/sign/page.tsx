"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { DetailRow } from "@/components/layouts/app/detail-row"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { FeeRow } from "@/components/layouts/app/fee-row"
import { InfoBanner } from "@/components/layouts/app/info-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { AppColors } from "@/components/reuseables/app_colors"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { getErrorMessage } from "@/lib/api/error"
import { useCancelExchange, useExchange } from "@/lib/api/hooks/use-exchanges"
import { truncateAddress } from "@/lib/format"

export default function SignExchangePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = Number(searchParams.get("id"))

  const exchange = useExchange(id, Number.isFinite(id))
  const cancelExchange = useCancelExchange(id)

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
      <MobilePageHeader title="Signing Exchange" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Sign &amp; Lock</span>
      </Text>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-zinc-100 p-6">
          <Text size="lg" weight="semibold">
            Sign to Lock Funds
          </Text>
          <Text size="sm" muted className="mt-1">
            Your wallet will lock {data.usdc_amount} USDC in an escrow contract. It is only
            released when you confirm you&apos;ve received cash.
          </Text>

          <div className="mt-4 divide-y divide-border">
            <DetailRow label="You are locking" value={`${data.usdc_amount} USDC`} />
            <DetailRow
              label="You will receive"
              value={`${data.fiat_amount} ${data.fiat_currency}`}
              valueColor={AppColors.darkGreen}
            />
            <DetailRow label="Agent" value={data.agent_name} />
            <DetailRow label="Escrow contract" value={truncateAddress(data.escrow_contract_id)} />
            <DetailRow label="Signing wallet" value={truncateAddress(data.user_address)} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <InfoBanner text="Secured by a Stellar Soroban escrow contract. Only you can release your funds." />

          <div>
            <FeeRow label="Exchange Rate" value={`1 USDC = ${data.exchange_rate} ${data.fiat_currency}`} />
          </div>

          {cancelExchange.isError && (
            <ErrorBanner title="Couldn't cancel exchange" text={getErrorMessage(cancelExchange.error)} />
          )}

          <div className="flex flex-col gap-3 md:flex-row">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-full md:flex-1"
              disabled={cancelExchange.isPending}
              onClick={handleCancel}
            >
              {cancelExchange.isPending ? "Cancelling..." : "Cancel"}
            </Button>
            <Button
              size="lg"
              className="w-full rounded-full md:flex-1"
              render={
                <Link href={`/app/exchanges/sign/status?id=${id}`}>
                  <span className="md:hidden">Sign &amp; Lock {data.usdc_amount} USDC</span>
                  <span className="hidden md:inline">Sign &amp; Lock</span>
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
