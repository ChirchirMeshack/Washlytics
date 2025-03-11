import { ToastDemo } from "@/components/toast-demo"

export default function ToastDemoPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Toast Notification Demo</h1>
      <p className="text-muted-foreground mb-8">
        This page demonstrates the different types of toast notifications available in the Sparkle application.
      </p>
      <ToastDemo />
    </div>
  )
}

