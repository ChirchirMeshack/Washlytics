/**
 * @file components/demo/toast-demo.tsx
 * @description Demonstration component for toast notification variants
 */

"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"

/**
 * ToastDemo Component
 * 
 * Demonstrates various toast notification styles and configurations.
 * Features:
 * - Default toast
 * - Success toast with icon
 * - Error toast with icon
 * - Warning toast with icon
 * - Info toast with icon
 * - Interactive toast with action button
 * 
 * @example
 * ```tsx
 * <ToastDemo />
 * ```
 */
export function ToastDemo() {
  /**
   * Shows a default toast notification
   */
  const showDefaultToast = () => {
    toast({
      title: "Default Toast",
      description: "This is a default toast notification",
    })
  }

  /**
   * Shows a success toast notification with checkmark icon
   */
  const showSuccessToast = () => {
    toast({
      variant: "success",
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Success</span>
        </div>
      ),
      description: "Your changes have been saved successfully!",
    })
  }

  /**
   * Shows an error toast notification with X icon
   */
  const showErrorToast = () => {
    toast({
      variant: "destructive",
      title: (
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <span>Error</span>
        </div>
      ),
      description: "There was a problem with your request.",
    })
  }

  /**
   * Shows a warning toast notification with alert icon
   */
  const showWarningToast = () => {
    toast({
      variant: "warning",
      title: (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>Warning</span>
        </div>
      ),
      description: "Your session is about to expire in 5 minutes.",
    })
  }

  /**
   * Shows an info toast notification with info icon
   */
  const showInfoToast = () => {
    toast({
      variant: "info",
      title: (
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span>Information</span>
        </div>
      ),
      description: "A new update is available for your application.",
    })
  }

  /**
   * Shows a toast notification with an interactive action button
   */
  const showToastWithAction = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => toast({ description: "Action clicked!" })}
        >
          Undo
        </Button>
      ),
    })
  }

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <CardTitle>Toast Notifications</CardTitle>
        <CardDescription>
          Click the buttons below to see different toast notifications
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Default Toast */}
        <Button onClick={showDefaultToast}>
          Default Toast
        </Button>

        {/* Success Toast */}
        <Button 
          onClick={showSuccessToast}
          className="bg-green-500 hover:bg-green-600"
        >
          Success Toast
        </Button>

        {/* Error Toast */}
        <Button 
          onClick={showErrorToast}
          variant="destructive"
        >
          Error Toast
        </Button>

        {/* Warning Toast */}
        <Button 
          onClick={showWarningToast}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          Warning Toast
        </Button>

        {/* Info Toast */}
        <Button 
          onClick={showInfoToast}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Info Toast
        </Button>

        {/* Action Toast */}
        <Button 
          onClick={showToastWithAction}
          variant="outline"
        >
          Toast with Action
        </Button>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Toast notifications will automatically disappear after a few seconds.
        </p>
      </CardFooter>
    </Card>
  )
}