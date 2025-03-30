"use client"

import React from "react"

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
  Filter,
  ArrowUpDown,
  Clock,
  Truck,
  FileText,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Eye,
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
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Separator } from "@/components/ui/separator"

// Sample orders data
const ordersData = [
  {
    id: "PO-2023-001",
    type: "purchase",
    supplier: "CleanCo Supplies",
    date: "2023-05-15",
    deliveryDate: "2023-05-22",
    status: "delivered",
    total: 1245.8,
    items: 4,
    paymentStatus: "paid",
    notes: "Regular monthly order",
  },
  {
    id: "PO-2023-002",
    type: "purchase",
    supplier: "Auto Detail Distributors",
    date: "2023-05-10",
    deliveryDate: "2023-05-18",
    status: "in-transit",
    total: 850.25,
    items: 3,
    paymentStatus: "pending",
    notes: "Rush order for detailing supplies",
  },
  {
    id: "PO-2023-003",
    type: "purchase",
    supplier: "Premium Auto Care",
    date: "2023-05-05",
    deliveryDate: "2023-05-15",
    status: "processing",
    total: 2150.0,
    items: 6,
    paymentStatus: "pending",
    notes: "Quarterly bulk order",
  },
  {
    id: "SO-2023-001",
    type: "sales",
    customer: "City Fleet Services",
    date: "2023-05-18",
    deliveryDate: "2023-05-20",
    status: "delivered",
    total: 3500.0,
    items: 2,
    paymentStatus: "paid",
    notes: "Bulk order for city vehicles",
  },
  {
    id: "PO-2023-004",
    type: "purchase",
    supplier: "Eco-Friendly Wash Solutions",
    date: "2023-04-28",
    deliveryDate: "2023-05-08",
    status: "delivered",
    total: 975.5,
    items: 5,
    paymentStatus: "paid",
    notes: "Environmentally friendly products",
  },
  {
    id: "SO-2023-002",
    type: "sales",
    customer: "Luxury Auto Spa",
    date: "2023-05-12",
    deliveryDate: "2023-05-14",
    status: "delivered",
    total: 1850.75,
    items: 4,
    paymentStatus: "paid",
    notes: "Premium products for luxury vehicles",
  },
  {
    id: "PO-2023-005",
    type: "purchase",
    supplier: "Wholesale Car Care",
    date: "2023-05-20",
    deliveryDate: "2023-05-30",
    status: "pending",
    total: 3250.0,
    items: 8,
    paymentStatus: "unpaid",
    notes: "Bulk order for summer season",
  },
  {
    id: "SO-2023-003",
    type: "sales",
    customer: "Quick Shine Car Wash",
    date: "2023-05-16",
    deliveryDate: "2023-05-18",
    status: "in-transit",
    total: 950.25,
    items: 3,
    paymentStatus: "pending",
    notes: "Regular customer order",
  },
]

// Sample order items
const orderItems = [
  {
    orderId: "PO-2023-001",
    items: [
      { id: "ITEM001", name: "Car Wash Soap", quantity: 20, price: 24.99, total: 499.8 },
      { id: "ITEM002", name: "Glass Cleaner", quantity: 15, price: 8.99, total: 134.85 },
      { id: "ITEM003", name: "Tire Shine", quantity: 12, price: 18.5, total: 222.0 },
      { id: "ITEM004", name: "Interior Cleaner", quantity: 30, price: 12.99, total: 389.7 },
    ],
  },
  {
    orderId: "PO-2023-002",
    items: [
      { id: "ITEM005", name: "Microfiber Towels", quantity: 100, price: 0.99, total: 99.0 },
      { id: "ITEM006", name: "Dashboard Protectant", quantity: 24, price: 15.75, total: 378.0 },
      { id: "ITEM007", name: "Wash Mitts", quantity: 50, price: 7.99, total: 399.5 },
    ],
  },
]

// Order status options
const orderStatuses = ["All Statuses", "pending", "processing", "in-transit", "delivered", "cancelled"]

// Order type options
const orderTypes = ["All Types", "purchase", "sales"]

// Payment status options
const paymentStatuses = ["All Payments", "paid", "pending", "unpaid"]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isCreateOrderDialogOpen, setIsCreateOrderDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedPayment, setSelectedPayment] = useState("All Payments")
  const [isLoading, setIsLoading] = useState(false)
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [expandedRows, setExpandedRows] = useState<string[]>([])

  // Filter orders based on search, status, type, and payment
  const filteredOrders = ordersData
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.supplier && order.supplier.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.customer && order.customer.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = selectedStatus === "All Statuses" || order.status === selectedStatus
      const matchesType = selectedType === "All Types" || order.type === selectedType
      const matchesPayment = selectedPayment === "All Payments" || order.paymentStatus === selectedPayment

      return matchesSearch && matchesStatus && matchesType && matchesPayment
    })
    .sort((a, b) => {
      // Handle sorting
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortField === "total") {
        return sortDirection === "asc" ? a.total - b.total : b.total - a.total
      } else if (sortField === "id") {
        return sortDirection === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      } else {
        return 0
      }
    })

  // Calculate order statistics
  const orderStats = {
    totalOrders: ordersData.length,
    pendingOrders: ordersData.filter((order) => order.status === "pending").length,
    inTransitOrders: ordersData.filter((order) => order.status === "in-transit").length,
    deliveredOrders: ordersData.filter((order) => order.status === "delivered").length,
    totalValue: ordersData.reduce((sum, order) => sum + order.total, 0),
  }

  // Status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
          >
            Delivered
          </Badge>
        )
      case "in-transit":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
          >
            In Transit
          </Badge>
        )
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400"
          >
            Processing
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 hover:bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400"
          >
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-900/20 dark:text-red-400"
          >
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Payment status badge
  const getPaymentBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/20 dark:text-green-400"
          >
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400"
          >
            Pending
          </Badge>
        )
      case "unpaid":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-900/20 dark:text-red-400"
          >
            Unpaid
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // For creating a new order
  const handleCreateOrder = async () => {
    setIsCreateOrderDialogOpen(false)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Order Created</span>
          </div>
        ),
        description: "New order has been created successfully.",
      })
    }, 1000)
  }

  // For updating an order
  const handleUpdateOrder = async () => {
    setSelectedOrder(null)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Order Updated</span>
          </div>
        ),
        description: "Order information has been updated successfully.",
      })
    }, 1000)
  }

  // For deleting an order
  const handleDeleteOrder = async (orderId) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        variant: "info",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Order Deleted</span>
          </div>
        ),
        description: "Order has been removed from the system.",
      })
    }, 1000)
  }

  // Toggle sort direction or change sort field
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Get order items
  const getOrderItems = (orderId) => {
    const orderData = orderItems.find((o) => o.orderId === orderId)
    return orderData ? orderData.items : []
  }

  // Toggle row expansion
  const toggleRowExpansion = (orderId) => {
    setExpandedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage purchase orders and sales orders</p>
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
          <Button onClick={() => setIsCreateOrderDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">All purchase and sales orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.inTransitOrders}</div>
            <p className="text-xs text-muted-foreground">Currently shipping</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.deliveredOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${orderStats.totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Combined order value</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Order Management</CardTitle>
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
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "purchase" ? "Purchase Orders" : type === "sales" ? "Sales Orders" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "All Statuses" ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="All Payments" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "All Payments" ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
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
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                    <div className="flex items-center">
                      Order ID
                      {sortField === "id" && <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />}
                    </div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Supplier/Customer</TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("date")}>
                    <div className="flex items-center">
                      Date
                      {sortField === "date" && <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />}
                    </div>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Items</TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("total")}>
                    <div className="flex items-center justify-end">
                      Total
                      {sortField === "total" && <ArrowUpDown className="ml-2 h-4 w-4" data-direction={sortDirection} />}
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">Payment</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No orders found. Try adjusting your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <TableRow>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => toggleRowExpansion(order.id)}>
                            {expandedRows.includes(order.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              order.type === "purchase"
                                ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                                : "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400"
                            }
                          >
                            {order.type === "purchase" ? "Purchase" : "Sales"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{order.supplier || order.customer}</TableCell>
                        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                        <TableCell className="hidden lg:table-cell">{order.items}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-center">{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-center hidden lg:table-cell">
                          {getPaymentBadge(order.paymentStatus)}
                        </TableCell>
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
                              <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Invoice
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteOrder(order.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {expandedRows.includes(order.id) && (
                        <TableRow>
                          <TableCell colSpan={9} className="bg-muted/50 p-0">
                            <div className="p-4">
                              <div className="mb-4">
                                <h4 className="font-semibold mb-2">Order Details</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Order Date</p>
                                    <p className="font-medium">{order.date}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Delivery Date</p>
                                    <p className="font-medium">{order.deliveryDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Payment Status</p>
                                    <p className="font-medium">{getPaymentBadge(order.paymentStatus)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Notes</p>
                                    <p className="font-medium">{order.notes}</p>
                                  </div>
                                </div>
                              </div>

                              <h4 className="font-semibold mb-2">Order Items</h4>
                              <div className="rounded-md border">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Item ID</TableHead>
                                      <TableHead>Name</TableHead>
                                      <TableHead className="text-center">Quantity</TableHead>
                                      <TableHead className="text-right">Price</TableHead>
                                      <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {getOrderItems(order.id).length === 0 ? (
                                      <TableRow>
                                        <TableCell colSpan={5} className="h-12 text-center">
                                          No items found for this order.
                                        </TableCell>
                                      </TableRow>
                                    ) : (
                                      getOrderItems(order.id).map((item) => (
                                        <TableRow key={item.id}>
                                          <TableCell className="font-medium">{item.id}</TableCell>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell className="text-center">{item.quantity}</TableCell>
                                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                          <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                                        </TableRow>
                                      ))
                                    )}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredOrders.length}</strong> of <strong>{ordersData.length}</strong> orders
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

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>View and manage order information</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 py-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{selectedOrder.id}</h3>
                    <p className="text-muted-foreground">
                      {selectedOrder.type === "purchase" ? "Purchase Order" : "Sales Order"}
                    </p>
                  </div>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{selectedOrder.type === "purchase" ? "Supplier" : "Customer"}</Label>
                    <Input defaultValue={selectedOrder.supplier || selectedOrder.customer} />
                  </div>

                  <div className="space-y-2">
                    <Label>Order Date</Label>
                    <DatePicker />
                  </div>

                  <div className="space-y-2">
                    <Label>Delivery Date</Label>
                    <DatePicker />
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue={selectedOrder.status}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatuses
                          .filter((s) => s !== "All Statuses")
                          .map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Status</Label>
                    <Select defaultValue={selectedOrder.paymentStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentStatuses
                          .filter((s) => s !== "All Payments")
                          .map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Total Amount</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input type="number" step="0.01" defaultValue={selectedOrder.total} className="pl-6" />
                    </div>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label>Notes</Label>
                    <Textarea defaultValue={selectedOrder.notes} className="min-h-[100px]" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="items" className="py-4">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">Order Items</h3>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getOrderItems(selectedOrder.id).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No items found for this order.
                          </TableCell>
                        </TableRow>
                      ) : (
                        getOrderItems(selectedOrder.id).map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="w-[200px] space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="py-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Order Created</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.date} by Admin User</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pb-2 border-b">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Status Updated to Processing</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.date} by System</p>
                    </div>
                  </div>
                  {selectedOrder.status === "delivered" && (
                    <div className="flex items-center gap-3 pb-2 border-b">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Order Delivered</p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.deliveryDate} by Delivery Team</p>
                      </div>
                    </div>
                  )}
                  {selectedOrder.paymentStatus === "paid" && (
                    <div className="flex items-center gap-3 pb-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-muted-foreground">{selectedOrder.date} by Finance Team</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateOrder}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Order Dialog */}
      <Dialog open={isCreateOrderDialogOpen} onOpenChange={setIsCreateOrderDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>Enter the details for the new order</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Order Details</TabsTrigger>
              <TabsTrigger value="items">Order Items</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="order-type">Order Type</Label>
                  <Select defaultValue="purchase">
                    <SelectTrigger id="order-type">
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Purchase Order</SelectItem>
                      <SelectItem value="sales">Sales Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select>
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleanco">CleanCo Supplies</SelectItem>
                      <SelectItem value="autodetail">Auto Detail Distributors</SelectItem>
                      <SelectItem value="premium">Premium Auto Care</SelectItem>
                      <SelectItem value="eco">Eco-Friendly Wash Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order-date">Order Date</Label>
                  <DatePickerWithRange />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery-date">Expected Delivery Date</Label>
                  <DatePickerWithRange />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-terms">Payment Terms</Label>
                  <Select defaultValue="net30">
                    <SelectTrigger id="payment-terms">
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="net15">Net 15</SelectItem>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net45">Net 45</SelectItem>
                      <SelectItem value="net60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping-method">Shipping Method</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="shipping-method">
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Shipping</SelectItem>
                      <SelectItem value="express">Express Shipping</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="order-notes">Notes</Label>
                  <Textarea
                    id="order-notes"
                    placeholder="Enter any additional notes about this order"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="items" className="py-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Items to Order</h3>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="carwash">Car Wash Soap</SelectItem>
                            <SelectItem value="glass">Glass Cleaner</SelectItem>
                            <SelectItem value="tire">Tire Shine</SelectItem>
                            <SelectItem value="interior">Interior Cleaner</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue="1" min="1" className="text-center" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" step="0.01" defaultValue="24.99" className="text-right" />
                      </TableCell>
                      <TableCell className="text-right">$24.99</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="carwash">Car Wash Soap</SelectItem>
                            <SelectItem value="glass">Glass Cleaner</SelectItem>
                            <SelectItem value="tire">Tire Shine</SelectItem>
                            <SelectItem value="interior">Interior Cleaner</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue="1" min="1" className="text-center" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" step="0.01" defaultValue="8.99" className="text-right" />
                      </TableCell>
                      <TableCell className="text-right">$8.99</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="w-[200px] space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>$33.98</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (7%):</span>
                    <span>$2.38</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>$36.36</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOrderDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleCreateOrder}>
              Create Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

