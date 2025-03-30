"use client"

import React from "react"
import { Clock, Plus, Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

// Sample data for employees
const employees = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Supervisor",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Technician",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Jessica Williams",
    role: "Cashier",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "David Rodriguez",
    role: "Detailer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Sample data for shifts
const shifts = [
  {
    id: 1,
    employeeId: 1,
    date: "2023-06-05",
    startTime: "09:00",
    endTime: "17:00",
    location: "Main Branch",
    status: "Scheduled",
  },
  {
    id: 2,
    employeeId: 2,
    date: "2023-06-05",
    startTime: "08:00",
    endTime: "16:00",
    location: "Main Branch",
    status: "Scheduled",
  },
  {
    id: 3,
    employeeId: 3,
    date: "2023-06-05",
    startTime: "10:00",
    endTime: "18:00",
    location: "Downtown",
    status: "Scheduled",
  },
  {
    id: 4,
    employeeId: 4,
    date: "2023-06-05",
    startTime: "12:00",
    endTime: "20:00",
    location: "Main Branch",
    status: "Scheduled",
  },
  {
    id: 5,
    employeeId: 5,
    date: "2023-06-05",
    startTime: "07:00",
    endTime: "15:00",
    location: "Downtown",
    status: "Scheduled",
  },
  {
    id: 6,
    employeeId: 1,
    date: "2023-06-06",
    startTime: "09:00",
    endTime: "17:00",
    location: "Main Branch",
    status: "Scheduled",
  },
  {
    id: 7,
    employeeId: 2,
    date: "2023-06-06",
    startTime: "08:00",
    endTime: "16:00",
    location: "Main Branch",
    status: "Scheduled",
  },
  {
    id: 8,
    employeeId: 3,
    date: "2023-06-06",
    startTime: "10:00",
    endTime: "18:00",
    location: "Downtown",
    status: "Time Off",
  },
  {
    id: 9,
    employeeId: 4,
    date: "2023-06-06",
    startTime: "12:00",
    endTime: "20:00",
    location: "Main Branch",
    status: "Scheduled",
  },
  {
    id: 10,
    employeeId: 5,
    date: "2023-06-06",
    startTime: "07:00",
    endTime: "15:00",
    location: "Downtown",
    status: "Scheduled",
  },
]

// Sample data for time off requests
const timeOffRequests = [
  {
    id: 1,
    employeeId: 3,
    employeeName: "Michael Chen",
    startDate: "2023-06-06",
    endDate: "2023-06-06",
    type: "Vacation",
    status: "Approved",
    notes: "Annual family vacation",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Samantha Lee",
    startDate: "2023-06-10",
    endDate: "2023-06-12",
    type: "Sick Leave",
    status: "Pending",
    notes: "Doctor's appointment",
  },
  {
    id: 3,
    employeeId: 5,
    employeeName: "David Rodriguez",
    startDate: "2023-06-15",
    endDate: "2023-06-15",
    type: "Personal",
    status: "Pending",
    notes: "Family event",
  },
]

// Generate dates for the week view
const generateWeekDates = (startDate) => {
  const dates = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < 7; i++) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

// Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

// Format time for display
const formatTime = (time) => {
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}

export default function SchedulesPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [viewMode, setViewMode] = React.useState("week")
  const [selectedLocation, setSelectedLocation] = React.useState("")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isAddShiftOpen, setIsAddShiftOpen] = React.useState(false)
  const [isTimeOffRequestOpen, setIsTimeOffRequestOpen] = React.useState(false)
  const [selectedEmployees, setSelectedEmployees] = React.useState([])

  // Generate week dates based on current date
  const weekDates = generateWeekDates(currentDate)

  // Navigate to previous week/day
  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  // Navigate to next week/day
  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  // Navigate to today
  const navigateToday = () => {
    setCurrentDate(new Date())
  }

  // Filter shifts based on date, location, and search term
  const filteredShifts = shifts.filter((shift) => {
    const shiftDate = new Date(shift.date)
    const matchesDate = weekDates.some(
      (date) => date.toISOString().split("T")[0] === shiftDate.toISOString().split("T")[0],
    )

    const employee = employees.find((emp) => emp.id === shift.employeeId)
    const matchesSearch = employee && employee.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = selectedLocation === "all" || selectedLocation === "" || shift.location === selectedLocation

    return matchesDate && matchesSearch && matchesLocation
  })

  // Toggle employee selection for bulk actions
  const toggleEmployeeSelection = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId))
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId])
    }
  }

  // Get shifts for a specific employee and date
  const getEmployeeShift = (employeeId, date) => {
    const dateString = new Date(date).toISOString().split("T")[0]
    return shifts.find(
      (shift) => shift.employeeId === employeeId && new Date(shift.date).toISOString().split("T")[0] === dateString,
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedules</h1>
          <p className="text-muted-foreground">Manage employee shifts, time-off requests, and attendance</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={navigateToday}>
            Today
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={navigatePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-[150px] text-center font-medium">
              {viewMode === "week"
                ? `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}`
                : formatDate(currentDate)}
            </div>
            <Button variant="ghost" size="icon" onClick={navigateNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isTimeOffRequestOpen} onOpenChange={setIsTimeOffRequestOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Time Off
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Time Off</DialogTitle>
                <DialogDescription>Submit a time off request for approval.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Select>
                      <SelectTrigger id="employee">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id.toString()}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Reason for time off..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTimeOffRequestOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsTimeOffRequestOpen(false)}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddShiftOpen} onOpenChange={setIsAddShiftOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Shift
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Shift</DialogTitle>
                <DialogDescription>Create a new shift for an employee.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="shiftEmployee">Employee</Label>
                  <Select>
                    <SelectTrigger id="shiftEmployee">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shiftDate">Date</Label>
                    <Input id="shiftDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shiftLocation">Location</Label>
                  <Select>
                    <SelectTrigger id="shiftLocation">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Branch</SelectItem>
                      <SelectItem value="downtown">Downtown</SelectItem>
                      <SelectItem value="westside">Westside</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shiftNotes">Notes</Label>
                  <Input id="shiftNotes" placeholder="Additional notes..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddShiftOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddShiftOpen(false)}>Save Shift</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Main Branch">Main Branch</SelectItem>
            <SelectItem value="Downtown">Downtown</SelectItem>
            <SelectItem value="Westside">Westside</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs for Schedule and Time Off */}
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="timeoff">Time Off Requests</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          {viewMode === "week" ? (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50 text-sm">
                      <th className="sticky left-0 bg-muted/50 px-4 py-3 text-left font-medium">Employee</th>
                      {weekDates.map((date, index) => (
                        <th key={index} className="px-4 py-3 text-center font-medium">
                          <div>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                          <div className="text-xs text-muted-foreground">
                            {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => {
                      const employeeShifts = weekDates.map((date) => getEmployeeShift(employee.id, date))

                      return (
                        <tr key={employee.id} className="border-b">
                          <td className="sticky left-0 bg-background px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={selectedEmployees.includes(employee.id)}
                                onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                              />
                              <Avatar>
                                <AvatarImage src={employee.avatar} alt={employee.name} />
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">{employee.role}</div>
                              </div>
                            </div>
                          </td>
                          {employeeShifts.map((shift, index) => (
                            <td key={index} className="px-4 py-3 text-center">
                              {shift ? (
                                <div
                                  className={`rounded-md p-2 ${
                                    shift.status === "Scheduled"
                                      ? "bg-primary/10"
                                      : shift.status === "Time Off"
                                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                                        : "bg-muted"
                                  }`}
                                >
                                  <div className="font-medium">
                                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{shift.location}</div>
                                  {shift.status !== "Scheduled" && (
                                    <Badge variant="outline" className="mt-1">
                                      {shift.status}
                                    </Badge>
                                  )}
                                </div>
                              ) : (
                                <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs">
                                  <Plus className="mr-1 h-3 w-3" />
                                  Add
                                </Button>
                              )}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{formatDate(currentDate)}</h3>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 text-sm">
                        <th className="px-4 py-3 text-left font-medium">Employee</th>
                        <th className="px-4 py-3 text-left font-medium">Shift Time</th>
                        <th className="px-4 py-3 text-left font-medium">Location</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredShifts
                        .filter(
                          (shift) =>
                            new Date(shift.date).toISOString().split("T")[0] ===
                            currentDate.toISOString().split("T")[0],
                        )
                        .map((shift) => {
                          const employee = employees.find((emp) => emp.id === shift.employeeId)

                          return (
                            <tr key={shift.id} className="border-b">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={employee?.avatar} alt={employee?.name} />
                                    <AvatarFallback>{employee?.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{employee?.name}</div>
                                    <div className="text-sm text-muted-foreground">{employee?.role}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                              </td>
                              <td className="px-4 py-3">{shift.location}</td>
                              <td className="px-4 py-3">
                                <Badge
                                  variant={
                                    shift.status === "Scheduled"
                                      ? "outline"
                                      : shift.status === "Time Off"
                                        ? "warning"
                                        : "secondary"
                                  }
                                >
                                  {shift.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit Shift</DropdownMenuItem>
                                    <DropdownMenuItem>Reassign</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Cancel Shift</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Time Off Requests Tab */}
        <TabsContent value="timeoff" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Time Off Requests</h3>
            <Button variant="outline" size="sm" onClick={() => setIsTimeOffRequestOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </div>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50 text-sm">
                    <th className="px-4 py-3 text-left font-medium">Employee</th>
                    <th className="px-4 py-3 text-left font-medium">Date Range</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Notes</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {timeOffRequests.map((request) => (
                    <tr key={request.id} className="border-b">
                      <td className="px-4 py-3">{request.employeeName}</td>
                      <td className="px-4 py-3">
                        {new Date(request.startDate).toLocaleDateString()} -{" "}
                        {new Date(request.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{request.type}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            request.status === "Approved"
                              ? "success"
                              : request.status === "Pending"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {request.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{request.notes}</td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            {request.status === "Pending" && (
                              <>
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem>Deny</DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Request</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Attendance Tracking</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                Clock In/Out
              </Button>
              <Button variant="outline" size="sm">
                Export Report
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">On Time Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
                <div className="mt-4 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[94%] rounded-full bg-primary"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Absence Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
                <div className="mt-4 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[3.2%] rounded-full bg-destructive"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.5</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
                <div className="mt-4 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[60%] rounded-full bg-yellow-500"></div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50 text-sm">
                    <th className="px-4 py-3 text-left font-medium">Employee</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Clock In</th>
                    <th className="px-4 py-3 text-left font-medium">Clock Out</th>
                    <th className="px-4 py-3 text-left font-medium">Total Hours</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">Alex Johnson</td>
                    <td className="px-4 py-3">Jun 5, 2023</td>
                    <td className="px-4 py-3">8:55 AM</td>
                    <td className="px-4 py-3">5:03 PM</td>
                    <td className="px-4 py-3">8.13</td>
                    <td className="px-4 py-3">
                      <Badge variant="success">On Time</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Samantha Lee</td>
                    <td className="px-4 py-3">Jun 5, 2023</td>
                    <td className="px-4 py-3">8:10 AM</td>
                    <td className="px-4 py-3">4:55 PM</td>
                    <td className="px-4 py-3">8.75</td>
                    <td className="px-4 py-3">
                      <Badge variant="success">On Time</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Michael Chen</td>
                    <td className="px-4 py-3">Jun 5, 2023</td>
                    <td className="px-4 py-3">10:15 AM</td>
                    <td className="px-4 py-3">6:10 PM</td>
                    <td className="px-4 py-3">7.92</td>
                    <td className="px-4 py-3">
                      <Badge variant="warning">Late</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">Jessica Williams</td>
                    <td className="px-4 py-3">Jun 5, 2023</td>
                    <td className="px-4 py-3">11:55 AM</td>
                    <td className="px-4 py-3">8:05 PM</td>
                    <td className="px-4 py-3">8.17</td>
                    <td className="px-4 py-3">
                      <Badge variant="success">On Time</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">David Rodriguez</td>
                    <td className="px-4 py-3">Jun 5, 2023</td>
                    <td className="px-4 py-3">7:05 AM</td>
                    <td className="px-4 py-3">3:10 PM</td>
                    <td className="px-4 py-3">8.08</td>
                    <td className="px-4 py-3">
                      <Badge variant="success">On Time</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

