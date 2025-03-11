/**
 * @file app/auth/login/page.tsx
 * @description Login page component with centered sign-in form
 */

import { SignInForm } from "@/components/auth/sign-in-form"

/**
 * LoginPage Component
 * 
 * A page component that displays a centered sign-in form.
 * Features:
 * - Centered layout
 * - Full viewport height
 * - Responsive padding
 * - Semi-transparent background
 * - Integrated sign-in form
 * 
 * @example
 * // In app/auth/login/page.tsx
 * export default LoginPage
 * 
 * @returns {JSX.Element} The rendered login page
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <SignInForm />
    </div>
  )
}