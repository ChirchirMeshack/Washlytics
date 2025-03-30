"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  MapPin,
  Plus,
  Filter,
  List,
  MapIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  Clock,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

// Mock data for branches
const MOCK_BRANCHES = [
  {
    id: "1",
    name: "Downtown Express Wash",
    address: "123 Main St, Downtown, NY 10001",
    phone: "(212) 555-1234",
    email: "downtown@sparklewash.com",
    status: "active",
    openingHours: "Mon-Fri: 7AM-9PM, Sat-Sun: 8AM-7PM",
    servicesCount: 12,
    staffCount: 8,
    revenue: 45000,
    customerTraffic: 1200,
    coordinates: { lat: 40.7128, lng: -74.006 },
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    name: "Westside Auto Spa",
    address: "456 West Ave, Westside, NY 10023",
    phone: "(212) 555-5678",
    email: "westside@sparklewash.com",
    status: "active",
    openingHours: "Mon-Sun: 8AM-8PM",
    servicesCount: 15,
    staffCount: 12,
    revenue: 62000,
    customerTraffic: 1500,
    coordinates: { lat: 40.7831, lng: -73.9712 },
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    name: "Eastside Detailing Center",
    address: "789 East Blvd, Eastside, NY 10028",
    phone: "(212) 555-9012",
    email: "eastside@sparklewash.com",
    status: "maintenance",
    openingHours: "Mon-Sat: 7AM-8PM, Sun: Closed",
    servicesCount: 18,
    staffCount: 15,
    revenue: 58000,
    customerTraffic: 1350,
    coordinates: { lat: 40.7739, lng: -73.9541 },
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "4",
    name: "Uptown Premium Wash",
    address: "101 North St, Uptown, NY 10029",
    phone: "(212) 555-3456",
    email: "uptown@sparklewash.com",
    status: "inactive",
    openingHours: "Temporarily Closed for Renovation",
    servicesCount: 10,
    staffCount: 0,
    revenue: 0,
    customerTraffic: 0,
    coordinates: { lat: 40.8224, lng: -73.9496 },
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    name: "Midtown Quick Clean",
    address: "555 Central Ave, Midtown, NY 10019",
    phone: "(212) 555-7890",
    email: "midtown@sparklewash.com",
    status: "active",
    openingHours: "Mon-Sun: 24 Hours",
    servicesCount: 8,
    staffCount: 20,
    revenue: 75000,
    customerTraffic: 2000,
    coordinates: { lat: 40.7549, lng: -73.984 },
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "6",
    name: "Brooklyn Heights Wash",
    address: "222 Atlantic Ave, Brooklyn, NY 11201",
    phone: "(718) 555-1234",
    email: "brooklyn@sparklewash.com",
    status: "active",
    openingHours: "Mon-Fri: 6AM-10PM, Sat-Sun: 7AM-9PM",
    servicesCount: 14,
    staffCount: 10,
    revenue: 52000,
    customerTraffic: 1400,
    coordinates: { lat: 40.6915, lng: -73.9915 },
    image: "/placeholder.svg?height=200&width=400",
  },
]

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

// Branch card component
const BranchCard = ({ branch, onClick }: { branch: any; onClick: () => void }) => {
  return (
    <Card className="h-full cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="relative">
        <img
          src={branch.image || "/placeholder.svg"}
          alt={branch.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <StatusBadge status={branch.status} />
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
        <div className="flex items-start mb-2">
          <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{branch.address}</p>
        </div>
        <div className="flex items-center mb-2">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{branch.phone}</p>
        </div>
        <div className="flex items-center mb-2">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{branch.email}</p>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground truncate">{branch.openingHours}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm">
          <span className="font-medium">{branch.servicesCount}</span> Services
        </div>
        <div className="text-sm">
          <span className="font-medium">{branch.staffCount}</span> Staff
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

// Map view component (simplified)
const MapView = ({ branches, onBranchSelect }: { branches: any[]; onBranchSelect: (id: string) => void }) => {
  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground">Interactive map would be displayed here</p>
      </div>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto bg-white p-4 rounded-lg shadow-lg">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => onBranchSelect(branch.id)}
          >
            <div>
              <p className="font-medium">{branch.name}</p>
              <p className="text-sm text-muted-foreground truncate max-w-[300px]">{branch.address}</p>
            </div>
            <StatusBadge status={branch.status} />
          </div>
        ))}
      </div>
    </div>
  )
}

// Add Branch Dialog
const AddBranchDialog = ({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: any) => void
}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    openingHours: "",
    status: "active",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, status: checked ? "active" : "inactive" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: Date.now().toString(),
      servicesCount: 0,
      staffCount: 0,
      revenue: 0,
      customerTraffic: 0,
      coordinates: { lat: 40.7128, lng: -74.006 }, // Default to NYC
      image: "/placeholder.svg?height=200&width=400",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Branch</DialogTitle>
            <DialogDescription>Enter the details for the new branch location.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Branch Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter branch name"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(xxx) xxx-xxxx"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="branch@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="openingHours">Opening Hours</Label>
              <Input
                id="openingHours"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleChange}
                placeholder="Mon-Fri: 9AM-5PM, Sat-Sun: 10AM-4PM"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="status" checked={formData.status === "active"} onCheckedChange={handleStatusChange} />
              <Label htmlFor="status">Branch is active and operational</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Branch</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function BranchesPage() {
  const router = useRouter()
  const [branches, setBranches] = useState(MOCK_BRANCHES)
  const [filteredBranches, setFilteredBranches] = useState(MOCK_BRANCHES)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  // Handle search and filtering
  useEffect(() => {
    let filtered = [...branches]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (branch) =>
          branch.name.toLowerCase().includes(query) ||
          branch.address.toLowerCase().includes(query) ||
          branch.email.toLowerCase().includes(query) ||
          branch.phone.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((branch) => branch.status === statusFilter)
    }

    setFilteredBranches(filtered)
  }, [branches, searchQuery, statusFilter])

  const handleBranchClick = (id: string) => {
    router.push(`/app/branches/${id}`)
  }

  const handleAddBranch = (newBranch: any) => {
    setBranches((prev) => [newBranch, ...prev])
    toast({
      title: "Branch Added",
      description: `${newBranch.name} has been successfully added.`,
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branches</h1>
          <p className="text-muted-foreground">Manage your car wash locations and branch operations</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Branch
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search branches..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Branches</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                  <XCircle className="mr-2 h-4 w-4 text-red-600" />
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("maintenance")}>
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-600" />
                  Maintenance
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="border rounded-md p-1 flex">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              className="px-2"
              onClick={() => setViewMode("map")}
            >
              <MapIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredBranches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <MapPin className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No branches found</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            {searchQuery || statusFilter
              ? "Try adjusting your search or filters"
              : "Get started by adding your first branch"}
          </p>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Branch
          </Button>
        </div>
      ) : viewMode === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} onClick={() => handleBranchClick(branch.id)} />
          ))}
        </div>
      ) : (
        <MapView branches={filteredBranches} onBranchSelect={handleBranchClick} />
      )}

      <AddBranchDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onSave={handleAddBranch} />
    </div>
  )
}


