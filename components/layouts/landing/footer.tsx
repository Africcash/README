import Image from "next/image"
import Link from "next/link"
import { Appimages } from "@/components/reuseables/app_images"
import { Text } from "@/components/ui/text"

const columns = [
  {
    links: [
      { label: "Connect Wallet", href: "/connect-wallet" },
      { label: "Enable USDC", href: "/enable-usdc" },
      { label: "Find an Agent", href: "/agents" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "About AfricCash", href: "/about" },
    ],
  },
  {
    links: [
      { label: "Sitemap", href: "/sitemap" },
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Terms", href: "/terms" },
      { label: "Wallet Setup Details", href: "/wallet-setup" },
    ],
  },
  {
    links: [
      { label: "Wallet", href: "/wallet" },
      { label: "Agents", href: "/agents" },
      { label: "USDC", href: "/usdc" },
      { label: "Exchange", href: "/exchange" },
      { label: "Escrow", href: "/escrow" },
      { label: "Agent Kiosks", href: "/agent-kiosks" },
    ],
  },
  {
    links: [
      { label: "Facebook", href: "https://facebook.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Twitter (X)", href: "https://x.com" },
      { label: "Threads", href: "https://threads.net" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
]

function Footer() {
  return (
    <footer className="overflow-hidden border-t border-border ">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4  px-6 pt-16 md:px-12">
        {columns.map((column, i) => (
          <ul key={i} className="flex flex-col gap-3">
            {column.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>
                  <Text size="sm" muted>
                    {link.label}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="-mx-6 mt-16 select-none md:-mx-12">
        <div className="mx-auto max-w-[1600px]">
          <Image
            src={Appimages.africashFooter}
            alt="AfricCash"
            width={1728}
            height={311}
            className="h-auto w-full"
          />
        </div>
      </div>
    </footer>
  )
}

export { Footer }
