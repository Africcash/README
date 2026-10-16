import { Text } from "@/components/ui/text"

type AmountCardProps = {
  label: string
  rightInfo: string
  value: string
  unit: string
  editable?: boolean
  showMax?: boolean
  onChange?: (value: string) => void
}

function AmountCard({ label, rightInfo, value, unit, editable, showMax, onChange }: AmountCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-100 p-5">
      <div className="flex items-center justify-between">
        <Text size="sm" muted>
          {label}
        </Text>
        <Text size="sm" muted>
          {rightInfo}
        </Text>
      </div>

      <div className="mt-2 flex items-center justify-between">
        {editable ? (
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-transparent text-3xl font-semibold outline-none"
          />
        ) : (
          <Text size="3xl" weight="semibold">
            {value}
          </Text>
        )}

        <div className="flex shrink-0 items-center gap-2">
          <Text weight="semibold">{unit}</Text>
          {showMax && (
            <span className="rounded-full bg-[#7657FF]/10 px-2 py-0.5">
              <Text size="xs" weight="medium" className="text-[#7657FF]">
                MAX
              </Text>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export { AmountCard }
