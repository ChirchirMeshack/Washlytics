import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AppNav } from "@/components/app/app-nav"
import { AppSidebar } from "@/components/app/app-sidebar"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata = {
  title: "Sparkle Dashboard | Car Wash Management System",
  description: "Manage your car wash business with Sparkle",
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ProtectedRoute>
            <div className="flex min-h-screen flex-col md:flex-row">
              <AppSidebar />
              <div className="flex w-full flex-col md:ml-[70px] lg:ml-[250px] transition-all duration-300">
                <AppNav />
                <main className="flex-1 p-4 md:p-6">{children}</main>
              </div>
            </div>
          </ProtectedRoute>
        </ThemeProvider>
      </body>
    </html>
  )
}

