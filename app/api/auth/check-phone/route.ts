/**
 * @file app/api/check-phone/route.ts
 * @description API route handler for checking phone number existence in profiles
 */

import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-helpers"

/**
 * Phone number verification endpoint
 * 
 * Checks if a phone number already exists in the profiles table.
 * 
 * @route GET /api/check-phone?phone={phoneNumber}
 * 
 * @param {Request} request - The incoming HTTP request
 * @returns {Promise<NextResponse>} JSON response indicating if phone exists
 * 
 * @example
 * ```typescript
 * // Success Response (200)
 * {
 *   exists: boolean
 * }
 * 
 * // Error Response (400)
 * {
 *   message: "Phone number is required"
 * }
 * 
 * // Error Response (500)
 * {
 *   message: "Failed to check phone number"
 * }
 * ```
 */
export async function GET(request: Request) {
  try {
    // Extract phone number from query parameters
    const { searchParams } = new URL(request.url)
    const phone = searchParams.get("phone")

    // Validate phone number presence
    if (!phone) {
      return NextResponse.json(
        { message: "Phone number is required" },
        { status: 400 }
      )
    }

    // Query database for phone number
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", phone)
      .single()

    // Return existence status
    return NextResponse.json({
      exists: !!data && !error,
    })
  } catch (error) {
    // Log and handle unexpected errors
    console.error("Error checking phone:", error)
    return NextResponse.json(
      { message: "Failed to check phone number" },
      { status: 500 }
    )
  }
}