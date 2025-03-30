import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Payments & Reports",
  description: "Manage payments, invoices, and financial reports for your car wash business",
}

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex-1 space-y-4">{children}</div>
}

