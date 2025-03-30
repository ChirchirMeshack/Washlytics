import type { ReactNode } from "react"

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">{children}</div>
}

