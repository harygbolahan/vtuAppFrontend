/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../contexts/authContexts"
import { TransactionContext } from "../contexts/txnContext"
import { Bell, Gift, Grid, MoreHorizontal, Phone, PlusCircle, Power, Send, ArrowRight, CircleUser, Tv, Keyboard, GraduationCap, MessageSquare, Repeat, X, Copy, Share2, EyeOff, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-toastify"
import { format } from 'date-fns'
import { Input } from "@/components/ui/input"


export default function Component() {
  const [showBalance, setShowBalance] = useState(true)
  const [showMoreDialog, setShowMoreDialog] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const { isAuthenticated, user, token, isTokenValid, logout, fetchUserData, updatePin } = useContext(AuthContext)
  const { transactions } = useContext(TransactionContext)
  const [showSetPinDialog, setShowSetPinDialog] = useState(false);


  const recentTransactions = transactions.slice(0,3)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && isTokenValid(token)) {
      fetchUserData();
    } else {
      toast.error("Session expired. Please login again.");
      navigate('/login');
    }

    if (!user.transaction_pin) {
      setShowSetPinDialog(true);
    }
  }, [isAuthenticated, token]); // Reduce dependencies to only necessary ones
  

  const services = [
    { icon: Grid, label: "Buy Data", path: "/buy-data" },
    { icon: Phone, label: "Airtime", path: "/airtime" },
    { icon: Tv, label: "Cable TV",  path: "/cable-tv" },
    { icon: Power, label: "Electricity", path: "/electricity" },
    { icon: Gift, label: "Referrals", path: "/referrals" },
    { icon: MoreHorizontal, label: "More", onClick: () => setShowMoreDialog(true) },
  ]

  const moreServices = [
    { icon: Grid, label: "Buy Data", subtitle: "Send Money to all", path: "/buy-data" },
    { icon: Phone, label: "Buy Airtime", subtitle: "Send Money to all", path: "/airtime" },
    { icon: Power, label: "Electricity", subtitle: "Send Money to all", path: "/electricity" },
    { icon: Tv, label: "Cable TV", subtitle: "Send Money to all", path: "/cable-tv" },
    { icon: Keyboard, label: "Recharge Pin", subtitle: "Send Money to all", path: "/recharge-pin" },
    { icon: GraduationCap, label: "Edu Pins", subtitle: "Send Money to all", path: "/edu-pins" },
    { icon: MessageSquare, label: "Bulk SMS", subtitle: "Send Money to all", path: "/bulk-sms" },
    { icon: Repeat, label: "Airtime Swap", subtitle: "Send Money to all", path: "/airtime-swap" },
  ]

  const handleNavigation = (item) => {
    switch (item) {
      case "Home":
        navigate("/dashboard") 
        break;
      case "Services":
        setShowMoreDialog(true)
        break;
      case "Transactions":
       navigate("/transactions")
        break;
      case "Profile":
         navigate("/profile")
        break;
      default:
        console.log("Unknown navigation item");
    }
  };

  const togglePinVisibility = (field) => {
    setShowPins(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const [showPins, setShowPins] = useState({
    oldPin: false,
    newPin: false,
    confirmPin: false,
    password: false
  });

  const [setPinFormData, setSetPinFormData] = useState({
    newPin: '',
    confirmPin: ''
  });

  const handleSetPinFormChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setSetPinFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSetPinSubmit = async (e) => {
    try {
      e.preventDefault();
    if (setPinFormData.newPin !== setPinFormData.confirmPin) {
      toast.error("PINs do not match");
      return;
    }

    const pin = setPinFormData.newPin
    const email = user.email

    const payload = {pin, email }
    

   const res = await updatePin(payload) 

   console.log('Dash res', res.message);
   
    if (res.message == 'Transaction pin is too common, Please try another one') {
      toast.error('Transaction pin is too common, Please try another one')
      throw new Error('Transaction pin is too common, Please try another one')

    } else {
      toast.success(`${res.message}`)
      setShowSetPinDialog(false);

    }
        console.log('Set PIN submitted', setPinFormData);
    } catch (error) {
      console.log('error', error);
      setShowSetPinDialog(false);
      throw new Error (`${error}`)
      
    } finally {
      setShowSetPinDialog(false);
    }
  };
  

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-600 to-[#660000]">
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <CircleUser width={'50px'} color="white" strokeWidth={2}/>
          <div>
            <p className="text-sm text-white/80">Welcome back!</p>
            <h1 className="font-semibold text-white">{user?.firstName + ' ' + user?.lastName || 'User'} </h1>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <Bell className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 space-y-4 p-4 pt-0 md:p-6 md:pt-0">
        <Card className="bg-black/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Wallet Balance</p>
                <p className="text-2xl font-bold">
                  { user ?"₦" + user?.walletBalance : "₦ ****" }
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white"
              >
                {showBalance ? "Hide" : "Show"}
              </Button>
            </div>
            <Separator className="my-4 bg-white/20" />
            <div className="grid grid-cols-2 gap-3">
              <Link to='/fund-wallet'>
                <Button className="w-full bg-white/20 hover:bg-white/30">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Fund Wallet
                </Button>
              </Link>
              <Link to='/transfer'>
                <Button variant="outline" className="w-full border-white/20 text-orange-600 hover:bg-white/20">
                  <Send className="mr-2 h-4 w-4" />
                  Transfer
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {services.map((service) => (
            service.path ? (
              <Link key={service.label} to={service.path}>
                <Card className="bg-white/10 text-white hover:bg-white/20">
                  <CardContent className="flex flex-col items-center justify-center p-3">
                    <service.icon className="mb-1 h-5 w-5" />
                    <span className="text-xs text-center">{service.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card 
                key={service.label} 
                className="bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                onClick={service.onClick}
              >
                <CardContent className="flex flex-col items-center justify-center p-3">
                  <service.icon className="mb-1 h-5 w-5" />
                  <span className="text-xs text-center">{service.label}</span>
                </CardContent>
              </Card>
            )
          ))}
        </div>

        <Card className="bg-black/80 text-white">
          <CardContent className="p-0">
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-white/20 bg-transparent">
                <TabsTrigger
                  value="transactions"
                  className="rounded-none data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="text-white rounded-none data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>
              <TabsContent value="transactions" className="p-4">
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction._id} className="flex items-center justify-between cursor-pointer" onClick={() => setSelectedTransaction(transaction)}>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-white/20 p-2">
                          <Grid className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">₦{`${transaction.amount} ${transaction.network} ${transaction.type}`}</p>
                          <p className="text-sm text-white/60">
                            {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </p>
                          <p>{transaction.status}</p>
                        </div>
                      </div>
                      <p className="font-medium">₦{transaction.amount.toFixed(2)}</p>
                    </div>
                  ))}
                  <Link to='/transactions'>
                    <Button variant="ghost" className="mt-3 w-full justify-between text-white hover:text-black">
                      View All Transactions
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Total Transactions</p>
                    <p className="text-lg font-semibold">127</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Data Usage</p>
                    <p className="text-lg font-semibold">45.2 GB</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Airtime Purchases</p>
                    <p className="text-lg font-semibold">₦15,000</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-white/20 bg-black/80 p-4">
  <div className="flex justify-around">
    {["Home", "Services", "Transactions", "Profile"].map((item) => (
      <Button
        key={item}
        variant="ghost"
        className="text-white"
        onClick={() => handleNavigation(item)} // Add onClick handler
      >
        {item}
      </Button>
    ))}
  </div>
</footer>

 {/* Set PIN Dialog */}
 <Dialog open={showSetPinDialog} onOpenChange={setShowSetPinDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Your Transaction PIN</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSetPinSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  type={showPins.newPin ? "text" : "password"}
                  name="newPin"
                  placeholder="Enter New PIN"
                  value={setPinFormData.newPin}
                  onChange={handleSetPinFormChange}
                  className="pr-10 w-full"
                  maxLength={4}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => togglePinVisibility('newPin')}
                >
                  {showPins.newPin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPins.confirmPin ? "text" : "password"}
                  name="confirmPin"
                  placeholder="Confirm New PIN"
                  value={setPinFormData.confirmPin}
                  onChange={handleSetPinFormChange}
                  className="pr-10 w-full"
                  maxLength={4}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => togglePinVisibility('confirmPin')}
                >
                  {showPins.confirmPin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <DialogFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-[#8B0000] hover:bg-orange-600 text-white"
                >
                  Set PIN
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>


      <Dialog open={showMoreDialog} onOpenChange={setShowMoreDialog}>
        <DialogContent className="max-w-sm max-h-[85vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle>More</DialogTitle>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 p-4">
            {moreServices.map((service) => (
              <Link key={service.label} to={service.path} className="block">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="rounded-full bg-orange-600 p-4">
                    <service.icon className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{service.label}</p>
                    <p className="text-sm text-gray-500">{service.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${selectedTransaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedTransaction.type === 'credit' ? '+' : '-'} ₦{selectedTransaction.amount.toFixed(2)}
                </div>
                <Badge variant={selectedTransaction.status === 'successful' ? 'success' : 'destructive'}>
                  {selectedTransaction.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{selectedTransaction.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span>{format(new Date(selectedTransaction.createdAt), 'PPp')}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Reference</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{selectedTransaction._id}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Type</span>
                  <span>{selectedTransaction.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Network</span>
                  <span>{selectedTransaction.network}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setShowReceipt(true)}>
                  View Receipt
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
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

              <div className="space-y-4">
                <div className="flex justify-between py-2 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Transaction type</span>
                  <span className="font-medium">{selectedTransaction.type}</span>
                </div>
                <div className="flex justify-between py-2 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">₦{selectedTransaction.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Date | Time</span>
                  <span className="font-medium">{format(new Date(selectedTransaction.createdAt), 'dd - MMM - yy | pp')}</span>
                </div>
                <div className="flex justify-between py-2 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium font-mono">{selectedTransaction._id}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between py-2 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-medium">{selectedTransaction.network}</span>
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