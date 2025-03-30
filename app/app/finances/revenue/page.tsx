"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Filter, TrendingUp, DollarSign, CreditCard, Users, FileText, Wallet } from "lucide-react"
import { AreaChart, BarChart, PieChart } from "@/components/ui/chart"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/finances/data-table"
import { salesColumns } from "@/components/finances/columns"
import { generateSalesData, generateSalesByServiceData } from "@/lib/finances-data"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function RevenuePage() {
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })
  const [timeFrame, setTimeFrame] = useState("monthly")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [viewMode, setViewMode] = useState("overview")

  // Generate sample data
  const salesData = generateSalesData(dateRange.from, dateRange.to, timeFrame)
  const salesByServiceData = generateSalesByServiceData()

  // Calculate KPIs
  const totalRevenue = salesData
    .filter((transaction) => transaction.status === "completed")
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const transactionCount = salesData.filter((transaction) => transaction.status === "completed").length

  const avgTransactionValue = transactionCount > 0 ? totalRevenue / transactionCount : 0

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Payment methods data
  const paymentMethodsData = [
    { name: "Credit Card", value: 12500 },
    { name: "Cash", value: 5200 },
    { name: "Mobile Money", value: 8300 },
    { name: "Bank Transfer", value: 3000 },
  ]

  // Monthly revenue data
  const monthlyRevenueData = [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 11200 },
    { month: "Mar", revenue: 13800 },
    { month: "Apr", revenue: 15200 },
    { month: "May", revenue: 14100 },
    { month: "Jun", revenue: 16800 },
    { month: "Jul", revenue: 18200 },
    { month: "Aug", revenue: 17500 },
    { month: "Sep", revenue: 19100 },
    { month: "Oct", revenue: 20500 },
    { month: "Nov", revenue: 19800 },
    { month: "Dec", revenue: 22000 },
  ]

  // Daily revenue data for the last 30 days
  const generateDailyRevenueData = () => {
    const data = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      data.push({
        day: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        revenue: 300 + Math.random() * 700,
      })
    }
    return data
  }

  const dailyRevenueData = generateDailyRevenueData()

  // Top services by revenue
  const topServices = [...salesByServiceData].sort((a, b) => b.value - a.value)

  // Top customers by revenue
  const topCustomers = [
    { name: "John Doe", transactions: 24, revenue: 2450 },
    { name: "Jane Smith", transactions: 18, revenue: 1980 },
    { name: "Robert Johnson", transactions: 15, revenue: 1750 },
    { name: "Emily Davis", transactions: 12, revenue: 1320 },
    { name: "Michael Brown", transactions: 10, revenue: 1100 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Revenue</h1>
            <Badge variant="outline" className="ml-2">
              <Link href="/app/finances/expenses" className="flex items-center gap-1">
                <Wallet className="h-3 w-3" />
                <span>Expenses</span>
              </Link>
            </Badge>
            <Badge variant="outline">
              <Link href="/app/finances/reports" className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>Reports</span>
              </Link>
            </Badge>
          </div>
          <p className="text-muted-foreground">Analyze your sales and revenue performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span className="text-muted-foreground ml-1">vs. previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionCount}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span className="text-muted-foreground ml-1">vs. previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgTransactionValue)}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+3.7%</span>
              <span className="text-muted-foreground ml-1">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="premium">Premium Wash</SelectItem>
              <SelectItem value="standard">Standard Wash</SelectItem>
              <SelectItem value="basic">Basic Wash</SelectItem>
              <SelectItem value="detail">Detailing</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Tab */}
      {viewMode === "overview" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChart
                  data={monthlyRevenueData}
                  index="month"
                  categories={["revenue"]}
                  valueFormatter={formatCurrency}
                  colors={["blue"]}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Service</CardTitle>
              <CardDescription>Distribution of revenue by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieChart
                  data={salesByServiceData}
                  category="value"
                  index="name"
                  valueFormatter={formatCurrency}
                  colors={["blue", "indigo", "violet", "purple"]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trends Tab */}
      {viewMode === "trends" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Revenue</CardTitle>
              <CardDescription>Revenue trends for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart
                  data={dailyRevenueData}
                  index="day"
                  categories={["revenue"]}
                  valueFormatter={formatCurrency}
                  colors={["blue"]}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of sales by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PieChart data={paymentMethodsData} category="value" index="name" valueFormatter={formatCurrency} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Target</CardTitle>
                <CardDescription>Actual revenue compared to targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart
                    data={[
                      { month: "Jan", actual: 12500, target: 10000 },
                      { month: "Feb", actual: 11200, target: 10000 },
                      { month: "Mar", actual: 13800, target: 12000 },
                      { month: "Apr", actual: 15200, target: 12000 },
                      { month: "May", actual: 14100, target: 14000 },
                      { month: "Jun", actual: 16800, target: 14000 },
                    ]}
                    index="month"
                    categories={["actual", "target"]}
                    valueFormatter={formatCurrency}
                    colors={["blue", "gray"]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {viewMode === "services" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Services by Revenue</CardTitle>
              <CardDescription>Highest revenue generating services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-blue-${500 - index * 100}`}></div>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        {((service.value / totalRevenue) * 100).toFixed(1)}%
                      </span>
                      <span className="font-medium">{formatCurrency(service.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>Revenue by service category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart
                  data={salesByServiceData}
                  index="name"
                  categories={["value"]}
                  valueFormatter={formatCurrency}
                  colors={["blue"]}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Service Growth</CardTitle>
              <CardDescription>Month-over-month growth by service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChart
                  data={[
                    { month: "Jan", premium: 5500, standard: 4000, basic: 3000 },
                    { month: "Feb", premium: 5200, standard: 3800, basic: 2200 },
                    { month: "Mar", premium: 6000, standard: 4500, basic: 3300 },
                    { month: "Apr", premium: 6500, standard: 5200, basic: 3500 },
                    { month: "May", premium: 6200, standard: 4800, basic: 3100 },
                    { month: "Jun", premium: 7000, standard: 5500, basic: 4300 },
                  ]}
                  index="month"
                  categories={["premium", "standard", "basic"]}
                  valueFormatter={formatCurrency}
                  colors={["blue", "indigo", "violet"]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transactions Tab */}
      {viewMode === "transactions" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <CardTitle>Sales Transactions</CardTitle>
                  <CardDescription>Detailed view of all sales transactions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payment Methods</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="mobile">Mobile Money</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={salesColumns} data={salesData} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Customers with highest revenue contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-xs text-muted-foreground">{customer.transactions} transactions</div>
                        </div>
                      </div>
                      <div className="font-medium">{formatCurrency(customer.revenue)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Status</CardTitle>
                <CardDescription>Overview of transaction statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PieChart
                    data={[
                      { name: "Completed", value: 85 },
                      { name: "Pending", value: 10 },
                      { name: "Failed", value: 5 },
                    ]}
                    category="value"
                    index="name"
                    valueFormatter={(value) => `${value}%`}
                    colors={["green", "blue", "red"]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

