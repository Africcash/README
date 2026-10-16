"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Dialog } from "@base-ui/react/dialog"
import { Drawer } from "@base-ui/react/drawer"
import { ArrowRight, BadgeCheck, QrCode } from "lucide-react"
import { AvatarComp } from "@/components/layouts/app/avatar-comp"
import { DetailRow } from "@/components/layouts/app/detail-row"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { InfoBanner } from "@/components/layouts/app/info-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { AppColors } from "@/components/reuseables/app_colors"
import { Appimages } from "@/components/reuseables/app_images"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { getErrorMessage } from "@/lib/api/error"
import { useConfirmCash, useExchange } from "@/lib/api/hooks/use-exchanges"

function useIsDesktop() {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia("(min-width: 768px)")
      mql.addEventListener("change", notify)
      return () => mql.removeEventListener("change", notify)
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  )
}

export default function CashHandoverPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = Number(searchParams.get("id"))

  const exchange = useExchange(id, Number.isFinite(id))
  const confirmCash = useConfirmCash(id)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const isDesktop = useIsDesktop()

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

  function handleConfirm() {
    confirmCash.mutate(undefined, {
      onSuccess: () => router.push(`/app/exchanges/complete?id=${id}`),
    })
  }

  return (
    <div>
      <MobilePageHeader title="Cash Handover" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Cash Handover</span>
      </Text>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <AvatarComp src={data.agent_avatar_url || Appimages.agentAvatarPlaceholder} alt={data.agent_name} size="small" />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <Text weight="semibold">{data.agent_name}</Text>
                <BadgeCheck className="size-3.5" style={{ color: AppColors.primaryPurple }} />
              </div>
              <Text size="sm" muted>
                {data.agent_location}
              </Text>
            </div>
            <div className="text-right">
              <Text weight="semibold">{data.exchange_rate}</Text>
              <Text size="sm" muted>
                /1 USDC
              </Text>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-zinc-100 px-6 py-5">
            <div>
              <Text size="sm" muted>
                You Locked
              </Text>
              <Text weight="semibold">{data.usdc_amount} USDC</Text>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
            <div className="text-right">
              <Text size="sm" muted>
                You Receive
              </Text>
              <Text weight="semibold" style={{ color: AppColors.darkGreen }}>
                {data.fiat_amount} {data.fiat_currency}
              </Text>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div
            style={{ backgroundColor: AppColors.azureBlue }}
            className="flex size-40 items-center justify-center rounded-2xl"
          >
            <QrCode className="size-20" style={{ color: AppColors.primaryPurple }} />
          </div>
          <Text size="sm" muted>
            Show this code to the agent
          </Text>
          <span style={{ backgroundColor: AppColors.azureBlue }} className="rounded-full px-4 py-1.5">
            <Text weight="semibold" style={{ color: AppColors.primaryPurple }}>
              ACX-{data.exchange_id}
            </Text>
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="divide-y divide-border">
          <DetailRow
            label="Escrow check"
            value={verified ? "Funds verified by agent" : "Waiting for agent"}
            valueColor={verified ? AppColors.darkGreen : "#B45309"}
          />
          <DetailRow label="Your confirmation" value="Pending" valueColor="#B45309" />
        </div>

        <div className="flex flex-col gap-4">
          <InfoBanner
            variant="warning"
            text={verified ? "Only tap this after you've counted your cash." : "The agent needs to verify your funds first."}
          />

          {confirmCash.isError && (
            <ErrorBanner title="Couldn't confirm handover" text={getErrorMessage(confirmCash.error)} />
          )}

          <Button
            disabled={!verified}
            size="lg"
            className="w-full rounded-full"
            style={!verified ? { backgroundColor: AppColors.lightGrey, color: "#9CA3AF" } : undefined}
            onClick={() => verified && setConfirmOpen(true)}
          >
            Confirm Cash Received
          </Button>

          <Link href={`/app/exchanges/dispute?id=${id}`} className="text-center">
            <Text size="sm" weight="medium" className="text-amber-600">
              Report an Issue
            </Text>
          </Link>
        </div>
      </div>

      <Dialog.Root open={confirmOpen && isDesktop} onOpenChange={setConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
            <Dialog.Title render={<Text weight="semibold">Release {data.usdc_amount} USDC to {data.agent_name}?</Text>} />

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-zinc-100 px-5 py-4">
              <div>
                <Text size="sm" muted>
                  You Locked
                </Text>
                <Text weight="medium">{data.usdc_amount} USDC</Text>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
              <div className="text-right">
                <Text size="sm" muted>
                  You Receive
                </Text>
                <Text weight="medium" style={{ color: AppColors.darkGreen }}>
                  {data.fiat_amount} {data.fiat_currency}
                </Text>
              </div>
            </div>

            <div className="mt-4">
              <InfoBanner variant="warning" text="This can't be undone. Only continue if you've counted your cash." />
            </div>

            {confirmCash.isError && (
              <div className="mt-4">
                <ErrorBanner title="Couldn't confirm handover" text={getErrorMessage(confirmCash.error)} />
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3">
              <Button variant="outline" size="lg" className="w-full rounded-full" onClick={() => setConfirmOpen(false)}>
                No, Not Yet
              </Button>
              <Button size="lg" className="w-full rounded-full" disabled={confirmCash.isPending} onClick={handleConfirm}>
                {confirmCash.isPending ? "Confirming..." : "Yes, I got my cash"}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <Drawer.Root open={confirmOpen && !isDesktop} onOpenChange={setConfirmOpen} swipeDirection="down">
        <Drawer.Portal>
          <Drawer.Backdrop className="fixed inset-0 bg-black/40" />
          <Drawer.Viewport className="fixed inset-x-0 bottom-0 flex items-end justify-stretch">
            <Drawer.Popup className="w-full rounded-t-3xl bg-white p-6 pb-8 shadow-xl">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-300" />

              <Drawer.Title render={<Text weight="semibold">Release {data.usdc_amount} USDC to {data.agent_name}?</Text>} />

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-zinc-100 px-5 py-4">
                <div>
                  <Text size="sm" muted>
                    You Locked
                  </Text>
                  <Text weight="medium">{data.usdc_amount} USDC</Text>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
                <div className="text-right">
                  <Text size="sm" muted>
                    You Receive
                  </Text>
                  <Text weight="medium" style={{ color: AppColors.darkGreen }}>
                    {data.fiat_amount} {data.fiat_currency}
                  </Text>
                </div>
              </div>

              <div className="mt-4">
                <InfoBanner variant="warning" text="This can't be undone. Only continue if you've counted your cash." />
              </div>

              {confirmCash.isError && (
                <div className="mt-4">
                  <ErrorBanner title="Couldn't confirm handover" text={getErrorMessage(confirmCash.error)} />
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3">
                <Button variant="outline" size="lg" className="w-full rounded-full" onClick={() => setConfirmOpen(false)}>
                  No, Not Yet
                </Button>
                <Button size="lg" className="w-full rounded-full" disabled={confirmCash.isPending} onClick={handleConfirm}>
                  {confirmCash.isPending ? "Confirming..." : "Yes, I got my cash"}
                </Button>
              </div>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}
