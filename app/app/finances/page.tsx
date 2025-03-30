/**
 * @file app/finances/page.tsx
 * @description Financial dashboard landing page with auto-redirect to revenue section
 * 
 * Features:
 * - Automatic redirect to revenue page
 * - Quick access cards to financial sections
 * - Interactive navigation elements
 * - Visual feedback on interaction
 */

"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  DollarSign,
  FileText,
  Wallet,
} from "lucide-react"

/**
 * Financial section configuration
 */
const financialSections = [
  {
    title: "Revenue",
    description: "Track and analyze your sales performance and revenue metrics",
    icon: DollarSign,
    path: "/app/finances/revenue",
    iconClass: "text-primary",
  },
  {
    title: "Expenses",
    description: "Monitor and categorize your business expenses and costs",
    icon: Wallet,
    path: "/app/finances/expenses",
    iconClass: "text-destructive",
  },
  {
    title: "Reports",
    description: "Generate comprehensive financial reports and analysis",
    icon: FileText,
    path: "/app/finances/reports",
    iconClass: "text-green-500",
  },
] as const

/**
 * FinancesPage Component
 * 
 * Landing page for the financial section that automatically redirects to
 * the revenue page while showing quick access cards to other financial sections.
 * 
 * Features:
 * - Auto-redirect to revenue page
 * - Quick navigation cards
 * - Interactive hover states
 * - Visual indicators
 * 
 * @returns {JSX.Element} Financial dashboard component
 */
export default function FinancesPage() {
  const router = useRouter()

  // Automatically redirect to revenue page
  useEffect(() => {
    router.push("/app/finances/revenue")
  }, [router])

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground">
            Redirecting to Revenue page...
          </p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {financialSections.map((section) => (
          <Card
            key={section.title}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push(section.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {section.title}
              </CardTitle>
              <section.icon className={`h-5 w-5 ${section.iconClass}`} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
              <Button variant="link" className="p-0 h-auto mt-2" asChild>
                <span className="flex items-center">
                  View {section.title}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}