import { cn } from "cn"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"

type FilterPillProps = {
  label: string
  active?: boolean
  onClick?: () => void
}

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={active ? { backgroundColor: AppColors.primaryPurple } : undefined}
      className={cn("shrink-0 rounded-full px-4 py-2 whitespace-nowrap", !active && "bg-zinc-100")}
    >
      <Text size="sm" weight="medium" className={active ? "text-white" : "text-muted-foreground"}>
        {label}
      </Text>
    </button>
  )
}

export { FilterPill }
