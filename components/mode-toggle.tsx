/**
 * @file components/mode-toggle.tsx
 * @description Theme toggle component that allows users to switch between light, dark, and system themes
 */

"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

/**
 * ModeToggle Component
 * 
 * A dropdown menu component that allows users to switch between different theme modes.
 * Features:
 * - Animated icon transition between sun and moon
 * - Dropdown menu with light, dark, and system options
 * - Accessible button and menu structure
 * - Seamless integration with next-themes
 * 
 * @example
 * // Basic usage in a navigation bar
 * <nav>
 *   <ModeToggle />
 * </nav>
 * 
 * @returns {JSX.Element} A theme toggle dropdown menu
 */
export function ModeToggle() {
  // Get theme setter from next-themes
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      {/* Dropdown Trigger Button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {/* 
            Sun Icon
            - Visible in light mode
            - Animates out in dark mode using rotation and scale
          */}
          <Sun 
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all
              dark:-rotate-90 dark:scale-0" 
          />
          {/* 
            Moon Icon
            - Visible in dark mode
            - Animates in using rotation and scale
            - Absolutely positioned to overlay the sun
          */}
          <Moon 
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 
              transition-all dark:rotate-0 dark:scale-100" 
          />
          {/* Screen reader text for accessibility */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Menu Content */}
      <DropdownMenuContent align="end">
        {/* Light Theme Option */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>

        {/* Dark Theme Option */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>

        {/* System Theme Option */}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}