import { Text } from "@/components/ui/text"

type FeeRowProps = {
  label: string
  value: string
}

function FeeRow({ label, value }: FeeRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <Text size="sm" muted>
        {label}
      </Text>
      <Text size="sm" muted>
        {value}
      </Text>
    </div>
  )
}

export { FeeRow }
