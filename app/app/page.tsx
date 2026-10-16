import { redirect } from "next/navigation"

export const instant = false

export default function AppPage() {
  redirect("/app/home")
}
