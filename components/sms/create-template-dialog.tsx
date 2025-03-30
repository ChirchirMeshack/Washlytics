"use client"

import { useState } from "react"

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
import { Badge } from "@/components/ui/badge"

// Sample categories
const categories = [
  { value: "marketing", label: "Marketing" },
  { value: "reminders", label: "Reminders" },
  { value: "notifications", label: "Notifications" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
]

// Sample variables
const commonVariables = [
  { name: "name", description: "Customer's name" },
  { name: "location", description: "Branch location" },
  { name: "time", description: "Appointment time" },
  { name: "date", description: "Appointment date" },
  { name: "service_type", description: "Type of service" },
  { name: "amount", description: "Payment amount" },
  { name: "discount", description: "Discount percentage" },
  { name: "expiry_date", description: "Expiry date for offer" },
  { name: "points", description: "Loyalty points earned" },
  { name: "total_points", description: "Total loyalty points" },
  { name: "feedback_link", description: "Link to feedback form" },
]

export function CreateTemplateDialog({ children }) {
  const [open, setOpen] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [characterCount, setCharacterCount] = useState(0)
  const [selectedVariables, setSelectedVariables] = useState([])

  const handleContentChange = (e) => {
    setContent(e.target.value)
    setCharacterCount(e.target.value.length)

    // Extract variables from content
    const regex = /{{([^}]+)}}/g
    const matches = [...e.target.value.matchAll(regex)]
    const variables = matches.map((match) => match[1].trim())
    setSelectedVariables([...new Set(variables)])
  }

  const insertVariable = (variable) => {
    const newContent = `${content}{{${variable}}}`
    setContent(newContent)
    setCharacterCount(newContent.length)

    if (!selectedVariables.includes(variable)) {
      setSelectedVariables([...selectedVariables, variable])
    }
  }

  const handleSubmit = () => {
    // Here you would save the template to your database
    console.log({
      name: templateName,
      category,
      content,
      variables: selectedVariables,
    })
    setOpen(false)
    // Reset form
    setTemplateName("")
    setCategory("")
    setContent("")
    setCharacterCount(0)
    setSelectedVariables([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New SMS Template</DialogTitle>
          <DialogDescription>Create a reusable template for your SMS campaigns.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="template-name" className="text-right">
              Template Name
            </Label>
            <Input
              id="template-name"
              placeholder="Enter template name"
              className="col-span-3"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2">
              Content
            </Label>
            <div className="col-span-3 space-y-2">
              <Textarea
                id="content"
                placeholder="Type your template content here..."
                className="min-h-[120px]"
                value={content}
                onChange={handleContentChange}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Characters: {characterCount}/160</span>
                <span>Messages: {Math.ceil(characterCount / 160)}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Variables</Label>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedVariables.map((variable) => (
                  <Badge key={variable} variant="secondary">
                    {`{{${variable}}}`}
                  </Badge>
                ))}
                {selectedVariables.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    No variables selected. Insert variables using the buttons below.
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {commonVariables.map((variable) => (
                  <Button
                    key={variable.name}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable(variable.name)}
                    className="text-xs"
                  >
                    {variable.name}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Click on a variable to insert it into your template.</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

