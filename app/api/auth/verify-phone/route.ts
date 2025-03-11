import { NextResponse } from "next/server"
import twilio from "twilio"
import { supabase } from "@/lib/supabase-helpers"

export async function POST(request: Request) {
  console.log("Received verification request")

  try {
    // Log environment variables availability (not the actual values)
    console.log("Environment variables check:", {
      TWILIO_ACCOUNT_SID_exists: !!process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN_exists: !!process.env.TWILIO_AUTH_TOKEN,
      TWILIO_VERIFY_SERVICE_SID_exists: !!process.env.TWILIO_VERIFY_SERVICE_SID,
    })

    // Parse request body
    const body = await request.json()
    const { phoneNumber, code, firstName, lastName, businessName, subdomain } = body

    console.log("Request data received:", {
      phoneNumber: phoneNumber ? `${phoneNumber.substring(0, 3)}***` : undefined, // Log partial for privacy
      codeProvided: !!code,
      otherFieldsProvided: !!(firstName && lastName && businessName && subdomain),
    })

    // Validate inputs
    if (!phoneNumber || !code) {
      console.log("Validation failed: Missing phone number or code")
      return NextResponse.json(
        {
          valid: false,
          message: "Phone number and verification code are required",
        },
        { status: 400 },
      )
    }

    // Initialize Twilio client
    try {
      const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
      const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!

      console.log("Verifying code with Twilio...")

      // Verify the code with Twilio
      const verification = await twilioClient.verify.v2
        .services(verifyServiceSid)
        .verificationChecks.create({ to: phoneNumber, code })

      console.log("Twilio verification result:", {
        valid: verification.valid,
        status: verification.status,
      })

      if (!verification.valid || verification.status !== "approved") {
        return NextResponse.json(
          {
            valid: false,
            message: "Invalid verification code",
          },
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
      }

      // If this is a sign-up (has firstName, etc.), check temp registration
      if (firstName && lastName && businessName && subdomain) {
        console.log("Checking temporary registration...")
        const { data: tempReg, error } = await supabase
          .from("temp_registrations")
          .select("*")
          .eq("phone", phoneNumber)
          .gt("expires_at", new Date().toISOString())
          .single()

        if (error || !tempReg) {
          console.log("Temp registration not found or expired:", error)
          return NextResponse.json(
            {
              valid: false,
              message: "Registration session expired or not found",
            },
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
              },
            },
          )
        }

        console.log("Temporary registration found and valid")
      }

      return NextResponse.json(
        {
          valid: true,
          status: verification.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    } catch (twilioError) {
      console.error("Twilio API error:", twilioError)

      // Return a structured error response
      return NextResponse.json(
        {
          valid: false,
          message: "Failed to verify code with Twilio service",
          error: twilioError instanceof Error ? twilioError.message : String(twilioError),
        },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }
  } catch (error) {
    console.error("Error in verify-code API:", error)

    // Ensure we always return JSON, even for unexpected errors
    return NextResponse.json(
      {
        valid: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

