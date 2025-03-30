import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Staff Management",
  description: "Manage employees, schedules, and performance",
}

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
    </div>
  )
}

