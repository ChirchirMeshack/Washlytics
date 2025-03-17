/**
 * @file app/app/layout.tsx
 * @description Root layout component for the Sparkle Car Wash Management System
 * @author ChirchirMeshack
 * @created 2025-03-11 12:07:50
 * 
 * This layout provides:
 * - Theme management
 * - Authentication protection
 * - Responsive navigation
 * - Sidebar navigation
 * - Content layout structure
 */

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AppNav } from "@/components/app/app-nav"
import { AppSidebar } from "@/components/app/app-sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"

/**
 * Metadata configuration for the application
 */
export const metadata = {
  title: "Sparkle Dashboard | Car Wash Management System",
  description: "Manage your car wash business with Sparkle",
}

/**
 * AppLayout Component
 * 
 * Root layout component that wraps all application pages.
 * Provides theme support, authentication protection, and responsive layout structure.
 * 
 * Features:
 * - System theme detection and management
 * - Protected route wrapper
 * - Responsive sidebar navigation
 * - Top navigation bar
 * - Content area with proper spacing
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render within the layout
 * 
 * @example
 * ```tsx
 * <AppLayout>
 *   <DashboardPage />
 * </AppLayout>
 * ```
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProtectedRoute>
            <div className="flex min-h-screen flex-col md:flex-row">
              {/* Sidebar Navigation */}
              <AppSidebar />
              
              {/* Main Content Area */}
              <div className="flex w-full flex-col md:ml-[70px] lg:ml-[250px]">
                {/* Top Navigation Bar */}
                <AppNav />
                
                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6">
                  {children}
                </main>
              </div>
            </div>
          </ProtectedRoute>
        </ThemeProvider>
      </body>
    </html>
  )
}