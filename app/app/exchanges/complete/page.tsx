"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Star } from "lucide-react"
import { DetailRow } from "@/components/layouts/app/detail-row"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { AppColors } from "@/components/reuseables/app_colors"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { getErrorMessage } from "@/lib/api/error"
import { useExchange, useReviewExchange } from "@/lib/api/hooks/use-exchanges"

export default function ExchangeCompletePage() {
  const searchParams = useSearchParams()
  const id = Number(searchParams.get("id"))

  const exchange = useExchange(id, Number.isFinite(id))
  const reviewExchange = useReviewExchange(id)

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  if (!Number.isFinite(id)) {
    return <ErrorBanner title="No exchange selected" text="Start a new exchange from an agent's profile." />
  }

  if (exchange.isLoading) {
    return <LoadingState label="Loading exchange..." />
  }

  if (exchange.isError || !exchange.data) {
    return <QueryErrorState error={exchange.error} onRetry={() => exchange.refetch()} title="Couldn't load this exchange" />
  }

  const data = exchange.data

  function handleSubmitReview() {
    reviewExchange.mutate({ rating, comment: comment || undefined })
  }

  return (
    <div>
      <MobilePageHeader title="Exchange Complete" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Exchange Complete</span>
      </Text>

      <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full" style={{ backgroundColor: AppColors.lightGreen }}>
          <CheckCircle2 className="size-5" style={{ color: AppColors.darkGreen }} />
        </div>
        <Text size="lg" weight="semibold">
          Exchange Complete
        </Text>
        <Text size="sm" muted>
          You received your cash from {data.agent_name}. {data.usdc_amount} USDC has been
          released from escrow.
        </Text>

        <div className="w-full rounded-2xl bg-zinc-100 p-5 text-left">
          <div className="divide-y divide-border">
            <DetailRow label="Amount Released" value={`${data.usdc_amount} USDC`} valueColor={AppColors.darkGreen} />
            <DetailRow label="Cash Received" value={`${data.fiat_amount} ${data.fiat_currency}`} />
            <DetailRow label="Agent" value={data.agent_name} />
            <DetailRow label="Exchange ID" value={`#${data.exchange_id}`} />
          </div>
        </div>

        <div className="w-full rounded-2xl bg-zinc-100 p-5 text-left">
          <Text weight="semibold">Rate your experience</Text>

          {data.review || reviewExchange.isSuccess ? (
            <Text size="sm" muted className="mt-3">
              Thanks for your feedback!
            </Text>
          ) : (
            <>
              <div className="mt-3 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button key={value} type="button" onClick={() => setRating(value)} className="p-0.5">
                    <Star
                      className="size-6"
                      style={{
                        color: value <= rating ? "#F5A623" : AppColors.lightGrey,
                        fill: value <= rating ? "#F5A623" : "transparent",
                      }}
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment (optional)"
                rows={3}
                className="mt-3 w-full resize-none rounded-xl border border-border bg-white p-3 text-sm outline-none"
              />

              {reviewExchange.isError && (
                <div className="mt-3">
                  <ErrorBanner title="Couldn't submit review" text={getErrorMessage(reviewExchange.error)} />
                </div>
              )}

              <Button
                size="default"
                className="mt-3 w-full rounded-full"
                disabled={reviewExchange.isPending}
                onClick={handleSubmitReview}
              >
                {reviewExchange.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </>
          )}
        </div>

        <Button size="lg" className="w-full rounded-full" render={<Link href="/app/home">Done</Link>} />
      </div>
    </div>
  )
}
