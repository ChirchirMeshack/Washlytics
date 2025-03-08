/**
 * @file components/sections/marketplace-section.tsx
 * @description A marketplace section component for car wash equipment and supplies
 * featuring filtering, search, and categorized product listings.
 */

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Filter, Search, ShoppingCart } from "lucide-react"

/**
 * Marketplace item structure
 * @typedef {Object} MarketplaceItem
 * @property {number} id - Unique identifier for the item
 * @property {string} title - Product name
 * @property {string} category - Product category (Equipment or Supplies)
 * @property {string} price - Formatted price string
 * @property {string} seller - Seller's business name
 * @property {string} image - URL or path to product image
 */
interface MarketplaceItem {
  id: number
  title: string
  category: string
  price: string
  seller: string
  image: string
}

/**
 * MarketplaceSection Component
 * 
 * A comprehensive marketplace section featuring:
 * - Categorized product listings
 * - Search functionality
 * - Filter options
 * - Responsive grid layout
 * - Animated content reveals
 */
export function MarketplaceSection() {
  /**
   * Sample marketplace items data
   * In a real application, this would likely come from an API
   */
  const marketplaceItems: MarketplaceItem[] = [
    {
      id: 1,
      title: "Premium Car Wash Foam",
      category: "Supplies",
      price: "Ksh699",
      seller: "ShinyWheels",
      image: "/Premium-car-wash-foam.jpg",
    }, 
    {
        id: 2,
        title: "High-Pressure Washer",
        category: "Equipment",
        price: "Ksh59,999",
        seller: "QuickSparkle",
        image: "/High-pressure-washer.jpg",
      },
      {
        id: 3,
        title: "Microfiber Towels (Pack of 50)",
        category: "Supplies",
        price: "Ksh6,999",
        seller: "CleanCars",
        image: "/packed-microFibers .jpg",
      },
      {
        id: 4,
        title: "Vacuum Cleaner",
        category: "Equipment",
        price: "$39,999",
        seller: "SpeedyDry",
        image: "/vacuum.jpg",
      },
      {
        id: 5,
        title: "Interior Cleaning Kit",
        category: "Supplies",
        price: "Ksh4,999",
        seller: "DetailPro",
        image: "/Interior-Cleaning-Kit.jpg",
      },
      {
        id: 6,
        title: "Quality Water Tanks",
        category: "Equipment",
        price: "Ksh20,499",
        seller: "EcoWash",
        image: "/water-tank.jpg",
      },
    // ... other items
  ]

  /**
   * Renders a product card with consistent layout and animations
   * @param {MarketplaceItem} item - The product to display
   * @param {number} index - Index for staggered animations
   */
  const renderProductCard = (item: MarketplaceItem, index: number) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col overflow-hidden">
        {/* Product Image */}
        <div className="aspect-[3/2] relative overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
            {item.category}
          </div>
        </div>

        {/* Product Details */}
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{item.title}</CardTitle>
          <div className="text-sm text-muted-foreground">Seller: {item.seller}</div>
        </CardHeader>

        {/* Price */}
        <CardContent className="pb-2 pt-0">
          <div className="text-2xl font-bold">{item.price}</div>
        </CardContent>

        {/* Action Button */}
        <CardFooter className="mt-auto">
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )

  return (
    <section id="marketplace" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-[800px] mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Cross-Tenant Marketplace
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Buy and sell equipment, supplies, and inventory across different car wash businesses.
            Save costs and find everything you need in one place.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search marketplace..." className="w-full pl-8" />
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Tabs defaultValue="all" className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="supplies">Supplies</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Product Listings */}
        <Tabs defaultValue="all">
          {/* All Products Tab */}
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {marketplaceItems.map((item, index) => renderProductCard(item, index))}
            </div>
          </TabsContent>

          {/* Equipment Tab */}
          <TabsContent value="equipment" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {marketplaceItems
                .filter(item => item.category === "Equipment")
                .map((item, index) => renderProductCard(item, index))}
            </div>
          </TabsContent>

          {/* Supplies Tab */}
          <TabsContent value="supplies" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {marketplaceItems
                .filter(item => item.category === "Supplies")
                .map((item, index) => renderProductCard(item, index))}
            </div>
          </TabsContent>
        </Tabs>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  )
}