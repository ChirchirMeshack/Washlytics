/**
 * @file components/sections/testimonials-section.tsx
 * @description Testimonials section displaying customer reviews and ratings
 */

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

/**
 * Testimonial structure
 * @typedef {Object} Testimonial
 * @property {string} name - Customer's full name
 * @property {string} role - Customer's role and company
 * @property {string} image - URL to customer's avatar
 * @property {string} content - Testimonial text
 * @property {number} rating - Rating out of 5 stars
 */
interface Testimonial {
  name: string
  role: string
  image: string
  content: string
  rating: number
}

/**
 * TestimonialsSection Component
 * 
 * Displays a grid of customer testimonials with:
 * - Customer avatars and details
 * - Star ratings
 * - Animated content reveals
 * - Responsive layout
 * 
 * @returns {JSX.Element} The rendered testimonials section
 */
export function TestimonialsSection() {
  /**
   * Customer testimonials data
   * In a production environment, this would likely come from a CMS or API
   */
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Owner, ShinyWheels Car Wash",
      image: "/avatar-3.jpg",
      content: "Sparkle has transformed how we manage our car wash. The multi-tenant system allows us to oversee all three of our locations from one dashboard, and the marketplace has saved us thousands on equipment purchases.",
      rating: 5,
    },
    {
        name: "Michael Rodriguez",
        role: "Manager, QuickSparkle",
        image: "/testimonial-1.jpg",
        content:
          "The client scheduling feature alone is worth the subscription. We've reduced no-shows by 80% and the real-time updates keep everyone on the same page. The MPesa integration is seamless for our customers.",
        rating: 5,
      },
      {
        name: "David Chen",
        role: "CEO, EcoWash Group",
        image: "/testimonial-3.jpg",
        content:
          "As we expanded to 12 locations, Washlytics scaled perfectly with our business. The inventory dashboard has been a game-changer for managing inventory across all our sites. Highly recommended!",
        rating: 4,
      },
      {
        name: "Priya Patel",
        role: "Owner, CleanCars Express",
        image: "/avatar-4.jpg",
        content:
          "The customer management system has helped us build loyalty with our clients. We can track preferences, send automated reminders, and the analytics give us insights we never had before.",
        rating: 5,
      },
    // ... other testimonials
  ]

  /**
   * Renders a star rating component
   * @param {number} rating - Number of filled stars (1-5)
   * @returns {JSX.Element} Star rating display
   */
  const renderStarRating = (rating: number) => (
    <div className="flex mb-4">
      {Array(5).fill(0).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating 
              ? "text-yellow-500 fill-yellow-500" 
              : "text-muted"
          }`}
        />
      ))}
    </div>
  )

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/50">
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
            Trusted by Car Wash Businesses
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Don't just take our word for it. Here's what our customers have to say about Sparkle.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  {/* Customer Profile */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full overflow-hidden w-12 h-12">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  {renderStarRating(testimonial.rating)}

                  {/* Testimonial Content */}
                  <p className="text-muted-foreground">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}