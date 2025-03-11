/**
 * @file app/auth/phone-login/page.tsx
 * @description Phone login callback handler component
 */

"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-helpers"

/**
 * PhoneLoginPage Component
 * 
 * Handles the phone login callback and session establishment.
 * Features:
 * - Token validation
 * - Session establishment
 * - Error handling
 * - Loading state
 * - Automatic redirection
 * 
 * URL Format: /auth/phone-login?token=<auth_token>
 * 
 * @example
 * ```tsx
 * // Accessed via redirect from phone authentication
 * // /auth/phone-login?token=xxx
 * ```
 */
export default function PhoneLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    /**
     * Completes the login process by:
     * 1. Validating the token
     * 2. Establishing a session
     * 3. Redirecting to appropriate page
     */
    const completeLogin = async () => {
      // Validate token existence
      if (!token) {
        toast({
          title: "Error",
          description: "Invalid login link",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      try {
        // Establish session with Supabase
        const { error } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: token, // TODO: Implement proper refresh token handling
        })

        if (error) {
          throw error
        }

        // Notify successful login
        toast({
          title: "Welcome to Washlytics",
          description: "You've been successfully logged in",
        })

        // Redirect to dashboard
        router.push("/app/dashboard")
      } catch (error) {
        console.error("Login error:", error)
        toast({
          title: "Login failed",
          description: "There was a problem logging you in. Please try again.",
          variant: "destructive",
        })
        router.push("/login")
      }
    }

    completeLogin()
  }, [token, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Logging you in</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  )
}