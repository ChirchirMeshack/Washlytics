/**
 * @file components/sections/cta-section.tsx
 * @description A visually striking call-to-action section with animated background
 * and prominent buttons
 */

"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

/**
 * CTASection Component
 * 
 * A prominent call-to-action section featuring:
 * - Animated reveal on scroll
 * - Gradient background effects
 * - Primary and secondary actions
 * - Responsive layout
 * 
 * @example
 * import { CTASection } from "@/components/sections/cta-section"
 * 
 * export default function HomePage() {
 *   return (
 *     <main>
 *       {/* Other sections *\/}
 *       <CTASection />
 *     </main>
 *   )
 * }
 */
export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Main CTA Container */}
        <motion.div
          className="relative overflow-hidden rounded-lg bg-primary px-6 py-12 md:px-12 md:py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Top-right gradient circle */}
            <div 
              className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-foreground/10 rounded-full blur-3xl"
              aria-hidden="true"
            />
            {/* Bottom-left gradient circle */}
            <div 
              className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-foreground/10 rounded-full blur-3xl"
              aria-hidden="true"
            />
          </div>

          {/* Content Container */}
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 text-primary-foreground">
            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Car Wash Business?
            </h2>

            {/* Description */}
            <p className="max-w-[700px] text-lg md:text-xl">
              Join hundreds of car wash businesses already using Washlytics to 
              streamline operations, boost revenue, and delight customers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary CTA Button */}
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {/* Secondary CTA Button */}
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}