"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Calendar,
  Car,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Package,
  Settings,
  Users,
  Menu,
  X,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarLink {
  title: string
  href: string
  icon: any
  color: string
  subItems?: Array<{
    title: string
    href: string
  }>
}

const sidebarLinks: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/app/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "Sales & Expenses",
    href: "/app/finances",
    icon: DollarSign,
    color: "text-green-500",
    subItems: [
      { title: "Revenue", href: "/app/finances/revenue" },
      { title: "Expenses", href: "/app/finances/expenses" },
      { title: "Reports", href: "/app/finances/reports" },
    ],
  },
  {
    title: "Clients & Appointments",
    href: "/app/clients",
    icon: Calendar,
    color: "text-purple-500",
    subItems: [
      { title: "Client List", href: "/app/clients/list" },
      { title: "Appointments", href: "/app/clients/appointments" },
      { title: "Booking Calendar", href: "/app/clients/calendar" },
    ],
  },
  {
    title: "Services",
    href: "/app/services",
    icon: Car,
    color: "text-yellow-500",
  },
  {
    title: "Branches",
    href: "/app/branches",
    icon: MapPin,
    color: "text-red-500",
  },
  {
    title: "Bulk SMS",
    href: "/app/marketing",
    icon: MessageSquare,
    color: "text-indigo-500",
    subItems: [
      { title: "Campaigns", href: "/app/marketing/campaigns" },
      { title: "Templates", href: "/app/marketing/templates" },
      { title: "Analytics", href: "/app/marketing/analytics" },
    ],
  },
  {
    title: "Inventory",
    href: "/app/inventory",
    icon: Package,
    color: "text-amber-500",
    subItems: [
      { title: "Stock Levels", href: "/app/inventory/stock" },
      { title: "Suppliers", href: "/app/inventory/suppliers" },
      { title: "Orders", href: "/app/inventory/orders" },
    ],
  },
  {
    title: "Payments & Reports",
    href: "/app/payments",
    icon: CreditCard,
    color: "text-emerald-500",
    subItems: [
      { title: "Transactions", href: "/app/payments/transactions" },
      { title: "Financial Reports", href: "/app/payments/reports" },
      { title: "Invoices", href: "/app/payments/invoices" },
    ],
  },
  {
    title: "Staff Management",
    href: "/app/staff",
    icon: Users,
    color: "text-blue-600",
    subItems: [
      { title: "Employees", href: "/app/staff/employees" },
      { title: "Schedules", href: "/app/staff/schedules" },
      { title: "Performance", href: "/app/staff/performance" },
    ],
  },
  {
    title: "Settings",
    href: "/app/settings",
    icon: Settings,
    color: "text-gray-500",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openCollapsibles, setOpenCollapsibles] = useState<string[]>([])

  const toggleCollapsible = (title: string) => {
    setOpenCollapsibles((prev) => 
      prev.includes(title) 
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const isSubItemActive = (subItems: { href: string }[] | undefined) => {
    if (!subItems) return false
    return subItems.some((item) => pathname === item.href)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-950 border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[70px]" : "w-[250px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-primary animate-sparkle" />
            {!isCollapsed && (
              <span className="ml-2 font-bold text-lg">Sparkle</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {sidebarLinks.map((link) => (
              <div key={link.href}>
                {link.subItems ? (
                  // Item with subitems
                  <Collapsible
                    open={openCollapsibles.includes(link.title)}
                    onOpenChange={() => toggleCollapsible(link.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between",
                          (pathname === link.href || isSubItemActive(link.subItems)) &&
                            "bg-secondary"
                        )}
                      >
                        <div className="flex items-center">
                          <link.icon className={cn("h-5 w-5 mr-2", link.color)} />
                          {!isCollapsed && <span>{link.title}</span>}
                        </div>
                        {!isCollapsed && <ChevronIcon open={openCollapsibles.includes(link.title)} />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block px-9 py-2 text-sm rounded-md hover:bg-secondary",
                            pathname === subItem.href && "bg-secondary"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  // Single item
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={link.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start",
                              pathname === link.href && "bg-secondary"
                            )}
                          >
                            <link.icon className={cn("h-5 w-5", link.color)} />
                            {!isCollapsed && (
                              <span className="ml-2">{link.title}</span>
                            )}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">
                          {link.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}