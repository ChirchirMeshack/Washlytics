import type { SalesTransaction, ExpenseTransaction } from "@/components/finances/columns"
import {
  addDays,
  format,
  differenceInDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
} from "date-fns"

// Generate random sales data
export function generateSalesData(startDate: Date, endDate: Date, timeFrame: string): SalesTransaction[] {
  const services = [
    "Premium Wash",
    "Standard Wash",
    "Basic Wash",
    "Interior Detailing",
    "Exterior Detailing",
    "Full Detailing",
  ]
  const customers = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Brown", "Sarah Wilson"]
  const paymentMethods = ["Credit Card", "Cash", "Mobile Money", "Bank Transfer"]
  const statuses = ["completed", "pending", "failed"] as const

  const days = differenceInDays(endDate, startDate) + 1
  const transactions: SalesTransaction[] = []

  // Generate 1-3 transactions per day
  for (let i = 0; i < days; i++) {
    const transactionsPerDay = Math.floor(Math.random() * 3) + 1

    for (let j = 0; j < transactionsPerDay; j++) {
      const date = addDays(startDate, i)
      const service = services[Math.floor(Math.random() * services.length)]
      const amount = service.includes("Premium")
        ? 50 + Math.random() * 30
        : service.includes("Standard")
          ? 30 + Math.random() * 20
          : service.includes("Basic")
            ? 15 + Math.random() * 15
            : service.includes("Full")
              ? 100 + Math.random() * 50
              : 40 + Math.random() * 30

      transactions.push({
        id: `S${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}-${j + 1}`,
        date: format(date, "yyyy-MM-dd"),
        customer: customers[Math.floor(Math.random() * customers.length)],
        service,
        amount: Math.round(amount * 100) / 100,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        status: Math.random() > 0.2 ? "completed" : Math.random() > 0.5 ? "pending" : "failed",
      })
    }
  }

  return transactions
}

// Generate random expenses data
export function generateExpensesData(startDate: Date, endDate: Date, timeFrame: string): ExpenseTransaction[] {
  const categories = ["Supplies", "Equipment", "Utilities", "Rent", "Salaries", "Marketing", "Insurance", "Maintenance"]
  const descriptions = [
    "Car wash soap purchase",
    "Cleaning supplies",
    "Equipment maintenance",
    "Utility bill payment",
    "Monthly rent",
    "Staff salaries",
    "Social media marketing",
    "Insurance premium",
    "Facility maintenance",
    "New vacuum cleaner",
    "Water bill",
    "Electricity bill",
  ]
  const paymentMethods = ["Credit Card", "Bank Transfer", "Cash", "Check"]
  const statuses = ["approved", "pending", "rejected"] as const

  const days = differenceInDays(endDate, startDate) + 1
  const transactions: ExpenseTransaction[] = []

  // Generate 0-2 expenses per day
  for (let i = 0; i < days; i++) {
    const transactionsPerDay = Math.floor(Math.random() * 3)

    for (let j = 0; j < transactionsPerDay; j++) {
      const date = addDays(startDate, i)
      const category = categories[Math.floor(Math.random() * categories.length)]
      const description = descriptions[Math.floor(Math.random() * descriptions.length)]

      // Adjust amount based on category
      let amount = 0
      switch (category) {
        case "Supplies":
          amount = 50 + Math.random() * 150
          break
        case "Equipment":
          amount = 200 + Math.random() * 800
          break
        case "Utilities":
          amount = 100 + Math.random() * 300
          break
        case "Rent":
          amount = 1000 + Math.random() * 1000
          break
        case "Salaries":
          amount = 1500 + Math.random() * 2500
          break
        case "Marketing":
          amount = 200 + Math.random() * 500
          break
        case "Insurance":
          amount = 300 + Math.random() * 700
          break
        case "Maintenance":
          amount = 100 + Math.random() * 400
          break
        default:
          amount = 100 + Math.random() * 200
      }

      transactions.push({
        id: `E${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}-${j + 1}`,
        date: format(date, "yyyy-MM-dd"),
        category,
        description,
        amount: Math.round(amount * 100) / 100,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        status: Math.random() > 0.2 ? "approved" : Math.random() > 0.5 ? "pending" : "rejected",
      })
    }
  }

  return transactions
}

// Calculate KPIs
export function calculateKPIs(salesData: SalesTransaction[], expensesData: ExpenseTransaction[]) {
  // Calculate total revenue
  const totalRevenue = salesData
    .filter((transaction) => transaction.status === "completed")
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  // Calculate total expenses
  const totalExpenses = expensesData
    .filter((transaction) => transaction.status === "approved")
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  // Calculate net profit
  const netProfit = totalRevenue - totalExpenses

  // Calculate profit margin
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

  // Calculate transaction count
  const transactionCount = salesData.filter((transaction) => transaction.status === "completed").length

  // Calculate average transaction value
  const avgTransactionValue = transactionCount > 0 ? totalRevenue / transactionCount : 0

  // Calculate growth rates (mock data for demo)
  const revenueGrowth = 12.5
  const expenseGrowth = 8.2
  const profitGrowth = 15.3
  const marginGrowth = 2.1

  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    profitMargin,
    transactionCount,
    avgTransactionValue,
    revenueGrowth,
    expenseGrowth,
    profitGrowth,
    marginGrowth,
  }
}

// Generate sales by service data
export function generateSalesByServiceData() {
  return [
    { name: "Premium Wash", value: 25000 },
    { name: "Standard Wash", value: 18000 },
    { name: "Basic Wash", value: 12000 },
    { name: "Detailing", value: 15000 },
  ]
}

// Generate expenses by category data
export function generateExpensesByCategoryData() {
  return [
    { name: "Supplies", value: 12000 },
    { name: "Equipment", value: 8000 },
    { name: "Utilities", value: 6000 },
    { name: "Rent", value: 15000 },
    { name: "Salaries", value: 25000 },
    { name: "Marketing", value: 5000 },
    { name: "Insurance", value: 4000 },
    { name: "Maintenance", value: 3000 },
  ]
}

// Generate profit margin data
export function generateProfitMarginData(startDate: Date, endDate: Date, timeFrame: string) {
  let dates: Date[] = []

  // Generate appropriate date intervals based on timeFrame
  switch (timeFrame) {
    case "daily":
      dates = eachDayOfInterval({ start: startDate, end: endDate })
      break
    case "weekly":
      dates = eachWeekOfInterval({ start: startDate, end: endDate })
      break
    case "monthly":
      dates = eachMonthOfInterval({ start: startDate, end: endDate })
      break
    case "yearly":
      dates = eachYearOfInterval({ start: startDate, end: endDate })
      break
    default:
      dates = eachMonthOfInterval({ start: startDate, end: endDate })
  }

  // Generate data for each date
  return dates.map((date) => {
    const revenue = 10000 + Math.random() * 5000
    const expenses = 6000 + Math.random() * 3000
    const profit = revenue - expenses

    return {
      date: format(
        date,
        timeFrame === "daily"
          ? "MMM dd"
          : timeFrame === "weekly"
            ? "'Week' w"
            : timeFrame === "monthly"
              ? "MMM yyyy"
              : "yyyy",
      ),
      revenue,
      expenses,
      profit,
    }
  })
}

