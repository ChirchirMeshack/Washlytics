/**
 * @file components/ui/button.tsx
 * @description A versatile button component with multiple variants and sizes,
 * built using Radix UI Slot and class-variance-authority for style management.
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button variants configuration using class-variance-authority
 * Defines the base styles and variants for the button component
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium " +
  "ring-offset-background transition-colors focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      /**
       * Visual variants for different button purposes
       * @property {string} default - Primary action button
       * @property {string} destructive - Dangerous or delete actions
       * @property {string} outline - Secondary outlined button
       * @property {string} secondary - Alternative solid button
       * @property {string} ghost - Minimal background button
       * @property {string} link - Hyperlink-style button
       */
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      
      /**
       * Size variants for different button scales
       * @property {string} default - Standard size button
       * @property {string} sm - Small button
       * @property {string} lg - Large button
       * @property {string} icon - Square button for icons
       */
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    
    /**
     * Default variant settings if none specified
     */
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button component props interface
 * Extends standard button props with variant options and asChild support
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, the component will render its children as the root element
   * Useful for composing the button's styles with other elements like Link
   */
  asChild?: boolean
}

/**
 * Button Component
 * 
 * A polymorphic button component that supports multiple variants and sizes.
 * Can be rendered as a button element or any other element via asChild prop.
 * 
 * @example
 * // Default button
 * <Button>Click me</Button>
 * 
 * @example
 * // Destructive large button
 * <Button variant="destructive" size="lg">Delete</Button>
 * 
 * @example
 * // Link button
 * <Button asChild variant="link">
 *   <Link href="/some-page">Navigate</Link>
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot when asChild is true, otherwise use button element
    const Comp = asChild ? Slot : "button"
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, className }))} 
        ref={ref} 
        {...props} 
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }