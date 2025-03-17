/**
 * @file app/components/app/app-nav.tsx
 * @description Application navigation header component with notifications and user controls
 * @author ChirchirMeshack
 * @created 2025-03-11 12:09:25
 * 
 * Features:
 * - Responsive navigation header
 * - Search functionality
 * - Theme toggle
 * - Notifications panel
 * - User profile menu
 * - Scroll-based styling
 */

"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Bell,
  Search,
  Plus,
  User,
  MessageSquare,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react"
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"

/**
 * Mock notification type
 */
interface Notification {
  id: number
  title: string
  message: string
  time: string
}

/**
 * AppNav Component
 * 
 * Main navigation header for the application that provides:
 * - Page title (mobile only)
 * - Search functionality
 * - Task creation
 * - Theme switching
 * - Notifications panel
 * - User profile menu
 * 
 * @returns {JSX.Element} Navigation header component
 */
export function AppNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut } = useAuth()

  /**
   * Extracts and formats the current page title from the pathname
   */
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean)[1] || "dashboard"
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")
  }

  /**
   * Handles scroll events to update header styling
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /**
   * Mock notifications data
   */
  const notifications: Notification[] = [
    {
      id: 1,
      title: "New appointment",
      message: "John Doe booked a premium wash",
      time: "5 min ago",
    },
    // ... other notifications
  ]

  /**
   * Gets the display name for the current user
   */
  const getUserDisplayName = () => {
    if (!user) return "User"

    const firstName = user.user_metadata?.first_name
    const lastName = user.user_metadata?.last_name

    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    } else if (firstName) {
      return firstName
    }
    
    return user.email?.split("@")[0] || "User"
  }

  /**
   * Handles user sign out
   */
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-16 w-full items-center bg-background px-4 md:px-6",
        scrolled ? "border-b shadow-sm" : "border-b",
      )}
    >
      <div className="flex flex-1 items-center justify-between md:justify-end">
        {/* Mobile page title */}
        <div className="block md:hidden">
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>

        {/* Desktop sidebar spacer */}
        <div className="hidden h-full md:block md:w-[250px]" />

        {/* Search and actions */}
        <div className="hidden md:ml-auto md:flex md:items-center md:gap-4">
          <div className="relative w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 focus-visible:ring-1"
            />
          </div>

          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* User controls */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          {/* Notifications panel */}
          <Sheet>
            {/* Sheet implementation... */}
          </Sheet>

          {/* User menu */}
          <DropdownMenu>
            {/* DropdownMenu implementation... */}
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}