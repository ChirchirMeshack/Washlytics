/**
 * @file lib/supabase/client.ts
 * @description Supabase client and utility functions for data operations
 * @author ChirchirMeshack
 * @lastModified 2025-03-09 19:51:02
 */

import { type Database, AppointmentStatus, PaymentStatus, type UserRole } from "@/types/supabase"
import { createClient } from "@supabase/supabase-js"

// Environment variable validation
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Initialized Supabase client with type safety
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

/**
 * Authentication and User Management
 */

/**
 * Get the current authenticated user
 * @returns {Promise<User | null>} Current authenticated user or null
 */
export const getCurrentUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user
}

/**
 * Get user roles from metadata
 * @returns {Promise<UserRole[] | null>} Array of user roles or null
 */
export const getUserRoles = async () => {
  const user = await getCurrentUser()
  if (!user) return null
  return user.user_metadata.roles || []
}

/**
 * Check if user has a specific role
 * @param {UserRole} role - Role to check
 * @returns {Promise<boolean>} True if user has role
 */
export const hasRole = async (role: UserRole) => {
  const roles = await getUserRoles()
  return roles ? roles.includes(role) : false
}

/**
 * Tenant Management
 */

/**
 * Get the current tenant for the user
 * @returns {Promise<string | null>} Current tenant ID or null
 */
export const getCurrentTenant = async () => {
  const user = await getCurrentUser()
  if (!user) return null
  return user.user_metadata.current_tenant || null
}

/**
 * Get tenant settings
 * @param {string} tenantId - Tenant identifier
 * @param {string} [key] - Optional specific setting key
 * @returns {Promise<any>} Setting value(s)
 * @throws {Error} Database error
 */
export const getTenantSettings = async (tenantId: string, key?: string) => {
  if (!key) {
    // Get all settings
    const { data, error } = await supabase
      .from("tenant_settings")
      .select("*")
      .eq("tenant_id", tenantId)

    if (error) throw error
    return data
  } else {
    // Get specific setting
    const { data, error } = await supabase
      .from("tenant_settings")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("key", key)
      .single()

    if (error && error.code !== "PGRST116") throw error
    return data?.value
  }
}

/**
 * Update tenant setting
 * @param {string} tenantId - Tenant identifier
 * @param {string} key - Setting key
 * @param {any} value - Setting value
 * @throws {Error} Database error
 */
export const updateTenantSetting = async (
  tenantId: string,
  key: string,
  value: any
) => {
  const { data: existing } = await supabase
    .from("tenant_settings")
    .select("id")
    .eq("tenant_id", tenantId)
    .eq("key", key)
    .single()

  if (existing) {
    // Update existing
    const { error } = await supabase
      .from("tenant_settings")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("id", existing.id)

    if (error) throw error
  } else {
    // Create new
    const { error } = await supabase
      .from("tenant_settings")
      .insert({
        tenant_id: tenantId,
        key,
        value,
      })

    if (error) throw error
  }
}

/**
 * Analytics and Statistics
 */

interface AppointmentStatistics {
  total: number
  completed: number
  cancelled: number
  noShow: number
  scheduled: number
  completionRate: number
}

/**
 * Get appointment statistics for a tenant
 * @param {string} tenantId - Tenant identifier
 * @param {string} [startDate] - Optional start date filter
 * @param {string} [endDate] - Optional end date filter
 * @returns {Promise<AppointmentStatistics>} Appointment statistics
 * @throws {Error} Database error
 */
export const getAppointmentStats = async (
  tenantId: string,
  startDate?: string,
  endDate?: string
): Promise<AppointmentStatistics> => {
  let query = supabase
    .from("appointments")
    .select("status")
    .eq("tenant_id", tenantId)

  if (startDate) {
    query = query.gte("start_time", startDate)
  }

  if (endDate) {
    query = query.lte("start_time", endDate)
  }

  const { data, error } = await query

  if (error) throw error

  const total = data.length
  const completed = data.filter(
    (a) => a.status === AppointmentStatus.Completed
  ).length
  const cancelled = data.filter(
    (a) => a.status === AppointmentStatus.Cancelled
  ).length
  const noShow = data.filter(
    (a) => a.status === AppointmentStatus.NoShow
  ).length
  const scheduled = data.filter(
    (a) => a.status === AppointmentStatus.Scheduled
  ).length

  return {
    total,
    completed,
    cancelled,
    noShow,
    scheduled,
    completionRate: total > 0 ? (completed / total) * 100 : 0,
  }
}

interface SalesStatistics {
  totalSales: number
  totalRevenue: number
  paidSales: number
  paidRevenue: number
  pendingRevenue: number
  averageSaleValue: number
}

/**
 * Get sales statistics for a tenant
 * @param {string} tenantId - Tenant identifier
 * @param {string} [startDate] - Optional start date filter
 * @param {string} [endDate] - Optional end date filter
 * @returns {Promise<SalesStatistics>} Sales statistics
 * @throws {Error} Database error
 */
export const getSalesStats = async (
  tenantId: string,
  startDate?: string,
  endDate?: string
): Promise<SalesStatistics> => {
  let query = supabase
    .from("sales")
    .select("total_amount, payment_status, created_at")
    .eq("tenant_id", tenantId)

  if (startDate) {
    query = query.gte("created_at", startDate)
  }

  if (endDate) {
    query = query.lte("created_at", endDate)
  }

  const { data, error } = await query

  if (error) throw error

  const totalSales = data.length
  const totalRevenue = data.reduce((sum, sale) => sum + sale.total_amount, 0)
  const paidSales = data.filter((s) => s.payment_status === PaymentStatus.Paid)
  const paidRevenue = paidSales.reduce((sum, sale) => sum + sale.total_amount, 0)
  const pendingRevenue = data
    .filter((s) => s.payment_status === PaymentStatus.Pending)
    .reduce((sum, sale) => sum + sale.total_amount, 0)

  return {
    totalSales,
    totalRevenue,
    paidSales: paidSales.length,
    paidRevenue,
    pendingRevenue,
    averageSaleValue: totalSales > 0 ? totalRevenue / totalSales : 0,
  }
}