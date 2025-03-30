"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Bell, Search, Plus, User, MessageSquare, LogOut, Settings, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"

export function AppNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, signOut } = useAuth()

  // Determine current page title based on pathname
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean)[1] || "dashboard"
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mock notification data
  const notifications = [
    { id: 1, title: "New appointment", message: "John Doe booked a premium wash", time: "5 min ago" },
    { id: 2, title: "Inventory alert", message: "Car wash soap is running low", time: "1 hour ago" },
    { id: 3, title: "Staff update", message: "Emily joined the morning shift", time: "3 hours ago" },
    { id: 4, title: "Payment received", message: "$129.99 received from Sarah Johnson", time: "Yesterday" },
  ]

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "User"

    const firstName = user.user_metadata?.first_name
    const lastName = user.user_metadata?.last_name

    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    } else if (firstName) {
      return firstName
    } else {
      // Fallback to email or phone
      return user.email?.split("@")[0] || "User"
    }
  }

  // Handle sign out
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full bg-background transition-all duration-200",
        scrolled ? "border-b shadow-sm" : "border-b",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Page title - visible on mobile and tablet */}
        <div className="flex items-center md:hidden">
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>

        {/* Search and actions - hidden on mobile, visible on larger screens */}
        <div className="hidden md:flex md:flex-1 md:items-center md:gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-muted/30 pl-9 pr-4 focus-visible:bg-background focus-visible:ring-1"
            />
          </div>

          <Button variant="outline" size="sm" className="hidden lg:flex">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* Mobile search toggle */}
        <div
          className={cn(
            "absolute inset-x-0 top-16 z-50 border-b bg-background px-4 py-3 md:hidden",
            isSearchOpen ? "block" : "hidden",
          )}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full bg-muted/30 pl-9 pr-4" autoFocus />
          </div>
        </div>

        {/* User and notifications */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search button (mobile only) */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

          {/* New task button (mobile only) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Plus className="h-5 w-5" />
          </Button>

          <ModeToggle />

          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {notifications.length}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>You have {notifications.length} unread notifications</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src={user?.user_metadata?.avatar_url || "/placeholder.svg?height=32&width=32&text=JD"}
                  alt="User"
                  className="h-9 w-9 rounded-full ring-2 ring-background"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{getUserDisplayName()}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || user?.phone || ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help Center</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

