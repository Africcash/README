import { Lock } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"

type LockAmountDisplayProps = {
  amount: string
  subtitle: string
}

function LockAmountDisplay({ amount, subtitle }: LockAmountDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-zinc-200">
        <Lock className="size-4 text-zinc-500" />
      </div>
      <Text size="sm" muted>
        Amount to Receive
      </Text>
      <Text size="3xl" weight="bold" style={{ color: AppColors.darkGreen }}>
        {amount}
      </Text>
      <Text size="sm" muted>
        {subtitle}
      </Text>
    </div>
  )
}

export { LockAmountDisplay }
