import { ChevronRight } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"
import type { ISupportedWallet } from "@/lib/wallet/kit"

type WalletRowProps = {
  wallet: ISupportedWallet
  isConnected: boolean
  onSelect: () => void
}

function WalletRow({ wallet, isConnected, onSelect }: WalletRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isConnected}
      className="flex w-full items-center justify-between gap-3 py-3 text-left disabled:cursor-default"
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wallet.icon} alt="" className="size-8 shrink-0 rounded-md" />
        <Text size="sm" weight="medium">
          {wallet.name}
        </Text>
      </div>

      {isConnected ? (
        <span className="rounded-full px-2.5 py-1" style={{ backgroundColor: AppColors.azureBlue }}>
          <Text size="xs" weight="medium" style={{ color: AppColors.primaryPurple }}>
            Connected
          </Text>
        </span>
      ) : (
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  )
}

export { WalletRow }
