"use client"

import { useState } from "react"
import { addDays, addMonths, format, getDay, getDaysInMonth, isSameDay, subMonths } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"

// Mock data for appointments
const generateCalendarAppointments = () => {
  const statuses = ["Confirmed", "Pending", "Cancelled"]
  const services = ["Consultation", "Follow-up", "Initial Meeting", "Strategy Session", "Review"]
  const clients = Array.from({ length: 15 }, (_, i) => `Client ${i + 1}`)

  // Generate appointments for the current month and the next month
  const today = new Date()
  const result = []

  // Generate 80 appointments across the 2-month period
  for (let i = 0; i < 80; i++) {
    // Distribute across current month and next month
    const appointmentDate = new Date()
    appointmentDate.setDate(appointmentDate.getDate() - 15 + Math.floor(Math.random() * 45))

    // Random hour between 9 AM and 5 PM
    const hour = Math.floor(Math.random() * 8) + 9
    const minute = Math.random() > 0.5 ? 0 : 30
    appointmentDate.setHours(hour, minute, 0, 0)

    const duration = (Math.floor(Math.random() * 6) + 1) * 15
    const endTime = new Date(appointmentDate)
    endTime.setMinutes(endTime.getMinutes() + duration)

    result.push({
      id: i + 1,
      clientName: clients[Math.floor(Math.random() * clients.length)],
      service: services[Math.floor(Math.random() * services.length)],
      start: appointmentDate,
      end: endTime,
      duration: duration,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      notes: Math.random() > 0.7 ? `Notes for appointment ${i + 1}` : "",
    })
  }

  return result
}

const calendarAppointments = generateCalendarAppointments()

type ViewType = "month" | "week" | "day"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<ViewType>("month")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  // Helper function to navigate through periods
  const navigate = (direction: "previous" | "next") => {
    if (view === "month") {
      setCurrentDate(direction === "previous" ? subMonths(currentDate, 1) : addMonths(currentDate, 1))
    } else if (view === "week") {
      setCurrentDate(direction === "previous" ? addDays(currentDate, -7) : addDays(currentDate, 7))
    } else {
      setCurrentDate(direction === "previous" ? addDays(currentDate, -1) : addDays(currentDate, 1))
    }
  }

  // Function to get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    return calendarAppointments.filter((appointment) => isSameDay(appointment.start, date))
  }

  // Function to render the month view
  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const startingDayOfWeek = getDay(firstDayOfMonth) // 0 = Sunday, 1 = Monday, etc.

    const days = []
    const today = new Date()

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border-t border-r p-1"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const appointmentsForDay = getAppointmentsForDate(date)
      const isToday = isSameDay(date, today)
      const isSelected = selectedDate && isSameDay(date, selectedDate)

      days.push(
        <div
          key={`day-${day}`}
          className={`h-24 border-t border-r p-1 cursor-pointer relative ${isToday ? "bg-blue-50" : ""} ${
            isSelected ? "ring-2 ring-primary ring-inset" : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex justify-between">
            <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</span>
            {appointmentsForDay.length > 0 && <Badge className="text-xs">{appointmentsForDay.length}</Badge>}
          </div>
          <div className="space-y-1 mt-1 max-h-[64px] overflow-hidden">
            {appointmentsForDay.slice(0, 2).map((appointment) => (
              <div
                key={appointment.id}
                className={`text-xs rounded px-1 py-0.5 truncate ${
                  appointment.status === "Confirmed"
                    ? "bg-blue-100 text-blue-800"
                    : appointment.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedAppointment(appointment)
                }}
              >
                {format(appointment.start, "h:mm a")} - {appointment.clientName}
              </div>
            ))}
            {appointmentsForDay.length > 2 && (
              <div className="text-xs text-muted-foreground text-center">+{appointmentsForDay.length - 2} more</div>
            )}
          </div>
        </div>,
      )
    }

    // Fill in remaining cells to complete the grid
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7
    for (let i = days.length; i < totalCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="h-24 border-t border-r p-1"></div>)
    }

    return (
      <div className="grid grid-cols-7 border-l border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="h-10 border-t border-r p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        {days}
      </div>
    )
  }

  // Function to render the week view
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate)
    const dayOfWeek = getDay(currentDate)
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek) // Start from Sunday

    const days = []
    const today = new Date()

    // Create a column for each day of the week
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      const appointmentsForDay = getAppointmentsForDate(date)
      const isToday = isSameDay(date, today)

      days.push(
        <div key={`week-day-${i}`} className="flex flex-col border-r min-h-[600px]">
          <div className={`p-2 text-center border-b ${isToday ? "bg-blue-50 font-bold" : ""}`}>
            <div className="font-medium">{format(date, "EEE")}</div>
            <div className="text-sm">{format(date, "MMM d")}</div>
          </div>
          <div className="flex-1 p-1 space-y-1 relative">
            {appointmentsForDay.map((appointment) => (
              <div
                key={appointment.id}
                className={`text-xs rounded p-1 ${
                  appointment.status === "Confirmed"
                    ? "bg-blue-100 text-blue-800"
                    : appointment.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                } cursor-pointer`}
                style={{
                  position: "absolute",
                  top: `${(appointment.start.getHours() - 9) * 60 + appointment.start.getMinutes()}px`,
                  height: `${appointment.duration}px`,
                  width: "calc(100% - 8px)",
                  overflow: "hidden",
                }}
                onClick={() => setSelectedAppointment(appointment)}
              >
                <div className="font-medium">{format(appointment.start, "h:mm a")}</div>
                <div className="truncate">{appointment.clientName}</div>
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return (
      <div className="border-l border-b">
        <div className="grid grid-cols-7">{days}</div>
      </div>
    )
  }

  // Function to render the day view
  const renderDayView = () => {
    const appointmentsForDay = getAppointmentsForDate(currentDate)
    const isToday = isSameDay(currentDate, new Date())

    // Create time slots from 9 AM to 5 PM
    const timeSlots = []
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        timeSlots.push({
          time: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour, minute),
          appointments: appointmentsForDay.filter((appointment) => {
            const appointmentHour = appointment.start.getHours()
            const appointmentMinute = appointment.start.getMinutes()
            return appointmentHour === hour && appointmentMinute === minute
          }),
        })
      }
    }

    return (
      <div className="border-l border-b">
        <div className={`p-3 text-center border-b ${isToday ? "bg-blue-50" : ""}`}>
          <h2 className="text-xl font-bold">{format(currentDate, "EEEE")}</h2>
          <p className="text-muted-foreground">{format(currentDate, "MMMM d, yyyy")}</p>
        </div>
        <div className="space-y-1 p-4">
          {timeSlots.map((slot, index) => (
            <div key={index} className="group flex items-start hover:bg-muted/20 p-2 rounded-md">
              <div className="w-20 flex-shrink-0 text-muted-foreground text-sm">{format(slot.time, "h:mm a")}</div>
              <div className="flex-1">
                {slot.appointments.length > 0 ? (
                  <div className="space-y-2">
                    {slot.appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`rounded-md p-2 ${
                          appointment.status === "Confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : appointment.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        } cursor-pointer`}
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{appointment.clientName}</div>
                            <div className="text-sm">{appointment.service}</div>
                            <div className="text-xs">
                              {format(appointment.start, "h:mm a")} - {format(appointment.end, "h:mm a")} (
                              {appointment.duration} min)
                            </div>
                          </div>
                          <Badge variant="outline">{appointment.status}</Badge>
                        </div>
                        {appointment.notes && <div className="text-xs mt-2">{appointment.notes}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-10 flex items-center group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" /> Add
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold">Booking Calendar</h1>
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
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="initial-meeting">Initial Meeting</SelectItem>
                      <SelectItem value="strategy-session">Strategy Session</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="col-span-3"
                  defaultValue={selectedDate ? format(selectedDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")}
                />
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

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <CardTitle>{format(currentDate, "MMMM yyyy")}</CardTitle>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="sm" onClick={() => navigate("previous")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>
                Month
              </Button>
              <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>
                Week
              </Button>
              <Button variant={view === "day" ? "default" : "outline"} size="sm" onClick={() => setView("day")}>
                Day
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {view === "month" && renderMonthView()}
          {view === "week" && renderWeekView()}
          {view === "day" && renderDayView()}
        </CardContent>
      </Card>

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
                      {format(selectedAppointment.start, "MMMM d, yyyy")}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Time</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {format(selectedAppointment.start, "h:mm a")} - {format(selectedAppointment.end, "h:mm a")}
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
                                : "bg-yellow-100 text-yellow-800"
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
                <Button variant="destructive">Cancel Appointment</Button>
                <Button>Reschedule</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

