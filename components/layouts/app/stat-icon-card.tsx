import type { LucideIcon } from "lucide-react"
import { Text } from "@/components/ui/text"

type StatIconCardProps = {
  icon: LucideIcon
  iconColor: string
  iconBg: string
  label: string
  value: string
  subtitle: string
}

function StatIconCard({ icon: Icon, iconColor, iconBg, label, value, subtitle }: StatIconCardProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-zinc-100 p-5">
      <div className="flex size-8 items-center justify-center rounded-full" style={{ backgroundColor: iconBg }}>
        <Icon className="size-4" style={{ color: iconColor }} />
      </div>
      <div>
        <Text size="sm" muted>
          {label}
        </Text>
        <Text size="xl" weight="semibold">
          {value}
        </Text>
        <Text size="sm" muted>
          {subtitle}
        </Text>
      </div>
    </div>
  )
}

export { StatIconCard }
