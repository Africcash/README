import { Info } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"

const variants = {
  info: { bg: AppColors.azureBlue, fg: "#7657FF" },
  success: { bg: AppColors.lightGreen, fg: "#4D7A0F" },
  warning: { bg: AppColors.lightPink, fg: "#B45309" },
}

type InfoBannerProps = {
  text: string
  variant?: keyof typeof variants
}

function InfoBanner({ text, variant = "info" }: InfoBannerProps) {
  const { bg, fg } = variants[variant]

  return (
    <div style={{ backgroundColor: bg }} className="flex items-start gap-2 rounded-xl px-4 py-3">
      <Info className="mt-0.5 size-4 shrink-0" style={{ color: fg }} />
      <Text size="sm" style={{ color: fg }}>
        {text}
      </Text>
    </div>
  )
}

export { InfoBanner }
