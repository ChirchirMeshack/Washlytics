/**
 * @file components/sections/hero-section.tsx
 * @description Hero section component for the landing page featuring animated elements,
 * call-to-action buttons, and a mock dashboard preview.
 */

"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Droplets, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

/**
 * HeroSection Component
 * 
 * A modern, animated hero section featuring:
 * - Animated background elements with gradient overlays
 * - Staggered content animations using Framer Motion
 * - Responsive layout with grid system
 * - Interactive CTA buttons
 * - Trust indicators (user avatars and statistics)
 * - Floating decorative elements
 * 
 * @returns {JSX.Element} The rendered hero section
 */
export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          {/* Left Column - Text Content */}
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Feature Badge */}
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              <span className="font-medium">New Feature</span> — Owner's Marketplace
            </div>

            {/* Main Heading and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Effortless Car Wash Management with Washlytics ✨
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                The all-in-one SaaS platform built specifically for car wash businesses. 
                Manage operations, inventory, staff, and grow your business with ease.
              </p>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started
                  <Zap className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#about">Learn More</Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex items-center space-x-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* User Avatars Stack */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="inline-block rounded-full overflow-hidden border-2 border-background w-8 h-8"
                  >
                  <Image
                       src={`/avatar-${i}.jpg`}
                      alt="Customer avatar"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Trusted by 200+ car wash businesses
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Dashboard Container */}
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 backdrop-blur-sm">
                {/* Dashboard Window */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-[450px] aspect-video bg-background rounded-lg shadow-lg overflow-hidden">
                    {/* Dashboard Preview Image */}
                    <Image
                        src="/washlytics-dashboard-preview.jpg"
                        alt="Car wash management dashboard"
                        width={800}
                        height={600}
                        className="object-cover w-full h-full"
                        />

                    {/* Window Controls */}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Decorative Elements */}
                <motion.div
                  className="absolute top-10 left-10 p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Number.POSITIVE_INFINITY, 
                    duration: 3, 
                    ease: "easeInOut" 
                  }}
                >
                  <Droplets className="h-6 w-6 text-blue-500" />
                </motion.div>

                <motion.div
                  className="absolute bottom-10 right-10 p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ 
                    repeat: Number.POSITIVE_INFINITY, 
                    duration: 4, 
                    ease: "easeInOut" 
                  }}
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}