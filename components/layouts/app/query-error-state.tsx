import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { Button } from "@/components/ui/button"
import { getErrorMessage } from "@/lib/api/error"

type QueryErrorStateProps = {
  error: unknown
  onRetry?: () => void
  title?: string
}

function QueryErrorState({ error, onRetry, title = "Couldn't load this" }: QueryErrorStateProps) {
  return (
    <div className="flex flex-col gap-3 py-6">
      <ErrorBanner title={title} text={getErrorMessage(error)} />
      {onRetry && (
        <Button variant="outline" size="sm" className="w-fit rounded-full" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}

export { QueryErrorState }
