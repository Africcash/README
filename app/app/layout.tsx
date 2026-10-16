import type { Metadata } from "next"
import { Suspense } from "react"
import { AuthGate } from "@/components/layouts/app/auth-gate"
import { Sidebar } from "@/components/layouts/app/sidebar"
import { Topbar } from "@/components/layouts/app/topbar"

// Wallet-gated and user-specific — nothing here is useful for search engines.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex min-h-screen flex-col">
        <Topbar />
        <div className="flex flex-1 md:pt-16">
          <Suspense fallback={<div className="hidden h-[calc(100vh-4rem)] w-56 shrink-0 border-r border-border bg-white md:block" />}>
            <Sidebar />
          </Suspense>
          <main className="flex-1 bg-zinc-50 p-6">{children}</main>
        </div>
      </div>
    </AuthGate>
  )
}
