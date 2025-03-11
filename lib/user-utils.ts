import { supabase } from "@/lib/supabase-helpers"
import { UserRole } from "@/types/supabase"

interface CreateUserProfileParams {
  userId: string
  email: string
  firstName: string
  lastName: string
  role?: UserRole
}

/**
 * Ensures a user profile exists in the profiles table
 */
export async function ensureUserProfile({
  userId,
  email,
  firstName,
  lastName,
  role = UserRole.Admin,
}: CreateUserProfileParams) {
  try {
    // Check if profile already exists
    const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", userId).maybeSingle()

    if (existingProfile) {
      // Profile exists, update it
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          email,
          first_name: firstName,
          last_name: lastName,
          role,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (updateError) {
        console.error("Error updating profile:", updateError)
        throw new Error("Failed to update user profile")
      }
    } else {
      // Profile doesn't exist, create it
      const { error: insertError } = await supabase.from("profiles").insert({
        id: userId,
        email,
        first_name: firstName,
        last_name: lastName,
        role,
      })

      if (insertError) {
        console.error("Error creating profile:", insertError)
        throw new Error("Failed to create user profile")
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in ensureUserProfile:", error)
    throw error
  }
}

