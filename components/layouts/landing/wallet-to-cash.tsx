import Image from "next/image"
import Link from "next/link"
import { ArrowRight, User } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Appimages } from "@/components/reuseables/app_images"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

function WalletToCash() {
  const collectCard = (
    <div
      style={{ gridArea: "collect", backgroundColor: AppColors.darkGreen }}
      className="relative h-[241px] md-h-[158px] flex flex-col gap-6 overflow-hidden rounded-2xl p-6"
    >
      <div className="hidden size-12 items-center justify-center rounded-2xl bg-white/15 md:flex">
        <Image src={Appimages.cashBag} alt="" width={22} height={24} />
      </div>
      <Image
        src={Appimages.cashBag}
        alt=""
        width={54}
        height={58}
        className="absolute md:-right-4 -right-18 -bottom-6 md:size-28 size-46 opacity-90 md:hidden"
      />
      <Text weight="semibold" size='2xl' className="text-white">
        Collect Local Cash
      </Text>
    </div>
  )

  const agentsCard = (
    <div
      style={{ gridArea: "agents", backgroundColor: AppColors.lightGrey }}
      className="flex flex-col justify-between gap-6 rounded-2xl p-6"
    >
      <div className="flex -space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-zinc-300"
          >
            <User className="size-4 text-zinc-600" />
          </div>
        ))}
      </div>
      <Text weight="medium">Agents Near You</Text>
    </div>
  )

  const lockedCard = (
    <div
      style={{ gridArea: "locked", backgroundColor: AppColors.lightGreen }}
      className="flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <Text weight="semibold" className="max-w-xs p-6 pb-0">
        Your USDC stays locked until you say the cash arrived.
      </Text>
      <Image
        src={Appimages.cashHandover}
        alt="Cash handover confirmation"
        width={335}
        height={204}
        className="mt-4 h-auto w-full md:hidden"
      />
      <div className="relative mt-4 hidden w-full flex-1 md:block">
        <Image
          src={Appimages.cashHandover}
          alt="Cash handover confirmation"
          fill
          sizes="34vw"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  )

  const noncustodialCard = (
    <div
      style={{ gridArea: "noncustodial", backgroundColor: AppColors.lightGrey }}
      className="flex md:h-full h-[380px] flex-col justify-between gap-2 rounded-2xl p-6"
    >
      <Text className="text-6xl">100%</Text>
      <div>
        <Text size="sm" weight="medium">
          Non-Custodial
        </Text>
        <Text size="sm" muted className="mt-2">
          Your wallet, your keys. AfricCash never holds your funds or your
          signing details.
        </Text>
      </div>
    </div>
  )

  const stepsCard = (
    <div
      style={{ gridArea: "steps", backgroundColor: AppColors.lightPink }}
      className="flex md:h-full h-[273px] flex-col justify-between gap-2 rounded-2xl p-6"
    >
      <Text className="text-6xl">50+</Text>
      <Text size="sm" muted>
        Find an agent, choose your amount, lock USDC, collect your cash, and
        confirm.
      </Text>
    </div>
  )

  const recentCard = (
    <div
      style={{ gridArea: "recent" }}
      className="flex h-full items-center overflow-hidden rounded-2xl bg-white shadow-sm"
    >
      <Image
        src={Appimages.recentActivities}
        alt="Recent activity"
        width={440}
        height={192}
        className="h-auto w-full object-cover"
      />
    </div>
  )

  const ctaCard = (
    <div
      style={{ gridArea: "cta", backgroundColor: AppColors.azureBlue }}
      className="flex md:h-fit h-[298px] flex-col justify-between gap-4 rounded-2xl p-6"
    >
      <Text size="sm">Turn USDC into local cash nearby. Pick an agent, lock USDC.</Text>
      <Link href="/app/agents" className="inline-flex items-center gap-1.5">
        <Text weight="semibold">Get Started</Text>
        <ArrowRight className="size-4" />
      </Link>
    </div>
  )

  return (
    <section className="px-6 py-20 md:px-12">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <Text as="h2" size="4xl" weight="semibold" className="max-w-md leading-tight tracking-tight">
          A Practical Path from Wallet to Cash
        </Text>

        <div className="flex max-w-sm flex-col items-start gap-4 md:items-end md:text-right">
          <Text size="sm" muted>
            Find a cash agent near you, lock your USDC in escrow, and release it
            only when the cash is in your hand.
          </Text>
          <Button size="default" className="rounded-full" render={<Link href="/app/home">Get Started</Link>} />
        </div>
      </div>

      {/* Mobile: simple stacked order. Desktop: bento grid via named areas below. */}
      <div className="mt-10 flex flex-col gap-4 md:hidden">
        {collectCard}
        {noncustodialCard}
        {agentsCard}
        {stepsCard}
        {lockedCard}
        {ctaCard}
        {/* {recentCard} */}
      </div>

      <div className="mt-10 hidden gap-4 md:grid md:grid-cols-3 md:auto-rows-[minmax(150px,auto)] md:[grid-template-areas:'collect_agents_locked'_'noncustodial_steps_locked'_'noncustodial_recent_cta']">
        {collectCard}
        {agentsCard}
        {lockedCard}
        {noncustodialCard}
        {stepsCard}
        {recentCard}
        {ctaCard}
      </div>
    </section>
  )
}

export { WalletToCash }
