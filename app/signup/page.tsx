/**
 * @file app/auth/signup/page.tsx
 * @description User registration page with centered signup form
 */

import { SignUpForm } from "@/components/auth/sign-up-form"

/**
 * SignupPage Component
 * 
 * A page component that displays a centered signup form for user registration.
 * Features:
 * - Full viewport height
 * - Centered layout
 * - Responsive padding
 * - Semi-transparent background
 * - Integrated signup form
 * 
 * @example
 * // In app/auth/signup/page.tsx
 * export default SignupPage
 * 
 * @returns {JSX.Element} The rendered signup page
 */
export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <SignUpForm />
    </div>
  )
}