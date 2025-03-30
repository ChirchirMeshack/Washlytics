import type { Metadata } from "next"
import { CalendarClock, CheckCircle2, Clock, Filter, Plus, RefreshCw, Search, Send, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreateCampaignDialog } from "@/components/sms/create-campaign-dialog"
import { CampaignDetailsDialog } from "@/components/sms/campaign-details-dialog"

export const metadata: Metadata = {
  title: "SMS Campaigns | Sparkle",
  description: "Create and manage your SMS campaigns",
}

// Sample campaign data
const campaigns = [
  {
    id: "camp-001",
    name: "Weekend Special Promotion",
    status: "scheduled",
    recipients: 156,
    delivered: 0,
    failed: 0,
    pending: 156,
    createdAt: "2025-03-15T10:30:00Z",
    scheduledFor: "2025-03-20T08:00:00Z",
    message:
      "Get 20% off on all premium wash packages this weekend! Use code WEEKEND20. Valid Sat-Sun only. Reply STOP to opt out.",
    cost: 7.8,
  },
  {
    id: "camp-002",
    name: "March Loyalty Rewards",
    status: "completed",
    recipients: 243,
    delivered: 237,
    failed: 6,
    pending: 0,
    createdAt: "2025-03-10T14:15:00Z",
    sentAt: "2025-03-10T15:00:00Z",
    message:
      "Thank you for your loyalty! You've earned a free interior cleaning with your next wash. Show this SMS to redeem. Valid until 03/31. Reply STOP to opt out.",
    cost: 12.15,
  },
  {
    id: "camp-003",
    name: "New Service Announcement",
    status: "in-progress",
    recipients: 412,
    delivered: 289,
    failed: 8,
    pending: 115,
    createdAt: "2025-03-17T09:45:00Z",
    sentAt: "2025-03-17T10:00:00Z",
    message:
      "Introducing our new Ceramic Coating service! Long-lasting protection for your vehicle. Book now and get 15% off your first coating. Reply STOP to opt out.",
    cost: 20.6,
  },
  {
    id: "camp-004",
    name: "Maintenance Reminder",
    status: "failed",
    recipients: 78,
    delivered: 0,
    failed: 78,
    pending: 0,
    createdAt: "2025-03-16T16:20:00Z",
    sentAt: "2025-03-16T16:30:00Z",
    message:
      "Your vehicle is due for maintenance! Schedule your service appointment today and receive a complimentary wash. Call us at (555) 123-4567. Reply STOP to opt out.",
    cost: 0,
  },
  {
    id: "camp-005",
    name: "Holiday Hours Notification",
    status: "draft",
    recipients: 0,
    delivered: 0,
    failed: 0,
    pending: 0,
    createdAt: "2025-03-18T11:10:00Z",
    message:
      "Please note our special holiday hours for the upcoming weekend: Fri 8am-6pm, Sat 9am-5pm, Sun Closed. We'll resume normal hours on Monday. Reply STOP to opt out.",
    cost: 0,
  },
]

export default function CampaignsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SMS Campaigns</h1>
          <p className="text-muted-foreground">Create and manage your SMS marketing campaigns</p>
        </div>
        <CreateCampaignDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </CreateCampaignDialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search campaigns..." className="pl-8 w-full" />
        </div>
        <Button variant="outline" className="md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="md:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="scheduled" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns
              .filter((campaign) => campaign.status === "scheduled")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns
              .filter((campaign) => campaign.status === "in-progress")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns
              .filter((campaign) => campaign.status === "completed")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns
              .filter((campaign) => campaign.status === "draft")
              .map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CampaignCard({ campaign }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{campaign.name}</CardTitle>
          <StatusBadge status={campaign.status} />
        </div>
        <CardDescription>
          {campaign.status === "scheduled" ? (
            <div className="flex items-center text-sm">
              <CalendarClock className="mr-1 h-4 w-4" />
              Scheduled for {formatDate(campaign.scheduledFor)}
            </div>
          ) : campaign.status === "completed" || campaign.status === "in-progress" || campaign.status === "failed" ? (
            <div className="flex items-center text-sm">
              <Clock className="mr-1 h-4 w-4" />
              Sent on {formatDate(campaign.sentAt)}
            </div>
          ) : (
            <div className="flex items-center text-sm">
              <Clock className="mr-1 h-4 w-4" />
              Created on {formatDate(campaign.createdAt)}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm text-muted-foreground line-clamp-2 mb-3">{campaign.message}</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Recipients</span>
            <span className="font-medium">{campaign.recipients}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Cost</span>
            <span className="font-medium">${campaign.cost.toFixed(2)}</span>
          </div>
          {(campaign.status === "completed" || campaign.status === "in-progress" || campaign.status === "failed") && (
            <>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Delivered</span>
                <span className="font-medium">{campaign.delivered}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Failed</span>
                <span className="font-medium">{campaign.failed}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <CampaignDetailsDialog campaign={campaign}>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </CampaignDetailsDialog>
          {campaign.status === "draft" && (
            <Button size="sm">
              <Send className="mr-2 h-3 w-3" />
              Send
            </Button>
          )}
          {campaign.status === "scheduled" && (
            <Button size="sm" variant="outline">
              <CalendarClock className="mr-2 h-3 w-3" />
              Reschedule
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }) {
  switch (status) {
    case "scheduled":
      return (
        <Badge
          variant="outline"
          className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400"
        >
          <Clock className="mr-1 h-3 w-3" />
          Scheduled
        </Badge>
      )
    case "in-progress":
      return (
        <Badge
          variant="outline"
          className="border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400"
        >
          <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
          In Progress
        </Badge>
      )
    case "completed":
      return (
        <Badge
          variant="outline"
          className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
        >
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      )
    case "failed":
      return (
        <Badge
          variant="outline"
          className="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
        >
          <XCircle className="mr-1 h-3 w-3" />
          Failed
        </Badge>
      )
    case "draft":
      return (
        <Badge
          variant="outline"
          className="border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400"
        >
          Draft
        </Badge>
      )
    default:
      return null
  }
}

function formatDate(dateString) {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

