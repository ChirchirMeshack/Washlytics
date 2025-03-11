import { supabase } from "@/lib/supabase-helpers"
import { UserRole } from "@/types/supabase"

interface CreateTenantParams {
  name: string
  subdomain: string
  ownerEmail: string
  ownerFirstName: string
  ownerLastName: string
  userId?: string // Make userId optional
}

// Add better error handling and logging to the createTenant function
export async function createTenant({
  name,
  subdomain,
  ownerEmail,
  ownerFirstName,
  ownerLastName,
  userId, // Optional userId
}: CreateTenantParams) {
  try {
    console.log("Creating tenant:", { name, subdomain, ownerEmail, userId: userId ? "provided" : "not provided" })

    let ownerId = userId

    // If userId is not provided, try to get it from auth system
    if (!ownerId) {
      console.log("No userId provided, attempting to find user by email:", ownerEmail)

      // Try to get user from auth system
      const { data: authUser, error: authUserError } = await supabase.auth.admin.getUserByEmail(ownerEmail)

      if (authUserError) {
        console.log("Error finding user by email:", authUserError.message)
      }

      if (authUser) {
        ownerId = authUser.id
        console.log("Found user in auth system:", ownerId)
      } else {
        console.log("User not found in auth system, will create profile after email verification")
        // We'll proceed without a userId and rely on email for association later
      }
    }

    // Create the tenant
    console.log("Inserting tenant record...")
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .insert({
        name,
        subdomain,
        owner_id: ownerId || null, // Use null if ownerId is not available
      })
      .select()
      .single()

    if (tenantError) {
      console.error("Error creating tenant:", tenantError)
      throw new Error(`Failed to create tenant: ${tenantError.message}`)
    }

    console.log("Tenant created successfully with ID:", tenant.id)

    // If we have a userId, update the profile
    if (ownerId) {
      console.log("Updating user profile with tenant ID...")
      // Check if profile exists
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", ownerId)
        .maybeSingle()

      if (profileCheckError) {
        console.log("Error checking for existing profile:", profileCheckError.message)
      }

      if (existingProfile) {
        console.log("Updating existing profile...")
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            tenant_id: tenant.id,
            role: UserRole.Admin,
            first_name: ownerFirstName,
            last_name: ownerLastName,
            email: ownerEmail,
          })
          .eq("id", ownerId)

        if (updateError) {
          console.error("Error updating profile:", updateError)
        } else {
          console.log("Profile updated successfully")
        }
      } else {
        console.log("Creating new profile...")
        const { error: insertError } = await supabase.from("profiles").insert({
          id: ownerId,
          tenant_id: tenant.id,
          role: UserRole.Admin,
          first_name: ownerFirstName,
          last_name: ownerLastName,
          email: ownerEmail,
        })

        if (insertError) {
          console.error("Error creating profile:", insertError)
        } else {
          console.log("Profile created successfully")
        }
      }
    }

    // Store email association for later linking
    if (!ownerId) {
      console.log("Storing pending tenant association for email:", ownerEmail)
      const { error: pendingError } = await supabase.from("pending_tenant_associations").insert({
        tenant_id: tenant.id,
        email: ownerEmail,
        first_name: ownerFirstName,
        last_name: ownerLastName,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days expiry
      })

      if (pendingError) {
        console.error("Error creating pending association:", pendingError)
      } else {
        console.log("Pending association created successfully")
      }
    }

    // Create default tenant settings
    console.log("Creating default tenant settings...")
    const { error: settingsError } = await supabase.from("tenant_settings").insert([
      {
        tenant_id: tenant.id,
        key: "theme",
        value: { primary: "#0ea5e9", mode: "light" },
      },
      {
        tenant_id: tenant.id,
        key: "notifications",
        value: { email: true, sms: true, appointment_reminders: true },
      },
      {
        tenant_id: tenant.id,
        key: "business_hours",
        value: {
          monday: { open: "09:00", close: "18:00", closed: false },
          tuesday: { open: "09:00", close: "18:00", closed: false },
          wednesday: { open: "09:00", close: "18:00", closed: false },
          thursday: { open: "09:00", close: "18:00", closed: false },
          friday: { open: "09:00", close: "18:00", closed: false },
          saturday: { open: "10:00", close: "16:00", closed: false },
          sunday: { open: "10:00", close: "16:00", closed: true },
        },
      },
    ])

    if (settingsError) {
      console.error("Error creating tenant settings:", settingsError)
    } else {
      console.log("Tenant settings created successfully")
    }

    return tenant
  } catch (error) {
    console.error("Error in createTenant:", error)
    throw error
  }
}

