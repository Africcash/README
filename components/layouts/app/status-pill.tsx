import { Text } from "@/components/ui/text"

const statusStyles: Record<string, { label: string; bg: string; fg: string }> = {
  INITIATED: { label: "Initiated", bg: "#EBEAEB", fg: "#52525B" },
  FUNDED: { label: "Funded", bg: "#E6F3FF", fg: "#7657FF" },
  CASH_PENDING: { label: "Cash Pending", bg: "#FEF0E6", fg: "#B45309" },
  CASH_CONFIRMED: { label: "Cash Confirmed", bg: "#FEF0E6", fg: "#B45309" },
  RELEASED: { label: "Released", bg: "#F6FBEA", fg: "#4D7A0F" },
  CANCELLED: { label: "Cancelled", bg: "#EBEAEB", fg: "#52525B" },
  REFUNDED: { label: "Refunded", bg: "#EBEAEB", fg: "#52525B" },
  DISPUTED: { label: "Disputed", bg: "#FEE2E2", fg: "#DC2626" },
}

function StatusPill({ status }: { status: string }) {
  const style = statusStyles[status] ?? statusStyles.INITIATED

  return (
    <span className="rounded-full px-2.5 py-1" style={{ backgroundColor: style.bg }}>
      <Text size="xs" weight="medium" style={{ color: style.fg }}>
        {style.label}
      </Text>
    </span>
  )
}

export { StatusPill }
