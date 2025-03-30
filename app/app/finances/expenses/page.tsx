"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Download,
  Filter,
  TrendingDown,
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  FileText,
  Plus,
  DollarSignIcon as DollarIcon,
} from "lucide-react"
import { AreaChart, BarChart, PieChart as PieChartComponent, LineChart } from "@/components/ui/chart"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/finances/data-table"
import { expenseColumns } from "@/components/finances/columns"
import { generateExpensesData, generateExpensesByCategoryData } from "@/lib/finances-data"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ExpensesPage() {
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })
  const [timeFrame, setTimeFrame] = useState("monthly")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState("overview")
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)

  // Generate sample data
  const expensesData = generateExpensesData(dateRange.from, dateRange.to, timeFrame)
  const expensesByCategoryData = generateExpensesByCategoryData()

  // Calculate KPIs
  const totalExpenses = expensesData
    .filter((transaction) => transaction.status === "approved")
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const transactionCount = expensesData.filter((transaction) => transaction.status === "approved").length

  const avgTransactionValue = transactionCount > 0 ? totalExpenses / transactionCount : 0

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "Ksh",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Monthly expenses data
  const monthlyExpensesData = [
    { month: "Jan", expenses: 8500 },
    { month: "Feb", expenses: 7800 },
    { month: "Mar", expenses: 9200 },
    { month: "Apr", expenses: 8900 },
    { month: "May", expenses: 9500 },
    { month: "Jun", expenses: 10200 },
    { month: "Jul", expenses: 11000 },
    { month: "Aug", expenses: 10500 },
    { month: "Sep", expenses: 11200 },
    { month: "Oct", expenses: 12000 },
    { month: "Nov", expenses: 11800 },
    { month: "Dec", expenses: 12500 },
  ]

  // Daily expenses data for the last 30 days
  const generateDailyExpensesData = () => {
    const data = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      data.push({
        day: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        expenses: 200 + Math.random() * 500,
      })
    }
    return data
  }

  const dailyExpensesData = generateDailyExpensesData()

  // Top expense categories
  const topExpenseCategories = [...expensesByCategoryData].sort((a, b) => b.value - a.value)

  // Recurring expenses
  const recurringExpenses = [
    { name: "Rent", amount: 3500, frequency: "Monthly", nextDue: "May 1, 2023" },
    { name: "Utilities", amount: 850, frequency: "Monthly", nextDue: "May 5, 2023" },
    { name: "Insurance", amount: 1200, frequency: "Quarterly", nextDue: "June 15, 2023" },
    { name: "Software Subscriptions", amount: 350, frequency: "Monthly", nextDue: "May 10, 2023" },
    { name: "Equipment Maintenance", amount: 500, frequency: "Monthly", nextDue: "May 12, 2023" },
  ]

  // Budget vs Actual
  const budgetVsActualData = [
    { month: "Jan", actual: 8500, budget: 9000 },
    { month: "Feb", actual: 7800, budget: 9000 },
    { month: "Mar", actual: 9200, budget: 9500 },
    { month: "Apr", actual: 8900, budget: 9500 },
    { month: "May", actual: 9500, budget: 10000 },
    { month: "Jun", actual: 10200, budget: 10000 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
            <Badge variant="outline" className="ml-2">
              <Link href="/app/finances/revenue" className="flex items-center gap-1">
                <DollarIcon className="h-3 w-3" />
                <span>Revenue</span>
              </Link>
            </Badge>
            <Badge variant="outline">
              <Link href="/app/finances/reports" className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>Reports</span>
              </Link>
            </Badge>
          </div>
          <p className="text-muted-foreground">Track and analyze your business expenses</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter the details of your new expense. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expense-date">Date</Label>
                    <Input id="expense-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense-amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input id="expense-amount" type="number" step="0.01" placeholder="0.00" className="pl-7" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-category">Category</Label>
                  <Select>
                    <SelectTrigger id="expense-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="salaries">Salaries</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-description">Description</Label>
                  <Textarea id="expense-description" placeholder="Enter expense details..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-payment">Payment Method</Label>
                  <Select>
                    <SelectTrigger id="expense-payment">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddExpenseOpen(false)}>Save Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">+8.2%</span>
              <span className="text-muted-foreground ml-1">vs. previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionCount}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">+5.7%</span>
              <span className="text-muted-foreground ml-1">vs. previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgTransactionValue)}</div>
            <div className="flex items-center text-xs">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">-2.3%</span>
              <span className="text-muted-foreground ml-1">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
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
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="salaries">Salaries</SelectItem>
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
              <CardTitle>Expense Trends</CardTitle>
              <CardDescription>Monthly expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChart
                  data={monthlyExpensesData}
                  index="month"
                  categories={["expenses"]}
                  valueFormatter={formatCurrency}
                  colors={["red"]}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription>Breakdown of expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieChartComponent
                  data={expensesByCategoryData}
                  category="value"
                  index="name"
                  valueFormatter={formatCurrency}
                  colors={["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal"]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Categories Tab */}
      {viewMode === "categories" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Expense Categories</CardTitle>
              <CardDescription>Highest expense categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topExpenseCategories.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-red-${500 - index * 100}`}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        {((category.value / totalExpenses) * 100).toFixed(1)}%
                      </span>
                      <span className="font-medium">{formatCurrency(category.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Comparison</CardTitle>
              <CardDescription>Expense distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart
                  data={expensesByCategoryData}
                  index="name"
                  categories={["value"]}
                  valueFormatter={formatCurrency}
                  colors={["red"]}
                  layout="vertical"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Category Trends</CardTitle>
              <CardDescription>Monthly expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChart
                  data={[
                    { month: "Jan", supplies: 1200, utilities: 800, rent: 3500, salaries: 2500, marketing: 500 },
                    { month: "Feb", supplies: 1100, utilities: 750, rent: 3500, salaries: 2000, marketing: 450 },
                    { month: "Mar", supplies: 1300, utilities: 900, rent: 3500, salaries: 3000, marketing: 500 },
                    { month: "Apr", supplies: 1250, utilities: 850, rent: 3500, salaries: 2800, marketing: 500 },
                    { month: "May", supplies: 1400, utilities: 950, rent: 3500, salaries: 3100, marketing: 550 },
                    { month: "Jun", supplies: 1500, utilities: 1000, rent: 3500, salaries: 3500, marketing: 700 },
                  ]}
                  index="month"
                  categories={["supplies", "utilities", "rent", "salaries", "marketing"]}
                  valueFormatter={formatCurrency}
                  colors={["red", "orange", "amber", "yellow", "lime"]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Budget Tab */}
      {viewMode === "budget" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual</CardTitle>
              <CardDescription>Comparison of budgeted and actual expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart
                  data={budgetVsActualData}
                  index="month"
                  categories={["actual", "budget"]}
                  valueFormatter={formatCurrency}
                  colors={["red", "gray"]}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Budget Variance</CardTitle>
                <CardDescription>Difference between budget and actual expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <LineChart
                    data={budgetVsActualData.map((item) => ({
                      month: item.month,
                      variance: ((item.budget - item.actual) / item.budget) * 100,
                    }))}
                    index="month"
                    categories={["variance"]}
                    valueFormatter={(value) => `${value.toFixed(1)}%`}
                    colors={["purple"]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recurring Expenses</CardTitle>
                <CardDescription>Regular monthly and quarterly expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recurringExpenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{expense.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {expense.frequency} • Next due: {expense.nextDue}
                        </div>
                      </div>
                      <div className="font-medium">{formatCurrency(expense.amount)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {viewMode === "transactions" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Transactions</CardTitle>
              <CardDescription>Detailed view of all expense transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={expenseColumns} data={expensesData} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Latest expense transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expensesData.slice(0, 5).map((expense, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{expense.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {expense.category} • {expense.date}
                        </div>
                      </div>
                      <div className="font-medium">{formatCurrency(expense.amount)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Expenses</CardTitle>
                <CardDescription>Expenses for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart
                    data={dailyExpensesData.slice(-7)}
                    index="day"
                    categories={["expenses"]}
                    valueFormatter={formatCurrency}
                    colors={["red"]}
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

