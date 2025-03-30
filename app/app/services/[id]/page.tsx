"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  Star,
  Calendar,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Droplets,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Sample service categories
const serviceCategories = [
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
    longDescription:
      "Our Basic Wash service provides a thorough exterior cleaning to remove dirt, dust, and road grime from your vehicle's surface. This service includes a gentle foam wash, high-pressure rinse, and a spot-free rinse to leave your car looking clean and refreshed. Perfect for regular maintenance washing to keep your vehicle in good condition.",
    category: "Exterior Wash",
    price: 15.99,
    duration: 15,
    image: "/placeholder.svg?height=400&width=600&text=Basic+Wash",
    featured: false,
    available: true,
    rating: 4.2,
    reviewCount: 128,
    features: ["Exterior foam wash", "High-pressure rinse", "Spot-free rinse", "Basic exterior cleaning"],
    benefits: [
      "Removes surface dirt and grime",
      "Preserves paint finish",
      "Quick service - ready in 15 minutes",
      "Environmentally friendly cleaning agents",
    ],
    pricingTiers: [
      { name: "Single Wash", price: 15.99, description: "One-time service" },
      { name: "5-Pack", price: 69.99, description: "5 washes at a discounted rate", savings: "13%" },
      { name: "Monthly Pass", price: 49.99, description: "Unlimited washes for one month", popular: true },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John D.", avatar: "/placeholder.svg?height=40&width=40&text=JD" },
        rating: 4,
        date: "2023-04-15",
        comment:
          "Quick and efficient service. Car looks clean, though I wish they'd pay a bit more attention to the wheels.",
        helpful: 12,
        unhelpful: 2,
      },
      {
        id: 2,
        user: { name: "Sarah M.", avatar: "/placeholder.svg?height=40&width=40&text=SM" },
        rating: 5,
        date: "2023-03-22",
        comment: "Perfect for a quick clean! I stop by weekly and my car always looks great afterward.",
        helpful: 8,
        unhelpful: 0,
      },
      {
        id: 3,
        user: { name: "Robert T.", avatar: "/placeholder.svg?height=40&width=40&text=RT" },
        rating: 3,
        date: "2023-05-01",
        comment: "It's okay for the price, but don't expect anything spectacular. Just a basic wash as advertised.",
        helpful: 15,
        unhelpful: 3,
      },
    ],
    ratingBreakdown: {
      5: 62,
      4: 45,
      3: 15,
      2: 4,
      1: 2,
    },
    relatedServices: ["premium-wash", "tire-shine", "rain-repellent"],
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    description: "Complete exterior wash with wax protection and tire shine for a lasting clean.",
    longDescription:
      "The Premium Wash takes your car cleaning experience to the next level. This comprehensive service includes everything in our Basic Wash plus a protective wax coating, tire shine application, and wheel cleaning. The added wax protection helps repel water, prevent dirt adhesion, and give your vehicle a beautiful shine that lasts. The tire shine treatment restores the deep black appearance of your tires, completing the clean look of your vehicle.",
    category: "Exterior Wash",
    price: 24.99,
    duration: 25,
    image: "/placeholder.svg?height=400&width=600&text=Premium+Wash",
    featured: true,
    available: true,
    rating: 4.7,
    reviewCount: 256,
    features: [
      "Everything in Basic Wash",
      "Protective wax application",
      "Tire shine treatment",
      "Wheel cleaning",
      "Exterior window cleaning",
    ],
    benefits: [
      "Longer-lasting cleanliness",
      "Enhanced paint protection",
      "Improved water beading",
      "Shiny tires and clean wheels",
      "UV protection for paint",
    ],
    pricingTiers: [
      { name: "Single Wash", price: 24.99, description: "One-time service" },
      { name: "5-Pack", price: 99.99, description: "5 washes at a discounted rate", savings: "20%" },
      { name: "Monthly Pass", price: 79.99, description: "Unlimited washes for one month", popular: true },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Michael B.", avatar: "/placeholder.svg?height=40&width=40&text=MB" },
        rating: 5,
        date: "2023-05-10",
        comment:
          "The wax protection really makes a difference! My car stayed cleaner for much longer than with a basic wash.",
        helpful: 22,
        unhelpful: 1,
      },
      {
        id: 2,
        user: { name: "Jennifer L.", avatar: "/placeholder.svg?height=40&width=40&text=JL" },
        rating: 4,
        date: "2023-04-28",
        comment:
          "Great service overall. The tire shine makes my car look like new. Only giving 4 stars because it took a bit longer than advertised.",
        helpful: 15,
        unhelpful: 3,
      },
    ],
    ratingBreakdown: {
      5: 180,
      4: 56,
      3: 12,
      2: 5,
      1: 3,
    },
    relatedServices: ["deluxe-wash", "interior-vacuum", "rain-repellent"],
  },
]

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPricingTier, setSelectedPricingTier] = useState("single")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")

  // Find the service by ID
  const service = servicesData.find((s) => s.id === params.id)

  // If service not found, show error
  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Droplets className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Service Not Found</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-2">
          The service you're looking for doesn't exist or has been removed.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/app/services")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>
      </div>
    )
  }

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Handle editing a service
  const handleEditService = () => {
    setIsEditDialogOpen(false)
    toast({
      title: "Service Updated",
      description: "The service has been updated successfully.",
    })
  }

  // Handle deleting a service
  const handleDeleteService = () => {
    setIsDeleteDialogOpen(false)
    toast({
      title: "Service Deleted",
      description: "The service has been deleted successfully.",
    })
    router.push("/app/services")
  }

  // Handle submitting a review
  const handleSubmitReview = () => {
    if (reviewComment.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a review comment.",
      })
      return
    }

    toast({
      title: "Review Submitted",
      description: "Your review has been submitted successfully.",
    })
    setReviewRating(5)
    setReviewComment("")
  }

  // Calculate total rating percentage
  const calculateRatingPercentage = (rating) => {
    const total = Object.values(service.ratingBreakdown).reduce((sum: number, count: number) => sum + count, 0)
    return (service.ratingBreakdown[rating] / total) * 100
  }

  // Find related services
  const relatedServices = service.relatedServices
    ? servicesData.filter((s) => service.relatedServices.includes(s.id))
    : []

  return (
    <div className="flex flex-col gap-6">
      {/* Back button and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button variant="outline" onClick={() => router.push("/app/services")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>
        <div className="flex items-center gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Edit Service</DialogTitle>
                <DialogDescription>Make changes to the service details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-service-name">Service Name</Label>
                    <Input id="edit-service-name" defaultValue={service.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-service-category">Category</Label>
                    <Select defaultValue={service.category}>
                      <SelectTrigger id="edit-service-category">
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-service-description">Short Description</Label>
                  <Textarea id="edit-service-description" defaultValue={service.description} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-service-long-description">Full Description</Label>
                  <Textarea
                    id="edit-service-long-description"
                    defaultValue={service.longDescription}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-service-price">Price ($)</Label>
                    <Input id="edit-service-price" type="number" min="0" step="0.01" defaultValue={service.price} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-service-duration">Duration (minutes)</Label>
                    <Input id="edit-service-duration" type="number" min="1" defaultValue={service.duration} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-service-image">Image URL</Label>
                  <Input id="edit-service-image" defaultValue={service.image} />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="edit-service-featured" defaultChecked={service.featured} />
                  <Label htmlFor="edit-service-featured">Featured Service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="edit-service-available" defaultChecked={service.available} />
                  <Label htmlFor="edit-service-available">Available for Booking</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditService}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Service</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this service? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteService}>
                  Delete Service
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Service Header */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="aspect-video relative overflow-hidden rounded-lg border">
          <img src={service.image || "/placeholder.svg"} alt={service.name} className="object-cover w-full h-full" />
          {service.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
          {!service.available && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="outline" className="bg-background/80 text-lg py-2">
                Temporarily Unavailable
              </Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{service.name}</h1>
                <Badge variant="outline" className="mt-2">
                  {service.category}
                </Badge>
              </div>
              <div className="text-3xl font-bold">{formatCurrency(service.price)}</div>
            </div>
            <p className="text-muted-foreground mt-4">{service.description}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{service.duration} minutes</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2 h-5 w-5 fill-primary text-primary" />
                <span className="font-medium">{service.rating}</span>
                <span className="text-muted-foreground ml-1">({service.reviewCount} reviews)</span>
              </div>
              <div>
                {service.available ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Available
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    <XCircle className="mr-1 h-4 w-4" />
                    Unavailable
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full" size="lg" disabled={!service.available}>
              <Calendar className="mr-2 h-5 w-5" />
              Book This Service
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="related">Related</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{service.longDescription}</p>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Features</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Sparkles className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{service.duration} minutes</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{service.category}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">{formatCurrency(service.price)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium">{service.available ? "Available" : "Unavailable"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why Choose This Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Quality Guarantee</h4>
                        <p className="text-sm text-muted-foreground">
                          We stand behind our work with a satisfaction guarantee
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Professional Service</h4>
                        <p className="text-sm text-muted-foreground">Trained staff using premium products</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Customer Satisfaction</h4>
                        <p className="text-sm text-muted-foreground">Join our thousands of happy customers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            {service.pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden transition-all hover:shadow-md",
                  tier.popular && "border-primary shadow-sm",
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{formatCurrency(tier.price)}</div>
                  {tier.savings && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    >
                      Save {tier.savings}
                    </Badge>
                  )}
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                    disabled={!service.available}
                  >
                    Select {tier.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Custom Packages</CardTitle>
              <CardDescription>Need a custom solution? We can create a package tailored to your needs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Fleet Services</h3>
                  <p className="text-muted-foreground">
                    We offer special pricing for businesses with multiple vehicles. Contact us for a custom quote based
                    on your fleet size and service needs.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Request Fleet Quote
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Membership Options</h3>
                  <p className="text-muted-foreground">
                    Save more with our membership programs. Choose from different tiers with varying benefits and
                    discounts on all our services.
                  </p>
                  <Button className="mt-4" variant="outline">
                    View Membership Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>See what our customers are saying about this service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {service.reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b last:border-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={review.user.avatar} alt={review.user.name} />
                            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.user.name}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating ? "fill-primary text-primary" : "text-muted-foreground",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3">{review.comment}</p>
                      <div className="flex items-center mt-3 text-sm">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Not Helpful ({review.unhelpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 ml-auto">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="text-4xl font-bold mr-4">{service.rating}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < Math.floor(service.rating) ? "fill-primary text-primary" : "text-muted-foreground",
                            )}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Based on {service.reviewCount} reviews</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <div className="w-8 text-sm font-medium">{rating} ★</div>
                        <div className="flex-1 mx-2">
                          <Progress value={calculateRatingPercentage(rating)} className="h-2" />
                        </div>
                        <div className="w-8 text-sm text-right text-muted-foreground">
                          {service.ratingBreakdown[rating]}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="block mb-2">Your Rating</Label>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                            onClick={() => setReviewRating(i + 1)}
                          >
                            <Star
                              className={cn(
                                "h-6 w-6",
                                i < reviewRating ? "fill-primary text-primary" : "text-muted-foreground",
                              )}
                            />
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="review-comment">Your Review</Label>
                      <Textarea
                        id="review-comment"
                        placeholder="Share your experience with this service..."
                        className="min-h-[100px]"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleSubmitReview}>Submit Review</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Related Services Tab */}
        <TabsContent value="related" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Related Services</CardTitle>
              <CardDescription>Other services you might be interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((relatedService) => (
                  <Card
                    key={relatedService.id}
                    className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
                    onClick={() => router.push(`/app/services/${relatedService.id}`)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={relatedService.image || "/placeholder.svg"}
                        alt={relatedService.name}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      {relatedService.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{relatedService.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedService.description}</p>
                      <div className="flex items-center mt-2 gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{relatedService.rating}</span>
                        <span className="text-xs text-muted-foreground">({relatedService.reviewCount} reviews)</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {relatedService.duration} min
                      </div>
                      <div className="text-lg font-bold">{formatCurrency(relatedService.price)}</div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Service Bundles</CardTitle>
              <CardDescription>Save more with these service combinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">Exterior + Interior Package</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Complete care for your vehicle inside and out
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    >
                      Save 15%
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 border rounded p-2 text-center">
                      <div className="text-sm font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground">{formatCurrency(service.price)}</div>
                    </div>
                    <span>+</span>
                    <div className="flex-1 border rounded p-2 text-center">
                      <div className="text-sm font-medium">Interior Detailing</div>
                      <div className="text-xs text-muted-foreground">$49.99</div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Bundle Price:</div>
                    <div className="font-bold">
                      {formatCurrency(service.price + 49.99 - (service.price + 49.99) * 0.15)}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Bundle
                  </Button>
                </div>

                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">Complete Protection Package</h3>
                      <p className="text-sm text-muted-foreground mt-1">Long-lasting protection for your vehicle</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    >
                      Save 20%
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 border rounded p-2 text-center">
                      <div className="text-sm font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground">{formatCurrency(service.price)}</div>
                    </div>
                    <span>+</span>
                    <div className="flex-1 border rounded p-2 text-center">
                      <div className="text-sm font-medium">Wax Protection</div>
                      <div className="text-xs text-muted-foreground">$29.99</div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Bundle Price:</div>
                    <div className="font-bold">
                      {formatCurrency(service.price + 29.99 - (service.price + 29.99) * 0.2)}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Bundle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

