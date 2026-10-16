import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Appimages } from "@/components/reuseables/app_images"
import { Text } from "@/components/ui/text"

function WalletSetupBanner() {
  return (
    <section className="px-6 py-10 md:px-12  overflow-hidden ">
      <div
        style={{ backgroundColor: AppColors.primaryPurple }}
        className="flex flex-col items-start gap-6 relative rounded-3xl overflow-hidden p-6 md:hidden h-[506px]"
      >
        <Text as="h2" size="2xl" weight="bold" className="text-white">
          Wallet Setup Guide
        </Text>
        <Link
          href="/app/home"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
        >
          Get Started
          <ArrowUpRight className="size-4" />
        </Link>

        <div className="w-full absolute -right-10 -bottom-10 overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src={Appimages.walletSetupGuideMobile}
            alt="Wallet setup escrow details"
            width={761}
            height={662}
            className="h-[115%] w-[115%] max-w-none"
          />
        </div>
      </div>

      <div
        style={{ backgroundColor: AppColors.primaryPurple }}
        className="relative hidden items-center justify-end gap-6 overflow-hidden rounded-3xl px-8 py-10 md:flex md:pl-[340px] md:pr-12"
      >
        <div className="absolute inset-y-0 left-24 -ml-8 hidden w-[380px] md:block">
          <Image
            src={Appimages.activeExchangeBanner}
            alt="Active exchange in escrow"
            fill
            sizes="380px"
            className=" object-contain object-left drop-shadow-xl"
          />
        </div>

        <div className="flex items-center gap-6">
          <Text as="h2" size="2xl" weight="bold" className="text-white">
            Wallet Setup Guide
          </Text>
          <Link
            href="/app/home"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground"
          >
            Get Started
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export { WalletSetupBanner }
