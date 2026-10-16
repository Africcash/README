"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { ExchangeStepper } from "@/components/layouts/app/exchange-stepper"
import { InfoBanner } from "@/components/layouts/app/info-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { StatusCard } from "@/components/layouts/app/status-card"
import { AppColors } from "@/components/reuseables/app_colors"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useAuthMe } from "@/lib/api/hooks/use-auth"
import { useConfig } from "@/lib/api/hooks/use-config"
import { truncateAddress } from "@/lib/format"

type Phase = "review" | "approving" | "sending" | "success" | "error"

export default function EnableUsdcPage() {
  const me = useAuthMe()
  const config = useConfig()
  const [phase, setPhase] = useState<Phase>("review")

  if (me.isLoading || config.isLoading) {
    return <LoadingState label="Loading wallet..." />
  }

  if (me.isError || !me.data) {
    return <QueryErrorState error={me.error} onRetry={() => me.refetch()} title="Couldn't load your wallet" />
  }

  const rows = [
    { label: "Wallet", value: `${truncateAddress(me.data.stellar_address)} (Freighter)` },
    { label: "Asset", value: "USDC" },
    { label: "Network", value: "Stellar Testnet" },
    { label: "Network fee", value: "0.00001 XLM" },
  ]

  // NOTE: there's no classic USDC asset issuer exposed by /config (only a Soroban
  // contract id), so the real ChangeTrust transaction can't be built/signed yet —
  // this simulates the signing UX until that's available, same as exchange escrow.
  function handleEnable() {
    setPhase("approving")
    setTimeout(() => {
      setPhase("sending")
      setTimeout(() => {
        setPhase(Math.random() < 0.85 ? "success" : "error")
      }, 2000)
    }, 2000)
  }

  if (phase === "success") {
    return (
      <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full" style={{ backgroundColor: AppColors.lightGreen }}>
          <CheckCircle2 className="size-5" style={{ color: AppColors.darkGreen }} />
        </div>
        <Text size="lg" weight="semibold">
          USDC is enabled
        </Text>
        <Text size="sm" muted>
          You can now receive and hold USDC.
        </Text>
        <Button size="lg" className="w-full rounded-full" render={<Link href="/app/wallet">Back to Wallet</Link>} />
      </div>
    )
  }

  if (phase === "error") {
    return (
      <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="size-5 text-amber-600" />
        </div>
        <Text size="lg" weight="semibold">
          Couldn&apos;t enable USDC
        </Text>
        <Text size="sm" muted>
          USDC wasn&apos;t enabled. You can try again or go back.
        </Text>
        <div className="flex w-full gap-3">
          <Button variant="outline" size="lg" className="flex-1 rounded-full" render={<Link href="/app/wallet">Go Back</Link>} />
          <Button size="lg" className="flex-1 rounded-full" onClick={() => setPhase("review")}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <MobilePageHeader title="Enable USDC" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Enable USDC</span>
      </Text>

      {phase !== "review" && (
        <div className="mt-6">
          <ExchangeStepper steps={["Approve", "Sending", "Done"]} currentStep={phase === "approving" ? 0 : 1} />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <StatusCard
          title={phase === "review" ? "Enable USDC in your wallet" : "Waiting for your signature"}
          description={
            phase === "review"
              ? "Stellar wallets need a one-time setup before they can hold USDC. It takes a few seconds."
              : "Approve the request in Freighter to enable USDC."
          }
          rows={rows}
        />

        <div className="flex flex-col gap-4">
          <InfoBanner text="This only happens once. Your funds stay in your wallet." />

          {phase === "review" ? (
            <div className="flex flex-col gap-3 md:flex-row">
              <Button variant="outline" size="lg" className="w-full rounded-full md:flex-1" render={<Link href="/app/wallet">Not Now</Link>} />
              <Button size="lg" className="w-full rounded-full md:flex-1" onClick={handleEnable}>
                Enable USDC
              </Button>
            </div>
          ) : (
            <Button disabled size="lg" className="w-full rounded-full bg-zinc-200 text-muted-foreground hover:bg-zinc-200">
              Waiting for Freighter
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
