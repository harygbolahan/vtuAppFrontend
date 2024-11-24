"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
import { Plus,  Edit, Trash2 } from 'lucide-react'
import  Sidebar from "../components/sidebar"

export default function ServicesManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
//   const [selectedService, setSelectedService] = useState(null)

  const services = [
    { id: 1, name: "MTN Data", type: "Data", price: "₦1,000", status: "Active" },
    { id: 2, name: "Airtel Airtime", type: "Airtime", price: "₦500", status: "Active" },
    { id: 3, name: "DSTV Subscription", type: "Cable TV", price: "₦6,000", status: "Active" },
    { id: 4, name: "WAEC Result Checker", type: "Exam Pin", price: "₦2,000", status: "Active" },
    { id: 5, name: "IKEDC Electricity", type: "Electricity", price: "₦5,000", status: "Active" },
  ]

  const handleServiceAction = (action, service) => {
    console.log(`Performing ${action} on service:`, service)
    // Implement the actual action logic here
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Services Management</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="airtime">Airtime</SelectItem>
                  <SelectItem value="cable">Cable TV</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="exam">Exam Pin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{service.type}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {service.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleServiceAction('edit', service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleServiceAction('delete', service)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}