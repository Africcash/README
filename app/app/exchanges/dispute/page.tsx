"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { InfoBanner } from "@/components/layouts/app/info-banner"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { getErrorMessage } from "@/lib/api/error"
import { useDisputeExchange } from "@/lib/api/hooks/use-exchanges"

const reasons = [
  "Agent did not show up",
  "Cash amount did not match",
  "Agent requested extra fees",
  "Other",
]

export default function ReportIssuePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = Number(searchParams.get("id"))

  const disputeExchange = useDisputeExchange(id)

  const [reason, setReason] = useState(reasons[0])
  const [details, setDetails] = useState("")

  if (!Number.isFinite(id)) {
    return <ErrorBanner title="No exchange selected" text="Open a dispute from an active exchange." />
  }

  function handleSubmit() {
    disputeExchange.mutate(
      { reason: details ? `${reason} \u2014 ${details}` : reason },
      { onSuccess: () => router.push(`/app/exchanges/disputed?id=${id}`) }
    )
  }

  return (
    <div>
      <MobilePageHeader title="Report an Issue" />

      <Text size="sm" muted className="hidden md:block">
        Home / <span className="text-foreground">Report an Issue</span>
      </Text>

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-4">
        <InfoBanner
          variant="warning"
          text="This will pause the escrow and notify our support team. Your funds remain locked until the dispute is resolved."
        />

        <div>
          <Text weight="semibold">What went wrong?</Text>
          <div className="mt-3 flex flex-col gap-2">
            {reasons.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setReason(item)}
                className="flex items-center justify-between rounded-xl border px-4 py-3 text-left"
                style={{ borderColor: reason === item ? "#7657FF" : "#EBEAEB" }}
              >
                <Text size="sm" weight={reason === item ? "medium" : "normal"}>
                  {item}
                </Text>
                <span
                  className="size-4 shrink-0 rounded-full border-2"
                  style={{
                    borderColor: reason === item ? "#7657FF" : "#D4D4D8",
                    backgroundColor: reason === item ? "#7657FF" : "transparent",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Text weight="semibold">Additional details</Text>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe what happened..."
            rows={4}
            className="mt-3 w-full resize-none rounded-xl border border-border p-3 text-sm outline-none"
          />
        </div>

        {disputeExchange.isError && (
          <ErrorBanner title="Couldn't submit report" text={getErrorMessage(disputeExchange.error)} />
        )}

        <Button size="lg" className="w-full rounded-full" disabled={disputeExchange.isPending} onClick={handleSubmit}>
          {disputeExchange.isPending ? "Submitting..." : "Submit Report"}
        </Button>
      </div>
    </div>
  )
}
