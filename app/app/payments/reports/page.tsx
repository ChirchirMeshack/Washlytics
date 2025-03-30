"use client"

import { useState } from "react"
import { format, subDays, subMonths } from "date-fns"
import { Download, CalendarIcon, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BarChart,Bar,
    LineChart,Line,
    PieChart,Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer, // Fixed import
  } from "recharts";

// Mock data for revenue
const revenueData = [
  { month: "Jan", revenue: 12500, expenses: 8200, profit: 4300 },
  { month: "Feb", revenue: 14200, expenses: 8900, profit: 5300 },
  { month: "Mar", revenue: 15800, expenses: 9100, profit: 6700 },
  { month: "Apr", revenue: 16900, expenses: 9500, profit: 7400 },
  { month: "May", revenue: 18200, expenses: 10200, profit: 8000 },
  { month: "Jun", revenue: 19500, expenses: 10800, profit: 8700 },
  { month: "Jul", revenue: 21000, expenses: 11500, profit: 9500 },
  { month: "Aug", revenue: 22300, expenses: 12100, profit: 10200 },
  { month: "Sep", revenue: 23500, expenses: 12800, profit: 10700 },
  { month: "Oct", revenue: 24800, expenses: 13200, profit: 11600 },
  { month: "Nov", revenue: 26100, expenses: 13900, profit: 12200 },
  { month: "Dec", revenue: 27500, expenses: 14500, profit: 13000 },
]

// Mock data for service breakdown
const serviceData = [
  { name: "Basic Wash", value: 35 },
  { name: "Premium Wash", value: 25 },
  { name: "Deluxe Package", value: 20 },
  { name: "Interior Detailing", value: 15 },
  { name: "Monthly Subscription", value: 5 },
]

// Mock data for expense categories
const expenseData = [
  { name: "Supplies", value: 40 },
  { name: "Labor", value: 30 },
  { name: "Utilities", value: 15 },
  { name: "Maintenance", value: 10 },
  { name: "Other", value: 5 },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

// Mock data for revenue by location
const locationData = [
  { location: "Downtown", revenue: 42500 },
  { location: "Westside", revenue: 38200 },
  { location: "Northgate", revenue: 35800 },
  { location: "Eastside", revenue: 29500 },
]

// Mock data for daily transactions
const dailyTransactionsData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), "MMM dd"),
  transactions: Math.floor(Math.random() * 50) + 30,
}))

export default function FinancialReportsPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  const [reportType, setReportType] = useState("revenue")
  const [comparisonPeriod, setComparisonPeriod] = useState("previous-month")

  // Calculate summary statistics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0)
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0)
  const profitMargin = (totalProfit / totalRevenue) * 100

  // Handle export
  const handleExport = () => {
    alert(`Exporting ${reportType} report...`)
    // Implementation for exporting reports
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">Analyze your business performance and financial health</p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Report Controls */}
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue Analysis</SelectItem>
              <SelectItem value="expenses">Expense Breakdown</SelectItem>
              <SelectItem value="profit">Profit & Loss</SelectItem>
              <SelectItem value="services">Services Breakdown</SelectItem>
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
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Comparison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous-month">vs. Previous Month</SelectItem>
              <SelectItem value="previous-year">vs. Previous Year</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="none">No Comparison</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600 flex items-center">
                +12.5% <ArrowUpDown className="h-3 w-3 ml-1" />
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-red-600 flex items-center">
                +8.3% <ArrowUpDown className="h-3 w-3 ml-1" />
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProfit.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600 flex items-center">
                +15.2% <ArrowUpDown className="h-3 w-3 ml-1" />
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin.toFixed(1)}%</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600 flex items-center">
                +2.3% <ArrowUpDown className="h-3 w-3 ml-1" />
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Content */}
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs. Expenses</CardTitle>
                <CardDescription>Monthly comparison for the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                      <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Monthly profit for the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="profit" stroke="#00C49F" activeDot={{ r: 8 }} name="Profit" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service</CardTitle>
                <CardDescription>Breakdown of revenue sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown of expense types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Financial Summary</CardTitle>
              <CardDescription>Detailed monthly breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Expenses</TableHead>
                    <TableHead className="text-right">Profit</TableHead>
                    <TableHead className="text-right">Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueData.map((item) => (
                    <TableRow key={item.month}>
                      <TableCell className="font-medium">{item.month}</TableCell>
                      <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${item.expenses.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${item.profit.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{((item.profit / item.revenue) * 100).toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Location</CardTitle>
              <CardDescription>Performance across different locations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locationData.map((item) => (
                    <TableRow key={item.location}>
                      <TableCell className="font-medium">{item.location}</TableCell>
                      <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        {((item.revenue / locationData.reduce((sum, loc) => sum + loc.revenue, 0)) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Insights</CardTitle>
              <CardDescription>Key observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Revenue Growth</h3>
                <p className="text-muted-foreground">
                  Your revenue has shown a consistent growth pattern of approximately 8-10% month-over-month. The
                  Premium Wash service continues to be your highest margin offering.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Expense Management</h3>
                <p className="text-muted-foreground">
                  Expenses have increased at a rate of 6-7%, which is lower than your revenue growth. Consider reviewing
                  supply costs as they represent 40% of your total expenses.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Profit Optimization</h3>
                <p className="text-muted-foreground">
                  Your profit margin has improved from 32% to 35% over the past year. The Downtown location shows the
                  highest profitability at 38% margin.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Recommendations</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Consider expanding the Premium Wash service marketing to increase its share of revenue</li>
                  <li>Evaluate supplier contracts for supplies to potentially reduce costs</li>
                  <li>Investigate the success factors at the Downtown location to replicate at other sites</li>
                  <li>Implement a customer loyalty program to increase repeat business</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

