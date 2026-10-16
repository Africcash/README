"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeftRight, LayoutDashboard, Users, Wallet } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Appimages } from "@/components/reuseables/app_images"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import Image from "next/image"
import { cn } from "cn"

const navItems = [
  { label: "Dashboard", href: "/app/home", icon: LayoutDashboard },
  { label: "Agents", href: "/app/agents", icon: Users },
  { label: "Exchanges", href: "/app/exchanges", icon: ArrowLeftRight },
  { label: "Wallet", href: "/app/wallet", icon: Wallet },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col gap-1 border-r border-border bg-white px-3 py-6 md:flex">
      <Link href="/" className="mb-6 px-3">
        <Image src={Appimages.africcash} alt="Africcash" width={110} height={20} />
      </Link>

      {navItems.map((item) => {
        const active =
          pathname === item.href ||
          (item.href === "/app/home" && pathname === "/app") ||
          (item.href !== "/app/home" && pathname?.startsWith(`${item.href}/`))
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
              active ? "bg-[#7657FF]/10" : "text-muted-foreground hover:bg-muted"
            )}
          >
            {active && (
              <span
                className="absolute top-1/2 -left-3 h-5 w-1 -translate-y-1/2 rounded-r-full"
                style={{ backgroundColor: AppColors.primaryPurple }}
              />
            )}
            <item.icon
              className="size-5"
              style={{ color: active ? AppColors.primaryPurple : undefined }}
            />
            <Text
              size="sm"
              weight="medium"
              style={{ color: active ? AppColors.primaryPurple : undefined }}
            >
              {item.label}
            </Text>
          </Link>
        )
      })}

      <Button
        size="default"
        className="mt-auto w-full rounded-full"
        render={<Link href="/app/agents">Find Nearby Agent</Link>}
      />
    </aside>
  )
}

export { Sidebar }
