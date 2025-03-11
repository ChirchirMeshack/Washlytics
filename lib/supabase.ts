/**
 * @file lib/supabase.ts
 * @description Supabase client configuration and authentication utility functions
 * @author ChirchirMeshack
 * @created 2025-03-09 19:19:02
 */

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

/**
 * Environment variable validation
 * Ensure required environment variables are present
 */
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Supabase client instance with type safety
 * Uses the Database type from generated types
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

/**
 * Get the current authenticated user
 * 
 * @returns {Promise<User | null>} The current user or null if not authenticated
 * 
 * @example
 * const user = await getCurrentUser()
 * if (user) {
 *   console.log('User ID:', user.id)
 * }
 */
export const getCurrentUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user
}

/**
 * Get user roles from metadata
 * 
 * @returns {Promise<string[] | null>} Array of user roles or null if not authenticated
 * 
 * @example
 * const roles = await getUserRoles()
 * if (roles?.includes('admin')) {
 *   // Handle admin access
 * }
 */
export const getUserRoles = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  // Roles are stored in user metadata
  return user.user_metadata.roles || []
}

/**
 * Check if user has a specific role
 * 
 * @param {string} role - The role to check for
 * @returns {Promise<boolean>} True if user has the role, false otherwise
 * 
 * @example
 * if (await hasRole('manager')) {
 *   // Show manager features
 * }
 */
export const hasRole = async (role: string) => {
  const roles = await getUserRoles()
  return roles ? roles.includes(role) : false
}

/**
 * Get the current tenant for the user
 * 
 * @returns {Promise<string | null>} Current tenant ID or null if not set/authenticated
 * 
 * @example
 * const tenantId = await getCurrentTenant()
 * if (tenantId) {
 *   // Load tenant-specific data
 * }
 */
export const getCurrentTenant = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  return user.user_metadata.current_tenant || null
}