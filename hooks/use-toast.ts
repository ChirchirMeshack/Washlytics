"use client"

import { useToast as useToastOriginal } from "@/components/ui/use-toast"
import { toast as toastOriginal } from "@/components/ui/use-toast"

export const toast = toastOriginal

export function useToast() {
  const { toast, dismiss, ...rest } = useToastOriginal()

  // Enhanced toast variants
  const success = (props: Parameters<typeof toast>[0]) => {
    return toast({
      ...props,
      variant: "success",
    })
  }

  const error = (props: Parameters<typeof toast>[0]) => {
    return toast({
      ...props,
      variant: "destructive",
    })
  }

  const warning = (props: Parameters<typeof toast>[0]) => {
    return toast({
      ...props,
      variant: "warning",
    })
  }

  const info = (props: Parameters<typeof toast>[0]) => {
    return toast({
      ...props,
      variant: "info",
    })
  }

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
    ...rest,
  }
}

export default useToast

