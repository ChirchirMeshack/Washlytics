import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-helpers"
import { UserRole } from "@/types/supabase"
import { createTenant } from "@/lib/tenant-utils"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { randomUUID } from "crypto"

export async function POST(request: Request) {
  console.log("Received create-phone-user request")

  try {
    // Parse request body
    const body = await request.json()
    const { phoneNumber, firstName, lastName, businessName, subdomain } = body

    console.log("Request data received:", {
      phoneNumber: phoneNumber ? `${phoneNumber.substring(0, 3)}***` : undefined, // Log partial for privacy
      firstName: !!firstName,
      lastName: !!lastName,
      businessName: !!businessName,
      subdomain: !!subdomain,
    })

    // Validate inputs
    if (!phoneNumber || !firstName || !lastName || !businessName || !subdomain) {
      console.log("Validation failed: Missing required fields")
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Get temp registration to confirm verification was completed
    console.log("Checking temporary registration...")
    const { data: tempReg, error: tempRegError } = await supabase
      .from("temp_registrations")
      .select("*")
      .eq("phone", phoneNumber)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (tempRegError || !tempReg) {
      console.log("Temp registration not found or expired:", tempRegError)
      return NextResponse.json(
        {
          success: false,
          message: "Verification session expired or not found",
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

    // Create a random password for the user (they'll use phone auth)
    const randomPassword = randomUUID()

    // Create the user in Supabase Auth
    console.log("Creating user in Supabase Auth...")
    const cookieStore = cookies()
    const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: { path: string; maxAge: number; domain: string }) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: { path: string; maxAge: number; domain: string }) {
            cookieStore.set({ name, value: "", ...options })
          },
        },
      },
    )

    // Create user with phone auth
    const { data: authData, error: authError } = await supabaseServer.auth.signUp({
      email: `${phoneNumber.replace(/\+/g, "")}@phone.sparkle.com`, // Create a virtual email
      password: randomPassword,
      phone: phoneNumber,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          business_name: businessName,
          subdomain: subdomain,
          phone_verified: true,
          roles: [UserRole.Admin],
        },
      },
    })

    if (authError || !authData.user) {
      console.error("Failed to create user account:", authError)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create user account",
          error: authError?.message,
        },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    console.log("User created successfully with ID:", authData.user.id)

    // Create profile record
    console.log("Creating user profile...")
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email: authData.user.email,
      phone: phoneNumber,
      first_name: firstName,
      last_name: lastName,
      role: UserRole.Admin,
    })

    if (profileError) {
      console.error("Error creating profile:", profileError)
      // Continue anyway, as the auth user was created
    } else {
      console.log("Profile created successfully")
    }

    // Create tenant
    console.log("Creating tenant...")
    try {
      await createTenant({
        name: businessName,
        subdomain: subdomain,
        ownerEmail: authData.user.email!,
        ownerFirstName: firstName,
        ownerLastName: lastName,
        userId: authData.user.id,
      })
      console.log("Tenant created successfully")
    } catch (tenantError) {
      console.error("Error creating tenant:", tenantError)
      // We'll continue and let the user retry tenant creation if needed
    }

    // Clean up temp registration
    console.log("Cleaning up temporary registration...")
    await supabase.from("temp_registrations").delete().eq("phone", phoneNumber)

    // Create a session token
    console.log("Creating session token...")
    const { data: sessionData } = await supabaseServer.auth.getSession()

    return NextResponse.json(
      {
        success: true,
        userId: authData.user.id,
        token: sessionData.session?.access_token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user account",
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

