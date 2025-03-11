"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Session, User, AuthError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { supabase, getCurrentTenant } from "@/lib/supabase-helpers"
import type { UserRole } from "@/types/supabase"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, metadata: any) => Promise<{ data: any; error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signInWithPhone: (phone: string) => Promise<{ error: AuthError | null }>
  verifyOTP: (phone: string, token: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
  updatePassword: (password: string) => Promise<{ error: AuthError | null }>
  userRoles: UserRole[]
  currentTenant: string | null
  switchTenant: (tenantId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userRoles, setUserRoles] = useState<UserRole[]>([])
  const [currentTenant, setCurrentTenant] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true)

      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        // Get user roles from metadata and convert to enum values
        const roles = (session.user.user_metadata.roles || []) as UserRole[]
        setUserRoles(roles)

        // Get current tenant
        const tenant = await getCurrentTenant()
        setCurrentTenant(tenant)
      }

      setIsLoading(false)
    }

    initializeAuth()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        // Update roles when auth state changes
        const roles = session.user.user_metadata.roles || []
        setUserRoles(roles)

        // Update current tenant
        const tenant = await getCurrentTenant()
        setCurrentTenant(tenant)
      } else {
        setUserRoles([])
        setCurrentTenant(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Sign up with email and password
  const signUp = async (email: string, password: string, metadata: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    // Return both data and error to allow proper handling in the sign-up form
    return { data, error }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { error }
  }

  // Sign in with phone number (step 1: send OTP)
  const signInWithPhone = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    })

    return { error }
  }

  // Verify OTP for phone sign-in (step 2)
  const verifyOTP = async (phone: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    })

    return { error }
  }

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  // Reset password (send reset email)
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    return { error }
  }

  // Update password
  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password,
    })

    return { error }
  }

  // Switch between tenants for users with access to multiple tenants
  const switchTenant = async (tenantId: string) => {
    if (!user) return

    // Update user metadata with current tenant
    await supabase.auth.updateUser({
      data: { current_tenant: tenantId },
    })

    setCurrentTenant(tenantId)

    // Refresh the page to update tenant context
    router.refresh()
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signInWithPhone,
    verifyOTP,
    signOut,
    resetPassword,
    updatePassword,
    userRoles,
    currentTenant,
    switchTenant,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

