"use client"

import { useState } from "react"
import {
  Download,
  Edit,
  MoreHorizontal,
  PlusCircle,
  Search,
  Trash2,
  Upload,
  CheckCircle,
  RefreshCw,
  Star,
  Package,
  Filter,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Sample suppliers data
const suppliersData = [
  {
    id: "S001",
    name: "CleanCo Supplies",
    contact: "John Smith",
    phone: "555-123-4567",
    email: "john@cleanco.com",
    address: "123 Main St, Anytown, CA 90210",
    website: "https://cleanco.com",
    category: "Cleaning Supplies",
    rating: 4.5,
    status: "active",
    leadTime: 3,
    paymentTerms: "Net 30",
    notes: "Preferred supplier for all cleaning chemicals",
    lastOrder: "2023-05-15",
    totalSpent: 12500.75,
    itemsSupplied: 8,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "S002",
    name: "Auto Detail Distributors",
    contact: "Sarah Johnson",
    phone: "555-234-5678",
    email: "sarah@autodetail.com",
    address: "456 Oak Ave, Somewhere, NY 10001",
    website: "https://autodetaildist.com",
    category: "Detailing Products",
    rating: 4.8,
    status: "active",
    leadTime: 5,
    paymentTerms: "Net 15",
    notes: "High quality detailing products",
    lastOrder: "2023-05-10",
    totalSpent: 8750.25,
    itemsSupplied: 12,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "S003",
    name: "Premium Auto Care",
    contact: "Michael Brown",
    phone: "555-345-6789",
    email: "michael@premium.com",
    address: "789 Pine Rd, Elsewhere, TX 75001",
    website: "https://premiumautocare.com",
    category: "Premium Products",
    rating: 4.2,
    status: "active",
    leadTime: 7,
    paymentTerms: "Net 45",
    notes: "Premium products at higher price points",
    lastOrder: "2023-04-28",
    totalSpent: 15200.5,
    itemsSupplied: 6,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "S004",
    name: "Fresh Scents Co.",
    contact: "Jessica Davis",
    phone: "555-456-7890",
    email: "jessica@freshscents.com",
    address: "101 Cedar Ln, Nowhere, FL 33101",
    website: "https://freshscents.com",
    category: "Air Fresheners",
    rating: 3.9,
    status: "inactive",
    leadTime: 4,
    paymentTerms: "Net 30",
    notes: "Specialized in air fresheners and scents",
    lastOrder: "2023-03-15",
    totalSpent: 4250.0,
    itemsSupplied: 3,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "S005",
    name: "Auto Equipment Supply",
    contact: "David Wilson",
    phone: "555-567-8901",
    email: "david@autoequipment.com",
    address: "202 Maple Dr, Anywhere, WA 98001",
    website: "https://autoequipmentsupply.com",
    category: "Equipment",
    rating: 4.7,
    status: "active",
    leadTime: 10,
    paymentTerms: "Net 60",
    notes: "Heavy equipment and machinery",
    lastOrder: "2023-05-05",
    totalSpent: 28750.75,
    itemsSupplied: 5,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "S006",
    name: "Eco-Friendly Wash Solutions",
    contact: "Amanda Green",
    phone: "555-678-9012",
    email: "amanda@ecowash.com",
    address: "303 Birch Blvd, Someplace, OR 97201",
    website: "https://ecowash.com",
    category: "Eco-Friendly Products",
    rating: 4.6,
    status: "active",
    leadTime: 6,
    paymentTerms: "Net 30",
    notes: "Environmentally friendly products",
    lastOrder: "2023-05-12",
    totalSpent: 9500.25,
    itemsSupplied: 7,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "S007",
    name: "Wholesale Car Care",
    contact: "Robert Taylor",
    phone: "555-789-0123",
    email: "robert@wholesalecarcare.com",
    address: "404 Spruce St, Otherplace, IL 60601",
    website: "https://wholesalecarcare.com",
    category: "Bulk Supplies",
    rating: 4.0,
    status: "active",
    leadTime: 2,
    paymentTerms: "Net 15",
    notes: "Bulk supplies at wholesale prices",
    lastOrder: "2023-05-08",
    totalSpent: 18250.5,
    itemsSupplied: 15,
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "S008",
    name: "Professional Detailing Supplies",
    contact: "Jennifer White",
    phone: "555-890-1234",
    email: "jennifer@prodetail.com",
    address: "505 Elm Ct, Lastplace, GA 30301",
    website: "https://prodetail.com",
    category: "Professional Products",
    rating: 4.9,
    status: "active",
    leadTime: 4,
    paymentTerms: "Net 30",
    notes: "Professional grade products",
    lastOrder: "2023-05-18",
    totalSpent: 22500.75,
    itemsSupplied: 10,
    logo: "/placeholder.svg?height=40&width=40",
  },
]

// Sample products supplied by suppliers
const supplierProducts = [
  {
    supplierId: "S001",
    products: [
      { id: "P001", name: "Car Wash Soap", price: 24.99, lastOrderDate: "2023-05-15", minOrderQty: 10 },
      { id: "P002", name: "Glass Cleaner", price: 8.99, lastOrderDate: "2023-05-15", minOrderQty: 12 },
      { id: "P003", name: "Interior Cleaner", price: 12.99, lastOrderDate: "2023-04-20", minOrderQty: 8 },
      { id: "P004", name: "Tire Shine", price: 18.5, lastOrderDate: "2023-04-15", minOrderQty: 6 },
    ],
  },
  {
    supplierId: "S002",
    products: [
      { id: "P005", name: "Microfiber Towels", price: 0.99, lastOrderDate: "2023-05-10", minOrderQty: 100 },
      { id: "P006", name: "Dashboard Protectant", price: 15.75, lastOrderDate: "2023-04-20", minOrderQty: 12 },
      { id: "P007", name: "Wash Mitts", price: 7.99, lastOrderDate: "2023-04-22", minOrderQty: 24 },
    ],
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Cleaning Supplies",
  "Detailing Products",
  "Premium Products",
  "Air Fresheners",
  "Equipment",
  "Eco-Friendly Products",
  "Bulk Supplies",
  "Professional Products",
]

export default function SuppliersPage() {
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [isAddSupplierDialogOpen, setIsAddSupplierDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  // Filter suppliers based on search, category, and status
  const filteredSuppliers = suppliersData
    .filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All Categories" || supplier.category === selectedCategory

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && supplier.status === "active") ||
        (selectedStatus === "inactive" && supplier.status === "inactive")

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      // Handle sorting
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "rating") {
        return sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating
      } else if (sortField === "leadTime") {
        return sortDirection === "asc" ? a.leadTime - b.leadTime : b.leadTime - a.leadTime
      } else {
        return 0
      }
    })

  // Calculate supplier statistics
  const supplierStats = {
    totalSuppliers: suppliersData.length,
    activeSuppliers: suppliersData.filter((supplier) => supplier.status === "active").length,
    inactiveSuppliers: suppliersData.filter((supplier) => supplier.status === "inactive").length,
    averageRating: suppliersData.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliersData.length,
  }

  // Status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
          >
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 hover:bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400"
          >
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // For adding a new supplier
  const handleAddSupplier = async () => {
    setIsAddSupplierDialogOpen(false)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Supplier Added</span>
          </div>
        ),
        description: "New supplier has been added successfully.",
      })
    }, 1000)
  }

  // For updating a supplier
  const handleUpdateSupplier = async () => {
    setSelectedSupplier(null)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Supplier Updated</span>
          </div>
        ),
        description: "Supplier information has been updated successfully.",
      })
    }, 1000)
  }

  // For deleting a supplier
  const handleDeleteSupplier = async (supplierId) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "info",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Supplier Deleted</span>
          </div>
        ),
        description: "Supplier has been removed from the system.",
      })
    }, 1000)
  }

  // Toggle favorite supplier
  const toggleFavorite = (supplierId) => {
    // In a real app, this would update the supplier's favorite status
    toast({
      title: "Supplier marked as favorite",
      description: "This supplier will appear at the top of your list.",
    })
  }

  // Toggle sort direction or change sort field
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get supplier products
  const getSupplierProducts = (supplierId) => {
    const supplierData = supplierProducts.find((sp) => sp.supplierId === supplierId)
    return supplierData ? supplierData.products : []
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your suppliers and vendor relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddSupplierDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Supplier Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supplierStats.totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">Across {categories.length - 1} categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supplierStats.activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">Ready for orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inactive Suppliers</CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supplierStats.inactiveSuppliers}</div>
            <p className="text-xs text-muted-foreground">Not currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supplierStats.averageRating.toFixed(1)}</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(supplierStats.averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Supplier Directory</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Sort
                </Button>
                <Button variant="outline" size="icon" title="Refresh">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search suppliers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon" className="sm:hidden" title="Filter">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Supplier
                      {sortField === "name" && <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />}
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="hidden lg:table-cell">Category</TableHead>
                  <TableHead
                    className="text-center cursor-pointer hidden md:table-cell"
                    onClick={() => handleSort("rating")}
                  >
                    <div className="flex items-center justify-center">
                      Rating
                      {sortField === "rating" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-center cursor-pointer hidden lg:table-cell"
                    onClick={() => handleSort("leadTime")}
                  >
                    <div className="flex items-center justify-center">
                      Lead Time
                      {sortField === "leadTime" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No suppliers found. Try adjusting your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow
                      key={supplier.id}
                      onClick={() => setSelectedSupplier(supplier)}
                      className="cursor-pointer"
                    >
                      <TableCell>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={supplier.logo} alt={supplier.name} />
                          <AvatarFallback>{supplier.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground hidden sm:block">{supplier.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{supplier.contact}</TableCell>
                      <TableCell className="hidden lg:table-cell">{supplier.category}</TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        <div className="flex items-center justify-center">
                          <span className="mr-1">{supplier.rating}</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center hidden lg:table-cell">{supplier.leadTime} days</TableCell>
                      <TableCell className="text-center">{getStatusBadge(supplier.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedSupplier(supplier)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(supplier.id)
                              }}
                            >
                              <Star className="mr-2 h-4 w-4" />
                              Favorite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteSupplier(supplier.id)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredSuppliers.length}</strong> of <strong>{suppliersData.length}</strong> suppliers
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Supplier Details Dialog */}
      {selectedSupplier && (
        <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Supplier Details</DialogTitle>
              <DialogDescription>View and edit supplier information</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 py-4">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedSupplier.logo} alt={selectedSupplier.name} />
                    <AvatarFallback>{selectedSupplier.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{selectedSupplier.name}</h3>
                    <p className="text-muted-foreground">{selectedSupplier.category}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="supplier-name">Supplier Name</Label>
                    <Input id="supplier-name" defaultValue={selectedSupplier.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-category">Category</Label>
                    <Select defaultValue={selectedSupplier.category}>
                      <SelectTrigger id="supplier-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((c) => c !== "All Categories")
                          .map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-contact">Contact Person</Label>
                    <Input id="supplier-contact" defaultValue={selectedSupplier.contact} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-email">Email</Label>
                    <Input id="supplier-email" type="email" defaultValue={selectedSupplier.email} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-phone">Phone</Label>
                    <Input id="supplier-phone" defaultValue={selectedSupplier.phone} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-website">Website</Label>
                    <Input id="supplier-website" defaultValue={selectedSupplier.website} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-address">Address</Label>
                    <Input id="supplier-address" defaultValue={selectedSupplier.address} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-payment-terms">Payment Terms</Label>
                    <Select defaultValue={selectedSupplier.paymentTerms}>
                      <SelectTrigger id="supplier-payment-terms">
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 45">Net 45</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                        <SelectItem value="Immediate">Immediate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-lead-time">Lead Time (Days)</Label>
                    <Input id="supplier-lead-time" type="number" defaultValue={selectedSupplier.leadTime} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier-status">Status</Label>
                    <Select defaultValue={selectedSupplier.status}>
                      <SelectTrigger id="supplier-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="supplier-notes">Notes</Label>
                    <Textarea id="supplier-notes" defaultValue={selectedSupplier.notes} className="min-h-[100px]" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="products" className="py-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Min Order Qty</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getSupplierProducts(selectedSupplier.id).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No products found for this supplier.
                          </TableCell>
                        </TableRow>
                      ) : (
                        getSupplierProducts(selectedSupplier.id).map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.lastOrderDate}</TableCell>
                            <TableCell>{product.minOrderQty}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                Order
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>Add Product</Button>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="py-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">ORD-2023-001</TableCell>
                        <TableCell>2023-05-15</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell className="text-right">$1,245.80</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Delivered
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">ORD-2023-002</TableCell>
                        <TableCell>2023-04-20</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell className="text-right">$850.25</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            Shipped
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">ORD-2023-003</TableCell>
                        <TableCell>2023-03-10</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell className="text-right">$2,150.00</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Delivered
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>Place New Order</Button>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Delivery Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">On-Time Delivery</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Order Accuracy</span>
                            <span className="text-sm font-medium">98%</span>
                          </div>
                          <Progress value={98} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Quality Rating</span>
                            <span className="text-sm font-medium">95%</span>
                          </div>
                          <Progress value={95} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Supplier Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-5xl font-bold mb-2">{selectedSupplier.rating}</div>
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${
                                i < Math.floor(selectedSupplier.rating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : i < selectedSupplier.rating
                                    ? "text-yellow-500 fill-yellow-500 opacity-50"
                                    : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          Based on order history, quality, and reliability
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="sm:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-sm">Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Order history chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateSupplier}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Supplier Dialog */}
      <Dialog open={isAddSupplierDialogOpen} onOpenChange={setIsAddSupplierDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>Enter the details for the new supplier</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-supplier-name">Supplier Name</Label>
              <Input id="new-supplier-name" placeholder="Enter supplier name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-category">Category</Label>
              <Select>
                <SelectTrigger id="new-supplier-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c !== "All Categories")
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-contact">Contact Person</Label>
              <Input id="new-supplier-contact" placeholder="Enter contact name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-email">Email</Label>
              <Input id="new-supplier-email" type="email" placeholder="Enter email address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-phone">Phone</Label>
              <Input id="new-supplier-phone" placeholder="Enter phone number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-website">Website</Label>
              <Input id="new-supplier-website" placeholder="Enter website URL" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-address">Address</Label>
              <Input id="new-supplier-address" placeholder="Enter full address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-payment-terms">Payment Terms</Label>
              <Select>
                <SelectTrigger id="new-supplier-payment-terms">
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 45">Net 45</SelectItem>
                  <SelectItem value="Net 60">Net 60</SelectItem>
                  <SelectItem value="Immediate">Immediate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-lead-time">Lead Time (Days)</Label>
              <Input id="new-supplier-lead-time" type="number" placeholder="Enter lead time" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-supplier-status">Status</Label>
              <Select defaultValue="active">
                <SelectTrigger id="new-supplier-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="new-supplier-notes">Notes</Label>
              <Textarea
                id="new-supplier-notes"
                placeholder="Enter additional notes about this supplier"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSupplierDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddSupplier}>
              Add Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

