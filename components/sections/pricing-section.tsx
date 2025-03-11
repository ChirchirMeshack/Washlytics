/**
 * @file components/sections/pricing-section.tsx
 * @description Pricing section component displaying subscription plans with features
 * and payment options for the Sparkle car wash management platform.
 */

"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check, CreditCard, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

/**
 * Plan structure defining subscription tiers
 * @typedef {Object} Plan
 * @property {string} name - Plan name (Basic, Pro, Enterprise)
 * @property {string} description - Short description of the plan
 * @property {string} price - Monthly price in Ksh
 * @property {string[]} features - Array of included features
 * @property {boolean} popular - Whether this is the highlighted plan
 */
interface Plan {
  name: string
  description: string
  price: string
  features: string[]
  popular: boolean
}

/**
 * PricingSection Component
 * 
 * Displays subscription plans with:
 * - Feature comparison
 * - Pricing information
 * - Popular plan highlighting
 * - Animated content reveals
 * - Payment method indicators
 * 
 * @returns {JSX.Element} The rendered pricing section
 */
export function PricingSection() {
  /**
   * Available subscription plans
   * Defines the features and pricing for each tier
   */
  const plans: Plan[] = [
    {
      name: "Basic",
      description: "Perfect for small car wash operations",
      price: "Ksh4999",
      features: [
        "Single location management",
        "Up to 5 staff accounts",
        "Basic reporting",
        "Customer management",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      description: "Ideal for growing businesses",
      price: "Ksh6999",
      features: [
        "Up to 3 locations",
        "Unlimited staff accounts",
        "Advanced reporting & analytics",
        "Inventory management",
        "Marketplace access",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large multi-location operations",
      price: "Ksh9999",
      features: [
        "Unlimited locations",
        "Custom branding",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 phone support",
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24 bg-muted/50">
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
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Pricing Card */}
              <Card className={`h-full flex flex-col relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {/* Popular Plan Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 z-10">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </CardHeader>

                {/* Features List */}
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                  {/* Payment Methods */}
                  <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-1" />
                      <span>Card</span>
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-1" />
                      <span>MPesa</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}