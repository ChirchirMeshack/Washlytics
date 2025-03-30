"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Edit,
  Trash2,
  Users,
  Car,
  DollarSign,
  Settings,
  Save,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Pencil,
  UserPlus,
  UserMinus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for a single branch
const MOCK_BRANCH = {
  id: "1",
  name: "Downtown Express Wash",
  address: "123 Main St, Downtown, NY 10001",
  phone: "(212) 555-1234",
  email: "downtown@sparklewash.com",
  status: "active",
  openingHours: {
    monday: { open: "07:00", close: "21:00" },
    tuesday: { open: "07:00", close: "21:00" },
    wednesday: { open: "07:00", close: "21:00" },
    thursday: { open: "07:00", close: "21:00" },
    friday: { open: "07:00", close: "21:00" },
    saturday: { open: "08:00", close: "19:00" },
    sunday: { open: "08:00", close: "19:00" },
  },
  servicesOffered: [
    { id: "s1", name: "Express Wash", price: 12.99, duration: 15, available: true },
    { id: "s2", name: "Deluxe Wash", price: 19.99, duration: 25, available: true },
    { id: "s3", name: "Premium Detail", price: 49.99, duration: 60, available: true },
    { id: "s4", name: "Interior Cleaning", price: 29.99, duration: 45, available: true },
    { id: "s5", name: "Wax Treatment", price: 24.99, duration: 30, available: false },
  ],
  staff: [
    { id: "e1", name: "John Smith", position: "Manager", email: "john@sparklewash.com", phone: "(212) 555-1001" },
    {
      id: "e2",
      name: "Sarah Johnson",
      position: "Assistant Manager",
      email: "sarah@sparklewash.com",
      phone: "(212) 555-1002",
    },
    {
      id: "e3",
      name: "Michael Brown",
      position: "Technician",
      email: "michael@sparklewash.com",
      phone: "(212) 555-1003",
    },
    { id: "e4", name: "Emily Davis", position: "Technician", email: "emily@sparklewash.com", phone: "(212) 555-1004" },
    { id: "e5", name: "David Wilson", position: "Cashier", email: "david@sparklewash.com", phone: "(212) 555-1005" },
    {
      id: "e6",
      name: "Jessica Martinez",
      position: "Cashier",
      email: "jessica@sparklewash.com",
      phone: "(212) 555-1006",
    },
    { id: "e7", name: "Robert Taylor", position: "Detailer", email: "robert@sparklewash.com", phone: "(212) 555-1007" },
    { id: "e8", name: "Amanda Thomas", position: "Detailer", email: "amanda@sparklewash.com", phone: "(212) 555-1008" },
  ],
  metrics: {
    revenue: {
      daily: [
        { day: "Mon", amount: 1200 },
        { day: "Tue", amount: 1100 },
        { day: "Wed", amount: 1300 },
        { day: "Thu", amount: 1400 },
        { day: "Fri", amount: 1800 },
        { day: "Sat", amount: 2200 },
        { day: "Sun", amount: 1900 },
      ],
      monthly: [
        { month: "Jan", amount: 38000 },
        { month: "Feb", amount: 35000 },
        { month: "Mar", amount: 42000 },
        { month: "Apr", amount: 45000 },
        { month: "May", amount: 48000 },
        { month: "Jun", amount: 52000 },
      ],
    },
    customerTraffic: {
      daily: [
        { day: "Mon", count: 85 },
        { day: "Tue", count: 78 },
        { day: "Wed", count: 92 },
        { day: "Thu", count: 96 },
        { day: "Fri", count: 120 },
        { day: "Sat", count: 145 },
        { day: "Sun", count: 130 },
      ],
      monthly: [
        { month: "Jan", count: 2800 },
        { month: "Feb", count: 2600 },
        { month: "Mar", count: 3100 },
        { month: "Apr", count: 3300 },
        { month: "May", count: 3500 },
        { month: "Jun", count: 3800 },
      ],
    },
    servicePopularity: [
      { name: "Express Wash", value: 45 },
      { name: "Deluxe Wash", value: 25 },
      { name: "Premium Detail", value: 10 },
      { name: "Interior Cleaning", value: 15 },
      { name: "Wax Treatment", value: 5 },
    ],
    peakHours: [
      { hour: "7-8", customers: 15 },
      { hour: "8-9", customers: 25 },
      { hour: "9-10", customers: 35 },
      { hour: "10-11", customers: 45 },
      { hour: "11-12", customers: 55 },
      { hour: "12-13", customers: 65 },
      { hour: "13-14", customers: 60 },
      { hour: "14-15", customers: 50 },
      { hour: "15-16", customers: 45 },
      { hour: "16-17", customers: 55 },
      { hour: "17-18", customers: 70 },
      { hour: "18-19", customers: 60 },
      { hour: "19-20", customers: 40 },
      { hour: "20-21", customers: 25 },
    ],
  },
  coordinates: { lat: 40.7128, lng: -74.006 },
  image: "/placeholder.svg?height=400&width=800",
  equipmentCount: 12,
  maintenanceSchedule: "Quarterly",
  lastMaintenance: "2023-12-15",
  nextMaintenance: "2024-03-15",
}

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return (
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span>Active</span>
        </div>
      )
    case "inactive":
      return (
        <div className="flex items-center text-red-600">
          <XCircle className="h-4 w-4 mr-1" />
          <span>Inactive</span>
        </div>
      )
    case "maintenance":
      return (
        <div className="flex items-center text-amber-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>Maintenance</span>
        </div>
      )
    default:
      return null
  }
}

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount)
}

// Map component (simplified)
const BranchMap = ({ coordinates }: { coordinates: { lat: number; lng: number } }) => {
  return (
    <div className="w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-muted-foreground">
          Map showing location at coordinates: {coordinates.lat}, {coordinates.lng}
        </p>
      </div>
    </div>
  )
}

// Hours editor component
const HoursEditor = ({
  hours,
  onSave,
}: {
  hours: Record<string, { open: string; close: string }>
  onSave: (hours: Record<string, { open: string; close: string }>) => void
}) => {
  const [editedHours, setEditedHours] = useState(hours)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (day: string, field: "open" | "close", value: string) => {
    setEditedHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    onSave(editedHours)
    setIsEditing(false)
    toast({
      title: "Hours Updated",
      description: "Branch operating hours have been updated successfully.",
    })
  }

  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Operating Hours</h3>
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-1" /> Edit Hours
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {days.map((day) => (
          <div key={day.id} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-3 font-medium">{day.label}</div>
            {isEditing ? (
              <>
                <div className="col-span-4">
                  <Input
                    type="time"
                    value={editedHours[day.id].open}
                    onChange={(e) => handleChange(day.id, "open", e.target.value)}
                  />
                </div>
                <div className="col-span-1 text-center">to</div>
                <div className="col-span-4">
                  <Input
                    type="time"
                    value={editedHours[day.id].close}
                    onChange={(e) => handleChange(day.id, "close", e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div className="col-span-9">
                {editedHours[day.id].open} - {editedHours[day.id].close}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Service management component
const ServiceManagement = ({
  services,
  onUpdate,
}: {
  services: any[]
  onUpdate: (services: any[]) => void
}) => {
  const [editedServices, setEditedServices] = useState(services)
  const [isEditing, setIsEditing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<any>(null)

  const handleToggleAvailability = (id: string) => {
    setEditedServices((prev) =>
      prev.map((service) => (service.id === id ? { ...service, available: !service.available } : service)),
    )
  }

  const handleSave = () => {
    onUpdate(editedServices)
    setIsEditing(false)
    toast({
      title: "Services Updated",
      description: "Branch services have been updated successfully.",
    })
  }

  const handleEditService = (service: any) => {
    setCurrentService(service)
    setDialogOpen(true)
  }

  const handleAddService = () => {
    setCurrentService(null)
    setDialogOpen(true)
  }

  const handleSaveService = (service: any) => {
    if (service.id) {
      // Update existing service
      setEditedServices((prev) => prev.map((s) => (s.id === service.id ? service : s)))
    } else {
      // Add new service
      setEditedServices((prev) => [...prev, { ...service, id: `s${Date.now()}`, available: true }])
    }
    setDialogOpen(false)
  }

  const handleRemoveService = (id: string) => {
    setEditedServices((prev) => prev.filter((service) => service.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Services Offered</h3>
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button size="sm" onClick={handleAddService}>
              <Plus className="h-4 w-4 mr-1" /> Add Service
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {editedServices.map((service) => (
          <Card key={service.id} className={!service.available ? "opacity-70" : ""}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{service.name}</h4>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{formatCurrency(service.price)}</span>
                    <span>{service.duration} min</span>
                  </div>
                </div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Switch checked={service.available} onCheckedChange={() => handleToggleAvailability(service.id)} />
                    <Button size="icon" variant="ghost" onClick={() => handleEditService(service)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500"
                      onClick={() => handleRemoveService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className={`text-sm ${service.available ? "text-green-600" : "text-red-600"}`}>
                    {service.available ? "Available" : "Unavailable"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentService ? "Edit Service" : "Add Service"}</DialogTitle>
            <DialogDescription>
              {currentService ? "Update the details for this service." : "Add a new service to this branch."}
            </DialogDescription>
          </DialogHeader>
          <ServiceForm service={currentService} onSave={handleSaveService} onCancel={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Service form component
const ServiceForm = ({
  service,
  onSave,
  onCancel,
}: {
  service: any | null
  onSave: (service: any) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState({
    id: service?.id || "",
    name: service?.name || "",
    price: service?.price || 0,
    duration: service?.duration || 15,
    available: service?.available !== undefined ? service.available : true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="name">Service Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="available"
            checked={formData.available}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, available: checked }))}
          />
          <Label htmlFor="available">Service is available</Label>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  )
}

// Staff management component
const StaffManagement = ({
  staff,
  onUpdate,
}: {
  staff: any[]
  onUpdate: (staff: any[]) => void
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentStaff, setCurrentStaff] = useState<any>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null)

  const handleAddStaff = () => {
    setCurrentStaff(null)
    setDialogOpen(true)
  }

  const handleEditStaff = (staff: any) => {
    setCurrentStaff(staff)
    setDialogOpen(true)
  }

  const handleSaveStaff = (staffMember: any) => {
    let updatedStaff

    if (staffMember.id) {
      // Update existing staff
      updatedStaff = staff.map((s) => (s.id === staffMember.id ? staffMember : s))
    } else {
      // Add new staff
      updatedStaff = [...staff, { ...staffMember, id: `e${Date.now()}` }]
    }

    onUpdate(updatedStaff)
    setDialogOpen(false)

    toast({
      title: staffMember.id ? "Staff Updated" : "Staff Added",
      description: `${staffMember.name} has been ${staffMember.id ? "updated" : "added"} successfully.`,
    })
  }

  const handleDeleteClick = (id: string) => {
    setStaffToDelete(id)
    setConfirmDeleteOpen(true)
  }

  const handleConfirmDelete = () => {
    if (staffToDelete) {
      const updatedStaff = staff.filter((s) => s.id !== staffToDelete)
      onUpdate(updatedStaff)

      toast({
        title: "Staff Removed",
        description: "Staff member has been removed successfully.",
      })

      setConfirmDeleteOpen(false)
      setStaffToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Staff Members ({staff.length})</h3>
        <Button size="sm" onClick={handleAddStaff}>
          <UserPlus className="h-4 w-4 mr-1" /> Add Staff
        </Button>
      </div>

      <div className="space-y-2">
        {staff.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <div className="text-sm text-muted-foreground">{member.position}</div>
                  <div className="flex gap-4 text-sm mt-1">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEditStaff(member)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => handleDeleteClick(member.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentStaff ? "Edit Staff Member" : "Add Staff Member"}</DialogTitle>
            <DialogDescription>
              {currentStaff ? "Update the details for this staff member." : "Add a new staff member to this branch."}
            </DialogDescription>
          </DialogHeader>
          <StaffForm staff={currentStaff} onSave={handleSaveStaff} onCancel={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this staff member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Staff form component
const StaffForm = ({
  staff,
  onSave,
  onCancel,
}: {
  staff: any | null
  onSave: (staff: any) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState({
    id: staff?.id || "",
    name: staff?.name || "",
    position: staff?.position || "",
    email: staff?.email || "",
    phone: staff?.phone || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  )
}

// Branch settings component
const BranchSettings = ({
  branch,
  onUpdate,
}: {
  branch: any
  onUpdate: (data: any) => void
}) => {
  const [formData, setFormData] = useState({
    name: branch.name,
    address: branch.address,
    phone: branch.phone,
    email: branch.email,
    status: branch.status,
    equipmentCount: branch.equipmentCount,
    maintenanceSchedule: branch.maintenanceSchedule,
    lastMaintenance: branch.lastMaintenance,
    nextMaintenance: branch.nextMaintenance,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSave = () => {
    onUpdate(formData)
    toast({
      title: "Branch Updated",
      description: "Branch settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">General Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="name">Branch Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label>Branch Status</Label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-active"
                  name="status"
                  className="mr-2"
                  checked={formData.status === "active"}
                  onChange={() => handleStatusChange("active")}
                />
                <Label htmlFor="status-active" className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                  Active
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-inactive"
                  name="status"
                  className="mr-2"
                  checked={formData.status === "inactive"}
                  onChange={() => handleStatusChange("inactive")}
                />
                <Label htmlFor="status-inactive" className="flex items-center">
                  <XCircle className="h-4 w-4 mr-1 text-red-600" />
                  Inactive
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-maintenance"
                  name="status"
                  className="mr-2"
                  checked={formData.status === "maintenance"}
                  onChange={() => handleStatusChange("maintenance")}
                />
                <Label htmlFor="status-maintenance" className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1 text-amber-600" />
                  Maintenance
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Equipment & Maintenance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="equipmentCount">Equipment Count</Label>
            <Input
              id="equipmentCount"
              name="equipmentCount"
              type="number"
              min="0"
              value={formData.equipmentCount}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="maintenanceSchedule">Maintenance Schedule</Label>
            <Input
              id="maintenanceSchedule"
              name="maintenanceSchedule"
              value={formData.maintenanceSchedule}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="lastMaintenance">Last Maintenance Date</Label>
            <Input
              id="lastMaintenance"
              name="lastMaintenance"
              type="date"
              value={formData.lastMaintenance}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="nextMaintenance">Next Maintenance Date</Label>
            <Input
              id="nextMaintenance"
              name="nextMaintenance"
              type="date"
              value={formData.nextMaintenance}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" /> Save Changes
        </Button>
      </div>
    </div>
  )
}

// Delete branch dialog
const DeleteBranchDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Branch</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this branch? This action cannot be undone and will remove all data
            associated with this branch.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Branch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Branch details page
export default function BranchDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [branch, setBranch] = useState(MOCK_BRANCH)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, you would fetch the branch data based on the ID
  useEffect(() => {
    // Simulating API call
    console.log(`Fetching branch with ID: ${params.id}`)
    // setBranch(fetchedBranch);
  }, [params.id])

  const handleUpdateHours = (hours: Record<string, { open: string; close: string }>) => {
    setBranch((prev) => ({ ...prev, openingHours: hours }))
  }

  const handleUpdateServices = (services: any[]) => {
    setBranch((prev) => ({ ...prev, servicesOffered: services }))
  }

  const handleUpdateStaff = (staff: any[]) => {
    setBranch((prev) => ({ ...prev, staff }))
  }

  const handleUpdateSettings = (settings: any) => {
    setBranch((prev) => ({ ...prev, ...settings }))
  }

  const handleDeleteBranch = () => {
    // In a real app, you would call an API to delete the branch
    toast({
      title: "Branch Deleted",
      description: `${branch.name} has been deleted successfully.`,
    })
    router.push("/app/branches")
  }

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/app/branches")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Branches
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" /> Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Branch Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setActiveTab("settings")}>
              <Edit className="mr-2 h-4 w-4" /> Edit Branch
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={() => setDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Branch
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden">
          <img src={branch.image || "/placeholder.svg"} alt={branch.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4">
            <StatusBadge status={branch.status} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{branch.name}</h1>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
            <p className="text-muted-foreground">{branch.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{branch.servicesOffered.length}</h3>
                <p className="text-muted-foreground">Services Offered</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{branch.staff.length}</h3>
                <p className="text-muted-foreground">Staff Members</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">
                  {formatCurrency(branch.metrics.revenue.monthly.slice(-1)[0].amount)}
                </h3>
                <p className="text-muted-foreground">Monthly Revenue</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Branch Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{branch.email}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {Object.entries(branch.openingHours).map(([day, hours]) => (
                      <div key={day} className="capitalize">
                        {day}: {hours.open} - {hours.close}
                      </div>
                    ))}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <BranchMap coordinates={branch.coordinates} />
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`https://maps.google.com/?q=${branch.address}`, "_blank")}
                >
                  <MapPin className="mr-2 h-4 w-4" /> Get Directions
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Equipment & Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Equipment</h4>
                  <p className="text-2xl font-bold">{branch.equipmentCount} Units</p>
                  <p className="text-muted-foreground">Total washing equipment</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Maintenance Schedule</h4>
                  <p className="text-lg">{branch.maintenanceSchedule}</p>
                  <div className="flex flex-col mt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Maintenance:</span>
                      <span>{new Date(branch.lastMaintenance).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Maintenance:</span>
                      <span>{new Date(branch.nextMaintenance).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
              <CardDescription>Most requested services at this branch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={branch.metrics.servicePopularity}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {branch.metrics.servicePopularity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Popularity"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <ServiceManagement services={branch.servicesOffered} onUpdate={handleUpdateServices} />
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <StaffManagement staff={branch.staff} onUpdate={handleUpdateStaff} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Last 7 days revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={branch.metrics.revenue.daily}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatCurrency(value as number), "Revenue"]} />
                      <Bar dataKey="amount" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Traffic</CardTitle>
                <CardDescription>Last 7 days customer count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={branch.metrics.customerTraffic.daily}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} customers`, "Traffic"]} />
                      <Line type="monotone" dataKey="count" stroke="#00C49F" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Peak Hours</CardTitle>
              <CardDescription>Customer traffic by hour of day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={branch.metrics.peakHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} customers`, "Traffic"]} />
                    <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Revenue and customer traffic trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={branch.metrics.revenue.monthly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#0088FE" />
                    <YAxis yAxisId="right" orientation="right" stroke="#00C49F" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="amount"
                      name="Revenue ($)"
                      stroke="#0088FE"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="count"
                      name="Customers"
                      stroke="#00C49F"
                      strokeWidth={2}
                      data={branch.metrics.customerTraffic.monthly}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <BranchSettings branch={branch} onUpdate={handleUpdateSettings} />

          <Separator />

          <HoursEditor hours={branch.openingHours} onSave={handleUpdateHours} />

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
            <p className="text-muted-foreground">
              Once you delete a branch, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Branch
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <DeleteBranchDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={handleDeleteBranch} />
    </div>
  )
}

