"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Copy } from "lucide-react"
import { Switch } from "@base-ui/react/switch"
import { AvatarComp } from "@/components/layouts/app/avatar-comp"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { SettingsRow } from "@/components/layouts/app/settings-row"
import { AppColors } from "@/components/reuseables/app_colors"
import { Appimages } from "@/components/reuseables/app_images"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useAuthMe, useLogout } from "@/lib/api/hooks/use-auth"
import { useStellarBalances } from "@/lib/api/hooks/use-stellar-balances"
import { truncateAddress } from "@/lib/format"

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(false)
  const me = useAuthMe()
  const balances = useStellarBalances()
  const logout = useLogout()

  if (me.isLoading) {
    return <LoadingState label="Loading profile..." />
  }

  if (me.isError || !me.data) {
    return <QueryErrorState error={me.error} onRetry={() => me.refetch()} title="Couldn't load your profile" />
  }

  const data = me.data

  function copyAddress() {
    navigator.clipboard?.writeText(data.stellar_address)
  }

  return (
    <div>
      <Text size="sm" muted className="md:hidden">
        Profile
      </Text>
      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Profile Settings</span>
      </Text>

      <div className="mt-8 grid grid-cols-1 gap-8 pb-24 md:grid-cols-2 md:pb-0">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <AvatarComp src={data.avatar_url || Appimages.agentAvatarPlaceholder} alt={data.display_name || "You"} size="large" />
            <Text weight="semibold" size="lg">
              {data.display_name || truncateAddress(data.stellar_address)}
            </Text>
            <Text size="sm" muted>
              {data.is_agent ? "Agent Account" : "Wallet Account"}
            </Text>
          </div>

          <div className="divide-y divide-border border-t border-border">
            <div className="flex items-center justify-between py-4">
              <Text size="sm" muted>
                Wallet Address
              </Text>
              <button type="button" onClick={copyAddress} className="flex items-center gap-1.5">
                <Text size="sm" weight="medium">
                  {truncateAddress(data.stellar_address)}
                </Text>
                <Copy className="size-3.5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <Text size="sm" muted>
                  USDC Balance
                </Text>
                {balances.isLoading ? (
                  <Text size="sm" muted>
                    Loading...
                  </Text>
                ) : (
                  <Text weight="semibold" style={{ color: AppColors.primaryPurple }}>
                    {balances.data?.usdc ?? "0.00"} USDC
                  </Text>
                )}
              </div>
              <div className="text-right">
                <Text size="sm" muted>
                  XLM Balance
                </Text>
                {balances.isLoading ? (
                  <Text size="sm" muted>
                    Loading...
                  </Text>
                ) : (
                  <Text weight="semibold">{balances.data?.xlm ?? "0.00"} XLM</Text>
                )}
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="hidden rounded-full md:inline-flex md:w-fit"
            render={<Link href="/app/profile/edit">Edit Profile</Link>}
          />
        </div>

        <div className="divide-y divide-border md:border-t md:border-border">
          <SettingsRow label="Notification Preferences" description="Push alerts for transaction updates">
            <Switch.Root
              checked={notifications}
              onCheckedChange={setNotifications}
              className="relative flex h-5 w-9 items-center rounded-full bg-zinc-200 p-0.5 data-[checked]:bg-[#7657FF]"
            >
              <Switch.Thumb className="size-4 rounded-full bg-white transition-transform data-[checked]:translate-x-4" />
            </Switch.Root>
          </SettingsRow>

          <SettingsRow label="Default Currency" description="Preferred local currency">
            <div className="flex items-center gap-1">
              <Text size="sm" muted>
                NGN (₦)
              </Text>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </div>
          </SettingsRow>

          <SettingsRow label="Language">
            <div className="flex items-center gap-1">
              <Text size="sm" muted>
                English
              </Text>
              <ChevronRight className="size-3.5 text-muted-foreground" />
            </div>
          </SettingsRow>

          <SettingsRow label="Security &amp; Privacy">
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </SettingsRow>

          <SettingsRow label="Help &amp; Support">
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </SettingsRow>

          <SettingsRow label="Disconnect Wallet">
            <Button variant="outline" size="sm" className="rounded-full" onClick={logout}>
              Log Out
            </Button>
          </SettingsRow>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-white p-4 md:hidden">
        <Button
          size="lg"
          className="w-full rounded-full"
          render={<Link href="/app/profile/edit">Edit Profile</Link>}
        />
      </div>
    </div>
  )
}
