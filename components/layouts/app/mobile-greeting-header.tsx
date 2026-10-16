"use client"

import Link from "next/link"
import { Bell, User } from "lucide-react"
import { Text } from "@/components/ui/text"
import { useAuthMe } from "@/lib/api/hooks/use-auth"

function MobileGreetingHeader() {
  const me = useAuthMe()
  const name = me.data?.display_name || "there"

  return (
    <div className="flex items-center justify-between md:hidden">
      <Text size="lg" weight="semibold">
        Hey {name}!
      </Text>
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-full bg-zinc-100">
          <Bell className="size-4 text-zinc-500" />
        </div>
        <Link href="/app/profile" className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-zinc-200">
          {me.data?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={me.data.avatar_url} alt={name} className="size-full object-cover" />
          ) : (
            <User className="size-5 text-zinc-500" />
          )}
        </Link>
      </div>
    </div>
  )
}

export { MobileGreetingHeader }
