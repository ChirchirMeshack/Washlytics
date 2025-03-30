"use client"

import { useState, useEffect } from "react"
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
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarLinks = [
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // Auto-collapse sidebar on smaller screens
      if (window.innerWidth < 1024 && !isCollapsed) {
        setIsCollapsed(true)
      } else if (window.innerWidth >= 1280 && isCollapsed) {
        setIsCollapsed(false)
      }
    }

    // Set initial state based on window width
    if (typeof window !== "undefined") {
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [isCollapsed])

  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const toggleCollapsible = (title: string) => {
    setOpenCollapsibles((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isSubItemActive = (subItems: { href: string }[] | undefined) => {
    if (!subItems) return false
    return subItems.some((item) => pathname === item.href)
  }

  // Auto-expand the section that contains the active page
  useEffect(() => {
    const activeParent = sidebarLinks.find(
      (link) => link.subItems && link.subItems.some((item) => item.href === pathname),
    )

    if (activeParent && !openCollapsibles.includes(activeParent.title)) {
      setOpenCollapsibles((prev) => [...prev, activeParent.title])
    }
  }, [pathname, openCollapsibles])

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden shadow-md hover:shadow-lg transition-all"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-950 border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[70px]" : "w-[250px]",
          isMobileOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0 md:shadow-none",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            {!isCollapsed && <span className="ml-2 font-bold text-lg tracking-tight">Sparkle</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex opacity-70 hover:opacity-100"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="custom-scrollbar flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {sidebarLinks.map((link) => (
              <div key={link.title} className="group">
                {link.subItems ? (
                  <Collapsible
                    open={openCollapsibles.includes(link.title)}
                    onOpenChange={() => toggleCollapsible(link.title)}
                    className="w-full"
                  >
                    <div
                      className={cn(
                        "flex items-center px-2 py-2 text-sm rounded-md transition-colors",
                        pathname === link.href || isSubItemActive(link.subItems)
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : "hover:bg-muted/80 dark:hover:bg-muted/20",
                        isCollapsed ? "justify-center" : "",
                      )}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "")}>
                              <link.icon className={cn("h-5 w-5", link.color)} />
                              {!isCollapsed && (
                                <>
                                  <span className="ml-3 font-medium">{link.title}</span>
                                  <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 p-0">
                                      <ChevronIcon open={openCollapsibles.includes(link.title)} />
                                    </Button>
                                  </CollapsibleTrigger>
                                </>
                              )}
                            </div>
                          </TooltipTrigger>
                          {isCollapsed && <TooltipContent side="right">{link.title}</TooltipContent>}
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {!isCollapsed && (
                      <CollapsibleContent className="pl-10 pr-2 space-y-1 mt-1 animate-accordion-down">
                        {link.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block px-2 py-1.5 text-sm rounded-md transition-colors",
                              pathname === subItem.href
                                ? "bg-primary/10 text-primary font-medium dark:bg-primary/20"
                                : "text-muted-foreground hover:bg-muted/80 dark:hover:bg-muted/20 hover:text-foreground",
                            )}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm rounded-md transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "hover:bg-muted/80 dark:hover:bg-muted/20",
                      isCollapsed ? "justify-center" : "",
                    )}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "")}>
                            <link.icon className={cn("h-5 w-5", link.color)} />
                            {!isCollapsed && <span className="ml-3 font-medium">{link.title}</span>}
                          </div>
                        </TooltipTrigger>
                        {isCollapsed && <TooltipContent side="right">{link.title}</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t p-4">
          {!isCollapsed ? (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Sparkle v1.2.0</span>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => setIsCollapsed(true)}>
                Collapse
              </Button>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 mx-auto" onClick={() => setIsCollapsed(false)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Expand Sidebar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
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

