"use client"

import { CreditCard, Timer } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"
import AgentProfileDetailsBanner from "@/components/layouts/app/agent-profile-details-banner"
import { InfoSplitCard } from "@/components/layouts/app/info-split-card"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { ReviewCard } from "@/components/layouts/app/review-card"
import { StatIconCard } from "@/components/layouts/app/stat-icon-card"
import { AppColors } from "@/components/reuseables/app_colors"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useAgent, useAgentReviews } from "@/lib/api/hooks/use-agents"

export default function AgentPage() {
    const params = useParams<{ id: string }>()
    const id = Number(params.id)

    const agent = useAgent(id, Number.isFinite(id))
    const reviews = useAgentReviews(id)

    if (agent.isLoading) {
        return <LoadingState label="Loading agent profile..." />
    }

    if (agent.isError || !agent.data) {
        return <QueryErrorState error={agent.error} onRetry={() => agent.refetch()} title="Couldn't load this agent" />
    }

    const data = agent.data

    return (
        <div>
            {/* Mobile layout */}
            <div className="flex flex-col gap-4 pb-24 md:hidden">
                <MobilePageHeader title="Agent Profile" />

                <AgentProfileDetailsBanner agent={data} />

                <Text weight="semibold">Recent Info</Text>
                <InfoSplitCard
                    leftLabel="Settlement Fee"
                    leftValue={data.fee_percentage ? `${data.fee_percentage}%` : "\u2014"}
                    rightLabel="Operating Hours"
                    rightValue={data.operating_hours || "\u2014"}
                />

                <div className="flex items-center justify-between">
                    <Text weight="semibold">Recent Reviews</Text>
                </div>
                {reviews.isLoading ? (
                    <LoadingState label="Loading reviews..." />
                ) : reviews.isError ? (
                    <QueryErrorState error={reviews.error} onRetry={() => reviews.refetch()} />
                ) : reviews.data && reviews.data.length > 0 ? (
                    reviews.data.map((review) => (
                        <ReviewCard key={review.id} userAddress={review.user_address} rating={review.rating} comment={review.comment} />
                    ))
                ) : (
                    <Text size="sm" muted>
                        No reviews yet.
                    </Text>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <StatIconCard
                        icon={CreditCard}
                        iconColor={AppColors.primaryPurple}
                        iconBg={AppColors.azureBlue}
                        label="Completed Trades"
                        value={String(data.completed_trades)}
                        subtitle={data.is_verified ? "Verified agent" : "Unverified"}
                    />
                    <StatIconCard
                        icon={Timer}
                        iconColor={AppColors.darkGreen}
                        iconBg={AppColors.lightGreen}
                        label="Reputation Score"
                        value={`${data.reputation_score}/5`}
                        subtitle={`${data.review_count} reviews`}
                    />
                </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 border-t border-border bg-white p-4 md:hidden">
                <Button
                    size="lg"
                    className="w-full rounded-full"
                    render={<Link href={`/app/exchanges/new?agent=${data.id}`}>Proceed with Agent</Link>}
                />
            </div>

            {/* Desktop layout */}
            <div className="hidden md:block">
            <AgentProfileDetailsBanner agent={data} />

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <Text weight="semibold">Recent Info</Text>

                    <InfoSplitCard
                        leftLabel="Settlement Fee"
                        leftValue={data.fee_percentage ? `${data.fee_percentage}%` : "\u2014"}
                        rightLabel="Operating Hours"
                        rightValue={data.operating_hours || "\u2014"}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <StatIconCard
                            icon={CreditCard}
                            iconColor={AppColors.primaryPurple}
                            iconBg={AppColors.azureBlue}
                            label="Completed Trades"
                            value={String(data.completed_trades)}
                            subtitle={data.is_verified ? "Verified agent" : "Unverified"}
                        />
                        <StatIconCard
                            icon={Timer}
                            iconColor={AppColors.darkGreen}
                            iconBg={AppColors.lightGreen}
                            label="Reputation Score"
                            value={`${data.reputation_score}/5`}
                            subtitle={`${data.review_count} reviews`}
                        />
                    </div>

                    <Button
                        size="lg"
                        className="w-fit rounded-full"
                        render={<Link href={`/app/exchanges/new?agent=${data.id}`}>Proceed with Agent</Link>}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <Text weight="semibold">Recent Reviews</Text>

                    {reviews.isLoading ? (
                        <LoadingState label="Loading reviews..." />
                    ) : reviews.isError ? (
                        <QueryErrorState error={reviews.error} onRetry={() => reviews.refetch()} />
                    ) : reviews.data && reviews.data.length > 0 ? (
                        reviews.data.map((review) => (
                            <ReviewCard key={review.id} userAddress={review.user_address} rating={review.rating} comment={review.comment} />
                        ))
                    ) : (
                        <Text size="sm" muted>
                            No reviews yet.
                        </Text>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
}
