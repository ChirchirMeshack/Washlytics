import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "SMS Templates | Sparkle",
  description: "Create and manage your SMS message templates",
}

export default function TemplatesPage() {
  return <ClientPage />
}

