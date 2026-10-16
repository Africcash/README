import Image from "next/image"
import { ChevronLeft, ChevronRight, User } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Appimages } from "@/components/reuseables/app_images"
import { Text } from "@/components/ui/text"

const screens = [
  { src: Appimages.fromNearby1, alt: "Find agents screen", width: 455, height: 547, offset: "" },
  { src: Appimages.fromNearby2, alt: "Escrow sign and lock screen", width: 450, height: 603, offset: "md:mt-10" },
  { src: Appimages.fromNearby3, alt: "Cash handover screen", width: 447, height: 542, offset: "" },
]

const reviews = [
  {
    quote:
      "I could see the agent's rate and location before I committed. It felt like using a POS I already trust.",
    name: "Tester One",
    handle: "@tester1",
  },
  {
    quote:
      "Seeing my USDC locked first, then confirming the cash, made the whole exchange feel safe.",
    name: "Tester Two",
    handle: "@tester2",
  },
]

function FromNearbyAgent() {
  return (
    <section className="px-6 py-20 md:px-12">
      <Text as="h2" size="4xl" weight="semibold" className="max-w-lg leading-tight tracking-tight">
        From nearby agent to verified handover.
      </Text>
      <Text size="sm" muted className="mt-2 max-w-sm">
        Real product states for agent discovery, escrow signing, and cash
        collection.
      </Text>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {screens.map((screen) => (
          <div
            key={screen.src}
            style={{ backgroundColor: AppColors.lightGreen }}
            className={`rounded-3xl p-2 ${screen.offset}`}
          >
            <Image
              src={screen.src}
              alt={screen.alt}
              width={screen.width}
              height={screen.height}
              className="h-auto w-full rounded-2xl"
            />
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <Text as="h3" size="2xl" weight="bold">
            Reviews
          </Text>
          <div className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-zinc-300"
              >
                <User className="size-4 text-zinc-600" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid flex-1 gap-4 sm:grid-cols-2 md:max-w-2xl">
          {reviews.map((review) => (
            <div
              key={review.handle}
              style={{ backgroundColor: AppColors.lightGrey }}
              className="flex flex-col justify-between gap-10 rounded-2xl p-6"
            >
              <Text size="sm">{review.quote}</Text>
              <div className="flex items-center gap-3">
                <div className="size-9 shrink-0 rounded-full bg-zinc-300" />
                <div>
                  <Text size="sm" weight="medium">
                    {review.name}
                  </Text>
                  <Text size="sm" muted>
                    {review.handle}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          aria-label="Previous review"
          style={{ backgroundColor: AppColors.primaryPurple }}
          className="flex size-9 items-center justify-center rounded-full text-white"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next review"
          style={{ backgroundColor: AppColors.primaryPurple }}
          className="flex size-9 items-center justify-center rounded-full text-white"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}

export { FromNearbyAgent }
