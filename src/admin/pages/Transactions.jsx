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
} from "@/components/ui/dialog"
import {  MoreVertical, CheckCircle, XCircle } from 'lucide-react'
import Sidebar  from "../components/sidebar"

export default function TransactionsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const transactions = [
    { id: 1, user: "John Doe", type: "Data", amount: "₦1,000", status: "Successful", date: "2024-01-15 10:30 AM" },
    { id: 2, user: "Jane Smith", type: "Airtime", amount: "₦500", status: "Pending", date: "2024-01-15 11:45 AM" },
    { id: 3, user: "Bob Johnson", type: "Cable TV", amount: "₦6,000", status: "Failed", date: "2024-01-15 12:15 PM" },
    { id: 4, user: "Alice Brown", type: "Electricity", amount: "₦5,000", status: "Successful", date: "2024-01-15 13:30 PM" },
    { id: 5, user: "Charlie Davis", type: "Exam Pin", amount: "₦2,000", status: "Pending", date: "2024-01-15 14:45 PM" },
  ]

  const handleTransactionAction = (action, transaction) => {
    console.log(`Performing ${action} on transaction:`, transaction)
    // Implement the actual action logic here
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Transactions Management</h1>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="successful">Successful</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'Successful' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setSelectedTransaction(transaction)}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                            <DialogDescription>
                              Detailed information about the transaction
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">User:</span>
                                <span className="col-span-3">{selectedTransaction.user}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Type:</span>
                                <span className="col-span-3">{selectedTransaction.type}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Amount:</span>
                                <span className="col-span-3">{selectedTransaction.amount}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Status:</span>
                                <span className="col-span-3">{selectedTransaction.status}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <span className="font-medium">Date:</span>
                                <span className="col-span-3">{selectedTransaction.date}</span>
                              </div>
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button onClick={() => handleTransactionAction('markSuccessful', selectedTransaction)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Successful
                                </Button>
                                <Button variant="destructive" onClick={() => handleTransactionAction('markFailed', selectedTransaction)}>
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Mark as Failed
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
        </div>
      </div>
    </div>
  )
}