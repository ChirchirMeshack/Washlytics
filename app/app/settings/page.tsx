"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  Bell,
  CreditCard,
  Globe,
  Lock,
  LogOut,
  Moon,
  Save,
  Shield,
  Sun,
  Trash2,
  Upload,
  User,
  Users,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Manager",
    bio: "Experienced car wash manager with 5+ years in the industry.",
    twoFactorEnabled: false,
  })

  // Notification state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    appNotifications: true,
    marketingEmails: false,
    newEmployeeAlerts: true,
    scheduleChanges: true,
    performanceUpdates: true,
    systemAlerts: true,
    dailyDigest: false,
    weeklyReport: true,
  })

  // Display state
  const [display, setDisplay] = useState({
    fontSize: 16,
    language: "english",
    highContrast: false,
    reducedMotion: false,
    compactView: false,
  })

  // Account state
  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: 1, name: "Google", connected: true, lastUsed: "2 days ago" },
    { id: 2, name: "Microsoft", connected: false, lastUsed: "Never" },
    { id: 3, name: "Slack", connected: true, lastUsed: "1 week ago" },
  ])

  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: "Windows PC", location: "New York, USA", lastActive: "Just now", current: true },
    { id: 2, device: "iPhone 13", location: "New York, USA", lastActive: "2 hours ago", current: false },
    { id: 3, device: "MacBook Pro", location: "Boston, USA", lastActive: "Yesterday", current: false },
  ])

  // Billing state
  const [subscription, setSubscription] = useState({
    plan: "professional",
    status: "active",
    nextBilling: "May 15, 2023",
    amount: "$49.99",
  })

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "05/25", default: true },
    { id: 2, type: "Mastercard", last4: "5555", expiry: "08/24", default: false },
  ])

  const handleProfileUpdate = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1000)
  }

  const handlePasswordChange = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      })
    }, 1000)
  }

  const handleToggleTwoFactor = () => {
    setProfile({ ...profile, twoFactorEnabled: !profile.twoFactorEnabled })
    toast({
      title: profile.twoFactorEnabled ? "Two-factor authentication disabled" : "Two-factor authentication enabled",
      description: profile.twoFactorEnabled ? "Your account is now less secure." : "Your account is now more secure.",
    })
  }

  const handleNotificationChange = (key, value) => {
    setNotifications({ ...notifications, [key]: value })
  }

  const handleDisplayChange = (key, value) => {
    setDisplay({ ...display, [key]: value })
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
  }

  const handleFontSizeChange = (value) => {
    setDisplay({ ...display, fontSize: value[0] })
  }

  const handleConnectAccount = (id) => {
    const updatedAccounts = connectedAccounts.map((account) =>
      account.id === id ? { ...account, connected: !account.connected } : account,
    )
    setConnectedAccounts(updatedAccounts)

    const account = connectedAccounts.find((a) => a.id === id)
    toast({
      title: account.connected ? `Disconnected from ${account.name}` : `Connected to ${account.name}`,
      description: account.connected
        ? `Your ${account.name} account has been disconnected.`
        : `Your ${account.name} account has been connected.`,
    })
  }

  const handleLogoutSession = (id) => {
    const updatedSessions = activeSessions.filter((session) => session.id !== id)
    setActiveSessions(updatedSessions)
    toast({
      title: "Session terminated",
      description: "The selected session has been logged out.",
    })
  }

  const handleLogoutAllSessions = () => {
    const currentSession = activeSessions.find((session) => session.current)
    setActiveSessions([currentSession])
    setShowLogoutDialog(false)
    toast({
      title: "All sessions terminated",
      description: "All other devices have been logged out.",
    })
  }

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false)
    toast({
      title: "Account deletion requested",
      description:
        "Your account deletion request has been submitted. You will receive an email with further instructions.",
      variant: "destructive",
    })
  }

  const handleChangePlan = (plan) => {
    setSubscription({ ...subscription, plan })
    toast({
      title: "Subscription updated",
      description: `Your subscription has been updated to the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`,
    })
  }

  const handleSetDefaultPayment = (id) => {
    const updatedMethods = paymentMethods.map((method) => ({ ...method, default: method.id === id }))
    setPaymentMethods(updatedMethods)
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleRemovePayment = (id) => {
    const updatedMethods = paymentMethods.filter((method) => method.id !== id)
    setPaymentMethods(updatedMethods)
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed.",
    })
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span className="hidden sm:inline">Display</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and how others see you on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-medium">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground">
                      This will be displayed on your profile and throughout the application.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={profile.jobTitle}
                      onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleProfileUpdate} disabled={isLoading} className="flex items-center gap-2">
                    {isLoading ? "Saving..." : "Save Changes"}
                    {!isLoading && <Save className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your password to keep your account secure.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handlePasswordChange} disabled={isLoading} className="flex items-center gap-2">
                    {isLoading ? "Updating..." : "Update Password"}
                    {!isLoading && <Lock className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.twoFactorEnabled
                        ? "Your account is protected with two-factor authentication."
                        : "Protect your account with two-factor authentication."}
                    </p>
                  </div>
                  <Switch checked={profile.twoFactorEnabled} onCheckedChange={handleToggleTwoFactor} />
                </div>

                {profile.twoFactorEnabled && (
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertTitle>Two-factor authentication is enabled</AlertTitle>
                    <AlertDescription>
                      You will be asked to enter a code from your authenticator app when you sign in.
                    </AlertDescription>
                  </Alert>
                )}

                {profile.twoFactorEnabled && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Recovery Codes</h3>
                      <p className="text-sm text-muted-foreground">
                        Recovery codes can be used to access your account if you lose your two-factor authentication
                        device.
                      </p>
                      <Button variant="outline" size="sm">
                        View Recovery Codes
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Authenticator App</h3>
                      <p className="text-sm text-muted-foreground">
                        Use an authenticator app to get two-factor authentication codes when prompted.
                      </p>
                      <Button variant="outline" size="sm">
                        Reset Authenticator App
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and updates from the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Delivery Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="appNotifications">In-App Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications within the application.</p>
                      </div>
                      <Switch
                        id="appNotifications"
                        checked={notifications.appNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("appNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new features and promotions.
                        </p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newEmployeeAlerts">New Employee Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new employees are added to the system.
                        </p>
                      </div>
                      <Switch
                        id="newEmployeeAlerts"
                        checked={notifications.newEmployeeAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("newEmployeeAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="scheduleChanges">Schedule Changes</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when there are changes to the schedule.
                        </p>
                      </div>
                      <Switch
                        id="scheduleChanges"
                        checked={notifications.scheduleChanges}
                        onCheckedChange={(checked) => handleNotificationChange("scheduleChanges", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="performanceUpdates">Performance Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about employee performance updates.
                        </p>
                      </div>
                      <Switch
                        id="performanceUpdates"
                        checked={notifications.performanceUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("performanceUpdates", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="systemAlerts">System Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about important system updates and maintenance.
                        </p>
                      </div>
                      <Switch
                        id="systemAlerts"
                        checked={notifications.systemAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("systemAlerts", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Frequency</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dailyDigest">Daily Digest</Label>
                        <p className="text-sm text-muted-foreground">Receive a daily summary of all notifications.</p>
                      </div>
                      <Switch
                        id="dailyDigest"
                        checked={notifications.dailyDigest}
                        onCheckedChange={(checked) => handleNotificationChange("dailyDigest", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weeklyReport">Weekly Report</Label>
                        <p className="text-sm text-muted-foreground">Receive a weekly summary of all activities.</p>
                      </div>
                      <Switch
                        id="weeklyReport"
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) => handleNotificationChange("weeklyReport", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Notification preferences updated",
                        description: "Your notification preferences have been updated successfully.",
                      })
                    }}
                    className="flex items-center gap-2"
                  >
                    Save Preferences
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Customize the appearance and behavior of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${theme === "light" ? "border-primary bg-primary/10" : "border-border"}`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <Sun className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${theme === "dark" ? "border-primary bg-primary/10" : "border-border"}`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <Moon className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Dark</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${theme === "system" ? "border-primary bg-primary/10" : "border-border"}`}
                      onClick={() => handleThemeChange("system")}
                    >
                      <div className="flex h-8 w-8 mb-2">
                        <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </div>
                      <span className="text-sm font-medium">System</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Font Size</h3>
                      <p className="text-sm text-muted-foreground">
                        Adjust the size of text throughout the application.
                      </p>
                    </div>
                    <span className="text-sm font-medium">{display.fontSize}px</span>
                  </div>
                  <Slider
                    defaultValue={[display.fontSize]}
                    min={12}
                    max={20}
                    step={1}
                    onValueChange={handleFontSizeChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Language</h3>
                  <div className="space-y-2">
                    <Label htmlFor="language">Select Language</Label>
                    <Select value={display.language} onValueChange={(value) => handleDisplayChange("language", value)}>
                      <SelectTrigger id="language" className="w-full">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Accessibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="highContrast">High Contrast</Label>
                        <p className="text-sm text-muted-foreground">Increase contrast for better visibility.</p>
                      </div>
                      <Switch
                        id="highContrast"
                        checked={display.highContrast}
                        onCheckedChange={(checked) => handleDisplayChange("highContrast", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reducedMotion">Reduced Motion</Label>
                        <p className="text-sm text-muted-foreground">Minimize animations throughout the application.</p>
                      </div>
                      <Switch
                        id="reducedMotion"
                        checked={display.reducedMotion}
                        onCheckedChange={(checked) => handleDisplayChange("reducedMotion", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="compactView">Compact View</Label>
                        <p className="text-sm text-muted-foreground">Reduce spacing to show more content.</p>
                      </div>
                      <Switch
                        id="compactView"
                        checked={display.compactView}
                        onCheckedChange={(checked) => handleDisplayChange("compactView", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Display settings updated",
                        description: "Your display settings have been updated successfully.",
                      })
                    }}
                    className="flex items-center gap-2"
                  >
                    Save Settings
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Account Management */}
        <TabsContent value="account" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage third-party services connected to your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {connectedAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{account.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {account.connected ? `Last used ${account.lastUsed}` : "Not connected"}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={account.connected ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleConnectAccount(account.id)}
                      >
                        {account.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active sessions across different devices.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{session.device}</h3>
                            {session.current && (
                              <Badge variant="outline" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {session.location} • {session.lastActive}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm" onClick={() => handleLogoutSession(session.id)}>
                          Log out
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowLogoutDialog(true)}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out of all other devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>Permanently delete your account and all associated data.</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This action cannot be undone. All your data will be permanently removed.
                  </AlertDescription>
                </Alert>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Billing and Subscription */}
        <TabsContent value="billing" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Manage your subscription plan and billing cycle.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium capitalize">{subscription.plan} Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        {subscription.status === "active" ? "Active" : "Inactive"} • Renews on{" "}
                        {subscription.nextBilling}
                      </p>
                    </div>
                    <Badge variant={subscription.status === "active" ? "default" : "outline"} className="capitalize">
                      {subscription.status}
                    </Badge>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Amount</span>
                      <span className="font-medium">{subscription.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Billing Cycle</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Invoice</span>
                      <span className="font-medium">{subscription.nextBilling}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Available Plans</h3>
                  <RadioGroup
                    defaultValue={subscription.plan}
                    onValueChange={handleChangePlan}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div
                      className={`flex flex-col p-4 border rounded-lg ${subscription.plan === "basic" ? "border-primary" : "border-border"}`}
                    >
                      <RadioGroupItem value="basic" id="basic" className="sr-only" />
                      <Label htmlFor="basic" className="flex flex-col cursor-pointer">
                        <span className="font-medium">Basic</span>
                        <span className="text-2xl font-bold mt-2">$19.99</span>
                        <span className="text-sm text-muted-foreground">per month</span>
                        <Separator className="my-4" />
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> 5 Staff Members
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> Basic Reports
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> Email Support
                          </li>
                        </ul>
                      </Label>
                    </div>
                    <div
                      className={`flex flex-col p-4 border rounded-lg ${subscription.plan === "professional" ? "border-primary" : "border-border"}`}
                    >
                      <RadioGroupItem value="professional" id="professional" className="sr-only" />
                      <Label htmlFor="professional" className="flex flex-col cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Professional</span>
                          <Badge>Popular</Badge>
                        </div>
                        <span className="text-2xl font-bold mt-2">$49.99</span>
                        <span className="text-sm text-muted-foreground">per month</span>
                        <Separator className="my-4" />
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> 20 Staff Members
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> Advanced Reports
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> Priority Support
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> API Access
                          </li>
                        </ul>
                      </Label>
                    </div>
                    <div
                      className={`flex flex-col p-4 border rounded-lg ${subscription.plan === "enterprise" ? "border-primary" : "border-border"}`}
                    >
                      <RadioGroupItem value="enterprise" id="enterprise" className="sr-only" />
                      <Label htmlFor="enterprise" className="flex flex-col cursor-pointer">
                        <span className="font-medium">Enterprise</span>
                        <span className="text-2xl font-bold mt-2">$99.99</span>
                        <span className="text-sm text-muted-foreground">per month</span>
                        <Separator className="my-4" />
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> Unlimited Staff
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> Custom Reports
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> 24/7 Support
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> Dedicated Account Manager
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span> White Labeling
                          </li>
                        </ul>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Subscription updated",
                        description: `Your subscription has been updated to the ${subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} plan.`,
                      })
                    }}
                    className="flex items-center gap-2"
                  >
                    Update Subscription
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods and billing information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">
                              {method.type} •••• {method.last4}
                            </h3>
                            {method.default && (
                              <Badge variant="outline" className="text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.default && (
                          <Button variant="outline" size="sm" onClick={() => handleSetDefaultPayment(method.id)}>
                            Set as Default
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleRemovePayment(method.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices and payment history.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium">
                    <div>Invoice</div>
                    <div>Amount</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-5 p-4 items-center">
                    <div>INV-001</div>
                    <div>$49.99</div>
                    <div>Apr 15, 2023</div>
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                      >
                        Paid
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-5 p-4 items-center">
                    <div>INV-002</div>
                    <div>$49.99</div>
                    <div>Mar 15, 2023</div>
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                      >
                        Paid
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-5 p-4 items-center">
                    <div>INV-003</div>
                    <div>$49.99</div>
                    <div>Feb 15, 2023</div>
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                      >
                        Paid
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone and all your data will be
              permanently removed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This will permanently delete your account, all of your data, and cancel any active subscriptions.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label htmlFor="confirmDelete">Type "DELETE" to confirm</Label>
              <Input id="confirmDelete" placeholder="DELETE" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout All Sessions Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Out of All Devices</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of all other devices? This will terminate all active sessions except for
              your current one.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleLogoutAllSessions}>
              Log Out All Devices
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

