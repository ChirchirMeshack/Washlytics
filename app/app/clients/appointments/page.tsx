"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ChevronRight, Clock, Search } from "lucide-react"

// Mock data for appointments
const generateAppointments = () => {
  const statuses = ["Confirmed", "Completed", "Cancelled", "No-show", "Rescheduled", "Pending"]
  const services = ["Consultation", "Follow-up", "Initial Meeting", "Strategy Session", "Review"]
  const clients = Array.from({ length: 15 }, (_, i) => `Client ${i + 1}`)

  return Array.from({ length: 50 }, (_, i) => {
    const date = new Date()
    // Distribute appointments across past, present and future
    date.setDate(date.getDate() - 15 + i)

    return {
      id: i + 1,
      clientName: clients[Math.floor(Math.random() * clients.length)],
      service: services[Math.floor(Math.random() * services.length)],
      date: new Date(date),
      time: `${Math.floor(Math.random() * 8) + 9}:${Math.random() > 0.5 ? "00" : "30"} ${Math.random() > 0.5 ? "AM" : "PM"}`,
      duration: (Math.floor(Math.random() * 6) + 1) * 15,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      notes: Math.random() > 0.7 ? `Notes for appointment ${i + 1}` : "",
    }
  })
}

const appointmentsData = generateAppointments()

export default function AppointmentsPage() {
  const [dateFilter, setDateFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  // Get today's date at midnight
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Filter appointments based on search and filters
  const filteredAppointments = appointmentsData.filter((appointment) => {
    const matchesSearch =
      appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesService = serviceFilter === "all" || appointment.service === serviceFilter

    let matchesDate = true
    if (dateFilter === "today") {
      const appointmentDate = new Date(appointment.date)
      appointmentDate.setHours(0, 0, 0, 0)
      matchesDate = appointmentDate.getTime() === today.getTime()
    } else if (dateFilter === "upcoming") {
      matchesDate = appointment.date > today
    } else if (dateFilter === "past") {
      matchesDate = appointment.date < today
    }

    return matchesSearch && matchesStatus && matchesService && matchesDate
  })

  // Sort appointments by date (most recent first for past, earliest first for upcoming)
  filteredAppointments.sort((a, b) => {
    if (dateFilter === "past") {
      return b.date.getTime() - a.date.getTime()
    }
    return a.date.getTime() - b.date.getTime()
  })

  const statuses = ["all", ...Array.from(new Set(appointmentsData.map((app) => app.status)))]
  const services = ["all", ...Array.from(new Set(appointmentsData.map((app) => app.service)))]

  // Get counts for KPIs
  const todayCount = appointmentsData.filter((app) => {
    const appDate = new Date(app.date)
    appDate.setHours(0, 0, 0, 0)
    return appDate.getTime() === today.getTime()
  }).length

  const upcomingCount = appointmentsData.filter((app) => app.date > today).length

  const completedCount = appointmentsData.filter((app) => app.status === "Completed").length

  const cancelledCount = appointmentsData.filter((app) => app.status === "Cancelled" || app.status === "No-show").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-2 sm:mt-0">
              <Calendar className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>Fill in the appointment details. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={`client-${i + 1}`}>
                          Client {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="text-right">
                  Service
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services
                        .filter((s) => s !== "all")
                        .map((service, i) => (
                          <SelectItem key={i} value={service.toLowerCase()}>
                            {service}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input id="time" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <div className="col-span-3">
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  className="col-span-3"
                  placeholder="Add any notes or details about this appointment"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Schedule Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayCount}</div>
            <p className="text-xs text-muted-foreground">Appointments scheduled for today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCount}</div>
            <p className="text-xs text-muted-foreground">Future appointments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✓</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground">Successfully completed appointments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">✕</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledCount}</div>
            <p className="text-xs text-muted-foreground">Cancelled or no-show appointments</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "all" ? "All Statuses" : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service === "all" ? "All Services" : service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.clientName}</TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>{appointment.date.toLocaleDateString()}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell className="hidden md:table-cell">{appointment.duration} min</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      appointment.status === "Confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : appointment.status === "No-show"
                              ? "bg-red-100 text-red-800"
                              : appointment.status === "Rescheduled"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAppointment(appointment)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={selectedAppointment !== null} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
        <DialogContent className="sm:max-w-[525px]">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
                <DialogDescription>
                  {selectedAppointment.clientName} - {selectedAppointment.service}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-sm">Date</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedAppointment.date.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Time</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {selectedAppointment.time}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-sm">Duration</Label>
                    <div className="font-medium">{selectedAppointment.duration} minutes</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Status</Label>
                    <div>
                      <Badge
                        className={`${
                          selectedAppointment.status === "Confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : selectedAppointment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : selectedAppointment.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : selectedAppointment.status === "No-show"
                                  ? "bg-red-100 text-red-800"
                                  : selectedAppointment.status === "Rescheduled"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedAppointment.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {selectedAppointment.notes && (
                  <div>
                    <Label className="text-muted-foreground text-sm">Notes</Label>
                    <p className="text-sm mt-1">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>
              <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                  Close
                </Button>
                {selectedAppointment.date > today && (
                  <>
                    <Button variant="destructive">Cancel Appointment</Button>
                    <Button>Reschedule</Button>
                  </>
                )}
                {selectedAppointment.date <= today && selectedAppointment.status !== "Completed" && (
                  <Button>Mark as Completed</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

