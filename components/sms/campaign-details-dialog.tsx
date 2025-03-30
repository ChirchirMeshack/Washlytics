"use client"

import { useState } from "react"
import { BarChart3, CheckCircle2, Clock, Download, RefreshCw, Send, Users, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Chart } from "@/components/ui/chart"

export function CampaignDetailsDialog({ campaign, children }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle>{campaign.name}</DialogTitle>
              <DialogDescription>Created on {formatDate(campaign.createdAt)}</DialogDescription>
            </div>
            <StatusBadge status={campaign.status} />
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="message">Message</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Recipients</div>
                <div className="text-2xl font-bold">{campaign.recipients}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Delivered</div>
                <div className="text-2xl font-bold">{campaign.delivered}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Failed</div>
                <div className="text-2xl font-bold">{campaign.failed}</div>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Cost</div>
                <div className="text-2xl font-bold">${campaign.cost.toFixed(2)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Campaign Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-sm font-medium">{formatStatus(campaign.status)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">{formatDate(campaign.createdAt)}</span>
                  </div>
                  <Separator />
                  {campaign.sentAt && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sent</span>
                        <span className="text-sm font-medium">{formatDate(campaign.sentAt)}</span>
                      </div>
                      <Separator />
                    </>
                  )}
                  {campaign.scheduledFor && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Scheduled For</span>
                        <span className="text-sm font-medium">{formatDate(campaign.scheduledFor)}</span>
                      </div>
                      <Separator />
                    </>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Delivery Rate</span>
                    <span className="text-sm font-medium">
                      {campaign.recipients > 0
                        ? `${((campaign.delivered / campaign.recipients) * 100).toFixed(1)}%`
                        : "N/A"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Failure Rate</span>
                    <span className="text-sm font-medium">
                      {campaign.recipients > 0
                        ? `${((campaign.failed / campaign.recipients) * 100).toFixed(1)}%`
                        : "N/A"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cost per Message</span>
                    <span className="text-sm font-medium">
                      {campaign.recipients > 0 ? `$${(campaign.cost / campaign.recipients).toFixed(3)}` : "N/A"}
                    </span>
                  </div>
                  <Separator />
                </div>
              </div>
            </div>

            {(campaign.status === "in-progress" || campaign.status === "completed") && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Delivery Progress</h3>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-primary h-4"
                    style={{
                      width: `${campaign.recipients > 0 ? (campaign.delivered / campaign.recipients) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>
                    {campaign.recipients > 0
                      ? `${((campaign.delivered / campaign.recipients) * 100).toFixed(1)}%`
                      : "0%"}
                  </span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="message" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Message Content</h3>
              <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">{campaign.message}</div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Characters: {campaign.message.length}/160</span>
                <span>Messages: {Math.ceil(campaign.message.length / 160)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Recipient Information</h3>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{campaign.recipients} recipients</span>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Recipient List
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-4">
            {campaign.status === "completed" || campaign.status === "in-progress" ? (
              <>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Delivery Status</h3>
                  <div className="h-[250px]">
                    <Chart
                      type="pie"
                      data={{
                        labels: ["Delivered", "Failed", "Pending"],
                        datasets: [
                          {
                            label: "Status",
                            data: [campaign.delivered, campaign.failed, campaign.pending],
                            backgroundColor: [
                              "rgba(34, 197, 94, 0.7)",
                              "rgba(239, 68, 68, 0.7)",
                              "rgba(234, 179, 8, 0.7)",
                            ],
                            borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)", "rgba(234, 179, 8, 1)"],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Delivery Timeline</h3>
                  <div className="h-[250px]">
                    <Chart
                      type="line"
                      data={{
                        labels: ["0min", "5min", "10min", "15min", "20min", "25min", "30min"],
                        datasets: [
                          {
                            label: "Messages Delivered",
                            data: generateTimelineData(campaign),
                            borderColor: "rgba(59, 130, 246, 1)",
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            tension: 0.3,
                            fill: true,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No analytics available</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                  Analytics will be available once the campaign has been sent or is in progress.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            {campaign.status === "draft" && (
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Send Now
              </Button>
            )}
            {campaign.status === "scheduled" && <Button variant="destructive">Cancel Campaign</Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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

function formatStatus(status) {
  switch (status) {
    case "scheduled":
      return "Scheduled"
    case "in-progress":
      return "In Progress"
    case "completed":
      return "Completed"
    case "failed":
      return "Failed"
    case "draft":
      return "Draft"
    default:
      return status
  }
}

function generateTimelineData(campaign) {
  // This is a mock function to generate timeline data
  // In a real application, this would come from the API
  if (campaign.status === "completed") {
    return [0, 45, 120, 189, 220, 237, 237]
  } else if (campaign.status === "in-progress") {
    return [0, 45, 120, 189, 220, 289, null]
  }
  return [0, 0, 0, 0, 0, 0, 0]
}

