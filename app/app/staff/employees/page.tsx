"use client"

import React from "react"
import { Plus, Search, MoreHorizontal, Download, Upload, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample employee data
const employees = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@sparkle.com",
    phone: "+1 (555) 123-4567",
    role: "Manager",
    department: "Operations",
    status: "Active",
    hireDate: "2021-05-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Samantha Lee",
    email: "samantha.lee@sparkle.com",
    phone: "+1 (555) 234-5678",
    role: "Supervisor",
    department: "Customer Service",
    status: "Active",
    hireDate: "2022-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@sparkle.com",
    phone: "+1 (555) 345-6789",
    role: "Technician",
    department: "Maintenance",
    status: "On Leave",
    hireDate: "2021-08-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Jessica Williams",
    email: "jessica.williams@sparkle.com",
    phone: "+1 (555) 456-7890",
    role: "Cashier",
    department: "Finance",
    status: "Active",
    hireDate: "2022-03-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "David Rodriguez",
    email: "david.rodriguez@sparkle.com",
    phone: "+1 (555) 567-8901",
    role: "Detailer",
    department: "Operations",
    status: "Active",
    hireDate: "2021-11-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Emily Thompson",
    email: "emily.thompson@sparkle.com",
    phone: "+1 (555) 678-9012",
    role: "HR Specialist",
    department: "Human Resources",
    status: "Active",
    hireDate: "2022-02-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "James Wilson",
    email: "james.wilson@sparkle.com",
    phone: "+1 (555) 789-0123",
    role: "Technician",
    department: "Maintenance",
    status: "Inactive",
    hireDate: "2021-07-30",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    email: "olivia.martinez@sparkle.com",
    phone: "+1 (555) 890-1234",
    role: "Customer Service Rep",
    department: "Customer Service",
    status: "Active",
    hireDate: "2022-04-12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Stats data
const stats = [
  { title: "Total Employees", value: 32, description: "Across all locations" },
  { title: "Active", value: 28, description: "Currently working" },
  { title: "On Leave", value: 3, description: "Temporary absence" },
  { title: "New Hires", value: 5, description: "Last 30 days" },
]

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedDepartment, setSelectedDepartment] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState("")
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = React.useState(false)
  const [selectedEmployee, setSelectedEmployee] = React.useState(null)
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = React.useState(false)

  // Filter employees based on search term, department, and status
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment =
      selectedDepartment === "all" || selectedDepartment === "" || employee.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || selectedStatus === "" || employee.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee)
    setIsViewEmployeeOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">Manage your staff, roles, and permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the details of the new employee. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Address" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input id="zip" placeholder="Zip Code" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="employment" className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="technician">Technician</SelectItem>
                          <SelectItem value="cashier">Cashier</SelectItem>
                          <SelectItem value="detailer">Detailer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="customer-service">Customer Service</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hireDate">Hire Date</Label>
                      <Input id="hireDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="on-leave">On Leave</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary/Hourly Rate</Label>
                    <Input id="salary" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Employment Notes</Label>
                    <Textarea id="notes" placeholder="Additional notes..." />
                  </div>
                </TabsContent>
                <TabsContent value="emergency" className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Contact Name</Label>
                      <Input id="emergencyName" placeholder="Full Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Input id="relationship" placeholder="Relationship" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Phone</Label>
                      <Input id="emergencyPhone" placeholder="Phone Number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyEmail">Email</Label>
                      <Input id="emergencyEmail" type="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyAddress">Address</Label>
                    <Textarea id="emergencyAddress" placeholder="Address" />
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddEmployeeOpen(false)}>Save Employee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
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
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
            <SelectItem value="Customer Service">Customer Service</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Human Resources">Human Resources</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Employees Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50 text-sm">
                <th className="px-4 py-3 text-left font-medium">Employee</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Hire Date</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{employee.role}</td>
                  <td className="px-4 py-3">{employee.department}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        employee.status === "Active"
                          ? "success"
                          : employee.status === "On Leave"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{new Date(employee.hireDate).toLocaleDateString()}</td>
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
                        <DropdownMenuItem onClick={() => handleViewEmployee(employee)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Assign Schedule</DropdownMenuItem>
                        <DropdownMenuItem>View Performance</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Employee Dialog */}
      {selectedEmployee && (
        <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Employee Details</DialogTitle>
              <DialogDescription>Comprehensive information about {selectedEmployee.name}</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
                    <AvatarFallback>{selectedEmployee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
                    <p className="text-muted-foreground">{selectedEmployee.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Contact Information</h4>
                    <div className="mt-2 space-y-1">
                      <p>
                        <span className="text-muted-foreground">Email:</span> {selectedEmployee.email}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Phone:</span> {selectedEmployee.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Employment Details</h4>
                    <div className="mt-2 space-y-1">
                      <p>
                        <span className="text-muted-foreground">Department:</span> {selectedEmployee.department}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Status:</span>{" "}
                        <Badge
                          variant={
                            selectedEmployee.status === "Active"
                              ? "success"
                              : selectedEmployee.status === "On Leave"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {selectedEmployee.status}
                        </Badge>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Hire Date:</span>{" "}
                        {new Date(selectedEmployee.hireDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="employment" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Position History</h4>
                    <div className="mt-2 space-y-2">
                      <div className="rounded-md border p-3">
                        <div className="flex justify-between">
                          <div className="font-medium">{selectedEmployee.role}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(selectedEmployee.hireDate).toLocaleDateString()} - Present
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{selectedEmployee.department}</div>
                      </div>
                      {/* Additional position history items would go here */}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Compensation</h4>
                    <div className="mt-2 rounded-md border p-3">
                      <div className="flex justify-between">
                        <div className="font-medium">Current Salary</div>
                        <div>$45,000.00 / year</div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">Last reviewed: January 15, 2023</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Work Schedule</h4>
                    <div className="mt-2 rounded-md border p-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Monday - Friday</div>
                          <div>9:00 AM - 5:00 PM</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Location</div>
                          <div>Main Branch</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Employee Documents</h4>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Document
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium">Employment Contract</div>
                          <div className="text-sm text-muted-foreground">
                            Uploaded: {new Date(selectedEmployee.hireDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium">ID Documentation</div>
                          <div className="text-sm text-muted-foreground">
                            Uploaded: {new Date(selectedEmployee.hireDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium">Tax Forms</div>
                          <div className="text-sm text-muted-foreground">
                            Uploaded: {new Date(selectedEmployee.hireDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Employee Notes</h4>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-md border p-3">
                      <div className="flex justify-between">
                        <div className="font-medium">Performance Review Discussion</div>
                        <div className="text-sm text-muted-foreground">March 15, 2023</div>
                      </div>
                      <div className="mt-2 text-sm">
                        Discussed quarterly performance goals and areas for improvement. Employee showed great
                        enthusiasm for taking on additional responsibilities.
                      </div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="flex justify-between">
                        <div className="font-medium">Training Completion</div>
                        <div className="text-sm text-muted-foreground">January 10, 2023</div>
                      </div>
                      <div className="mt-2 text-sm">
                        Successfully completed customer service training program with excellent feedback from the
                        instructor. Ready for customer-facing responsibilities.
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewEmployeeOpen(false)}>
                Close
              </Button>
              <Button>Edit Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

