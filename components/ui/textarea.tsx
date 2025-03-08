/**
 * @file components/ui/textarea.tsx
 * @description A customizable textarea component with consistent styling and focus states
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Props interface for the Textarea component
 * Extends all native textarea HTML attributes
 * 
 * @interface TextareaProps
 * @extends {React.TextareaHTMLAttributes<HTMLTextAreaElement>}
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea Component
 * 
 * A reusable textarea component that provides consistent styling and behavior.
 * Features:
 * - Minimum height constraint
 * - Full width by default
 * - Consistent border and padding
 * - Focus ring styling
 * - Disabled state handling
 * - Custom className support
 * 
 * @example
 * // Basic usage
 * <Textarea placeholder="Enter your message" />
 * 
 * @example
 * // With custom height
 * <Textarea className="min-h-[120px]" placeholder="Larger input area" />
 * 
 * @example
 * // Disabled state
 * <Textarea disabled value="Cannot edit this content" />
 * 
 * @example
 * // With form integration
 * <form>
 *   <Label htmlFor="message">Message</Label>
 *   <Textarea
 *     id="message"
 *     placeholder="Type your message here"
 *     required
 *   />
 * </form>
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex min-h-[80px] w-full rounded-md border border-input bg-background",
          // Padding and text
          "px-3 py-2 text-sm",
          // Ring offset
          "ring-offset-background",
          // Placeholder
          "placeholder:text-muted-foreground",
          // Focus styles
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Disabled state
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
Textarea.displayName = "Textarea"

export { Textarea }