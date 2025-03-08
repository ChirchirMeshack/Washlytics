/**
 * @file components/ui/input.tsx
 * @description A customizable input component with consistent styling and focus states
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Props interface for the Input component
 * Extends all native input HTML attributes
 * 
 * @interface InputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input Component
 * 
 * A reusable input component that provides consistent styling and behavior across the application.
 * Features:
 * - Consistent height and padding
 * - Border and background styling
 * - Focus and hover states
 * - File input support
 * - Disabled state styling
 * - Placeholder text styling
 * - Custom className support
 * 
 * @example
 * // Basic usage
 * <Input type="text" placeholder="Enter your name" />
 * 
 * @example
 * // With additional styling
 * <Input 
 *   type="email" 
 *   className="max-w-sm" 
 *   placeholder="Enter your email"
 *   required
 * />
 * 
 * @example
 * // File input
 * <Input type="file" accept="image/*" />
 * 
 * @example
 * // Disabled state
 * <Input type="text" disabled value="Cannot edit" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          // Ring offset
          "ring-offset-background",
          // File input styles
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          // Placeholder
          "placeholder:text-muted-foreground",
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Disabled styles
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Custom classes
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }