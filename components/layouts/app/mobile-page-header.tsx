"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, User } from "lucide-react"
import { Text } from "@/components/ui/text"
import { useAuthMe } from "@/lib/api/hooks/use-auth"

function MobilePageHeader({ title }: { title: string }) {
  const router = useRouter()
  const me = useAuthMe()

  return (
    <div className="flex items-center justify-between md:hidden">
      <button type="button" onClick={() => router.back()} className="flex items-center gap-2">
        <ChevronLeft className="size-5 text-muted-foreground" />
        <Text size="sm" weight="medium">
          {title}
        </Text>
      </button>

      <Link href="/app/profile" className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-zinc-200">
        {me.data?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={me.data.avatar_url} alt={me.data.display_name ?? "Profile"} className="size-full object-cover" />
        ) : (
          <User className="size-5 text-zinc-500" />
        )}
      </Link>
    </div>
  )
}

export { MobilePageHeader }
