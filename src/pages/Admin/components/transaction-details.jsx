/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"



export function TransactionDetails({
  transaction,
  isOpen,
  onClose,
  onStatusUpdate,   
}) {
    const [newStatus, setNewStatus] = useState('')

  const handleStatusUpdate = () => {
    if (transaction) {
      onStatusUpdate(transaction.id, newStatus)
    }
  }

  if (!transaction) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4 border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">By User:</h3>
                <p className="mt-1">{transaction.user}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Transaction No:</h3>
                <p className="mt-1">{transaction.refId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Service:</h3>
                <p className="mt-1">{transaction.service}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone:</h3>
                <p className="mt-1">{transaction.phone}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Description:</h3>
                <p className="mt-1">{transaction.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Amount:</h3>
                <p className="mt-1">{transaction.amount}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status:</h3>
                <Badge
                  variant={transaction.status === "success" ? "success" : "destructive"}
                  className="mt-1"
                >
                  {transaction.status}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Old Balance:</h3>
                <p className="mt-1">{transaction.previousBalance}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">New Balance:</h3>
                <p className="mt-1">{transaction.afterBalance}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date:</h3>
                <p className="mt-1">{transaction.date}</p>
              </div>
              {transaction.apiResponse && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">API Response:</h3>
                  <p className="mt-1">{transaction.apiResponse}</p>
                </div>
              )}
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-4">Change Transaction Status:</h3>
            <div className="flex gap-4">
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusUpdate}>Update Status</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

