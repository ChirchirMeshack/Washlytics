/**
 * @file components/ui/label.tsx
 * @description An accessible label component built on Radix UI primitives with
 * support for styling variants and peer states
 */

"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Label style variants using class-variance-authority
 * Features:
 * - Base text styling
 * - Responsive font size
 * - Medium font weight
 * - No line height
 * - Disabled state handling for peer elements
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * Label Component
 * 
 * An accessible form label that supports:
 * - Peer-based styling
 * - Disabled states
 * - Custom className
 * - Forward refs
 * 
 * @example
 * // Basic usage
 * <Label htmlFor="email">Email</Label>
 * 
 * @example
 * // With peer disabled state
 * <div>
 *   <Input disabled />
 *   <Label>This label will be dimmed</Label>
 * </div>
 * 
 * @example
 * // With custom className
 * <Label className="text-primary">Custom styled label</Label>
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }