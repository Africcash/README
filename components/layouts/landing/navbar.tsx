import Image from "next/image"
import Link from "next/link"
import { AppColors } from "@/components/reuseables/app_colors"
import { Appimages } from "@/components/reuseables/app_images"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
]

function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between bg-transparent px-6 py-4 md:px-12">
      <Link href="/" aria-label="Africcash home">
        <Image src={Appimages.africcash} alt="Africcash" width={137} height={25} priority />
      </Link>

      <div
        className="hidden items-center gap-6 rounded-full px-6 py-2.5 md:flex"
        style={{ backgroundColor: AppColors.primaryPurple }}
      >
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Text as="span" size="sm" weight="medium" className="text-white/90 hover:text-white">
              {link.label}
            </Text>
          </Link>
        ))}
      </div>

      <Button size="default" className="rounded-full" render={<Link href="/app/home">Login</Link>} />
    </nav>
  )
}

export { Navbar }
