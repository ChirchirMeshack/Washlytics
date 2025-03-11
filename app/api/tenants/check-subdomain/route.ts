/**
 * @file app/api/check-subdomain/route.ts
 * @description API route handler for checking subdomain availability
 */

import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-helpers"

/**
 * Subdomain availability checker endpoint
 * 
 * Verifies if a requested subdomain is available for use.
 * Subdomains must be unique across all tenants.
 * 
 * @route GET /api/check-subdomain?subdomain={subdomain}
 * 
 * @example
 * ```typescript
 * // Success Response (200)
 * {
 *   available: boolean
 * }
 * 
 * // Error Response (400)
 * {
 *   message: "Subdomain is required"
 * }
 * 
 * // Error Response (500)
 * {
 *   message: "Failed to check subdomain availability"
 * }
 * ```
 */
export async function GET(request: Request) {
  try {
    // Extract subdomain from query parameters
    const { searchParams } = new URL(request.url)
    const subdomain = searchParams.get("subdomain")

    // Validate subdomain presence
    if (!subdomain) {
      return NextResponse.json(
        { message: "Subdomain is required" },
        { status: 400 }
      )
    }

    // Check subdomain availability in database
    const { data, error } = await supabase
      .from("tenants")
      .select("id")
      .eq("subdomain", subdomain)
      .single()

    // Return availability status
    // Available if no data found (error will be present for no results)
    return NextResponse.json({
      available: !data && !!error,
    })
  } catch (error) {
    // Log and handle unexpected errors
    console.error("Error checking subdomain:", error)
    return NextResponse.json(
      { message: "Failed to check subdomain availability" },
      { status: 500 }
    )
  }
}