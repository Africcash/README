import { ArrowLeftRight } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"

type ActivityRowProps = {
  name: string
  subtitle: string
  usdcAmount: string
  ngnAmount: string
  accent: "green" | "orange"
}

function ActivityRow({ name, subtitle, usdcAmount, ngnAmount, accent }: ActivityRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: accent === "green" ? AppColors.lightGreen : AppColors.lightPink }}
        >
          <ArrowLeftRight className="size-4 text-zinc-700" />
        </div>
        <div>
          <Text size="sm" weight="medium">
            {name}
          </Text>
          <Text size="sm" muted>
            {subtitle}
          </Text>
        </div>
      </div>

      <div className="text-right">
        <Text size="sm" weight="medium">
          {usdcAmount}
        </Text>
        <Text size="sm" style={{ color: AppColors.darkGreen }}>
          {ngnAmount}
        </Text>
      </div>
    </div>
  )
}

export { ActivityRow }
