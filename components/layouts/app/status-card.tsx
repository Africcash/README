import { DetailRow } from "@/components/layouts/app/detail-row"
import { Text } from "@/components/ui/text"

type StatusCardProps = {
  title: string
  description: string
  rows: { label: string; value: string }[]
}

function StatusCard({ title, description, rows }: StatusCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-100 p-6">
      <Text weight="semibold">{title}</Text>
      <Text size="sm" muted className="mt-1">
        {description}
      </Text>

      <div className="mt-4 divide-y divide-border">
        {rows.map((row) => (
          <DetailRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </div>
  )
}

export { StatusCard }
