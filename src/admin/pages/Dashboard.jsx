"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users, UserX, UserCheck, Wallet, BarChart2, HardDrive, ChevronUp, Info } from 'lucide-react'
import Sidebar from "../components/sidebar"


export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const recentTransactions = [
    {
      id: 1,
      image: "/placeholder.svg",
      email: "user@example.com",
      recipient: "08145382984",
      hash: "2024111423225767367cd23b0b1",
      description: "MTN SME 500.0MB - 30 days",
      status: "Completed"
    },
    // Add more transactions as needed
  ]

  return (
    <div className="flex h-screen">
      <Sidebar />

<div className="flex flex-col min-h-screen">
  <header className="border-b">
    <div className="flex h-16 items-center px-4">
      <div className="ml-auto flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="/placeholder.svg"
            alt="Avatar"
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">Oyekanmi Mubarak Gbolahan</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main className="flex-1 space-y-4 p-8 pt-6">
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ALL USER/AGENT</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,095</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <ChevronUp className="h-4 w-4" />
            View all users
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">UNVERIFY USER/AGENT</CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,122</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <ChevronUp className="h-4 w-4" />
            View unverified users
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SUSPENDED USER/AGENT</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <ChevronUp className="h-4 w-4" />
            View suspended users
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ALL AGENTS</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <ChevronUp className="h-4 w-4" />
            View all agents
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ALL USERS</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,094</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <ChevronUp className="h-4 w-4" />
            View users
          </Button>
        </CardContent>
      </Card>
    </div>

    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TOTAL AVAILABLE BALANCE</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦194,283.23</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <Info className="h-4 w-4" />
            View details
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TOTAL AVAILABLE COMMISSION</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦0.00</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <Info className="h-4 w-4" />
            View details
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">COMPLETED TRANSACTIONS</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">155,009</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <Info className="h-4 w-4" />
            View transactions
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">INITIALIZED TRANSACTIONS</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">155,009</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <Info className="h-4 w-4" />
            View details
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">FAILED TRANSACTIONS</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">566</div>
          <Button variant="link" className="px-0 text-xs text-muted-foreground">
            <Info className="h-4 w-4" />
            View failed
          </Button>
        </CardContent>
      </Card>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TOTAL APPROVED KYC</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">538</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TOTAL NOVEMBER REVENUE</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦1,088,698.45</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TOTAL TODAY REVENUE</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦78,425.08</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">TOTAL NOVEMBER STORAGE SIZE</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">262GB</div>
        </CardContent>
      </Card>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SN</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Transaction Hash</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction, index) => (
              <TableRow key={transaction.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={transaction.image}
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                </TableCell>
                <TableCell>{transaction.email}</TableCell>
                <TableCell>{transaction.recipient}</TableCell>
                <TableCell className="font-mono">{transaction.hash}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  </main>
</div>
    </div>
  )
}