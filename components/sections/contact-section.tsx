/**
 * @file components/sections/contact-section.tsx
 * @description Contact section component with contact information and message form
 */

"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { AtSign, MapPin, MessageSquare, Phone } from "lucide-react"

/**
 * Contact information item structure
 */
interface ContactInfo {
  icon: JSX.Element
  title: string
  content: string | JSX.Element
}

/**
 * ContactSection Component
 * 
 * A comprehensive contact section featuring:
 * - Contact information card
 * - Contact form
 * - Animated content reveals
 * - Responsive layout
 * 
 * @returns {JSX.Element} The rendered contact section
 */
export function ContactSection() {
  /**
   * Contact information items
   * Contains all the ways to reach the company
   */
  const contactInfo: ContactInfo[] = [
    {
      icon: <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />,
      title: "Address",
      content: (
        <>
          Old Nairobi Road, Mall
          <br />
          Eldoret, Kenya
        </>
      ),
    },
    {
      icon: <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />,
      title: "Phone",
      content: "+254 712 345 678",
    },
    {
      icon: <AtSign className="h-5 w-5 text-primary mr-3 mt-0.5" />,
      title: "Email",
      content: "hello@washlytics.com",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5" />,
      title: "Live Chat",
      content: "Available 24/7 for Pro and Enterprise plans",
    },
  ]

  return (
    <section id="contact" className="py-16 md:py-24">
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
            Get in Touch
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Have questions about Sparkle? Our team is here to help you get started.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    {item.icon}
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-muted-foreground">{item.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}