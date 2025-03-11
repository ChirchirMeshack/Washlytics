/**
 * @file app/auth/forgot-password/page.tsx
 * @description Forgot password page component that provides a password reset request interface
 */

import { PasswordResetForm } from "@/components/auth/password-reset-form"

/**
 * ForgotPasswordPage Component
 * 
 * A page component that displays a password reset request form in a centered layout.
 * Features:
 * - Centered form layout
 * - Full screen height
 * - Subtle background
 * - Responsive padding
 * 
 * @example
 * // Usage in app/auth/forgot-password/page.tsx
 * export default ForgotPasswordPage
 * 
 * @returns {JSX.Element} The rendered forgot password page
 */
export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <PasswordResetForm mode="request" />
    </div>
  )
}