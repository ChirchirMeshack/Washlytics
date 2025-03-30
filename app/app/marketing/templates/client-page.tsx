"use client"

import { Check, Copy, Edit, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreateTemplateDialog } from "@/components/sms/create-template-dialog"

// Sample template data
const templates = [
  {
    id: "temp-001",
    name: "Appointment Reminder",
    content:
      "Hi {{name}}, this is a reminder about your car wash appointment tomorrow at {{time}}. Please arrive 10 minutes early. Reply C to confirm or R to reschedule.",
    category: "Reminders",
    variables: ["name", "time"],
    createdAt: "2025-02-10T14:30:00Z",
    updatedAt: "2025-02-15T09:45:00Z",
  },
  {
    id: "temp-002",
    name: "Special Promotion",
    content:
      "{{name}}, enjoy a special {{discount}}% discount on your next visit to {{location}}! Valid until {{expiry_date}}. Show this message to redeem. T&Cs apply.",
    category: "Marketing",
    variables: ["name", "discount", "location", "expiry_date"],
    createdAt: "2025-01-20T11:15:00Z",
    updatedAt: "2025-01-20T11:15:00Z",
  },
  {
    id: "temp-003",
    name: "Service Completion",
    content:
      "Hi {{name}}, your vehicle is ready for pickup! We've completed the {{service_type}} service. Total: ${{amount}}. Thank you for choosing us!",
    category: "Notifications",
    variables: ["name", "service_type", "amount"],
    createdAt: "2025-02-05T16:20:00Z",
    updatedAt: "2025-03-01T10:30:00Z",
  },
  {
    id: "temp-004",
    name: "Feedback Request",
    content:
      "Hi {{name}}, thank you for visiting our {{location}} branch. We'd love to hear your feedback! Please rate your experience: {{feedback_link}}",
    category: "Feedback",
    variables: ["name", "location", "feedback_link"],
    createdAt: "2025-02-18T13:40:00Z",
    updatedAt: "2025-02-18T13:40:00Z",
  },
  {
    id: "temp-005",
    name: "Loyalty Program",
    content:
      "Congratulations {{name}}! You've earned {{points}} loyalty points from your recent visits. You now have a total of {{total_points}} points. Redeem them on your next visit!",
    category: "Marketing",
    variables: ["name", "points", "total_points"],
    createdAt: "2025-01-15T09:10:00Z",
    updatedAt: "2025-02-28T14:25:00Z",
  },
  {
    id: "temp-006",
    name: "Holiday Greetings",
    content:
      "Season's Greetings from all of us at Sparkle Car Wash! Wishing you and your family a wonderful holiday season. As a token of appreciation, enjoy {{discount}}% off your next wash!",
    category: "Marketing",
    variables: ["discount"],
    createdAt: "2025-03-10T11:30:00Z",
    updatedAt: "2025-03-10T11:30:00Z",
  },
]

export default function ClientPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SMS Templates</h1>
          <p className="text-muted-foreground">Create and manage reusable message templates</p>
        </div>
        <CreateTemplateDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </CreateTemplateDialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search templates..." className="pl-8 w-full" />
        </div>
        <Button variant="outline" className="md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="marketing" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates
              .filter((template) => template.category === "Marketing")
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="reminders" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates
              .filter((template) => template.category === "Reminders")
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates
              .filter((template) => template.category === "Notifications")
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="feedback" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates
              .filter((template) => template.category === "Feedback")
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TemplateCard({ template }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(template.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{template.name}</CardTitle>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        <CardDescription>Last updated {formatDate(template.updatedAt)}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm text-muted-foreground mb-3 bg-muted p-3 rounded-md">{template.content}</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {template.variables.map((variable) => (
            <Badge key={variable} variant="secondary" className="text-xs">
              {`{{${variable}}}`}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-3 w-3" />
                Copy
              </>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  )
}

function formatDate(dateString) {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

