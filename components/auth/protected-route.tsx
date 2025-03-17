"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
}

export function ProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
  const { user, isLoading, userRoles } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return

    // If no user is logged in, redirect to login
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    // If roles are required, check if user has at least one of them
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role))

      if (!hasRequiredRole) {
        // Redirect to unauthorized page or dashboard
        router.push("/unauthorized")
      }
    }
  }, [user, isLoading, userRoles, router, pathname, requiredRoles])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not authenticated or doesn't have required roles, don't render children
  if (!user || (requiredRoles.length > 0 && !requiredRoles.some((role) => userRoles.includes(role)))) {
    return null
  }

  // If authenticated and has required roles, render children
  return <>{children}</>
}

