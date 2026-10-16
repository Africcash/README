"use client"

import { useEffect, useSyncExternalStore } from "react"
import Image from "next/image"
import { Loader2, Wallet } from "lucide-react"
import { Appimages } from "@/components/reuseables/app_images"
import { AppColors } from "@/components/reuseables/app_colors"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useAuthMe, useWalletSignIn } from "@/lib/api/hooks/use-auth"
import { getAuthToken, setAuthToken, subscribeAuthToken } from "@/lib/api/client"
import { getErrorMessage } from "@/lib/api/error"
import { useSupportedWallets } from "@/lib/wallet/use-supported-wallets"

function ConnectWalletScreen() {
  const signIn = useWalletSignIn()
  const wallets = useSupportedWallets()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-zinc-50 px-6 text-center">
      <Image src={Appimages.africcash} alt="Africcash" width={140} height={26} />

      <div
        className="flex size-14 items-center justify-center rounded-full"
        style={{ backgroundColor: AppColors.azureBlue }}
      >
        <Wallet className="size-6" style={{ color: AppColors.primaryPurple }} />
      </div>

      <div>
        <Text size="lg" weight="semibold">
          Connect your Stellar wallet
        </Text>
        <Text size="sm" muted className="mt-1 max-w-xs">
          Sign in with your Stellar wallet to view agents, exchanges, and your profile.
        </Text>
      </div>

      {signIn.isError && (
        <div className="w-full max-w-xs">
          <ErrorBanner title="Couldn't connect" text={getErrorMessage(signIn.error)} />
        </div>
      )}

      {wallets.isLoading ? (
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      ) : wallets.isError ? (
        <div className="w-full max-w-xs">
          <ErrorBanner title="Couldn't load wallets" text={getErrorMessage(wallets.error)} />
        </div>
      ) : (
        <div className="flex w-full max-w-xs flex-col gap-2">
          {wallets.data?.map((wallet) => {
            const isConnecting = signIn.isPending && signIn.variables === wallet.id
            return (
              <Button
                key={wallet.id}
                size="lg"
                variant={wallet.isAvailable ? "default" : "outline"}
                className="w-full justify-start rounded-full"
                disabled={signIn.isPending}
                onClick={() =>
                  wallet.isAvailable ? signIn.mutate(wallet.id) : window.open(wallet.url, "_blank", "noopener")
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={wallet.icon} alt="" className="size-5 shrink-0 rounded-sm" />
                <span className="flex-1 text-left">
                  {isConnecting ? "Connecting..." : wallet.isAvailable ? wallet.name : `Install ${wallet.name}`}
                </span>
                {isConnecting && <Loader2 className="size-4 shrink-0 animate-spin" />}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

const emptySubscribe = () => () => {}

function AuthGate({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const token = useSyncExternalStore(subscribeAuthToken, () => getAuthToken(), () => null)
  const hasToken = mounted && Boolean(token)
  const me = useAuthMe(hasToken)

  useEffect(() => {
    if (me.isError) {
      setAuthToken(null)
    }
  }, [me.isError])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!hasToken) return <ConnectWalletScreen />

  if (me.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (me.isError) return <ConnectWalletScreen />

  return <>{children}</>
}

export { AuthGate }
