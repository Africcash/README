import { Star } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Appimages } from "@/components/reuseables/app_images"
import { AvatarComp } from "@/components/layouts/app/avatar-comp"
import { Text } from "@/components/ui/text"
import { truncateAddress } from "@/lib/format"

type ReviewCardProps = {
  userAddress: string
  rating: number
  comment?: string
}

function ReviewCard({ userAddress, rating, comment }: ReviewCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-100 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AvatarComp src={Appimages.agentAvatarPlaceholder} alt={userAddress} size="small" />
          <Text size="sm" weight="medium">
            {truncateAddress(userAddress)}
          </Text>
        </div>

        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-3.5" fill={AppColors.darkGreen} style={{ color: AppColors.darkGreen }} />
          ))}
        </div>
      </div>

      {comment && (
        <Text size="sm" muted className="mt-3">
          {comment}
        </Text>
      )}
    </div>
  )
}

export { ReviewCard }
