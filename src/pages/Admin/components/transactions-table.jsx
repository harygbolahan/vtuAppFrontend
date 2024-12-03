"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TransactionDetails } from "./transaction-details"

const data = [
  {
    id: "1",
    refId: "142417329974",
    user: "youngkhabeerish4764@gmail.com",
    userType: "Subscriber",
    phone: "08162477474",
    service: "Data",
    description: "Purchase of MTN 2GB Corporate 30 Days Plan",
    apiResponse: "",
    amount: "N562",
    status: "failed",
    previousBalance: "N1005.04",
    afterBalance: "N1005.04",
    date: "30 Nov 2024",
  },
  {
    id: "2",
    refId: "895117329974",
    user: "adesugba.emma09@gmail.com",
    userType: "Subscriber",
    phone: "08169800050",
    service: "Data",
    description: "Purchase of MTN 2GB SME 30 Days Plan",
    apiResponse: "Dear Customer, You have successfully shared 2GB Data to 2348169800050. Yo",
    amount: "N558",
    status: "success",
    previousBalance: "N1650",
    afterBalance: "N1092",
    date: "30 Nov 2024",
  },
  {
    id: "3",
    refId: "743517329973",
    user: "adesokanomolade928@gmail.com",
    userType: "Subscriber",
    phone: "09029817710",
    service: "Data",
    description: "Purchase of MTN 1GB SME 30 Days Plan",
    apiResponse: "Dear Customer, You have successfully shared 1GB Data to 2349160598114. Th",
    amount: "N279",
    status: "success",
    previousBalance: "N186.19995117187",
    afterBalance: "N887.19995117187",
    date: "30 Nov 2024",
  },
]

export function TransactionsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [transactions, setTransactions] = useState(data)

  const filteredData = transactions.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailsOpen(true)
  }

  const handleStatusUpdate = (id, newStatus) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? { ...transaction, status: newStatus }
          : transaction
      )
    )
    setIsDetailsOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm font-medium">entries</span>
        </div>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Ref ID</TableHead>
              <TableHead className="font-semibold">User</TableHead>
              <TableHead className="font-semibold">User Type</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Service</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row) => (
              <TableRow 
                key={row.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(row)}
              >
                <TableCell className="font-medium">{row.refId}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.userType}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={row.status === "success" ? "success" : "destructive"}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      <TransactionDetails
        transaction={selectedTransaction}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}

