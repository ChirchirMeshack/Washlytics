"use client"

import { useState } from "react"
import {
  Download,
  Edit,
  MoreHorizontal,
  Package,
  PlusCircle,
  Search,
  Trash2,
  Upload,
  AlertTriangle,
  RefreshCw,
  CheckCircle,
  XCircle,
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
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Sample inventory data
const inventoryItems = [
  {
    id: "INV001",
    name: "Car Wash Soap",
    category: "Cleaning Supplies",
    currentStock: 15,
    minStock: 20,
    supplier: "CleanCo Supplies",
    price: 24.99,
    unit: "Gallon",
    lastRestocked: "2023-04-25",
    status: "low",
    location: "Warehouse A",
    sku: "CWS-001",
    barcode: "8901234567890",
  },
  {
    id: "INV002",
    name: "Microfiber Towels",
    category: "Cleaning Supplies",
    currentStock: 120,
    minStock: 50,
    supplier: "Auto Detail Distributors",
    price: 0.99,
    unit: "Each",
    lastRestocked: "2023-05-02",
    status: "in-stock",
    location: "Warehouse B",
    sku: "MFT-002",
    barcode: "8901234567891",
  },
  {
    id: "INV003",
    name: "Tire Shine",
    category: "Chemicals",
    currentStock: 12,
    minStock: 15,
    supplier: "CleanCo Supplies",
    price: 18.5,
    unit: "Bottle",
    lastRestocked: "2023-04-15",
    status: "low",
    location: "Warehouse A",
    sku: "TS-003",
    barcode: "8901234567892",
  },
  {
    id: "INV004",
    name: "Wax Polish",
    category: "Chemicals",
    currentStock: 25,
    minStock: 10,
    supplier: "Premium Auto Care",
    price: 29.99,
    unit: "Bottle",
    lastRestocked: "2023-05-10",
    status: "in-stock",
    location: "Warehouse A",
    sku: "WP-004",
    barcode: "8901234567893",
  },
  {
    id: "INV005",
    name: "Glass Cleaner",
    category: "Cleaning Supplies",
    currentStock: 18,
    minStock: 12,
    supplier: "CleanCo Supplies",
    price: 8.99,
    unit: "Spray Bottle",
    lastRestocked: "2023-05-05",
    status: "in-stock",
    location: "Warehouse B",
    sku: "GC-005",
    barcode: "8901234567894",
  },
  {
    id: "INV006",
    name: "Dashboard Protectant",
    category: "Chemicals",
    currentStock: 8,
    minStock: 10,
    supplier: "Auto Detail Distributors",
    price: 15.75,
    unit: "Bottle",
    lastRestocked: "2023-04-20",
    status: "low",
    location: "Warehouse A",
    sku: "DP-006",
    barcode: "8901234567895",
  },
  {
    id: "INV007",
    name: "Air Fresheners",
    category: "Accessories",
    currentStock: 50,
    minStock: 30,
    supplier: "Fresh Scents Co.",
    price: 1.5,
    unit: "Each",
    lastRestocked: "2023-05-01",
    status: "in-stock",
    location: "Warehouse C",
    sku: "AF-007",
    barcode: "8901234567896",
  },
  {
    id: "INV008",
    name: "Carpet Shampoo",
    category: "Cleaning Supplies",
    currentStock: 22,
    minStock: 10,
    supplier: "Premium Auto Care",
    price: 32.99,
    unit: "Gallon",
    lastRestocked: "2023-04-28",
    status: "in-stock",
    location: "Warehouse B",
    sku: "CS-008",
    barcode: "8901234567897",
  },
  {
    id: "INV009",
    name: "Clay Bars",
    category: "Detailing",
    currentStock: 5,
    minStock: 10,
    supplier: "Premium Auto Care",
    price: 19.99,
    unit: "Pack",
    lastRestocked: "2023-04-10",
    status: "critical",
    location: "Warehouse A",
    sku: "CB-009",
    barcode: "8901234567898",
  },
  {
    id: "INV010",
    name: "Pressure Washer Nozzles",
    category: "Equipment",
    currentStock: 7,
    minStock: 5,
    supplier: "Auto Equipment Supply",
    price: 12.5,
    unit: "Each",
    lastRestocked: "2023-03-15",
    status: "in-stock",
    location: "Warehouse C",
    sku: "PWN-010",
    barcode: "8901234567899",
  },
  {
    id: "INV011",
    name: "Interior Cleaner",
    category: "Cleaning Supplies",
    currentStock: 28,
    minStock: 15,
    supplier: "CleanCo Supplies",
    price: 12.99,
    unit: "Bottle",
    lastRestocked: "2023-05-08",
    status: "in-stock",
    location: "Warehouse B",
    sku: "IC-011",
    barcode: "8901234567900",
  },
  {
    id: "INV012",
    name: "Wash Mitts",
    category: "Accessories",
    currentStock: 12,
    minStock: 8,
    supplier: "Auto Detail Distributors",
    price: 7.99,
    unit: "Each",
    lastRestocked: "2023-04-22",
    status: "in-stock",
    location: "Warehouse A",
    sku: "WM-012",
    barcode: "8901234567901",
  },
]

// Available suppliers
const suppliers = [
  { id: "S001", name: "CleanCo Supplies", contact: "John Smith", phone: "555-123-4567", email: "john@cleanco.com" },
  {
    id: "S002",
    name: "Auto Detail Distributors",
    contact: "Sarah Johnson",
    phone: "555-234-5678",
    email: "sarah@autodetail.com",
  },
  {
    id: "S003",
    name: "Premium Auto Care",
    contact: "Michael Brown",
    phone: "555-345-6789",
    email: "michael@premium.com",
  },
  {
    id: "S004",
    name: "Fresh Scents Co.",
    contact: "Jessica Davis",
    phone: "555-456-7890",
    email: "jessica@freshscents.com",
  },
  {
    id: "S005",
    name: "Auto Equipment Supply",
    contact: "David Wilson",
    phone: "555-567-8901",
    email: "david@autoequipment.com",
  },
]

// Categories for filtering
const categories = ["All Categories", "Cleaning Supplies", "Chemicals", "Accessories", "Detailing", "Equipment"]

// Warehouse locations
const locations = ["All Locations", "Warehouse A", "Warehouse B", "Warehouse C"]

export default function InventoryStockPage() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isAdjustStockDialogOpen, setIsAdjustStockDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [adjustmentItem, setAdjustmentItem] = useState(null)
  const [adjustmentQuantity, setAdjustmentQuantity] = useState(0)
  const [adjustmentReason, setAdjustmentReason] = useState("")

  // Filter inventory items based on search, category, location, and status
  const filteredItems = inventoryItems
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
      const matchesLocation = selectedLocation === "All Locations" || item.location === selectedLocation

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "low" && item.status === "low") ||
        (selectedStatus === "critical" && item.status === "critical") ||
        (selectedStatus === "in-stock" && item.status === "in-stock")

      return matchesSearch && matchesCategory && matchesLocation && matchesStatus
    })
    .sort((a, b) => {
      // Handle sorting
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price
      } else if (sortField === "currentStock") {
        return sortDirection === "asc" ? a.currentStock - b.currentStock : b.currentStock - a.currentStock
      } else {
        return 0
      }
    })

  // Calculate inventory statistics
  const inventoryStats = {
    totalItems: inventoryItems.length,
    lowStock: inventoryItems.filter((item) => item.status === "low").length,
    criticalStock: inventoryItems.filter((item) => item.status === "critical").length,
    totalValue: inventoryItems.reduce((sum, item) => sum + item.price * item.currentStock, 0),
  }

  // Status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "in-stock":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
          >
            In Stock
          </Badge>
        )
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400"
          >
            Low Stock
          </Badge>
        )
      case "critical":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-900/20 dark:text-red-400"
          >
            Critical
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Calculate stock level percentage
  const getStockPercentage = (current, min) => {
    if (min === 0) return 100

    // If current stock is double the min or more, cap at 100%
    if (current >= min * 2) return 100

    // Otherwise calculate percentage relative to the target (min * 2)
    return Math.round((current / (min * 2)) * 100)
  }

  // Stock level bar color
  const getStockBarColor = (status) => {
    switch (status) {
      case "in-stock":
        return "bg-green-500"
      case "low":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // For adding a new item
  const handleAddItem = async () => {
    setIsAddItemDialogOpen(false)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Item Added</span>
          </div>
        ),
        description: "New inventory item has been added successfully.",
      })
    }, 1000)
  }

  // For updating an item
  const handleUpdateItem = async () => {
    setSelectedItem(null)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Item Updated</span>
          </div>
        ),
        description: "Inventory item has been updated successfully.",
      })
    }, 1000)
  }

  // For deleting an item
  const handleDeleteItem = async (itemId) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "info",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Item Deleted</span>
          </div>
        ),
        description: "Inventory item has been removed from the system.",
      })
    }, 1000)
  }

  // For restocking an item
  const handleRestockItem = async (itemId) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Item Restocked</span>
          </div>
        ),
        description: "Inventory has been updated with new stock.",
      })
    }, 1000)
  }

  // For adjusting stock
  const handleAdjustStock = async () => {
    setIsAdjustStockDialogOpen(false)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Stock Adjusted</span>
          </div>
        ),
        description: `Inventory for ${adjustmentItem.name} has been adjusted by ${adjustmentQuantity} units.`,
      })
      setAdjustmentItem(null)
      setAdjustmentQuantity(0)
      setAdjustmentReason("")
    }, 1000)
  }

  // For low stock alerts
  const showLowStockAlert = (item) => {
    toast({
      variant: "warning",
      title: (
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>Low Stock Alert</span>
        </div>
      ),
      description: `${item.name} is running low. Current stock: ${item.currentStock} ${item.unit}s.`,
    })
  }

  // For critical stock alerts
  const showCriticalStockAlert = (item) => {
    toast({
      variant: "destructive",
      title: (
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <span>Critical Stock Alert</span>
        </div>
      ),
      description: `${item.name} is critically low! Current stock: ${item.currentStock} ${item.unit}s.`,
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

  // Open adjust stock dialog
  const openAdjustStockDialog = (item) => {
    setAdjustmentItem(item)
    setAdjustmentQuantity(0)
    setAdjustmentReason("")
    setIsAdjustStockDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Stock</h1>
          <p className="text-muted-foreground">Manage your inventory supplies and stock levels</p>
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
          <Button onClick={() => setIsAddItemDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalItems}</div>
            <p className="text-xs text-muted-foreground">Across {categories.length - 1} categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.lowStock}</div>
            <p className="text-xs text-muted-foreground">Need to restock soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.criticalStock}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${inventoryStats.totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Current inventory valuation</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Inventory Items</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className="hidden sm:flex"
                >
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
                  placeholder="Search inventory..."
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

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
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
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
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
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Name
                      {sortField === "name" && <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />}
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">Location</TableHead>
                  <TableHead className="hidden md:table-cell">Supplier</TableHead>
                  <TableHead className="text-center cursor-pointer" onClick={() => handleSort("currentStock")}>
                    <div className="flex items-center justify-center">
                      Stock
                      {sortField === "currentStock" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("price")}>
                    <div className="flex items-center justify-end">
                      Price
                      {sortField === "price" && <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />}
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No results found. Try adjusting your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer">
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                      <TableCell className="hidden lg:table-cell">{item.location}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.supplier}</TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center gap-1">
                          <div className="text-sm">
                            {item.currentStock} {item.unit}s
                          </div>
                          <Progress
                            value={getStockPercentage(item.currentStock, item.minStock)}
                            className={`h-2 w-full ${getStockBarColor(item.status)}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
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
                                setSelectedItem(item)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                openAdjustStockDialog(item)
                              }}
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRestockItem(item.id)
                              }}
                            >
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Restock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteItem(item.id)
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
            Showing <strong>{filteredItems.length}</strong> of <strong>{inventoryItems.length}</strong> items
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

      {/* Item Details Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Inventory Item Details</DialogTitle>
              <DialogDescription>View and edit item information</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="suppliers">Supplier</TabsTrigger>
                <TabsTrigger value="related">Related Items</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="item-id">Item ID</Label>
                    <Input id="item-id" value={selectedItem.id} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input id="item-name" defaultValue={selectedItem.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-sku">SKU</Label>
                    <Input id="item-sku" defaultValue={selectedItem.sku} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-barcode">Barcode</Label>
                    <Input id="item-barcode" defaultValue={selectedItem.barcode} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-category">Category</Label>
                    <Select defaultValue={selectedItem.category}>
                      <SelectTrigger id="item-category">
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
                    <Label htmlFor="item-location">Location</Label>
                    <Select defaultValue={selectedItem.location}>
                      <SelectTrigger id="item-location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations
                          .filter((l) => l !== "All Locations")
                          .map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-supplier">Supplier</Label>
                    <Select defaultValue={selectedItem.supplier}>
                      <SelectTrigger id="item-supplier">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.name}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-price">Price (per unit)</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input
                        id="item-price"
                        type="number"
                        step="0.01"
                        defaultValue={selectedItem.price}
                        className="pl-6"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-unit">Unit Type</Label>
                    <Input id="item-unit" defaultValue={selectedItem.unit} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-current-stock">Current Stock</Label>
                    <Input id="item-current-stock" type="number" defaultValue={selectedItem.currentStock} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-min-stock">Minimum Stock Level</Label>
                    <Input id="item-min-stock" type="number" defaultValue={selectedItem.minStock} />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="item-description">Description</Label>
                    <Textarea id="item-description" placeholder="Enter item description" className="min-h-[100px]" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="py-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Note</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2023-05-12</TableCell>
                        <TableCell>Stock Count</TableCell>
                        <TableCell>+2</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>Inventory adjustment</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{selectedItem.lastRestocked}</TableCell>
                        <TableCell>Restocked</TableCell>
                        <TableCell>+20</TableCell>
                        <TableCell>Sarah Johnson</TableCell>
                        <TableCell>Regular order</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2023-04-10</TableCell>
                        <TableCell>Used</TableCell>
                        <TableCell>-5</TableCell>
                        <TableCell>Mike Smith</TableCell>
                        <TableCell>Daily usage</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="suppliers" className="py-4">
                {suppliers
                  .filter((s) => s.name === selectedItem.supplier)
                  .map((supplier) => (
                    <div key={supplier.id} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Supplier Name</Label>
                          <div className="rounded-md border px-3 py-2">{supplier.name}</div>
                        </div>

                        <div className="space-y-2">
                          <Label>Contact Person</Label>
                          <div className="rounded-md border px-3 py-2">{supplier.contact}</div>
                        </div>

                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <div className="rounded-md border px-3 py-2">{supplier.phone}</div>
                        </div>

                        <div className="space-y-2">
                          <Label>Email</Label>
                          <div className="rounded-md border px-3 py-2">{supplier.email}</div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline">View All Products</Button>
                        <Button>Place Order</Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="related" className="py-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inventoryItems
                    .filter((item) => item.category === selectedItem.category && item.id !== selectedItem.id)
                    .slice(0, 6)
                    .map((relatedItem) => (
                      <Card key={relatedItem.id} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium">{relatedItem.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex justify-between text-sm">
                            <span>Stock: {relatedItem.currentStock}</span>
                            <span>${relatedItem.price.toFixed(2)}</span>
                          </div>
                          <Progress
                            value={getStockPercentage(relatedItem.currentStock, relatedItem.minStock)}
                            className={`h-2 w-full mt-2 ${getStockBarColor(relatedItem.status)}`}
                          />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedItem(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateItem}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>Enter the details for the new inventory item</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-item-name">Item Name</Label>
              <Input id="new-item-name" placeholder="Enter item name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-item-sku">SKU</Label>
              <Input id="new-item-sku" placeholder="Enter SKU" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-item-barcode">Barcode (Optional)</Label>
              <Input id="new-item-barcode" placeholder="Enter barcode" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-item-category">Category</Label>
              <Select>
                <SelectTrigger id="new-item-category">
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
              <Label htmlFor="new-item-location">Location</Label>
              <Select>
                <SelectTrigger id="new-item-location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations
                    .filter((l) => l !== "All Locations")
                    .map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-item-supplier">Supplier</Label>
              <Select>
                <SelectTrigger id="new-item-supplier">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-item-price">Price (per unit)</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <Input id="new-item-price" type="number" step="0.01" placeholder="0.00" className="pl-6" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-item-unit">Unit Type</Label>
              <Input id="new-item-unit" placeholder="e.g. Bottle, Gallon, Each" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-item-initial-stock">Initial Stock</Label>
              <Input id="new-item-initial-stock" type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-item-min-stock">Minimum Stock Level</Label>
              <Input id="new-item-min-stock" type="number" placeholder="10" />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="new-item-description">Description</Label>
              <Textarea id="new-item-description" placeholder="Enter item description" className="min-h-[100px]" />
            </div>

            <div className="col-span-2 flex items-center space-x-2">
              <Switch id="new-item-track-expiry" />
              <Label htmlFor="new-item-track-expiry">Track expiry date for this item</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddItem}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Stock Dialog */}
      <Dialog open={isAdjustStockDialogOpen} onOpenChange={setIsAdjustStockDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Stock Level</DialogTitle>
            <DialogDescription>
              {adjustmentItem && `Current stock: ${adjustmentItem.currentStock} ${adjustmentItem.unit}s`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="adjustment-quantity">Adjustment Quantity</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdjustmentQuantity((prev) => prev - 1)}
                  disabled={adjustmentQuantity <= -100}
                >
                  -
                </Button>
                <Input
                  id="adjustment-quantity"
                  type="number"
                  value={adjustmentQuantity}
                  onChange={(e) => setAdjustmentQuantity(Number.parseInt(e.target.value) || 0)}
                  className="mx-2 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdjustmentQuantity((prev) => prev + 1)}
                  disabled={adjustmentQuantity >= 100}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Use positive values to add stock, negative to remove</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adjustment-reason">Reason for Adjustment</Label>
              <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
                <SelectTrigger id="adjustment-reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock-count">Stock Count</SelectItem>
                  <SelectItem value="damaged">Damaged/Defective</SelectItem>
                  <SelectItem value="returned">Customer Return</SelectItem>
                  <SelectItem value="internal-use">Internal Use</SelectItem>
                  <SelectItem value="correction">Data Correction</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {adjustmentReason === "other" && (
              <div className="space-y-2">
                <Label htmlFor="adjustment-notes">Notes</Label>
                <Textarea id="adjustment-notes" placeholder="Enter details about this adjustment" />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjustStockDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdjustStock} disabled={adjustmentQuantity === 0 || !adjustmentReason}>
              Confirm Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

