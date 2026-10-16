import { Text } from "@/components/ui/text"

type SettingsRowProps = {
  label: string
  description?: string
  children: React.ReactNode
}

function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <Text size="sm" weight="medium">
          {label}
        </Text>
        {description && (
          <Text size="xs" muted>
            {description}
          </Text>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export { SettingsRow }
