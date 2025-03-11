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
import { Sparkles, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { UserRole } from "@/types/supabase"
import { createTenant } from "@/lib/tenant-utils"

export function SignUpForm() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email")

  // Email signup state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  // Phone signup state
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmailForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"

    if (!password) newErrors.password = "Password is required"
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters"

    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    if (!businessName) newErrors.businessName = "Business name is required"

    if (!subdomain) newErrors.subdomain = "Subdomain is required"
    else if (!/^[a-z0-9-]+$/.test(subdomain)) {
      newErrors.subdomain = "Subdomain can only contain lowercase letters, numbers, and hyphens"
    }

    if (!firstName) newErrors.firstName = "First name is required"
    if (!lastName) newErrors.lastName = "Last name is required"

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

    if (!businessName) newErrors.businessName = "Business name is required"
    if (!subdomain) newErrors.subdomain = "Subdomain is required"
    if (!firstName) newErrors.firstName = "First name is required"
    if (!lastName) newErrors.lastName = "Last name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if subdomain is available
  const checkSubdomainAvailability = async (subdomain: string) => {
    try {
      const response = await fetch(`/api/tenants/check-subdomain?subdomain=${subdomain}`)
      const data = await response.json()
      return data.available
    } catch (error) {
      console.error("Error checking subdomain:", error)
      return false
    }
  }

  /**
   * Handle email sign-up
   * Validates form, checks subdomain availability, and creates user account
   */
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmailForm()) return

    setIsLoading(true)

    try {
      // Check if subdomain is available
      const isSubdomainAvailable = await checkSubdomainAvailability(subdomain)

      if (!isSubdomainAvailable) {
        setErrors({ ...errors, subdomain: "This subdomain is already taken" })
        setIsLoading(false)
        return
      }

      // Create user with metadata
      const { data, error } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        business_name: businessName,
        subdomain: subdomain,
        roles: [UserRole.Admin],
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Check if data and data.user exist before accessing properties
      if (!data || !data.user) {
        console.log("User data not available, proceeding with email only")

        // Create tenant without userId, using email instead
        await createTenant({
          name: businessName,
          subdomain: subdomain,
          ownerEmail: email,
          ownerFirstName: firstName,
          ownerLastName: lastName,
          // No userId provided, the createTenant function will handle this case
        })
      } else {
        // Create tenant with the user ID
        await createTenant({
          name: businessName,
          subdomain: subdomain,
          ownerEmail: email,
          ownerFirstName: firstName,
          ownerLastName: lastName,
          userId: data.user.id,
        })
      }

      // Redirect to verification page
      toast({
        title: "Check your email",
        description: "We sent you a confirmation link to verify your email.",
      })

      router.push("/auth/verification")
    } catch (error) {
      console.error("Sign up error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle sending phone verification code
   * Validates form, checks subdomain availability, and sends SMS via Twilio
   */
  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhoneForm()) return

    setIsLoading(true)

    try {
      // Check if subdomain is available
      const isSubdomainAvailable = await checkSubdomainAvailability(subdomain)

      if (!isSubdomainAvailable) {
        setErrors({ ...errors, subdomain: "This subdomain is already taken" })
        setIsLoading(false)
        return
      }

      // Check if phone is already registered
      const phoneCheckResponse = await fetch(`/api/auth/check-phone?phone=${encodeURIComponent(phoneNumber)}`)
      const phoneCheckData = await phoneCheckResponse.json()

      if (phoneCheckData.exists) {
        setErrors({ ...errors, phoneNumber: "This phone number is already registered" })
        setIsLoading(false)
        return
      }

      // Send verification code via Twilio
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          firstName,
          lastName,
          businessName,
          subdomain,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send verification code")
      }

      setVerificationSent(true)
      toast({
        title: "Verification code sent",
        description: "Check your phone for the verification code.",
      })
    } catch (error) {
      console.error("Error sending verification:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send verification code",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle phone verification
   * Verifies SMS code and creates user account
   */
  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Starting phone verification process...")

    if (!validatePhoneForm()) return

    setIsLoading(true)
    console.log("Sending verification request to server with data:", {
      phoneNumber: phoneNumber.substring(0, 3) + "***", // Log partial number for privacy
      codeLength: verificationCode.length,
      firstName,
      lastName,
      businessName,
      subdomain,
    })

    try {
      // Verify code with Twilio
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          code: verificationCode,
          firstName,
          lastName,
          businessName,
          subdomain,
        }),
      })

      console.log("Server response received:", {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get("content-type"),
      })

      // Check if response is OK and is JSON
      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          // It's JSON but has an error status
          const errorData = await response.json()
          throw new Error(errorData.message || `Server error: ${response.status}`)
        } else {
          // Not JSON, likely HTML error page
          const text = await response.text()
          console.error("Server returned non-JSON response:", text.substring(0, 150) + "...")
          throw new Error(`Server error: ${response.status}. Response was not JSON.`)
        }
      }

      // Try to get the response as text first
      const responseText = await response.text()
      console.log("Response text preview:", responseText.substring(0, 100))

      // Then parse it as JSON
      let data
      try {
        data = JSON.parse(responseText)
        console.log("Successfully parsed response as JSON:", data)
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError)
        throw new Error("Server returned invalid JSON")
      }

      if (!data.valid) {
        setErrors({ ...errors, verificationCode: "Invalid verification code" })
        setIsLoading(false)
        return
      }

      // Create user account and tenant
      console.log("Verification successful, creating user account...")
      const createResponse = await fetch("/api/auth/create-phone-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          firstName,
          lastName,
          businessName,
          subdomain,
        }),
      })

      // Apply the same safe parsing approach
      if (!createResponse.ok) {
        const contentType = createResponse.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const errorData = await createResponse.json()
          throw new Error(errorData.message || `Account creation failed: ${createResponse.status}`)
        } else {
          const text = await createResponse.text()
          console.error("Account creation returned non-JSON response:", text.substring(0, 150) + "...")
          throw new Error(`Account creation failed: ${createResponse.status}. Response was not JSON.`)
        }
      }

      const createResponseText = await createResponse.text()
      let createData
      try {
        createData = JSON.parse(createResponseText)
      } catch (parseError) {
        console.error("Failed to parse account creation response as JSON:", parseError)
        throw new Error("Server returned invalid JSON during account creation")
      }

      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      })

      // Set session cookie and redirect to dashboard
      router.push(`/auth/phone-login?token=${createData.token}`)
    } catch (error) {
      console.error("Verification error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to verify code",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle signing in with phone
   * This is used when a user already has an account and wants to sign in with phone
   */
  const signInWithPhone = async (phone: string) => {
    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send verification code")
      }

      return { error: null }
    } catch (error) {
      console.error("Error sending verification:", error)
      return {
        error: {
          message: error instanceof Error ? error.message : "Failed to send verification code",
        },
      }
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary animate-sparkle" />
        </div>
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Choose your preferred sign-up method</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" onValueChange={(value) => setAuthMethod(value as "email" | "phone")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone Number</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  placeholder="ShinyWheels Car Wash"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
                {errors.businessName && <p className="text-sm text-destructive">{errors.businessName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="subdomain"
                    placeholder="shinywheels"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                    required
                  />
                  <span className="text-muted-foreground">.sparkle.com</span>
                </div>
                {errors.subdomain && <p className="text-sm text-destructive">{errors.subdomain}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="phone">
            <form onSubmit={verificationSent ? handleVerifyPhone : handleSendVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name-phone">Business Name</Label>
                <Input
                  id="business-name-phone"
                  placeholder="ShinyWheels Car Wash"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
                {errors.businessName && <p className="text-sm text-destructive">{errors.businessName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain-phone">Subdomain</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="subdomain-phone"
                    placeholder="shinywheels"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                    required
                  />
                  <span className="text-muted-foreground">.sparkle.com</span>
                </div>
                {errors.subdomain && <p className="text-sm text-destructive">{errors.subdomain}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name-phone">First Name</Label>
                  <Input
                    id="first-name-phone"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name-phone">Last Name</Label>
                  <Input
                    id="last-name-phone"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                </div>
              </div>

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
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {verificationSent ? "Verifying..." : "Sending Code..."}
                  </>
                ) : verificationSent ? (
                  "Verify Code"
                ) : (
                  "Send Verification Code"
                )}
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
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

