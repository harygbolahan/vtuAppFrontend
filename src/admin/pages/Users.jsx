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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Ban, MoreVertical,  UserPlus, Wallet } from 'lucide-react'
import  Sidebar  from "../components/sidebar"

const generateUsers = (count) => {
  const roles = ["User", "Agent", "Admin"]
  const statuses = ["Active", "Suspended", "Blocked"]
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    balance: `₦${Math.floor(Math.random() * 10000)}`,
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    joined: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
  }))
}

export default function UsersManagement() {
  const [users, setUsers] = useState(generateUsers(15))
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [fundAmount, setFundAmount] = useState("")
  const [showFundDialog, setShowFundDialog] = useState(false)
  const usersPerPage = 10

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (roleFilter === "all" || user.role === roleFilter) &&
    (statusFilter === "all" || user.status === statusFilter)
  )

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handleUserAction = (action, user) => {
    let updatedUser = { ...user }
    switch (action) {
      case 'fund':
        updatedUser.balance = `₦${parseInt(user.balance.slice(1)) + parseInt(fundAmount)}`
        setShowFundDialog(false)
        setFundAmount("")
        break
      case 'suspend':
        updatedUser.status = 'Suspended'
        break
      case 'block':
        updatedUser.status = 'Blocked'
        break
      default:
        return
    }
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u)
    setUsers(updatedUsers)
    setSelectedUser(null)
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Users Management</h1>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' :
                        user.status === 'Suspended' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.balance}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setSelectedUser(user)}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription>
                              Detailed information about the user
                            </DialogDescription>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Name:</span>
                                <span className="col-span-3">{selectedUser.name}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Email:</span>
                                <span className="col-span-3">{selectedUser.email}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Role:</span>
                                <span className="col-span-3">{selectedUser.role}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Status:</span>
                                <span className="col-span-3">{selectedUser.status}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Balance:</span>
                                <span className="col-span-3">{selectedUser.balance}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Joined:</span>
                                <span className="col-span-3">{selectedUser.joined}</span>
                              </div>
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button onClick={() => setShowFundDialog(true)}>
                                  <Wallet className="mr-2 h-4 w-4" />
                                  Fund Wallet
                                </Button>
                                <Button onClick={() => handleUserAction('suspend', selectedUser)}>
                                  <Ban className="mr-2 h-4 w-4" />
                                  Suspend User
                                </Button>
                                <Button variant="destructive" onClick={() => handleUserAction('block', selectedUser)}>
                                  <Ban className="mr-2 h-4 w-4" />
                                  Block User
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Wallet Dialog */}
      <Dialog open={showFundDialog} onOpenChange={setShowFundDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fund Wallet</DialogTitle>
            <DialogDescription>
              Enter the amount to fund the user's wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleUserAction('fund', selectedUser)}>
              Fund Wallet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}