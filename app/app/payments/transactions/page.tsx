"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock transaction data
const transactions = [
  {
    id: "TX-1234",
    date: new Date(2023, 2, 15),
    customer: "John Smith",
    amount: 49.99,
    paymentMethod: "Credit Card",
    status: "completed",
    description: "Premium Wash Package",
  },
  {
    id: "TX-1235",
    date: new Date(2023, 2, 15),
    customer: "Sarah Johnson",
    amount: 29.99,
    paymentMethod: "Debit Card",
    status: "completed",
    description: "Basic Wash Package",
  },
  {
    id: "TX-1236",
    date: new Date(2023, 2, 14),
    customer: "Michael Brown",
    amount: 79.99,
    paymentMethod: "Cash",
    status: "completed",
    description: "Deluxe Wash + Wax",
  },
  {
    id: "TX-1237",
    date: new Date(2023, 2, 14),
    customer: "Emily Davis",
    amount: 19.99,
    paymentMethod: "Mobile Payment",
    status: "pending",
    description: "Express Wash",
  },
  {
    id: "TX-1238",
    date: new Date(2023, 2, 13),
    customer: "David Wilson",
    amount: 149.99,
    paymentMethod: "Credit Card",
    status: "completed",
    description: "Monthly Subscription",
  },
  {
    id: "TX-1239",
    date: new Date(2023, 2, 13),
    customer: "Jennifer Lee",
    amount: 59.99,
    paymentMethod: "Debit Card",
    status: "refunded",
    description: "Interior Detailing",
  },
  {
    id: "TX-1240",
    date: new Date(2023, 2, 12),
    customer: "Robert Taylor",
    amount: 39.99,
    paymentMethod: "Cash",
    status: "completed",
    description: "Standard Wash Package",
  },
  {
    id: "TX-1241",
    date: new Date(2023, 2, 12),
    customer: "Lisa Anderson",
    amount: 89.99,
    paymentMethod: "Credit Card",
    status: "completed",
    description: "Full Detail Package",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-800 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    refunded: "bg-red-100 text-red-800 hover:bg-red-100",
    failed: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  }

  const statusType = status as keyof typeof statusStyles

  return <Badge className={cn("capitalize", statusStyles[statusType] || "")}>{status}</Badge>
}

export default function TransactionsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null)

  // Calculate transaction statistics
  const totalTransactions = transactions.length
  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0)
  const completedTransactions = transactions.filter((tx) => tx.status === "completed").length
  const pendingTransactions = transactions.filter((tx) => tx.status === "pending").length
  const refundedTransactions = transactions.filter((tx) => tx.status === "refunded").length

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((tx) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter

    // Payment method filter
    const matchesPaymentMethod = paymentMethodFilter === "all" || tx.paymentMethod === paymentMethodFilter

    // Date range filter
    const matchesDateRange =
      (!dateRange.from || tx.date >= dateRange.from) && (!dateRange.to || tx.date <= dateRange.to)

    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateRange
  })

  // Handle transaction click
  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
  }

  // Handle export
  const handleExport = () => {
    alert("Exporting transactions...")
    // Implementation for exporting transactions
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your payment transactions</p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground mt-1">For the selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Revenue from all transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending/Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingTransactions}/{refundedTransactions}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting processing/Refunded</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Debit Card">Debit Card</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell>
                        <StatusBadge status={transaction.status} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Complete information about this transaction</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                  <p className="font-medium">{selectedTransaction.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{format(selectedTransaction.date, "MMMM dd, yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p>{selectedTransaction.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p className="font-bold">${selectedTransaction.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p>{selectedTransaction.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <StatusBadge status={selectedTransaction.status} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p>{selectedTransaction.description}</p>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                {selectedTransaction.status === "pending" && (
                  <Button variant="outline" className="text-yellow-600">
                    Process Payment
                  </Button>
                )}
                {selectedTransaction.status === "completed" && (
                  <Button variant="outline" className="text-red-600">
                    Issue Refund
                  </Button>
                )}
                <Button>View Receipt</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

