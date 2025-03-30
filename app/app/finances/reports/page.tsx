"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Printer, FileText, DollarSign, Wallet, Filter, ChevronDown, Mail } from "lucide-react"
import { AreaChart, BarChart, LineChart } from "@/components/ui/chart"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  calculateKPIs,
  generateProfitMarginData,
  generateSalesByServiceData,
  generateExpensesByCategoryData,
} from "@/lib/finances-data"
import { generateSalesData, generateExpensesData } from "@/lib/finances-data"
import Link from "next/link"
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

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })
  const [timeFrame, setTimeFrame] = useState("monthly")
  const [reportType, setReportType] = useState("profit-loss")
  const [comparisonPeriod, setComparisonPeriod] = useState("previous-period")

  // Generate sample data
  const salesData = generateSalesData(dateRange.from, dateRange.to, timeFrame)
  const expensesData = generateExpensesData(dateRange.from, dateRange.to, timeFrame)
  const profitMarginData = generateProfitMarginData(dateRange.from, dateRange.to, timeFrame)
  const salesByServiceData = generateSalesByServiceData()
  const expensesByCategoryData = generateExpensesByCategoryData()

  // Calculate KPIs
  const kpis = calculateKPIs(salesData, expensesData)

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  // Cash flow data
  const cashFlowData = [
    { month: "Jan", inflow: 12500, outflow: 8500, balance: 4000 },
    { month: "Feb", inflow: 11200, outflow: 7800, balance: 3400 },
    { month: "Mar", inflow: 13800, outflow: 9200, balance: 4600 },
    { month: "Apr", inflow: 15200, outflow: 8900, balance: 6300 },
    { month: "May", inflow: 14100, outflow: 9500, balance: 4600 },
    { month: "Jun", inflow: 16800, outflow: 10200, balance: 6600 },
  ]

  // Quarterly data
  const quarterlyData = [
    { quarter: "Q1 2023", revenue: 37500, expenses: 25500, profit: 12000 },
    { quarter: "Q2 2023", revenue: 46100, expenses: 28600, profit: 17500 },
    { quarter: "Q3 2023", revenue: 54800, expenses: 32700, profit: 22100 },
    { quarter: "Q4 2023", revenue: 62300, expenses: 36800, profit: 25500 },
  ]

  // Key metrics table data
  const keyMetricsData = [
    { metric: "Total Revenue", current: kpis.totalRevenue, previous: kpis.totalRevenue * 0.9, change: "+10.0%" },
    { metric: "Total Expenses", current: kpis.totalExpenses, previous: kpis.totalExpenses * 0.92, change: "+8.2%" },
    { metric: "Net Profit", current: kpis.netProfit, previous: kpis.netProfit * 0.85, change: "+15.3%" },
    { metric: "Profit Margin", current: kpis.profitMargin, previous: kpis.profitMargin - 2.1, change: "+2.1%" },
    {
      metric: "Average Transaction",
      current: kpis.avgTransactionValue,
      previous: kpis.avgTransactionValue * 0.96,
      change: "+3.7%",
    },
    {
      metric: "Transaction Count",
      current: kpis.transactionCount,
      previous: kpis.transactionCount * 0.92,
      change: "+8.2%",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
            <Badge variant="outline" className="ml-2">
              <Link href="/app/finances/revenue" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>Revenue</span>
              </Link>
            </Badge>
            <Badge variant="outline">
              <Link href="/app/finances/expenses" className="flex items-center gap-1">
                <Wallet className="h-3 w-3" />
                <span>Expenses</span>
              </Link>
            </Badge>
          </div>
          <p className="text-muted-foreground">Generate and analyze detailed financial reports</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Export as PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Export as Excel</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Export as CSV</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="profit-loss" onValueChange={setReportType} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
            <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
            <TabsTrigger value="key-metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Comparison" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="previous-period">Previous Period</SelectItem>
            <SelectItem value="same-period-last-year">Same Period Last Year</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="none">No Comparison</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Profit & Loss Report */}
      {reportType === "profit-loss" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>
                Financial summary for the period {dateRange.from ? new Date(dateRange.from).toLocaleDateString() : ""}{" "}
                to {dateRange.to ? new Date(dateRange.to).toLocaleDateString() : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Revenue Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                  <div className="space-y-2">
                    {salesByServiceData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <span>{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center font-bold pt-2 border-t">
                      <span>Total Revenue</span>
                      <span>{formatCurrency(kpis.totalRevenue)}</span>
                    </div>
                  </div>
                </div>

                {/* Expenses Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Expenses</h3>
                  <div className="space-y-2">
                    {expensesByCategoryData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <span>{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center font-bold pt-2 border-t">
                      <span>Total Expenses</span>
                      <span>{formatCurrency(kpis.totalExpenses)}</span>
                    </div>
                  </div>
                </div>

                {/* Net Profit Section */}
                <div className="pt-4 border-t-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Net Profit</span>
                    <span className={kpis.netProfit >= 0 ? "text-green-600" : "text-red-600"}>
                      {formatCurrency(kpis.netProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span>Profit Margin</span>
                    <span className={kpis.profitMargin >= 0 ? "text-green-600" : "text-red-600"}>
                      {formatPercentage(kpis.profitMargin)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Visualization</CardTitle>
                <CardDescription>Visual representation of revenue, expenses, and profit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <AreaChart
                    data={profitMarginData}
                    index="date"
                    categories={["revenue", "expenses", "profit"]}
                    colors={["blue", "red", "green"]}
                    valueFormatter={formatCurrency}
                    showLegend={true}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance</CardTitle>
                <CardDescription>Revenue, expenses, and profit by quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <BarChart
                    data={quarterlyData}
                    index="quarter"
                    categories={["revenue", "expenses", "profit"]}
                    valueFormatter={formatCurrency}
                    colors={["blue", "red", "green"]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Cash Flow Report */}
      {reportType === "cash-flow" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>
                Cash inflows and outflows for the period{" "}
                {dateRange.from ? new Date(dateRange.from).toLocaleDateString() : ""} to{" "}
                {dateRange.to ? new Date(dateRange.to).toLocaleDateString() : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Cash Inflows Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cash Inflows</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Sales Revenue</span>
                      <span>{formatCurrency(kpis.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Other Income</span>
                      <span>{formatCurrency(1200)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold pt-2 border-t">
                      <span>Total Cash Inflows</span>
                      <span>{formatCurrency(kpis.totalRevenue + 1200)}</span>
                    </div>
                  </div>
                </div>

                {/* Cash Outflows Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cash Outflows</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Operating Expenses</span>
                      <span>{formatCurrency(kpis.totalExpenses * 0.85)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Capital Expenditures</span>
                      <span>{formatCurrency(kpis.totalExpenses * 0.15)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Loan Payments</span>
                      <span>{formatCurrency(2500)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold pt-2 border-t">
                      <span>Total Cash Outflows</span>
                      <span>{formatCurrency(kpis.totalExpenses + 2500)}</span>
                    </div>
                  </div>
                </div>

                {/* Net Cash Flow Section */}
                <div className="pt-4 border-t-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Net Cash Flow</span>
                    <span
                      className={
                        kpis.totalRevenue + 1200 - (kpis.totalExpenses + 2500) >= 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {formatCurrency(kpis.totalRevenue + 1200 - (kpis.totalExpenses + 2500))}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Trends</CardTitle>
                <CardDescription>Monthly cash inflows, outflows, and balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <AreaChart
                    data={cashFlowData}
                    index="month"
                    categories={["inflow", "outflow", "balance"]}
                    colors={["blue", "red", "green"]}
                    valueFormatter={formatCurrency}
                    showLegend={true}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Projection</CardTitle>
                <CardDescription>Projected cash flow for the next 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <LineChart
                    data={[
                      { month: "Jul", projected: 6800, actual: 6800 },
                      { month: "Aug", projected: 7200, actual: 7000 },
                      { month: "Sep", projected: 7500, actual: 7300 },
                      { month: "Oct", projected: 7800, actual: null },
                      { month: "Nov", projected: 8200, actual: null },
                      { month: "Dec", projected: 8500, actual: null },
                    ]}
                    index="month"
                    categories={["projected", "actual"]}
                    valueFormatter={formatCurrency}
                    colors={["blue", "green"]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Key Metrics Report */}
      {reportType === "key-metrics" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Financial Metrics</CardTitle>
              <CardDescription>
                Performance metrics for the period {dateRange.from ? new Date(dateRange.from).toLocaleDateString() : ""}{" "}
                to {dateRange.to ? new Date(dateRange.to).toLocaleDateString() : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Current Period</TableHead>
                    <TableHead className="text-right">Previous Period</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keyMetricsData.map((metric, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{metric.metric}</TableCell>
                      <TableCell className="text-right">
                        {metric.metric.includes("Margin")
                          ? formatPercentage(metric.current)
                          : formatCurrency(metric.current)}
                      </TableCell>
                      <TableCell className="text-right">
                        {metric.metric.includes("Margin")
                          ? formatPercentage(metric.previous)
                          : formatCurrency(metric.previous)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                          {metric.change}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profit Margin Trends</CardTitle>
                <CardDescription>Profit margin percentage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <LineChart
                    data={profitMarginData.map((item) => ({
                      date: item.date,
                      margin: (item.profit / item.revenue) * 100,
                    }))}
                    index="date"
                    categories={["margin"]}
                    valueFormatter={formatPercentage}
                    colors={["green"]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Comparison of revenue and expenses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart
                    data={profitMarginData}
                    index="date"
                    categories={["revenue", "expenses"]}
                    valueFormatter={formatCurrency}
                    colors={["blue", "red"]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Health Indicators</CardTitle>
              <CardDescription>Key indicators of business financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Expense to Revenue Ratio</h3>
                  <div className="text-2xl font-bold">
                    {formatPercentage((kpis.totalExpenses / kpis.totalRevenue) * 100)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(kpis.totalExpenses / kpis.totalRevenue) * 100 < 70 ? "Good" : "Needs Improvement"}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Gross Profit Margin</h3>
                  <div className="text-2xl font-bold">{formatPercentage(kpis.profitMargin)}</div>
                  <div className="text-xs text-muted-foreground">
                    {kpis.profitMargin > 20 ? "Good" : "Needs Improvement"}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Revenue Growth</h3>
                  <div className="text-2xl font-bold">{formatPercentage(kpis.revenueGrowth)}</div>
                  <div className="text-xs text-muted-foreground">
                    {kpis.revenueGrowth > 10 ? "Good" : "Needs Improvement"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Custom Reports */}
      {reportType === "custom" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create customized reports based on your specific needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select defaultValue="financial">
                      <SelectTrigger id="report-type">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial Summary</SelectItem>
                        <SelectItem value="revenue">Revenue Analysis</SelectItem>
                        <SelectItem value="expense">Expense Analysis</SelectItem>
                        <SelectItem value="service">Service Performance</SelectItem>
                        <SelectItem value="comparison">Period Comparison</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-metrics">Metrics to Include</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="report-metrics">
                        <SelectValue placeholder="Select metrics" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Metrics</SelectItem>
                        <SelectItem value="revenue">Revenue Only</SelectItem>
                        <SelectItem value="expenses">Expenses Only</SelectItem>
                        <SelectItem value="profit">Profit Only</SelectItem>
                        <SelectItem value="custom">Custom Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-format">Report Format</Label>
                    <Select defaultValue="charts-tables">
                      <SelectTrigger id="report-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="charts-tables">Charts & Tables</SelectItem>
                        <SelectItem value="charts">Charts Only</SelectItem>
                        <SelectItem value="tables">Tables Only</SelectItem>
                        <SelectItem value="summary">Summary View</SelectItem>
                        <SelectItem value="detailed">Detailed View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Saved Reports</CardTitle>
                <CardDescription>Your previously saved custom reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Monthly Financial Summary</div>
                      <div className="text-xs text-muted-foreground">Last generated: May 1, 2023</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Quarterly Revenue Analysis</div>
                      <div className="text-xs text-muted-foreground">Last generated: Apr 15, 2023</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Annual Expense Breakdown</div>
                      <div className="text-xs text-muted-foreground">Last generated: Jan 10, 2023</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Reports scheduled for automatic generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Sales Summary</div>
                      <div className="text-xs text-muted-foreground">Every Monday at 8:00 AM</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Monthly Financial Report</div>
                      <div className="text-xs text-muted-foreground">1st of every month at 9:00 AM</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Quarterly Performance Review</div>
                      <div className="text-xs text-muted-foreground">1st day of each quarter at 10:00 AM</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}


