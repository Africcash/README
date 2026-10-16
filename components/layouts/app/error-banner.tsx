import { AlertTriangle } from "lucide-react"
import { Text } from "@/components/ui/text"

type ErrorBannerProps = {
  title: string
  text: string
}

function ErrorBanner({ title, text }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3">
      <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-red-500">
        <AlertTriangle className="size-2.5 text-white" fill="currentColor" />
      </div>
      <div>
        <Text size="sm" weight="medium" className="text-red-600">
          {title}
        </Text>
        <Text size="sm" className="text-red-500/80">
          {text}
        </Text>
      </div>
    </div>
  )
}

export { ErrorBanner }
