"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Grid, List, Plus, Star, Clock, Droplets, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Sample service categories
const serviceCategories = [
  "All Categories",
  "Exterior Wash",
  "Interior Cleaning",
  "Full Service",
  "Detailing",
  "Express Services",
  "Add-ons",
]

// Sample services data
const servicesData = [
  {
    id: "basic-wash",
    name: "Basic Wash",
    description: "A quick exterior wash to remove dirt and grime from your vehicle's surface.",
    category: "Exterior Wash",
    price: 15.99,
    duration: 15,
    image: "/placeholder.svg?height=200&width=300&text=Basic+Wash",
    featured: false,
    available: true,
    rating: 4.2,
    reviewCount: 128,
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    description: "Complete exterior wash with wax protection and tire shine for a lasting clean.",
    category: "Exterior Wash",
    price: 24.99,
    duration: 25,
    image: "/placeholder.svg?height=200&width=300&text=Premium+Wash",
    featured: true,
    available: true,
    rating: 4.7,
    reviewCount: 256,
  },
  {
    id: "deluxe-wash",
    name: "Deluxe Wash",
    description: "Our most comprehensive exterior wash with premium wax, tire shine, and underbody wash.",
    category: "Exterior Wash",
    price: 34.99,
    duration: 35,
    image: "/placeholder.svg?height=200&width=300&text=Deluxe+Wash",
    featured: true,
    available: true,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    id: "interior-vacuum",
    name: "Interior Vacuum",
    description: "Thorough vacuuming of all interior surfaces including seats, carpets, and mats.",
    category: "Interior Cleaning",
    price: 19.99,
    duration: 20,
    image: "/placeholder.svg?height=200&width=300&text=Interior+Vacuum",
    featured: false,
    available: true,
    rating: 4.3,
    reviewCount: 112,
  },
  {
    id: "interior-detail",
    name: "Interior Detailing",
    description: "Complete interior cleaning including dashboard, console, door panels, and windows.",
    category: "Interior Cleaning",
    price: 49.99,
    duration: 60,
    image: "/placeholder.svg?height=200&width=300&text=Interior+Detail",
    featured: false,
    available: true,
    rating: 4.6,
    reviewCount: 98,
  },
  {
    id: "full-service-wash",
    name: "Full Service Wash",
    description: "Comprehensive exterior wash and interior cleaning for a complete vehicle refresh.",
    category: "Full Service",
    price: 39.99,
    duration: 45,
    image: "/placeholder.svg?height=200&width=300&text=Full+Service",
    featured: true,
    available: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "express-wash",
    name: "Express Wash",
    description: "Quick exterior wash for customers on the go. Ready in just 10 minutes.",
    category: "Express Services",
    price: 12.99,
    duration: 10,
    image: "/placeholder.svg?height=200&width=300&text=Express+Wash",
    featured: false,
    available: true,
    rating: 4.1,
    reviewCount: 203,
  },
  {
    id: "premium-detail",
    name: "Premium Detailing",
    description: "Professional detailing service including clay bar treatment, polish, and premium wax.",
    category: "Detailing",
    price: 149.99,
    duration: 180,
    image: "/placeholder.svg?height=200&width=300&text=Premium+Detail",
    featured: false,
    available: true,
    rating: 4.9,
    reviewCount: 87,
  },
  {
    id: "tire-shine",
    name: "Tire Shine",
    description: "Add-on service to give your tires that perfect glossy finish.",
    category: "Add-ons",
    price: 5.99,
    duration: 5,
    image: "/placeholder.svg?height=200&width=300&text=Tire+Shine",
    featured: false,
    available: true,
    rating: 4.4,
    reviewCount: 156,
  },
  {
    id: "rain-repellent",
    name: "Rain Repellent Treatment",
    description: "Special treatment for windshield and windows to improve visibility during rain.",
    category: "Add-ons",
    price: 9.99,
    duration: 10,
    image: "/placeholder.svg?height=200&width=300&text=Rain+Repellent",
    featured: false,
    available: true,
    rating: 4.5,
    reviewCount: 92,
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    description: "Long-lasting protection for your vehicle's paint with advanced ceramic technology.",
    category: "Detailing",
    price: 299.99,
    duration: 240,
    image: "/placeholder.svg?height=200&width=300&text=Ceramic+Coating",
    featured: true,
    available: false, // Temporarily unavailable
    rating: 4.9,
    reviewCount: 64,
  },
  {
    id: "headlight-restoration",
    name: "Headlight Restoration",
    description: "Restore cloudy, yellowed headlights to improve visibility and appearance.",
    category: "Detailing",
    price: 59.99,
    duration: 45,
    image: "/placeholder.svg?height=200&width=300&text=Headlight+Restoration",
    featured: false,
    available: true,
    rating: 4.7,
    reviewCount: 78,
  },
]

export default function ServicesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false)
  const [sortOption, setSortOption] = useState("featured")

  // Filter services based on search, category, and price range
  const filteredServices = servicesData.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || service.category === selectedCategory

    const matchesPriceRange = service.price >= priceRange[0] && service.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPriceRange
  })

  // Sort services based on selected option
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortOption) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "Ksh",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Handle adding a new service
  const handleAddService = () => {
    setIsAddServiceDialogOpen(false)
    toast({
      title: "Service Added",
      description: "The new service has been added successfully.",
    })
  }

  // Navigate to service details page
  const navigateToServiceDetails = (serviceId) => {
    router.push(`/app/services/${serviceId}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your car wash services and packages</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Create a new service for your car wash business. Fill in all the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-name">Service Name</Label>
                    <Input id="service-name" placeholder="e.g. Premium Wash" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-category">Category</Label>
                    <Select>
                      <SelectTrigger id="service-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories
                          .filter((cat) => cat !== "All Categories")
                          .map((category) => (
                            <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-description">Description</Label>
                  <Textarea
                    id="service-description"
                    placeholder="Describe the service in detail..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-price">Price ($)</Label>
                    <Input id="service-price" type="number" min="0" step="0.01" placeholder="29.99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-duration">Duration (minutes)</Label>
                    <Input id="service-duration" type="number" min="1" placeholder="30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-image">Image URL</Label>
                  <Input id="service-image" placeholder="URL to service image" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="service-featured" />
                  <Label htmlFor="service-featured">Featured Service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="service-available" defaultChecked />
                  <Label htmlFor="service-available">Available for Booking</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddServiceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddService}>Save Service</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-muted" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Tabs value={viewMode} onValueChange={setViewMode} className="hidden sm:block">
            <TabsList>
              <TabsTrigger value="grid" className="px-3">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="mb-2">
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <div className="flex justify-between">
                  <Label>Price Range</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 300]}
                  max={300}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>
              <div className="space-y-2">
                <Label>Availability</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="available">Available Only</SelectItem>
                    <SelectItem value="unavailable">Unavailable Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Grid/List View */}
      {sortedServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Droplets className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No Services Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-2">
            No services match your current filters. Try adjusting your search criteria or clear filters.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All Categories")
              setPriceRange([0, 300])
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedServices.map((service) => (
            <Card
              key={service.id}
              className={cn(
                "overflow-hidden transition-all hover:shadow-md cursor-pointer",
                !service.available && "opacity-70",
              )}
              onClick={() => navigateToServiceDetails(service.id)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                {service.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
                {!service.available && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Badge variant="outline" className="bg-background/80">
                      Temporarily Unavailable
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge variant="outline">{service.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                <div className="flex items-center mt-2 gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-xs text-muted-foreground">({service.reviewCount} reviews)</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {service.duration} min
                </div>
                <div className="text-lg font-bold">{formatCurrency(service.price)}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedServices.map((service) => (
            <Card
              key={service.id}
              className={cn(
                "overflow-hidden transition-all hover:shadow-md cursor-pointer",
                !service.available && "opacity-70",
              )}
              onClick={() => navigateToServiceDetails(service.id)}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="object-cover w-full h-full"
                  />
                  {service.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
                  {!service.available && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <Badge variant="outline" className="bg-background/80">
                        Temporarily Unavailable
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <h3 className="text-lg font-bold">{service.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="text-xl font-bold">{formatCurrency(service.price)}</div>
                  </div>
                  <p className="text-muted-foreground mt-2">{service.description}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{service.duration} min</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({service.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      {service.available ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Available
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          Unavailable
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

