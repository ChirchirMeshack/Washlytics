"use client"

import { toast as toastOriginal, type ToasterToast } from "@/components/ui/use-toast"

type ToastProps = Omit<ToasterToast, "id">

// Enhanced toast hook that extends the base functionality
export function useToast() {
  // Get the original toast functionality
  const { toast: originalToast, dismiss, ...rest } = toastOriginal

  // Create enhanced toast variants
  const success = (props: ToastProps) => {
    return originalToast({
      ...props,
      variant: "success",
    })
  }

  const error = (props: ToastProps) => {
    return originalToast({
      ...props,
      variant: "destructive",
    })
  }

  const warning = (props: ToastProps) => {
    return originalToast({
      ...props,
      variant: "warning",
    })
  }

  const info = (props: ToastProps) => {
    return originalToast({
      ...props,
      variant: "info",
    })
  }

  // Return the enhanced toast functionality
  return {
    toast: originalToast,
    success,
    error,
    warning,
    info,
    dismiss,
    ...rest,
  }
}

// Export the toast function directly for convenience
export const toast = toastOriginal

