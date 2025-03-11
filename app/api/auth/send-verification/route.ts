/**
 * @file app/api/verify-phone/route.ts
 * @description API route handler for phone verification using Twilio Verify
 */

import { NextResponse } from "next/server"
import twilio from "twilio"
import { supabase } from "@/lib/supabase-helpers"

/**
 * Registration verification request interface
 */
interface VerificationRequest {
  /** Phone number in E.164 format (e.g., +1234567890) */
  phoneNumber: string
  /** First name (optional, required for new registrations) */
  firstName?: string
  /** Last name (optional, required for new registrations) */
  lastName?: string
  /** Business name (optional, required for new registrations) */
  businessName?: string
  /** Subdomain (optional, required for new registrations) */
  subdomain?: string
}

// Initialize Twilio client with environment variables
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

/**
 * Phone verification endpoint
 * 
 * Handles phone verification for both new registrations and existing users:
 * 1. Validates phone number format (E.164)
 * 2. For new registrations:
 *    - Checks for existing users
 *    - Validates subdomain availability
 *    - Stores temporary registration data
 * 3. Sends verification code via Twilio
 * 
 * @route POST /api/verify-phone
 * 
 * @example
 * // New Registration Request
 * const response = await fetch('/api/verify-phone', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     phoneNumber: '+1234567890',
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     businessName: 'Acme Inc',
 *     subdomain: 'acme'
 *   })
 * });
 * 
 * // Login Verification Request
 * const response = await fetch('/api/verify-phone', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     phoneNumber: '+1234567890'
 *   })
 * });
 */
export async function POST(request: Request) {
  try {
    // Extract and validate request data
    const {
      phoneNumber,
      firstName,
      lastName,
      businessName,
      subdomain,
    }: VerificationRequest = await request.json()

    // Validate phone number format (E.164)
    if (!phoneNumber || !/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
      return NextResponse.json(
        { message: "Invalid phone number format" },
        { status: 400 }
      )
    }

    // Handle new user registration verification
    if (firstName && lastName && businessName && subdomain) {
      // Check for existing phone number
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("phone", phoneNumber)
        .single()

      if (existingUser) {
        return NextResponse.json(
          { message: "Phone number already registered" },
          { status: 400 }
        )
      }

      // Check subdomain availability
      const { data: existingTenant } = await supabase
        .from("tenants")
        .select("id")
        .eq("subdomain", subdomain)
        .single()

      if (existingTenant) {
        return NextResponse.json(
          { message: "Subdomain already taken" },
          { status: 400 }
        )
      }

      // Store registration data with 15-minute expiry
      const expiryTime = new Date(Date.now() + 15 * 60 * 1000)
      await supabase.from("temp_registrations").insert({
        phone: phoneNumber,
        first_name: firstName,
        last_name: lastName,
        business_name: businessName,
        subdomain: subdomain,
        expires_at: expiryTime.toISOString(),
      })
    }

    // Send verification code via Twilio Verify
    const verification = await twilioClient.verify.v2
      .services(verifyServiceSid!)
      .verifications.create({
        to: phoneNumber,
        channel: "sms"
      })

    return NextResponse.json({
      success: true,
      status: verification.status,
    })
  } catch (error) {
    console.error("Error sending verification:", error)
    return NextResponse.json(
      { message: "Failed to send verification code" },
      { status: 500 }
    )
  }
}