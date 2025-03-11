import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  console.log("Auth callback route triggered")

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    console.log("Auth code found, exchanging for session")
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      // Exchange the code for a session
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error("Error exchanging code for session:", exchangeError)
        // Still continue to try to get the user
      } else {
        console.log("Successfully exchanged code for session")
      }

      // Get the user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        console.error("Error getting user:", userError)
      }

      if (user) {
        console.log("User authenticated:", user.id)

        // Check if user has a profile
        console.log("Checking for existing profile...")
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (profileError) {
          console.log("Error checking profile:", profileError.message)
        }

        // If no profile exists, create one
        if (!profile) {
          console.log("No profile found, creating one...")
          const { error: createProfileError } = await supabase.from("user_profiles").insert({
            user_id: user.id,
            first_name: user.user_metadata.first_name || "",
            last_name: user.user_metadata.last_name || "",
          })

          if (createProfileError) {
            console.error("Error creating profile:", createProfileError)
          } else {
            console.log("Profile created successfully")
          }
        } else {
          console.log("Existing profile found")
        }

        // Check if user has a tenant
        console.log("Checking for existing tenant...")
        const { data: tenant, error: tenantError } = await supabase
          .from("tenants")
          .select("*")
          .eq("owner_id", user.id)
          .single()

        if (tenantError) {
          console.log("Error checking tenant:", tenantError.message)
        }

        // If no tenant exists but we have subdomain info, create one
        if (!tenant && user.user_metadata.subdomain && user.user_metadata.business_name) {
          console.log("No tenant found but metadata exists, creating tenant...")
          const { data: newTenant, error: createTenantError } = await supabase
            .from("tenants")
            .insert({
              name: user.user_metadata.business_name,
              subdomain: user.user_metadata.subdomain,
              owner_id: user.id,
              status: "active",
              plan: "basic",
            })
            .select()
            .single()

          if (createTenantError) {
            console.error("Error creating tenant:", createTenantError)
          } else if (newTenant) {
            console.log("Tenant created successfully:", newTenant.id)

            // Create user-tenant relationship
            console.log("Creating user-tenant relationship...")
            const { error: relationshipError } = await supabase.from("users_tenants").insert({
              user_id: user.id,
              tenant_id: newTenant.id,
              role: "owner",
            })

            if (relationshipError) {
              console.error("Error creating user-tenant relationship:", relationshipError)
            } else {
              console.log("User-tenant relationship created successfully")
            }

            // Set current tenant in user metadata
            console.log("Updating user metadata with current tenant...")
            const { error: updateUserError } = await supabase.auth.updateUser({
              data: {
                current_tenant: newTenant.id,
              },
            })

            if (updateUserError) {
              console.error("Error updating user metadata:", updateUserError)
            } else {
              console.log("User metadata updated successfully")
            }
          }
        } else if (tenant) {
          console.log("Existing tenant found:", tenant.id)
        } else {
          console.log("No tenant found and no metadata to create one")
        }

        // Check for pending tenant associations
        console.log("Checking for pending tenant associations...")
        const { data: pendingAssociation, error: pendingError } = await supabase
          .from("pending_tenant_associations")
          .select("*")
          .eq("email", user.email)
          .single()

        if (pendingError) {
          console.log("No pending associations found or error:", pendingError.message)
        } else if (pendingAssociation) {
          console.log("Found pending association, linking tenant:", pendingAssociation.tenant_id)

          // Update user profile with tenant ID
          const { error: updateProfileError } = await supabase
            .from("profiles")
            .update({ tenant_id: pendingAssociation.tenant_id })
            .eq("id", user.id)

          if (updateProfileError) {
            console.error("Error updating profile with tenant:", updateProfileError)
          } else {
            console.log("Profile updated with tenant successfully")
          }

          // Delete the pending association
          await supabase.from("pending_tenant_associations").delete().eq("id", pendingAssociation.id)
        }
      } else {
        console.log("No user found after authentication")
      }
    } catch (error) {
      console.error("Unexpected error in auth callback:", error)
    }
  } else {
    console.log("No auth code found in callback URL")
  }

  // Redirect to the dashboard
  console.log("Redirecting to dashboard")
  return NextResponse.redirect(new URL("/app/dashboard", request.url))
}

