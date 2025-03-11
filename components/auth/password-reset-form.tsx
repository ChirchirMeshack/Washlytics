/**
 * @file components/auth/password-reset-form.tsx
 * @description Password reset form component supporting both request and reset modes
 */

"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import { toast } from "@/hooks/use-toast"

/**
 * Form validation errors type
 */
type FormErrors = Record<string, string>

/**
 * Props for the PasswordResetForm component
 */
interface PasswordResetFormProps {
  /** Mode of operation - 'request' for email input, 'reset' for new password */
  mode?: "request" | "reset"
}

/**
 * PasswordResetForm Component
 * 
 * A form component that handles both password reset request and password update flows.
 * Features:
 * - Email validation
 * - Password validation
 * - Loading states
 * - Error handling
 * - Toast notifications
 * 
 * @example
 * // Request mode (default)
 * <PasswordResetForm />
 * 
 * @example
 * // Reset mode
 * <PasswordResetForm mode="reset" />
 */
export function PasswordResetForm({ mode = "request" }: PasswordResetFormProps) {
  const router = useRouter()
  const { resetPassword, updatePassword } = useAuth()
  
  // Form state
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  /**
   * Validates the email request form
   * @returns {boolean} True if validation passes
   */
  const validateRequestForm = () => {
    const newErrors: FormErrors = {}

    if (!email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Validates the password reset form
   * @returns {boolean} True if validation passes
   */
  const validateResetForm = () => {
    const newErrors: FormErrors = {}

    if (!password) newErrors.password = "Password is required"
    else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handles the password reset request submission
   * @param {React.FormEvent} e - Form submission event
   */
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateRequestForm()) return

    setIsLoading(true)

    const { error } = await resetPassword(email)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Check your email",
      description: "We sent you a password reset link.",
    })

    setIsLoading(false)
  }

  /**
   * Handles the password update submission
   * @param {React.FormEvent} e - Form submission event
   */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateResetForm()) return

    setIsLoading(true)

    const { error } = await updatePassword(password)

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })

    router.push("/login")
    setIsLoading(false)
  }

  return (
    <Card className="mx-auto max-w-sm">
      {/* Header */}
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary animate-sparkle" />
        </div>
        <CardTitle className="text-2xl font-bold">
          {mode === "request" ? "Reset Password" : "Create New Password"}
        </CardTitle>
        <CardDescription>
          {mode === "request" 
            ? "Enter your email and we'll send you a reset link" 
            : "Enter your new password below"}
        </CardDescription>
      </CardHeader>

      {/* Form Content */}
      <CardContent>
        {mode === "request" ? (
          // Request Reset Form
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          // Reset Password Form
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating Password..." : "Update Password"}
            </Button>
          </form>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-center">
        <Link 
          href="/login" 
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          Back to login
        </Link>
      </CardFooter>
    </Card>
  )
}