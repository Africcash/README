import { BadgeCheck, User } from "lucide-react"
import { Text } from "@/components/ui/text"

type AgentRowProps = {
  name: string
  verified?: boolean
  location: string
  completedTrades: number
  feePercentage?: string
}

function AgentRow({ name, verified, location, completedTrades, feePercentage }: AgentRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-200">
          <User className="size-5 text-zinc-500" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Text size="sm" weight="medium">
              {name}
            </Text>
            {verified && <BadgeCheck className="size-3.5 text-[#7657FF]" />}
          </div>
          <Text size="sm" muted>
            {location} &bull; {completedTrades} trades
          </Text>
        </div>
      </div>

      <div className="text-right">
        <Text size="sm" weight="semibold">
          {feePercentage ? `${feePercentage}%` : "\u2014"}
        </Text>
        <Text size="sm" muted>
          fee
        </Text>
      </div>
    </div>
  )
}

export { AgentRow }
