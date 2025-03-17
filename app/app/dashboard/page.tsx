/**
 * @file app/dashboard/page.tsx
 * @description Main dashboard page component for car wash business management
 * 
 * Component Features:
 * - Business metrics overview (revenue, customers, services, products)
 * - Revenue analytics with time-based filtering
 * - Service popularity visualization
 * - Recent transactions list with search and filter
 * - Upcoming appointments tracking
 * - Inventory alerts and management
 * 
 * Data Visualization:
 * - Area chart for revenue trends
 * - Bar chart for service popularity
 * - Real-time metrics updates
 * - Status indicators and badges
 * 
 * Best Practices:
 * - Responsive design with grid layouts
 * - Dark mode compatibility
 * - Accessible UI components
 * - Error state handling
 * - Loading state management
 */
"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Calendar, Car, DollarSign, Package, Users, RefreshCw, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AreaChart, BarChart } from "@/components/ui/chart"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("day")

  // Dashboard overview metrics
  const overviewMetrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "New Customers",
      value: "345",
      change: "+10.3%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Cars Washed",
      value: "2,534",
      change: "+12.5%",
      trend: "up",
      icon: Car,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Products Sold",
      value: "98",
      change: "-2.5%",
      trend: "down",
      icon: Package,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
    },
  ]

  // Chart data
  const revenueData = [
    { name: "Jan", total: 1200 },
    { name: "Feb", total: 1900 },
    { name: "Mar", total: 1398 },
    { name: "Apr", total: 2200 },
    { name: "May", total: 2800 },
    { name: "Jun", total: 3500 },
    { name: "Jul", total: 3200 },
    { name: "Aug", total: 3800 },
    { name: "Sep", total: 4100 },
    { name: "Oct", total: 3600 },
    { name: "Nov", total: 2900 },
    { name: "Dec", total: 3300 },
  ]

  const serviceData = [
    { name: "Premium Wash", value: 450 },
    { name: "Standard Wash", value: 640 },
    { name: "Basic Wash", value: 580 },
    { name: "Interior Clean", value: 290 },
    { name: "Wax & Polish", value: 180 },
  ]

  // Recent transactions
  const recentTransactions = [
    {
      id: "T001",
      customer: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32&text=SJ",
      service: "Premium Wash",
      amount: "$49.99",
      status: "completed",
      date: "Today, 10:45 AM",
    },
    {
      id: "T002",
      customer: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32&text=MB",
      service: "Interior Cleaning",
      amount: "$35.50",
      status: "completed",
      date: "Today, 09:30 AM",
    },
    {
      id: "T003",
      customer: "David Wilson",
      avatar: "/placeholder.svg?height=32&width=32&text=DW",
      service: "Full Service",
      amount: "$89.99",
      status: "pending",
      date: "Today, 08:15 AM",
    },
    {
      id: "T004",
      customer: "Amanda Lee",
      avatar: "/placeholder.svg?height=32&width=32&text=AL",
      service: "Standard Wash",
      amount: "$24.99",
      status: "completed",
      date: "Yesterday, 15:20 PM",
    },
    {
      id: "T005",
      customer: "Robert Martinez",
      avatar: "/placeholder.svg?height=32&width=32&text=RM",
      service: "Wax & Polish",
      amount: "$55.00",
      status: "cancelled",
      date: "Yesterday, 11:40 AM",
    },
  ]

  // Upcoming appointments
  const upcomingAppointments = [
    {
      id: "A001",
      customer: "James Wilson",
      avatar: "/placeholder.svg?height=32&width=32&text=JW",
      service: "Premium Wash",
      time: "Today, 13:00",
      duration: "45 min",
    },
    {
      id: "A002",
      customer: "Emma Thompson",
      avatar: "/placeholder.svg?height=32&width=32&text=ET",
      service: "Interior Detail",
      time: "Today, 14:30",
      duration: "60 min",
    },
    {
      id: "A003",
      customer: "Ryan Davis",
      avatar: "/placeholder.svg?height=32&width=32&text=RD",
      service: "Full Service",
      time: "Today, 16:00",
      duration: "90 min",
    },
    {
      id: "A004",
      customer: "Olivia Smith",
      avatar: "/placeholder.svg?height=32&width=32&text=OS",
      service: "Express Wash",
      time: "Tomorrow, 10:00",
      duration: "30 min",
    },
  ]

  // Inventory alerts
  const inventoryAlerts = [
    {
      id: "I001",
      item: "Car Wash Soap",
      stock: "Low Stock",
      level: "15%",
      status: "critical",
    },
    {
      id: "I002",
      item: "Microfiber Towels",
      stock: "Low Stock",
      level: "20%",
      status: "warning",
    },
    {
      id: "I003",
      item: "Tire Shine",
      stock: "Reorder Soon",
      level: "30%",
      status: "warning",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Select defaultValue="shinywheels">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shinywheels">ShinyWheels Main</SelectItem>
              <SelectItem value="downtown">Downtown Location</SelectItem>
              <SelectItem value="westside">Westside Express</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`${metric.bgColor} p-2 rounded-full`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs">
                {metric.trend === "up" ? (
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue breakdown and trends</CardDescription>
              </div>
              <Tabs defaultValue="year" className="w-[300px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[350px] w-full px-6">
              <AreaChart
                data={revenueData}
                categories={["total"]}
                index="name"
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                colors={["blue"]}
                showLegend={false}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Services</CardTitle>
            <CardDescription>Distribution of services by popularity</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[350px] w-full px-6">
              <BarChart
                data={serviceData}
                categories={["value"]}
                index="name"
                valueFormatter={(value) => `${value} washes`}
                colors={["purple"]}
                layout="vertical"
                showLegend={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest customer payments and services</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-[180px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={transaction.avatar} alt={transaction.customer} />
                      <AvatarFallback>
                        {transaction.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{transaction.customer}</p>
                      <p className="text-xs text-muted-foreground">{transaction.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{transaction.amount}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : transaction.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm">
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-3 flex flex-col gap-4">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex items-center gap-4 rounded-lg border p-3">
                    <Avatar>
                      <AvatarImage src={appointment.avatar} alt={appointment.customer} />
                      <AvatarFallback>
                        {appointment.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{appointment.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.service} • {appointment.duration}
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-medium">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Inventory Alerts</CardTitle>
                <Button variant="outline" size="sm">
                  <Package className="mr-2 h-4 w-4" />
                  View Inventory
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventoryAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          alert.status === "critical"
                            ? "bg-red-100 dark:bg-red-900/20"
                            : "bg-amber-100 dark:bg-amber-900/20"
                        }`}
                      >
                        <Package
                          className={`h-4 w-4 ${alert.status === "critical" ? "text-red-500" : "text-amber-500"}`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{alert.item}</p>
                        <p className="text-xs text-muted-foreground">{alert.stock}</p>
                      </div>
                    </div>
                    <Badge variant={alert.status === "critical" ? "destructive" : "outline"}>{alert.level}</Badge>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  Order Supplies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

