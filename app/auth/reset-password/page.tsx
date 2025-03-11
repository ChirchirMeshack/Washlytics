/**
 * @file app/auth/reset-password/page.tsx
 * @description Reset password page component for handling password updates
 */

import { PasswordResetForm } from "@/components/auth/password-reset-form"

/**
 * ResetPasswordPage Component
 * 
 * A page component that displays the password reset form in a centered layout.
 * This page is used when users follow the reset password link from their email.
 * 
 * Features:
 * - Centered form layout
 * - Full viewport height
 * - Responsive padding
 * - Subtle background
 * - Reset password form integration
 * 
 * @example
 * // In app/auth/reset-password/page.tsx
 * export default ResetPasswordPage
 * 
 * @returns {JSX.Element} The rendered reset password page
 */
export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <PasswordResetForm mode="reset" />
    </div>
  )
}