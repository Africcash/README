import { Text } from "@/components/ui/text"

type DetailRowProps = {
  label: string
  value: string
  valueColor?: string
}

function DetailRow({ label, value, valueColor }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <Text size="sm" muted>
        {label}
      </Text>
      <Text size="sm" weight="medium" style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </Text>
    </div>
  )
}

export { DetailRow }
