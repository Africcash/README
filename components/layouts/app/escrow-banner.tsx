import Link from "next/link"
import { Lock } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"
import type { Exchange } from "@/lib/api/types"

function timeRemaining(timeoutTimestamp?: number) {
  if (!timeoutTimestamp) return null
  const ms = timeoutTimestamp * 1000 - Date.now()
  if (ms <= 0) return "Expired"
  const minutes = Math.ceil(ms / 60000)
  return `${minutes}m left`
}

function EscrowBanner({ exchange }: { exchange?: Exchange | null }) {
  if (!exchange) {
    return (
      <div
        style={{ backgroundColor: AppColors.lightGrey }}
        className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
      >
        <Text size="sm" muted>
          No active escrow right now
        </Text>
        <Link href="/app/agents">
          <Text size="sm" weight="medium" style={{ color: AppColors.primaryPurple }}>
            Find an Agent
          </Text>
        </Link>
      </div>
    )
  }

  const remaining = timeRemaining(exchange.timeout_timestamp)

  return (
    <Link
      href={`/app/exchanges/escrow?id=${exchange.id}`}
      style={{ backgroundColor: AppColors.lightPink }}
      className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
          <Lock className="size-4 text-amber-600" />
        </div>
        <div>
          <Text size="sm" weight="medium">
            1 Active Smart Escrow
          </Text>
          <Text size="sm" muted>
            Waiting for cash receipt at {exchange.agent_name} (#{exchange.exchange_id})
          </Text>
        </div>
      </div>

      {remaining && (
        <Text size="sm" weight="medium" className="shrink-0 text-amber-600">
          {remaining}
        </Text>
      )}
    </Link>
  )
}

export { EscrowBanner }
