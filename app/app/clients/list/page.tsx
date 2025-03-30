"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { FileText, MoreHorizontal, Search, UserPlus, Users } from "lucide-react"
import { ClientDetailView } from "@/components/client-detail-view"

// Mock data for clients
const clientsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Client ${i + 1}`,
  email: `client${i + 1}@example.com`,
  phone: `+1 (555) ${String(100 + i).padStart(3, "0")}-${String(1000 + i).slice(1)}`,
  company: i % 3 === 0 ? "Acme Inc" : i % 3 === 1 ? "Globex Corp" : "Stark Industries",
  location: i % 4 === 0 ? "New York" : i % 4 === 1 ? "Los Angeles" : i % 4 === 2 ? "Chicago" : "Houston",
  status:
    i % 5 === 0 ? "Active" : i % 5 === 1 ? "Inactive" : i % 5 === 2 ? "Pending" : i % 5 === 3 ? "Completed" : "New",
  lastAppointment: i % 2 === 0 ? new Date(Date.now() - i * 86400000 * 2).toLocaleDateString() : "No appointments yet",
}))

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [viewMode, setViewMode] = useState("table")
  const [selectedClient, setSelectedClient] = useState(null)

  // Filter clients based on search and filters
  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesLocation = locationFilter === "all" || client.location === locationFilter

    return matchesSearch && matchesStatus && matchesLocation
  })

  const statuses = ["all", ...Array.from(new Set(clientsData.map((client) => client.status)))]
  const locations = ["all", ...Array.from(new Set(clientsData.map((client) => client.location)))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-2 sm:mt-0" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Fill in the client details below to add them to your client list.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" type="tel" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <Input id="company" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center bg-background border rounded-md">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none h-10"
                onClick={() => setViewMode("table")}
              >
                <FileText className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none h-10"
                onClick={() => setViewMode("cards")}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                  <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                  <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                  <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                </div>
              </Button>
            </div>
          </div>

          {viewMode === "table" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Company</TableHead>
                    <TableHead className="hidden lg:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Appointment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                      <TableCell className="hidden md:table-cell">{client.company}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            client.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : client.status === "Inactive"
                                ? "bg-gray-100 text-gray-800"
                                : client.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : client.status === "Completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {client.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{client.lastAppointment}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedClient(client)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Client</DropdownMenuItem>
                            <DropdownMenuItem>New Appointment</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete Client</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client) => (
                <Card key={client.id} className="relative overflow-hidden">
                  <CardContent className="p-4">
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedClient(client)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem>New Appointment</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold truncate">{client.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{client.company}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        <div className="flex items-center mb-1">
                          <span className="truncate">{client.email}</span>
                        </div>
                        <div className="flex items-center">
                          <span>{client.phone}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            client.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : client.status === "Inactive"
                                ? "bg-gray-100 text-gray-800"
                                : client.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : client.status === "Completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {client.status}
                        </span>
                        <Button size="sm" variant="outline" onClick={() => setSelectedClient(client)}>
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:block">
          {selectedClient ? (
            <ClientDetailView client={selectedClient} onClose={() => setSelectedClient(null)} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No Client Selected</h3>
                <p className="text-sm text-muted-foreground mt-2">Select a client to view their details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Mobile view for client details */}
      <Dialog
        open={selectedClient !== null && window.innerWidth < 768}
        onOpenChange={(open) => !open && setSelectedClient(null)}
      >
        <DialogContent className="max-w-md">
          {selectedClient && (
            <ClientDetailView client={selectedClient} onClose={() => setSelectedClient(null)} isMobile />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

