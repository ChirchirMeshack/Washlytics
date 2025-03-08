/**
 * @file components/sections/about-section.tsx
 * @description About section component highlighting key features and benefits
 * of the Sparkle car wash management platform.
 */

"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle, Droplets, ShieldCheck, Zap , Calendar , Shield ,Truck , Users, BarChart3 , MonitorSmartphone } from "lucide-react"

/**
 * Feature item structure
 * @typedef {Object} Feature
 * @property {JSX.Element} icon - Lucide icon component
 * @property {string} title - Feature name
 * @property {string} description - Feature description
 */
interface Feature {
  icon: JSX.Element
  title: string
  description: string
}

/**
 * AboutSection Component
 * 
 * A comprehensive section that showcases the platform's key features and benefits
 * with animated content reveals and responsive layout.
 * 
 * Features:
 * - Animated content reveals using Framer Motion
 * - Responsive grid layouts
 * - Feature cards with icons
 * - Benefits list with check marks
 * - Visual content with placeholder image
 * 
 * @returns {JSX.Element} The rendered about section
 */
export function AboutSection() {
  /**
   * Core features of the platform
   * Each feature includes an icon, title, and description
   */
  const features: Feature[] = [
    {
      icon: <Droplets className="h-6 w-6 text-primary" />,
      title: "Multi-Tenant Architecture",
      description: "Each business gets a unique subdomain with dedicated resources and data isolation.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Secure Authentication",
      description: "Role-based access control with Supabase for admins, managers, and employees.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Real-time Updates",
      description: "Live dashboard with instant notifications for new bookings and transactions.",
    },
    {
        icon: <Calendar className="h-6 w-6 text-primary" />,
        title: "Appointment Scheduling",
        description: "Streamline bookings with our intuitive calendar system that reduces no-shows and maximizes capacity.",
      },
      {
        icon: <BarChart3 className="h-6 w-6 text-primary" />,
        title: "Business Analytics",
        description: "Gain insights into your operations with real-time reporting and customizable dashboards.",
      },
      {
        icon: <Users className="h-6 w-6 text-primary" />,
        title: "Customer Management",
        description: "Build loyalty with customer profiles, history tracking, and automated communication.",
      },
      {
        icon: <Truck className="h-6 w-6 text-primary" />,
        title: "Inventory Control",
        description: "Track supplies, set reorder points, and manage vendors all in one place.",
      },
      {
        icon: <Shield className="h-6 w-6 text-primary" />,
        title: "Secure Payments",
        description: "Process transactions safely with our PCI-compliant payment processing system.",
      },
      {
        icon: <MonitorSmartphone className="h-6 w-6 text-primary" />,
        title: "Mobile Optimization",
        description: "Manage your business on the go with our responsive mobile application.",
      },
  ]

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          className="text-center max-w-[800px] mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Built by Car Wash Owners, For Car Wash Owners
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Sparkle was born out of frustration with existing solutions that didn't meet 
            the unique needs of car wash businesses. From single-location operations to 
            multi-site enterprises, Sparkle scales with your business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-2 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Image Container */}
          <div className="relative rounded-lg overflow-hidden aspect-video">
          <Image
              src="/car-wash-analytics.jpg"
              alt="Car wash analytics dashboard"
              width={600}
              height={400}
              className="rounded-lg shadow-lg relative z-10 w-full"
            />
          </div>

          {/* Benefits Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Why Car Wash Businesses Choose Sparkle
            </h3>
            <p className="text-muted-foreground">
              Our platform is designed specifically for the unique challenges of 
              running a car wash business, with features that streamline operations 
              and boost profitability.
            </p>

            {/* Benefits List */}
            <ul className="space-y-2">
              {[
                "Simplified staff management and scheduling",
                "Inventory tracking with low-stock alerts",
                "Cross-tenant marketplace for equipment and supplies",
                "Integrated payment processing with MPesa & Paystack",
                "Comprehensive reporting and analytics",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}