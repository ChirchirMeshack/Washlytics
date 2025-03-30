/**
 * @file components/clients/client-detail-view.tsx
 * @description Detailed client information view component with appointments, notes, and history
 * @author ChirchirMeshack
 * @created 2025-03-17 21:03:41
 * 
 * Features:
 * - Client profile information
 * - Appointment management
 * - Client notes system
 * - Historical data tracking
 * - Responsive design
 */

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, MapPin, Phone, X } from "lucide-react"

/**
 * Client appointment interface
 */
interface ClientAppointment {
  id: number
  date: Date
  service: string
  status: "Scheduled" | "Completed" | "Pending"
  duration: number
  notes?: string
}

/**
 * Client note interface
 */
interface ClientNote {
  id: number
  date: Date
  content: string
  createdBy: string
}

/**
 * Component props interface
 */
export interface ClientDetailViewProps {
  /** Client data object */
  client: {
    name: string
    company?: string
    status: "Active" | "Inactive" | "Pending" | "Completed"
    email: string
    phone: string
    location: string
  }
  /** Close handler function */
  onClose: () => void
  /** Mobile view flag */
  isMobile?: boolean
}

/**
 * ClientDetailView Component
 * 
 * Displays detailed information about a client including:
 * - Personal information
 * - Contact details
 * - Appointment schedule
 * - Client notes
 * - Historical data
 * 
 * @param {ClientDetailViewProps} props - Component properties
 * @returns {JSX.Element} Client detail view component
 */
export function ClientDetailView({ client, onClose, isMobile = false }: ClientDetailViewProps) {
  // Generate mock appointments data
  const clientAppointments: ClientAppointment[] = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() + (i + 1) * 86400000 * 3),
    service: i % 3 === 0 ? "Consultation" : i % 3 === 1 ? "Follow-up" : "Initial Meeting",
    status: i % 3 === 0 ? "Scheduled" : i % 3 === 1 ? "Completed" : "Pending",
    duration: 60,
    notes: `Notes for appointment ${i + 1} with ${client.name}`,
  }))

  // Generate mock notes data
  const clientNotes: ClientNote[] = Array.from({ length: 2 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() - (i + 1) * 86400000 * 5),
    content: `This is a note ${i + 1} regarding ${client.name}. The client has provided some information that might be useful for future reference.`,
    createdBy: "Admin User",
  }))

  /**
   * Gets the appropriate status badge styling
   */
  const getStatusBadgeClass = (status: string): string => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800 hover:bg-green-100",
      Inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      Completed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    }
    return statusStyles[status as keyof typeof statusStyles] || "bg-purple-100 text-purple-800 hover:bg-purple-100"
  }

  return (
    <Card className={isMobile ? "" : "h-full"}>
      {/* Card Header */}
      <CardHeader className="relative">
        <div className="flex justify-between items-center">
          <CardTitle>Client Details</CardTitle>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="space-y-4">
        {/* Client Profile */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{client.name}</h2>
          <p className="text-muted-foreground">{client.company}</p>
          <Badge variant="outline" className={getStatusBadgeClass(client.status)}>
            {client.status}
          </Badge>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          {/* Contact details implementation... */}
        </div>

        <Separator />

        {/* Tabs Section */}
        <Tabs defaultValue="appointments" className="w-full">
          {/* Tab implementation... */}
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          {!isMobile && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
          <Button size="sm">Schedule Appointment</Button>
        </div>
      </CardContent>
    </Card>
  )
}