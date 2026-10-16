"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { ExchangeStepper } from "@/components/layouts/app/exchange-stepper"
import { InfoBanner } from "@/components/layouts/app/info-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { StatusCard } from "@/components/layouts/app/status-card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useExchange } from "@/lib/api/hooks/use-exchanges"

type Status = "approving" | "sending" | "error"

export default function ExchangeStatusPage() {
  const [status, setStatus] = useState<Status>("approving")
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = Number(searchParams.get("id"))

  const exchange = useExchange(id, Number.isFinite(id))

  // NOTE: Soroban escrow-lock transaction building/signing isn't wired up yet
  // (no contract spec available) — this timed state machine simulates the
  // wallet-signing UX. No notify-funded call is made with a fabricated tx hash.
  useEffect(() => {
    if (status === "approving") {
      const t = setTimeout(() => setStatus("sending"), 2500)
      return () => clearTimeout(t)
    }
    if (status === "sending") {
      const t = setTimeout(() => {
        if (Math.random() < 0.5) {
          router.push(`/app/exchanges/escrow?id=${id}`)
        } else {
          setStatus("error")
        }
      }, 2500)
      return () => clearTimeout(t)
    }
  }, [status, router, id])

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
  const rows = [
    { label: "You are locking", value: `${data.usdc_amount} USDC` },
    { label: "Agent", value: data.agent_name },
  ]

  return (
    <div>
      <MobilePageHeader title="Signing Exchange" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Signing Exchange</span>
      </Text>

      {status !== "error" && (
        <div className="mt-6">
          <ExchangeStepper steps={["Approve", "Sending", "Funds locked"]} currentStep={status === "approving" ? 0 : 1} />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          {status === "approving" && (
            <StatusCard
              title="Waiting for your signature"
              description="Approve the request in Freighter to lock your funds. Please keep this screen open."
              rows={rows}
            />
          )}
          {status === "sending" && (
            <StatusCard
              title="Submitting to Stellar"
              description="Signature received. Confirming on the network, this usually takes a few seconds."
              rows={rows}
            />
          )}
          {status === "error" && (
            <>
              <StatusCard
                title="Something went wrong"
                description="The transaction could not be completed."
                rows={rows}
              />
              <ErrorBanner
                title="Freighter Signature failed"
                text="Your transaction was declined, please try again."
              />
            </>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {status === "approving" && (
            <>
              <InfoBanner text="Your funds only move after you approve in your wallet." />
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full"
                render={<Link href={`/app/exchanges/sign?id=${id}`}>Cancel</Link>}
              />
              <Button disabled size="lg" className="w-full rounded-full bg-zinc-200 text-muted-foreground hover:bg-zinc-200">
                <Loader2 className="size-4 animate-spin" />
                Waiting for freighter
              </Button>
            </>
          )}

          {status === "sending" && (
            <>
              <InfoBanner text="Please don't close this screen." />
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full"
                render={<Link href={`/app/exchanges/sign?id=${id}`}>Cancel</Link>}
              />
              <Button disabled size="lg" className="w-full rounded-full bg-zinc-200 text-muted-foreground hover:bg-zinc-200">
                <Loader2 className="size-4 animate-spin" />
                Confirming on Stellar
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <InfoBanner text="Nothing has left your wallet." />
              <Button variant="outline" size="lg" className="w-full rounded-full" render={<Link href="/app/exchanges">Go Back</Link>} />
              <Button size="lg" className="w-full rounded-full" onClick={() => setStatus("approving")}>
                Try Again
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
