import { Loader2 } from "lucide-react"
import { Text } from "@/components/ui/text"

function LoadingState({ label = "Loading...", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 py-12 ${className}`}>
      <Loader2 className="size-5 animate-spin text-muted-foreground" />
      <Text size="sm" muted>
        {label}
      </Text>
    </div>
  )
}

export { LoadingState }
