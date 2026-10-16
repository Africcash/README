"use client"

import Link from "next/link"
import { Wallet } from "lucide-react"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { WalletRow } from "@/components/layouts/app/wallet-row"
import { AppColors } from "@/components/reuseables/app_colors"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { getErrorMessage } from "@/lib/api/error"
import { useAuthMe, useWalletSignIn } from "@/lib/api/hooks/use-auth"
import { useStellarBalances } from "@/lib/api/hooks/use-stellar-balances"
import { truncateAddress } from "@/lib/format"
import { useSupportedWallets } from "@/lib/wallet/use-supported-wallets"

export default function WalletPage() {
  const me = useAuthMe()
  const balances = useStellarBalances()
  const wallets = useSupportedWallets()
  const signIn = useWalletSignIn()

  if (me.isLoading) {
    return <LoadingState label="Loading wallet..." />
  }

  if (me.isError || !me.data) {
    return <QueryErrorState error={me.error} onRetry={() => me.refetch()} title="Couldn't load your wallet" />
  }

  const data = me.data
  const connectedWalletId = signIn.variables

  return (
    <div>
      <MobilePageHeader title="Connect Wallet" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Connect Wallet</span>
      </Text>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          {!balances.data?.hasUsdc && !balances.isLoading && (
            <div
              style={{ backgroundColor: AppColors.lightPink }}
              className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
            >
              <div>
                <Text size="sm" weight="medium" className="text-amber-600">
                  USDC Required
                </Text>
                <Text size="sm" className="text-amber-600/80">
                  Enable USDC to continue.
                </Text>
              </div>
              <Button size="sm" className="shrink-0 rounded-full" render={<Link href="/app/wallet/enable-usdc">Enable</Link>} />
            </div>
          )}

          {signIn.isError && (
            <ErrorBanner title="Couldn't connect" text={getErrorMessage(signIn.error)} />
          )}

          <div className="rounded-2xl bg-zinc-100 p-5 md:bg-transparent md:p-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Text size="sm" muted>
                  Wallet Address
                </Text>
                <Text size="sm" weight="medium">
                  {truncateAddress(data.stellar_address)} (Freighter)
                </Text>
              </div>
              <div className="text-right">
                <Text size="sm" muted>
                  XLM Reserve
                </Text>
                {balances.isLoading ? (
                  <Text size="sm" muted>
                    Loading...
                  </Text>
                ) : (
                  <Text size="sm" weight="medium">
                    {balances.data?.xlm} XLM (Active)
                  </Text>
                )}
              </div>
            </div>

            <div className="mt-3">
              <Text size="sm" muted>
                USDC Balance
              </Text>
              {balances.isLoading ? (
                <Text size="sm" muted>
                  Loading...
                </Text>
              ) : balances.data?.hasUsdc ? (
                <Text weight="semibold" style={{ color: AppColors.primaryPurple }}>
                  {balances.data.usdc} USDC
                </Text>
              ) : (
                <Text size="sm" muted>
                  Not enabled
                </Text>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Text weight="semibold">Available Wallets</Text>

          {wallets.isLoading ? (
            <LoadingState label="Loading wallets..." />
          ) : wallets.isError ? (
            <QueryErrorState error={wallets.error} onRetry={() => wallets.refetch()} />
          ) : (
            <div className="divide-y divide-border rounded-2xl bg-white px-5 md:bg-transparent md:px-0">
              {wallets.data?.map((wallet) => (
                <WalletRow
                  key={wallet.id}
                  wallet={wallet}
                  isConnected={wallet.id === connectedWalletId}
                  onSelect={() => wallet.isAvailable && signIn.mutate(wallet.id)}
                />
              ))}
            </div>
          )}

          <Button
            size="lg"
            className="w-full rounded-full"
            disabled={signIn.isPending}
            onClick={() => {
              const next = wallets.data?.find((w) => w.isAvailable && w.id !== connectedWalletId)
              if (next) signIn.mutate(next.id)
            }}
          >
            {signIn.isPending ? (
              <span className="inline-flex items-center gap-2">
                <Wallet className="size-4" /> Connecting...
              </span>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
