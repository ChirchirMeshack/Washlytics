"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function SignInForm() {
  const router = useRouter()
  const { signIn, signInWithPhone, verifyOTP } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email")

  // Email login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Phone login state
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmailForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email) newErrors.email = "Email is required"
    if (!password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePhoneForm = () => {
    const newErrors: Record<string, string> = {}

    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required"
    else if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be in international format (e.g., +1234567890)"
    }

    if (verificationSent && !verificationCode) {
      newErrors.verificationCode = "Verification code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle email login
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmailForm()) return

    setIsLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>Sign in failed</span>
          </div>
        ),
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    // Show success toast
    toast({
      variant: "success",
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Signed in successfully</span>
        </div>
      ),
      description: "Welcome back to Sparkle!",
    })

    // Redirect to dashboard
    router.push("/app/dashboard")
    setIsLoading(false)
  }

  // Handle phone verification request
  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhoneForm()) return

    setIsLoading(true)

    // Send OTP to phone number
    const { error } = await signInWithPhone(phoneNumber)

    if (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>Verification failed</span>
          </div>
        ),
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    setVerificationSent(true)
    toast({
      variant: "info",
      title: "Verification code sent",
      description: "Check your phone for the verification code.",
    })

    setIsLoading(false)
  }

  // Handle phone verification submission
  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhoneForm()) return

    setIsLoading(true)

    // Verify OTP
    const { error } = await verifyOTP(phoneNumber, verificationCode)

    if (error) {
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span>Verification failed</span>
          </div>
        ),
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    // Show success toast
    toast({
      variant: "success",
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Signed in successfully</span>
        </div>
      ),
      description: "Welcome back to Sparkle!",
    })

    // Redirect to dashboard
    router.push("/app/dashboard")
    setIsLoading(false)
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary animate-sparkle" />
        </div>
        <CardTitle className="text-2xl font-bold">Login to Sparkle</CardTitle>
        <CardDescription>Choose your preferred sign-in method</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" onValueChange={(value) => setAuthMethod(value as "email" | "phone")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone Number</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
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
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="phone">
            <form onSubmit={verificationSent ? handleVerifyPhone : handleSendVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  id="phone-number"
                  type="tel"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  disabled={verificationSent}
                />
                <p className="text-xs text-muted-foreground">
                  Enter your phone number in international format (e.g., +1234567890)
                </p>
                {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
              </div>

              {verificationSent && (
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                  {errors.verificationCode && <p className="text-sm text-destructive">{errors.verificationCode}</p>}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? verificationSent
                    ? "Verifying..."
                    : "Sending Code..."
                  : verificationSent
                    ? "Verify Code"
                    : "Send Verification Code"}
              </Button>

              {verificationSent && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setVerificationSent(false)}
                  disabled={isLoading}
                >
                  Change Phone Number
                </Button>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

