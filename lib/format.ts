/** Formats an ISO date string as a short relative time, e.g. "3d ago", "5m ago". */
export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ""

  const diffMs = Date.now() - date.getTime()
  const diffSec = Math.round(diffMs / 1000)

  if (diffSec < 60) return "Just now"
  const diffMin = Math.round(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHour = Math.round(diffMin / 60)
  if (diffHour < 24) return `${diffHour}h ago`
  const diffDay = Math.round(diffHour / 24)
  if (diffDay < 7) return `${diffDay}d ago`
  const diffWeek = Math.round(diffDay / 7)
  if (diffWeek < 5) return `${diffWeek}w ago`
  const diffMonth = Math.round(diffDay / 30)
  return `${diffMonth}mo ago`
}

/** Shortens a Stellar address like "GCJ7...3F9A" for display. */
export function truncateAddress(address: string, size = 4): string {
  if (!address || address.length <= size * 2 + 3) return address
  return `${address.slice(0, size)}...${address.slice(-size)}`
}
