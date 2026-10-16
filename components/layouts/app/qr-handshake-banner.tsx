import { ArrowRight, QrCode } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"

function QrHandshakeBanner() {
  return (
    <button
      type="button"
      style={{ backgroundColor: AppColors.primaryPurple }}
      className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
        <QrCode className="size-5 text-white" />
      </div>

      <div className="flex-1">
        <Text weight="semibold" className="text-white">
          Scan Customer Handshake QR
        </Text>
        <Text size="sm" className="text-white/70">
          Instant release for OTC Cash pickups
        </Text>
      </div>

      <ArrowRight className="size-5 shrink-0 text-white" />
    </button>
  )
}

export { QrHandshakeBanner }
