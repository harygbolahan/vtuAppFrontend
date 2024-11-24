'use client'

import { useState, useMemo, useContext, useEffect } from 'react'
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Search, Share2, Copy, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { AuthContext } from "../contexts/authContexts"
import { useNavigate } from 'react-router-dom'
import { TransactionContext } from "../contexts/txnContext"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'react-toastify'

const Component = () => {
  const navigate = useNavigate()
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState(null)
  const [typeFilters, setTypeFilters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { isAuthenticated, user, token, isTokenValid, logout } = useContext(AuthContext)
  const { transactions } = useContext(TransactionContext)


  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.")
      navigate('/login')
    } else {
      // refreshUser()
    }
  }, [isAuthenticated, token, navigate, isTokenValid,])

  const uniqueTypes = useMemo(() => [...new Set(transactions.map(t => t.type))], [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction =>
      (searchQuery === '' || 
       transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
       transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       transaction.network?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       transaction.amount.toString().includes(searchQuery) ||
       transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === null || transaction.status === statusFilter) &&
      (typeFilters.length === 0 || typeFilters.includes(transaction.type))
    );
  }, [transactions, searchQuery, statusFilter, typeFilters]);

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTypeFilterChange = (type) => {
    setTypeFilters(current =>
      current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type]
    );
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilters]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center h-14 px-4 border-b gap-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <ArrowLeft className="h-5 w-5" />
          Transactions History
        </Link>
      </header>

      <main className="flex-1 pt-4 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select onValueChange={(value) => setStatusFilter(value === 'all' ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="success">Successful</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="initialised">Initialized</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Transaction Types</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {uniqueTypes.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={typeFilters.includes(type)}
                    onCheckedChange={() => handleTypeFilterChange(type)}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-4">
            {paginatedTransactions.map((transaction) => (
              <Card
                key={transaction._id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
                    {transaction.isCredit ? (
                      <ArrowDownRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="font-medium truncate">{transaction.network + '   ' + transaction.amount}</div>
                      <div className={`font-medium ${transaction.isCredit ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.isCredit ? '+' : '-'} ₦{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground truncate mt-1">
                      {transaction.response}
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <div className="text-sm text-muted-foreground truncate">
                        {format(new Date(transaction.updatedAt), 'MMM d, yyyy')}
                      </div>
                      <Badge variant={transaction.status === 'success' ? 'success' : 'destructive'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span>
              Page {currentPage} of {pageCount}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className=" max-w-sm max-h-screen">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className={`text-xl font-bold ${selectedTransaction.isCredit ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedTransaction.isCredit ? '+' : '-'} ₦{selectedTransaction.amount.toFixed(2)}
                </div>
                <Badge variant={selectedTransaction.status === 'success' ? 'outline' : 'destructive'} className="bg-green-500/10 text-green-500 border-green-500/20">
                  {selectedTransaction.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{selectedTransaction.response}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground text-sm">Date & Time</span>
                  <span className='text-sm'>{format(new Date(selectedTransaction.updatedAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground text-sm">Reference</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{selectedTransaction.transactionId}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground text-sm">Type</span>
                  <span className='text-sm'>{selectedTransaction.type || selectedTransaction.transactionId}</span>
                </div>
                {selectedTransaction.previousBalance !== undefined && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground text-sm">Before transaction</span>
                    <span className='text-sm font-semibold'>₦{selectedTransaction.previousBalance.toFixed(2)}</span>
                  </div>
                )}
                {selectedTransaction.newBalance !== undefined && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground text-sm">After transaction</span>
                    <span className='text-sm font-semibold'>₦{selectedTransaction.newBalance.toFixed(2)}</span>
                  </div>
                )}
                {selectedTransaction.fee !== undefined && (
                  <div className="flex justify-between py-2 border-b ">
                    <span className="text-muted-foreground text-sm">Fee</span>
                    <span>₦{selectedTransaction.fee.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setShowReceipt(true)}>
                  View Receipt
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {selectedTransaction.status === 'successful' && (
                <div className="text-center">
                  <Button variant="link" className="text-red-500">
                    Having issues with this transaction? Rectify
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-sm max-h-screen">
          <DialogHeader>
            <DialogTitle>Transaction Receipt</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-center space-y-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    completed
                  </Badge>
                  <h3 className="text-xl font-semibold">Transaction Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Here is a Summary of the selected Transaction and it can be shared if desired.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Transaction type</span>
                  <span className="font-medium text-sm">{selectedTransaction.type}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium text-sm">₦{selectedTransaction.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground ">Date | Time</span>
                  <span className="font-medium text-sm">{format(new Date(selectedTransaction.updatedAt), 'dd - MMM - yy')}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium font-mono text-sm">{selectedTransaction.transactionId}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Remark</span>
                  <span className="text-right text-sm">{selectedTransaction.response ? selectedTransaction.response : 'No remark'}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Save Receipt
                </Button>
                <Button className="flex-1">
                  Share Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Component