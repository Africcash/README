"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AmountCard } from "@/components/layouts/app/amount-card"
import { AvatarComp } from "@/components/layouts/app/avatar-comp"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { FeeRow } from "@/components/layouts/app/fee-row"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QrHandshakeBanner } from "@/components/layouts/app/qr-handshake-banner"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { Appimages } from "@/components/reuseables/app_images"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useAgent } from "@/lib/api/hooks/use-agents"
import { useCreateExchange } from "@/lib/api/hooks/use-exchanges"
import { getErrorMessage } from "@/lib/api/error"

function resolveFiatCurrency(supportedCurrencies: unknown): string {
  if (Array.isArray(supportedCurrencies) && typeof supportedCurrencies[0] === "string") {
    return supportedCurrencies[0]
  }
  return "NGN"
}

export default function InitiateExchangePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const agentId = Number(searchParams.get("agent"))

  const agent = useAgent(agentId, Number.isFinite(agentId))
  const createExchange = useCreateExchange()

  const [amount, setAmount] = useState("")

  if (!Number.isFinite(agentId)) {
    return <ErrorBanner title="No agent selected" text="Choose an agent from Find Agents to start an exchange." />
  }

  if (agent.isLoading) {
    return <LoadingState label="Loading agent..." />
  }

  if (agent.isError || !agent.data) {
    return <QueryErrorState error={agent.error} onRetry={() => agent.refetch()} title="Couldn't load this agent" />
  }

  const data = agent.data
  const fiatCurrency = resolveFiatCurrency(data.supported_currencies)
  const numericAmount = Number(amount)
  const isValidAmount =
    amount.length > 0 &&
    !Number.isNaN(numericAmount) &&
    numericAmount > 0 &&
    (!data.min_usdc_amount || numericAmount >= Number(data.min_usdc_amount)) &&
    (!data.max_usdc_amount || numericAmount <= Number(data.max_usdc_amount))

  function handleContinue() {
    createExchange.mutate(
      { agent_id: data.id, usdc_amount: amount, fiat_currency: fiatCurrency },
      {
        onSuccess: (exchange) => {
          router.push(`/app/exchanges/sign?id=${exchange.id}`)
        },
      }
    )
  }

  return (
    <div>
      <MobilePageHeader title="New Exchange" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">New Exchange</span>
      </Text>

      <div className="mt-6 grid grid-cols-1 gap-8 pb-24 md:grid-cols-2 md:pb-0">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-zinc-100 p-4 md:bg-transparent md:p-0">
            <AvatarComp src={data.avatar_url || Appimages.agentAvatarPlaceholder} alt={data.name} size="small" />
            <div>
              <Text weight="semibold">{data.name}</Text>
              <Text size="sm" muted>
                {data.fee_percentage ? `Fee: ${data.fee_percentage}%` : "Fee: \u2014"}
              </Text>
            </div>
          </div>

          <Text weight="semibold" className="mt-2">
            Specify Exchange Amount
          </Text>

          <AmountCard
            label="You Send"
            rightInfo={
              data.min_usdc_amount || data.max_usdc_amount
                ? `Limits: ${data.min_usdc_amount ?? "0"} - ${data.max_usdc_amount ?? "\u221e"} USDC`
                : ""
            }
            value={amount}
            unit="USDC"
            editable
            onChange={setAmount}
          />

          <AmountCard
            label={`You Receive (${fiatCurrency})`}
            rightInfo="Final amount confirmed by agent"
            value={amount || "0"}
            unit={fiatCurrency}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <FeeRow label="Stellar Network Fee" value="Paid in XLM at signing" />
            <FeeRow label="Soroban Escrow Fee" value="Deducted from USDC amount" />
            <FeeRow label="Exchange Commission" value={data.fee_percentage ? `${data.fee_percentage}%` : "\u2014"} />
          </div>

          <QrHandshakeBanner />

          {createExchange.isError && (
            <ErrorBanner title="Couldn't start exchange" text={getErrorMessage(createExchange.error)} />
          )}

          <Button
            size="lg"
            className="hidden w-full rounded-full md:flex"
            disabled={!isValidAmount || createExchange.isPending}
            onClick={handleContinue}
          >
            {createExchange.isPending ? "Starting..." : "Continue"}
          </Button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-white p-4 md:hidden">
        <Button
          size="lg"
          className="w-full rounded-full"
          disabled={!isValidAmount || createExchange.isPending}
          onClick={handleContinue}
        >
          {createExchange.isPending ? "Starting..." : "Continue"}
        </Button>
      </div>
    </div>
  )
}
