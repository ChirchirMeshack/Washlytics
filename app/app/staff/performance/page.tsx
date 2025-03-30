"use client"

import React from "react"
import { Search, Download, Plus, MoreHorizontal, TrendingUp, Award, Target, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

// Sample employee data
const employees = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Manager",
    department: "Operations",
    avatar: "/placeholder.svg?height=40&width=40",
    performanceScore: 92,
    goalsCompleted: 8,
    goalsTotal: 10,
    lastReview: "2023-03-15",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Supervisor",
    department: "Customer Service",
    avatar: "/placeholder.svg?height=40&width=40",
    performanceScore: 88,
    goalsCompleted: 6,
    goalsTotal: 8,
    lastReview: "2023-02-20",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Technician",
    department: "Maintenance",
    avatar: "/placeholder.svg?height=40&width=40",
    performanceScore: 78,
    goalsCompleted: 4,
    goalsTotal: 6,
    lastReview: "2023-04-05",
  },
  {
    id: 4,
    name: "Jessica Williams",
    role: "Cashier",
    department: "Finance",
    avatar: "/placeholder.svg?height=40&width=40",
    performanceScore: 85,
    goalsCompleted: 5,
    goalsTotal: 7,
    lastReview: "2023-01-30",
  },
  {
    id: 5,
    name: "David Rodriguez",
    role: "Detailer",
    department: "Operations",
    avatar: "/placeholder.svg?height=40&width=40",
    performanceScore: 90,
    goalsCompleted: 7,
    goalsTotal: 8,
    lastReview: "2023-03-10",
  },
]

// Sample goals data
const goals = [
  {
    id: 1,
    employeeId: 1,
    title: "Increase customer satisfaction score by 10%",
    description: "Implement new customer service protocols and train staff accordingly.",
    startDate: "2023-01-01",
    dueDate: "2023-06-30",
    status: "In Progress",
    progress: 70,
    category: "Customer Service",
  },
  {
    id: 2,
    employeeId: 1,
    title: "Reduce operational costs by 5%",
    description: "Identify and eliminate inefficiencies in daily operations.",
    startDate: "2023-01-01",
    dueDate: "2023-12-31",
    status: "In Progress",
    progress: 40,
    category: "Operations",
  },
  {
    id: 3,
    employeeId: 1,
    title: "Implement new inventory management system",
    description: "Research, select, and implement a new system to improve inventory tracking.",
    startDate: "2023-02-15",
    dueDate: "2023-05-15",
    status: "Completed",
    progress: 100,
    category: "Technology",
  },
  {
    id: 4,
    employeeId: 2,
    title: "Train 3 new team members",
    description: "Provide comprehensive training to new hires to ensure they meet company standards.",
    startDate: "2023-01-15",
    dueDate: "2023-04-15",
    status: "Completed",
    progress: 100,
    category: "Training",
  },
  {
    id: 5,
    employeeId: 2,
    title: "Develop customer feedback system",
    description: "Create and implement a system to collect and analyze customer feedback.",
    startDate: "2023-03-01",
    dueDate: "2023-07-31",
    status: "In Progress",
    progress: 60,
    category: "Customer Service",
  },
]

// Sample reviews data
const reviews = [
  {
    id: 1,
    employeeId: 1,
    reviewDate: "2023-03-15",
    reviewer: "Jane Smith",
    reviewerRole: "Regional Manager",
    overallRating: 4.5,
    strengths: "Leadership, problem-solving, customer relations",
    areasForImprovement: "Delegation, work-life balance",
    comments:
      "Alex continues to be a strong performer and leader within the organization. His ability to solve complex problems and maintain excellent customer relations is commendable.",
    ratings: {
      jobKnowledge: 5,
      qualityOfWork: 4.5,
      productivity: 4,
      communication: 4.5,
      teamwork: 4.5,
      leadership: 5,
    },
  },
  {
    id: 2,
    employeeId: 2,
    reviewDate: "2023-02-20",
    reviewer: "Alex Johnson",
    reviewerRole: "Manager",
    overallRating: 4.2,
    strengths: "Customer service, team collaboration, adaptability",
    areasForImprovement: "Technical knowledge, time management",
    comments:
      "Samantha has shown great improvement in her customer service skills and team collaboration. She adapts well to changing situations and maintains a positive attitude.",
    ratings: {
      jobKnowledge: 4,
      qualityOfWork: 4.5,
      productivity: 4,
      communication: 4.5,
      teamwork: 5,
      leadership: 3.5,
    },
  },
]

// Sample training data
const trainings = [
  {
    id: 1,
    employeeId: 1,
    title: "Advanced Leadership Workshop",
    provider: "Leadership Institute",
    completionDate: "2023-02-10",
    duration: "16 hours",
    certificate: true,
    score: 95,
  },
  {
    id: 2,
    employeeId: 1,
    title: "Conflict Resolution in the Workplace",
    provider: "HR Training Solutions",
    completionDate: "2023-01-20",
    duration: "8 hours",
    certificate: true,
    score: 90,
  },
  {
    id: 3,
    employeeId: 2,
    title: "Customer Service Excellence",
    provider: "Service First Academy",
    completionDate: "2023-01-15",
    duration: "12 hours",
    certificate: true,
    score: 88,
  },
  {
    id: 4,
    employeeId: 2,
    title: "Team Building Strategies",
    provider: "Corporate Training Inc.",
    completionDate: "2023-03-05",
    duration: "8 hours",
    certificate: false,
    score: 85,
  },
]

// Helper function to get performance color
const getPerformanceColor = (score) => {
  if (score >= 90) return "bg-green-500"
  if (score >= 80) return "bg-blue-500"
  if (score >= 70) return "bg-yellow-500"
  return "bg-red-500"
}

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "success"
    case "In Progress":
      return "warning"
    case "Not Started":
      return "secondary"
    case "Overdue":
      return "destructive"
    default:
      return "default"
  }
}

export default function PerformancePage() {
  const [selectedEmployee, setSelectedEmployee] = React.useState(employees[0])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedDepartment, setSelectedDepartment] = React.useState("")
  const [isAddGoalOpen, setIsAddGoalOpen] = React.useState(false)
  const [isAddReviewOpen, setIsAddReviewOpen] = React.useState(false)
  const [isAddTrainingOpen, setIsAddTrainingOpen] = React.useState(false)

  // Filter employees based on search term and department
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment =
      selectedDepartment === "all" || selectedDepartment === "" || employee.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  // Get employee goals
  const employeeGoals = goals.filter((goal) => goal.employeeId === selectedEmployee.id)

  // Get employee reviews
  const employeeReviews = reviews.filter((review) => review.employeeId === selectedEmployee.id)

  // Get employee trainings
  const employeeTrainings = trainings.filter((training) => training.employeeId === selectedEmployee.id)

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Management</h1>
          <p className="text-muted-foreground">Track employee performance, goals, and development</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters and Employee Selection */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
            <SelectItem value="Customer Service">Customer Service</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Human Resources">Human Resources</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Employee Selection */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filteredEmployees.map((employee) => (
          <Card
            key={employee.id}
            className={`cursor-pointer transition-all hover:border-primary ${
              selectedEmployee.id === employee.id ? "border-primary bg-primary/5" : ""
            }`}
            onClick={() => setSelectedEmployee(employee)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Avatar>
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Badge className={getPerformanceColor(employee.performanceScore)}>{employee.performanceScore}%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span>
                    Goals: {employee.goalsCompleted}/{employee.goalsTotal}
                  </span>
                  <span>{((employee.goalsCompleted / employee.goalsTotal) * 100).toFixed(0)}%</span>
                </div>
                <Progress value={(employee.goalsCompleted / employee.goalsTotal) * 100} className="mt-1 h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Dashboard */}
      {selectedEmployee && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{selectedEmployee.name}'s Performance Dashboard</h2>
          </div>

          {/* Performance Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedEmployee.performanceScore}%</div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${getPerformanceColor(selectedEmployee.performanceScore)}`}
                    style={{ width: `${selectedEmployee.performanceScore}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Last reviewed: {new Date(selectedEmployee.lastReview).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Completion</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedEmployee.goalsCompleted}/{selectedEmployee.goalsTotal}
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(selectedEmployee.goalsCompleted / selectedEmployee.goalsTotal) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {((selectedEmployee.goalsCompleted / selectedEmployee.goalsTotal) * 100).toFixed(0)}% completion rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Completed</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employeeTrainings.length}</div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Last training:{" "}
                  {employeeTrainings.length > 0
                    ? new Date(employeeTrainings[0].completionDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recognition</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="mt-2 text-xs text-muted-foreground">Awards and recognitions received</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Tabs */}
          <Tabs defaultValue="goals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
              <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
              <TabsTrigger value="training">Training & Development</TabsTrigger>
            </TabsList>

            {/* Goals Tab */}
            <TabsContent value="goals" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Goals & Objectives</h3>
                <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Goal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Goal</DialogTitle>
                      <DialogDescription>Create a new goal or objective for {selectedEmployee.name}.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="goalTitle">Goal Title</Label>
                        <Input id="goalTitle" placeholder="Enter goal title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goalDescription">Description</Label>
                        <Textarea id="goalDescription" placeholder="Describe the goal and expected outcomes" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input id="startDate" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input id="dueDate" type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="customer-service">Customer Service</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="leadership">Leadership</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddGoalOpen(false)}>Save Goal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                {employeeGoals.map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{goal.title}</CardTitle>
                        <Badge variant={getStatusColor(goal.status)}>{goal.status}</Badge>
                      </div>
                      <CardDescription>{goal.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{goal.description}</p>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="mt-1" />
                      </div>
                      <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                        <div>Start: {new Date(goal.startDate).toLocaleDateString()}</div>
                        <div>Due: {new Date(goal.dueDate).toLocaleDateString()}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex w-full justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Update Progress
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                {employeeGoals.length === 0 && (
                  <div className="rounded-md border border-dashed p-8 text-center">
                    <h4 className="text-lg font-medium">No Goals Set</h4>
                    <p className="mt-2 text-muted-foreground">
                      {selectedEmployee.name} doesn't have any goals set yet. Click "Add Goal" to create one.
                    </p>
                    <Button className="mt-4" variant="outline" onClick={() => setIsAddGoalOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Goal
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Performance Reviews</h3>
                <Dialog open={isAddReviewOpen} onOpenChange={setIsAddReviewOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>New Performance Review</DialogTitle>
                      <DialogDescription>Conduct a performance review for {selectedEmployee.name}.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reviewDate">Review Date</Label>
                          <Input id="reviewDate" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reviewer">Reviewer</Label>
                          <Input id="reviewer" placeholder="Your name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Job Knowledge</Label>
                        <Slider defaultValue={[3]} max={5} step={0.5} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Quality of Work</Label>
                        <Slider defaultValue={[3]} max={5} step={0.5} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Communication</Label>
                        <Slider defaultValue={[3]} max={5} step={0.5} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="strengths">Strengths</Label>
                        <Textarea id="strengths" placeholder="Employee's key strengths..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="improvements">Areas for Improvement</Label>
                        <Textarea id="improvements" placeholder="Areas that need improvement..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comments">Additional Comments</Label>
                        <Textarea id="comments" placeholder="Additional feedback and comments..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddReviewOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddReviewOpen(false)}>Submit Review</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                {employeeReviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Performance Review</CardTitle>
                        <Badge variant="outline">{new Date(review.reviewDate).toLocaleDateString()}</Badge>
                      </div>
                      <CardDescription>
                        Reviewed by {review.reviewer}, {review.reviewerRole}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Overall Rating:</span>
                        <div className="flex items-center">
                          <span className="mr-2 text-lg font-bold">{review.overallRating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= review.overallRating
                                    ? "fill-yellow-400"
                                    : star - 0.5 <= review.overallRating
                                      ? "fill-yellow-400/50"
                                      : "fill-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Strengths</h4>
                          <p className="mt-1 text-sm">{review.strengths}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Areas for Improvement</h4>
                          <p className="mt-1 text-sm">{review.areasForImprovement}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Detailed Ratings</h4>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                          {Object.entries(review.ratings).map(([category, rating]) => (
                            <div key={category} className="flex items-center justify-between">
                              <span className="text-sm capitalize">{category.replace(/([A-Z])/g, " $1").trim()}:</span>
                              <div className="flex items-center">
                                <span className="mr-2 text-sm font-medium">{rating}</span>
                                <div className="h-1.5 w-16 rounded-full bg-muted">
                                  <div
                                    className="h-1.5 rounded-full bg-primary"
                                    style={{ width: `${(rating / 5) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Comments</h4>
                        <p className="mt-1 text-sm">{review.comments}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Print
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Full Report
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                {employeeReviews.length === 0 && (
                  <div className="rounded-md border border-dashed p-8 text-center">
                    <h4 className="text-lg font-medium">No Reviews Yet</h4>
                    <p className="mt-2 text-muted-foreground">
                      {selectedEmployee.name} hasn't had any performance reviews yet. Click "New Review" to conduct one.
                    </p>
                    <Button className="mt-4" variant="outline" onClick={() => setIsAddReviewOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Conduct First Review
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Training Tab */}
            <TabsContent value="training" className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Training & Development</h3>
                <Dialog open={isAddTrainingOpen} onOpenChange={setIsAddTrainingOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Training
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Training Record</DialogTitle>
                      <DialogDescription>Record a completed training for {selectedEmployee.name}.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="trainingTitle">Training Title</Label>
                        <Input id="trainingTitle" placeholder="Enter training title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="provider">Provider</Label>
                        <Input id="provider" placeholder="Training provider" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="completionDate">Completion Date</Label>
                          <Input id="completionDate" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration</Label>
                          <Input id="duration" placeholder="e.g., 8 hours" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="score">Score/Grade</Label>
                          <Input id="score" type="number" placeholder="Score (if applicable)" />
                        </div>
                        <div className="flex items-end space-x-2">
                          <Checkbox id="certificate" />
                          <Label htmlFor="certificate">Certificate Issued</Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trainingNotes">Notes</Label>
                        <Textarea id="trainingNotes" placeholder="Additional notes about the training..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddTrainingOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddTrainingOpen(false)}>Save Record</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 text-sm">
                        <th className="px-4 py-3 text-left font-medium">Training</th>
                        <th className="px-4 py-3 text-left font-medium">Provider</th>
                        <th className="px-4 py-3 text-left font-medium">Completion Date</th>
                        <th className="px-4 py-3 text-left font-medium">Duration</th>
                        <th className="px-4 py-3 text-left font-medium">Score</th>
                        <th className="px-4 py-3 text-left font-medium">Certificate</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeTrainings.map((training) => (
                        <tr key={training.id} className="border-b">
                          <td className="px-4 py-3 font-medium">{training.title}</td>
                          <td className="px-4 py-3">{training.provider}</td>
                          <td className="px-4 py-3">{new Date(training.completionDate).toLocaleDateString()}</td>
                          <td className="px-4 py-3">{training.duration}</td>
                          <td className="px-4 py-3">{training.score}</td>
                          <td className="px-4 py-3">
                            {training.certificate ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              >
                                Yes
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                              >
                                No
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Record</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Certificate</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete Record</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                      {employeeTrainings.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center">
                            <p className="text-muted-foreground">
                              No training records found for {selectedEmployee.name}.
                            </p>
                            <Button
                              className="mt-4"
                              variant="outline"
                              size="sm"
                              onClick={() => setIsAddTrainingOpen(true)}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add First Training
                            </Button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Development Plan */}
              <div className="mt-8">
                <h3 className="text-lg font-medium">Development Plan</h3>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Career Development Plan</CardTitle>
                    <CardDescription>Long-term development goals and career progression plan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium">Career Goals</h4>
                      <p className="mt-1 text-sm">
                        {selectedEmployee.name} is working toward a{" "}
                        {selectedEmployee.role === "Manager" ? "Regional Manager" : "Senior " + selectedEmployee.role}{" "}
                        position within the next 2 years.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Recommended Training</h4>
                      <ul className="mt-1 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Checkbox id="training1" />
                          <Label htmlFor="training1" className="text-sm font-normal">
                            Advanced {selectedEmployee.role} Certification
                          </Label>
                        </li>
                        <li className="flex items-center gap-2">
                          <Checkbox id="training2" />
                          <Label htmlFor="training2" className="text-sm font-normal">
                            Leadership Development Program
                          </Label>
                        </li>
                        <li className="flex items-center gap-2">
                          <Checkbox id="training3" />
                          <Label htmlFor="training3" className="text-sm font-normal">
                            Industry-Specific Workshop
                          </Label>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium">Skills to Develop</h4>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Leadership</span>
                            <span>70%</span>
                          </div>
                          <Progress value={70} className="mt-1" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Technical Knowledge</span>
                            <span>85%</span>
                          </div>
                          <Progress value={85} className="mt-1" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Communication</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} className="mt-1" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Problem Solving</span>
                            <span>80%</span>
                          </div>
                          <Progress value={80} className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Update Development Plan</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

