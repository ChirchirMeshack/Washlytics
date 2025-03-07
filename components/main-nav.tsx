/**
 * @file components/main-nav.tsx
 * @description Responsive main navigation component with mobile menu support,
 * scroll-aware styling, and dark mode toggle.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sparkles } from "lucide-react"

/**
 * Navigation item structure
 * @typedef {Object} NavItem
 * @property {string} href - The target URL or anchor
 * @property {string} label - Display text for the navigation item
 */
interface NavItem {
  href: string
  label: string
}

/**
 * MainNav Component
 * 
 * A responsive navigation header with the following features:
 * - Transparent to solid background transition on scroll
 * - Mobile-friendly hamburger menu
 * - Dark mode toggle
 * - Animated logo
 * - Responsive navigation links
 * - Authentication buttons
 * 
 * @returns {JSX.Element} The rendered navigation component
 */
export function MainNav() {
  // Get current pathname for active link highlighting
  const pathname = usePathname()
  
  // State management
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  /**
   * Scroll handler effect
   * Updates header background based on scroll position
   */
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /**
   * Navigation items configuration
   * Centralized array of navigation links
   */
  const navItems: NavItem[] = [
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
    { href: "#marketplace", label: "Marketplace" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      {/* Main Navigation Container */}
      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary animate-sparkle" />
          <span className="font-bold text-xl">Washlytics</span>
          <span className="text-xl">✨</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center space-x-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {/* Hamburger Icon */}
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
              className={cn(isMobileMenuOpen ? "hidden" : "block")}
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            {/* Close Icon */}
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
              className={cn(isMobileMenuOpen ? "block" : "hidden")}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="container py-4 flex flex-col space-y-4 bg-background/95 backdrop-blur-md">
          {/* Mobile Navigation Links */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary py-2",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile Action Buttons */}
          <div className="flex flex-col space-y-2 pt-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}