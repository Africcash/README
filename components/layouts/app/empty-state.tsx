import { Text } from "@/components/ui/text"

function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-12 text-center">
      <Text weight="medium">{title}</Text>
      {description && (
        <Text size="sm" muted>
          {description}
        </Text>
      )}
    </div>
  )
}

export { EmptyState }
