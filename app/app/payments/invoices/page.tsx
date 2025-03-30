"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays } from "date-fns"
import {
  Search,
  Download,
  Plus,
  FileText,
  Mail,
  MoreHorizontal,
  Printer,
  Edit,
  Trash,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Mock invoice data
const invoices = [
  {
    id: "INV-001",
    customer: "John Smith",
    email: "john.smith@example.com",
    amount: 149.99,
    date: new Date(2023, 2, 15),
    dueDate: addDays(new Date(2023, 2, 15), 30),
    status: "paid",
    items: [
      { description: "Premium Wash Package", quantity: 1, price: 49.99 },
      { description: "Interior Detailing", quantity: 1, price: 89.99 },
      { description: "Wax Treatment", quantity: 1, price: 10.0 },
    ],
  },
  {
    id: "INV-002",
    customer: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    amount: 29.99,
    date: new Date(2023, 2, 14),
    dueDate: addDays(new Date(2023, 2, 14), 30),
    status: "paid",
    items: [{ description: "Basic Wash Package", quantity: 1, price: 29.99 }],
  },
  {
    id: "INV-003",
    customer: "Michael Brown",
    email: "michael.brown@example.com",
    amount: 79.99,
    date: new Date(2023, 2, 13),
    dueDate: addDays(new Date(2023, 2, 13), 30),
    status: "pending",
    items: [{ description: "Deluxe Wash + Wax", quantity: 1, price: 79.99 }],
  },
  {
    id: "INV-004",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    amount: 19.99,
    date: new Date(2023, 2, 12),
    dueDate: addDays(new Date(2023, 2, 12), 30),
    status: "overdue",
    items: [{ description: "Express Wash", quantity: 1, price: 19.99 }],
  },
  {
    id: "INV-005",
    customer: "David Wilson",
    email: "david.wilson@example.com",
    amount: 149.99,
    date: new Date(2023, 2, 11),
    dueDate: addDays(new Date(2023, 2, 11), 30),
    status: "paid",
    items: [{ description: "Monthly Subscription", quantity: 1, price: 149.99 }],
  },
  {
    id: "INV-006",
    customer: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    amount: 59.99,
    date: new Date(2023, 2, 10),
    dueDate: addDays(new Date(2023, 2, 10), 30),
    status: "draft",
    items: [{ description: "Interior Detailing", quantity: 1, price: 59.99 }],
  },
  {
    id: "INV-007",
    customer: "Robert Taylor",
    email: "robert.taylor@example.com",
    amount: 39.99,
    date: new Date(2023, 2, 9),
    dueDate: addDays(new Date(2023, 2, 9), 30),
    status: "pending",
    items: [{ description: "Standard Wash Package", quantity: 1, price: 39.99 }],
  },
  {
    id: "INV-008",
    customer: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    amount: 89.99,
    date: new Date(2023, 2, 8),
    dueDate: addDays(new Date(2023, 2, 8), 30),
    status: "paid",
    items: [{ description: "Full Detail Package", quantity: 1, price: 89.99 }],
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    paid: "bg-green-100 text-green-800 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    overdue: "bg-red-100 text-red-800 hover:bg-red-100",
    draft: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  }

  const statusType = status as keyof typeof statusStyles

  return <Badge className={cn("capitalize", statusStyles[statusType] || "")}>{status}</Badge>
}

// Status icon component
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "paid":
      return <CheckCircle2 className="h-5 w-5 text-green-600" />
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-600" />
    case "overdue":
      return <XCircle className="h-5 w-5 text-red-600" />
    case "draft":
      return <FileText className="h-5 w-5 text-gray-600" />
    default:
      return null
  }
}

export default function InvoicesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Calculate invoice statistics
  const totalInvoices = invoices.length
  const paidInvoices = invoices.filter((inv) => inv.status === "paid").length
  const pendingInvoices = invoices.filter((inv) => inv.status === "pending").length
  const overdueInvoices = invoices.filter((inv) => inv.status === "overdue").length
  const draftInvoices = invoices.filter((inv) => inv.status === "draft").length

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidAmount = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = invoices
    .filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0)

  // Filter invoices based on search and filters
  const filteredInvoices = invoices.filter((inv) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Handle invoice click
  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice)
  }

  // Handle create invoice
  const handleCreateInvoice = () => {
    setIsCreateDialogOpen(true)
  }

  // Handle send invoice
  const handleSendInvoice = (invoice: any) => {
    alert(`Sending invoice ${invoice.id} to ${invoice.email}`)
    // Implementation for sending invoice
  }

  // Handle download invoice
  const handleDownloadInvoice = (invoice: any) => {
    alert(`Downloading invoice ${invoice.id}`)
    // Implementation for downloading invoice
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Create, manage, and track customer invoices</p>
        </div>
        <Button onClick={handleCreateInvoice} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvoices}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {paidInvoices} paid, {pendingInvoices} pending, {overdueInvoices} overdue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">From {paidInvoices} invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">From {pendingInvoices + overdueInvoices} invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>{filteredInvoices.length} invoices found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium" onClick={() => handleInvoiceClick(invoice)}>
                        {invoice.id}
                      </TableCell>
                      <TableCell onClick={() => handleInvoiceClick(invoice)}>{invoice.customer}</TableCell>
                      <TableCell onClick={() => handleInvoiceClick(invoice)}>
                        {format(invoice.date, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell onClick={() => handleInvoiceClick(invoice)}>
                        {format(invoice.dueDate, "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell onClick={() => handleInvoiceClick(invoice)}>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell onClick={() => handleInvoiceClick(invoice)}>
                        <StatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleInvoiceClick(invoice)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendInvoice(invoice)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Invoice
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
      </Card>

      {/* Invoice Details Dialog */}
      <Dialog open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <StatusIcon status={selectedInvoice?.status || ""} />
              Invoice {selectedInvoice?.id}
            </DialogTitle>
            <DialogDescription>
              {selectedInvoice?.status === "paid"
                ? "This invoice has been paid."
                : selectedInvoice?.status === "pending"
                  ? "This invoice is awaiting payment."
                  : selectedInvoice?.status === "overdue"
                    ? "This invoice is overdue."
                    : "This invoice is in draft status."}
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">From</h3>
                  <p className="font-medium">Sparkle Car Wash</p>
                  <p>123 Main Street</p>
                  <p>Anytown, ST 12345</p>
                  <p>contact@sparklecarwash.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">To</h3>
                  <p className="font-medium">{selectedInvoice.customer}</p>
                  <p>{selectedInvoice.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Invoice Number</h3>
                  <p>{selectedInvoice.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Issue Date</h3>
                  <p>{format(selectedInvoice.date, "MMMM dd, yyyy")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                  <p>{format(selectedInvoice.dueDate, "MMMM dd, yyyy")}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Items</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Subtotal
                        </TableCell>
                        <TableCell className="text-right">${selectedInvoice.amount.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Tax (0%)
                        </TableCell>
                        <TableCell className="text-right">$0.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">${selectedInvoice.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleDownloadInvoice(selectedInvoice)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                {selectedInvoice.status !== "paid" && (
                  <Button onClick={() => handleSendInvoice(selectedInvoice)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invoice
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Invoice Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>Create a new invoice for your customer</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer Name</Label>
                <Input id="customer" placeholder="Enter customer name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Customer Email</Label>
                <Input id="email" type="email" placeholder="Enter customer email" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Invoice Items</Label>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Input placeholder="Item description" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" min="1" defaultValue="1" className="w-20 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" min="0" step="0.01" defaultValue="0.00" className="w-24 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">$0.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Item
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold">$0.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter any additional notes or payment instructions" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Save as Draft
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>Create and Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

