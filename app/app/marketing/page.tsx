import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "SMS Dashboard | Sparkle",
  description: "Manage your SMS campaigns, templates, and analytics",
}

export default function SMSPage() {
  redirect("/app/sms/campaigns")
}

