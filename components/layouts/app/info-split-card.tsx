import { Text } from "@/components/ui/text"

type InfoSplitCardProps = {
  leftLabel: string
  leftValue: string
  rightLabel: string
  rightValue: string
}

function InfoSplitCard({ leftLabel, leftValue, rightLabel, rightValue }: InfoSplitCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-zinc-100 px-6 py-5">
      <div>
        <Text size="sm" muted>
          {leftLabel}
        </Text>
        <Text weight="semibold" className="text-[#7657FF]">
          {leftValue}
        </Text>
      </div>
      <div className="text-right">
        <Text size="sm" muted>
          {rightLabel}
        </Text>
        <Text weight="semibold">{rightValue}</Text>
      </div>
    </div>
  )
}

export { InfoSplitCard }
