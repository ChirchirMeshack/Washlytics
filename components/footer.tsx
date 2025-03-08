/**
 * @file components/footer.tsx
 * @description Footer component with navigation links, social media, and newsletter subscription
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Sparkles, 
  Twitter 
} from "lucide-react"

/**
 * Link item structure
 */
interface LinkItem {
  href: string
  label: string
}

/**
 * Footer Component
 * 
 * A comprehensive footer featuring:
 * - Brand information
 * - Social media links
 * - Navigation sections
 * - Newsletter subscription
 * - Copyright notice
 */
export function Footer() {
  /**
   * Quick navigation links
   */
  const quickLinks: LinkItem[] = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
    { href: "#marketplace", label: "Marketplace" },
    { href: "#contact", label: "Contact" },
  ]

  /**
   * Resource links
   */
  const resourceLinks: LinkItem[] = [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
  ]

  /**
   * Social media links
   */
  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ]

  return (
    <footer className="bg-muted py-12 md:py-16">
      <div className="container px-4 md:px-6">
        {/* Main Footer Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Washlytics</span>
              <span className="text-xl">✨</span>
            </div>
            {/* Brand Description */}
            <p className="text-muted-foreground">
              Effortless car wash management for businesses of all sizes.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Subscribe</h3>
            <p className="text-muted-foreground">
              Stay updated with the latest features and releases.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" />
              <Button size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Washlytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}