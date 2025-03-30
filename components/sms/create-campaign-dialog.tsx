"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample recipient groups
const recipientGroups = [
  { value: "all-customers", label: "All Customers", count: 1245 },
  { value: "premium-members", label: "Premium Members", count: 387 },
  { value: "new-customers", label: "New Customers (Last 30 Days)", count: 156 },
  { value: "inactive-customers", label: "Inactive Customers", count: 432 },
  { value: "birthday-month", label: "Birthday This Month", count: 78 },
]

// Sample templates
const templates = [
  {
    id: "temp-001",
    name: "Appointment Reminder",
    content:
      "Hi {{name}}, this is a reminder about your car wash appointment tomorrow at {{time}}. Please arrive 10 minutes early. Reply C to confirm or R to reschedule.",
  },
  {
    id: "temp-002",
    name: "Special Promotion",
    content:
      "{{name}}, enjoy a special {{discount}}% discount on your next visit to {{location}}! Valid until {{expiry_date}}. Show this message to redeem. T&Cs apply.",
  },
  {
    id: "temp-003",
    name: "Service Completion",
    content:
      "Hi {{name}}, your vehicle is ready for pickup! We've completed the {{service_type}} service. Total: ${{amount}}. Thank you for choosing us!",
  },
]

export function CreateCampaignDialog({ children }) {
  const [open, setOpen] = useState(false)
  const [recipientOpen, setRecipientOpen] = useState(false)
  const [selectedRecipient, setSelectedRecipient] = useState(null)
  const [date, setDate] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [messageContent, setMessageContent] = useState("")
  const [characterCount, setCharacterCount] = useState(0)
  const [campaignName, setCampaignName] = useState("")
  const [sendNow, setSendNow] = useState(true)

  const handleTemplateSelect = (templateId) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
      setMessageContent(template.content)
      setCharacterCount(template.content.length)
    }
  }

  const handleMessageChange = (e) => {
    setMessageContent(e.target.value)
    setCharacterCount(e.target.value.length)
  }

  const handleSubmit = () => {
    // Here you would integrate with Africa's Talking API
    console.log({
      name: campaignName,
      recipients: selectedRecipient,
      message: messageContent,
      scheduledDate: sendNow ? null : date,
    })
    setOpen(false)
    // Reset form
    setCampaignName("")
    setSelectedRecipient(null)
    setMessageContent("")
    setDate(null)
    setSelectedTemplate(null)
    setSendNow(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New SMS Campaign</DialogTitle>
          <DialogDescription>Create a new SMS campaign to send to your customers.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="campaign-name" className="text-right">
              Campaign Name
            </Label>
            <Input
              id="campaign-name"
              placeholder="Enter campaign name"
              className="col-span-3"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Recipients</Label>
            <div className="col-span-3">
              <Popover open={recipientOpen} onOpenChange={setRecipientOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={recipientOpen}
                    className="w-full justify-between"
                  >
                    {selectedRecipient
                      ? recipientGroups.find((group) => group.value === selectedRecipient)?.label
                      : "Select recipient group"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search recipient groups..." />
                    <CommandList>
                      <CommandEmpty>No recipient group found.</CommandEmpty>
                      <CommandGroup>
                        {recipientGroups.map((group) => (
                          <CommandItem
                            key={group.value}
                            value={group.value}
                            onSelect={(currentValue) => {
                              setSelectedRecipient(currentValue === selectedRecipient ? null : currentValue)
                              setRecipientOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedRecipient === group.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            <div className="flex flex-1 items-center justify-between">
                              <span>{group.label}</span>
                              <Badge variant="secondary">{group.count}</Badge>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Message</Label>
            <div className="col-span-3 space-y-2">
              <Tabs defaultValue="compose">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="compose">Compose</TabsTrigger>
                  <TabsTrigger value="template">Use Template</TabsTrigger>
                </TabsList>
                <TabsContent value="compose">
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-[120px]"
                    value={messageContent}
                    onChange={handleMessageChange}
                  />
                </TabsContent>
                <TabsContent value="template">
                  <Select onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTemplate && (
                    <div className="mt-2">
                      <Textarea className="min-h-[120px]" value={messageContent} onChange={handleMessageChange} />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Characters: {characterCount}/160</span>
                <span>Messages: {Math.ceil(characterCount / 160)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Sending Options</Label>
            <div className="col-span-3">
              <Tabs defaultValue={sendNow ? "now" : "schedule"} onValueChange={(value) => setSendNow(value === "now")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="now">Send Now</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="now">
                  <p className="text-sm text-muted-foreground mt-2">
                    The campaign will be sent immediately after creation.
                  </p>
                </TabsContent>
                <TabsContent value="schedule">
                  <div className="flex flex-col space-y-2 mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP HH:mm") : "Select date and time"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        <div className="p-3 border-t border-border">
                          <Select
                            onValueChange={(value) => {
                              if (date) {
                                const newDate = new Date(date)
                                const [hours, minutes] = value.split(":").map(Number)
                                newDate.setHours(hours, minutes)
                                setDate(newDate)
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }).map((_, hour) => (
                                <>
                                  <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                    {`${hour.toString().padStart(2, "0")}:00`}
                                  </SelectItem>
                                  <SelectItem key={`${hour}:30`} value={`${hour}:30`}>
                                    {`${hour.toString().padStart(2, "0")}:30`}
                                  </SelectItem>
                                </>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Campaign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

