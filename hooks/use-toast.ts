import type { ToasterToast } from "@/components/ui/use-toast"
import { useToast as useToastOriginal } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Re-export the useToast hook with additional functionality specific to Sparkle SaaS
export const useToast = () => {
  const { toast, dismiss, toasts } = useToastOriginal()

  // Enhanced toast function with Sparkle-specific defaults
  const sparkleToast = (props: Omit<ToasterToast, "id">) => {
    return toast({
      ...props,
      // You can add Sparkle-specific defaults here
      className: cn(
        "bg-background border-border",
        props.variant === "destructive" && "border-destructive bg-destructive/10",
        props.variant === "success" && "border-green-500 bg-green-500/10",
        props.className,
      ),
    })
  }

  // Add Sparkle-specific toast variants
  const success = (props: Omit<ToasterToast, "id" | "variant">) => {
    return sparkleToast({
      ...props,
      variant: "success",
    })
  }

  const error = (props: Omit<ToasterToast, "id" | "variant">) => {
    return sparkleToast({
      ...props,
      variant: "destructive",
    })
  }

  const info = (props: Omit<ToasterToast, "id" | "variant">) => {
    return sparkleToast({
      ...props,
      variant: "default",
      className: cn("border-blue-500 bg-blue-500/10", props.className),
    })
  }

  const warning = (props: Omit<ToasterToast, "id" | "variant">) => {
    return sparkleToast({
      ...props,
      variant: "default",
      className: cn("border-yellow-500 bg-yellow-500/10", props.className),
    })
  }

  return {
    toast: sparkleToast,
    dismiss,
    toasts,
    success,
    error,
    info,
    warning,
  }
}

export type { ToasterToast }

