import Image from "next/image"
import Link from "next/link"
import { Appimages } from "@/components/reuseables/app_images"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

function Hero() {
  return (
    <section className="flex flex-col items-center px-6 pt-32 text-center">
      <Text
        as="h1"
        weight="semibold"
        className="max-w-3xl text-4xl leading-tight tracking-tight text-foreground md:text-5xl"
      >
        Turn USDC into Local cash, with Nearby Agents.
      </Text>

      <Button size="lg" className="mt-8 rounded-full" render={<Link href="/app/home">Get Started</Link>} />

      <div className="-mx-6 mt-16 overflow-hidden rounded-3xl shadow-2xl md:mx-auto md:w-full md:max-w-5xl">
        <Image
          src={Appimages.heroImageMobile}
          alt="Africcash dashboard"
          width={848}
          height={1043}
          className="h-auto w-full md:hidden ml-12"
          priority
        />
        <Image
          src={Appimages.heroImage}
          alt="Africcash dashboard"
          width={3184}
          height={1427}
          className="hidden h-auto w-full md:block md:h-[550px]"
          priority
        />
      </div>
    </section>
  )
}

export { Hero }
