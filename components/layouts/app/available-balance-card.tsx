import { Loader2, Wallet } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"

type AvailableBalanceCardProps = {
  usdc?: string
  isLoading?: boolean
}

function AvailableBalanceCard({ usdc, isLoading }: AvailableBalanceCardProps) {
  return (
    <div style={{ backgroundColor: AppColors.primaryPurple }} className="flex flex-col gap-4 rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-white/15">
          <Wallet className="size-4 text-white" />
        </div>
        <Text size="sm" className="text-white/80">
          Available Balance
        </Text>
      </div>

      {isLoading ? (
        <Loader2 className="size-6 animate-spin text-white/70" />
      ) : (
        <div>
          <span className="text-4xl font-semibold text-white">{usdc ?? "0.00"}</span>{" "}
          <span className="text-lg font-medium text-white/80">USDC</span>
        </div>
      )}
    </div>
  )
}

export { AvailableBalanceCard }
