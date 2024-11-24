'use client'

import { AuthContext } from "../contexts/authContexts"
import { TransactionContext } from "../contexts/txnContext"
import { useState, useEffect, useContext } from "react"
import { ArrowLeft, Check, Copy, Users, Home, Receipt, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { format } from 'date-fns'

const orangeAccent = "bg-[#8B0000] text-white"

const networks = [
  { id: "MTN", name: "MTN", networkId: 1, logo: "src/assets/logos/mtnLogo.png" },
  { id: "AIRTEL", name: "Airtel", networkId: 4, logo: "src/assets/logos/airtelLogo.png" },
  { id: "GLO", name: "Glo", networkId: 2, logo: "src/assets/logos/gloLogo.png" },
  { id: "9MOBILE", name: "9mobile", networkId: 3, logo: "src/assets/logos/9mobileLogo.png" },
];

const airtimeTypes = ["VTU", "Share & Sell", "Prepaid"]

export default function AirtimePurchaseFlow() {
  const { buyAirtime } = useContext(TransactionContext)

  const navigate = useNavigate()
  const { isAuthenticated, isTokenValid, token } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.")
      navigate("/login")
    }
  }, [isAuthenticated, token, navigate, isTokenValid])

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    network: "",
    type: "",
    phoneNumber: "",
    amount: "",
    pin: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)

  const handleNetworkSelect = (value) => {
    setFormData(prev => ({ ...prev, network: value }))
  }

  const handleAirtimeTypeSelect = (value) => {
    setFormData(prev => ({ ...prev, type: value }))
  }

  const handlePhoneNumberChange = (e) => {
    setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))
  }

  const handleAmountChange = (e) => {
    setFormData(prev => ({ ...prev, amount: e.target.value }))
  }

  const handlePinInput = (digit) => {
    if (formData.pin.length < 4) {
      setFormData(prev => ({ ...prev, pin: prev.pin + digit }))
    }
  }

  const handlePinClear = () => {
    setFormData(prev => ({ ...prev, pin: "" }))
  }

  const handleNext = async () => {
    if (step < 3) {
      setStep(prev => prev + 1)
    } else  {
      setIsLoading(true)
      setFormData(prev => ({ ...prev, pin: "" }))
      console.log('Airtime Purchase', formData);

      try {
        const res = await buyAirtime(formData)
        if (res.message === 'Airtime purchase successful') {
          toast.success('Airtime purchase successful')
          setIsSuccess(true)
          setIsLoading(false)
          setTransactionDetails(res.data)
          console.log(res.data);
        } else{
          toast.error(res.message)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      } finally{
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label>Select Network</Label>
        <div className="flex justify-between mt-2">
          {networks.map((network) => (
            <button
              key={network.id}
              className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-colors ${
                formData.network === network.id
                  ? orangeAccent
                  : "hover:bg-orange-100"
              }`}
              onClick={() => handleNetworkSelect(network.id)}
            >
              <img
                src={network.logo}
                alt={network.name}
                className="w-8 h-8 mb-1"
              />
              <span className="text-xs font-medium">{network.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Airtime Type</Label>
        <Select value={formData.airtimeType} onValueChange={handleAirtimeTypeSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Choose airtime type" />
          </SelectTrigger>
          <SelectContent>
            {airtimeTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-2">
          <Input
            id="phone"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <Button variant="outline" size="icon">
            <Users className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={handleAmountChange}
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="p-6 border rounded-lg space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">To:</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{formData.phoneNumber}</span>
            <Button variant="ghost" size="icon">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-medium">₦{formData.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Network:</span>
          <span className="font-medium">
            {networks.find(n => n.id === formData.network)?.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Type:</span>
          <span className="font-medium">{formData.airtimeType}</span>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      {isSuccess ? (
        <div className="text-center space-y-4">
          <div className="text-3xl font-bold text-green-600">Success!</div>
          <p>Your airtime purchase was successful.</p>
          <div className="flex justify-center space-x-4">
            <Button className={`${orangeAccent}`} onClick={() => setShowReceipt(true)}>
              <Receipt className="w-4 h-4 mr-2" />
              View Receipt
            </Button>
            <Link to='/dashboard'>
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label>Enter Transaction PIN</Label>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="w-12 h-12 border-2 rounded-md flex items-center justify-center text-2xl font-bold"
              >
                {formData.pin[index] ? "•" : ""}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <Button
                key={digit}
                variant="outline"
                className="h-12 text-xl font-semibold"
                onClick={() => handlePinInput(digit.toString())}
              >
                {digit}
              </Button>
            ))}
            <Button
              variant="outline"
              className="h-12 text-xl font-semibold col-span-2"
              onClick={handlePinClear}
            >
              Clear
            </Button>
            <Button
              variant="outline"
              className="h-12 text-xl font-semibold"
              onClick={() => handlePinInput("0")}
            >
              0
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <Card className="max-w-md mx-auto">
      <Link to='/dashboard'>
        <ArrowLeft className="w-6 h-6 mt-4 mx-5 bold" />
        </Link>
        <CardHeader>
          <div className="flex items-center gap-4">
            {step > 1 && !isSuccess && (
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <CardTitle>
              {step === 1 && "Buy Airtime"}
              {step === 2 && "Confirm Purchase"}
              {step === 3 && (isSuccess ? "Purchase Complete" : "Enter PIN")}
            </CardTitle>
          </div>
          <div className="flex gap-1 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i <= step ? "bg-[#8B0000]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </CardContent>
        <CardFooter>
          {!isSuccess && (
            <Button
              className={`w-full ${orangeAccent}`}
              onClick={handleNext}
              disabled={
                (step === 1 && (!formData.network || !formData.phoneNumber || !formData.amount)) ||
                (step === 3 && formData.pin.length !== 4) ||
                isLoading
              }
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : step === 3 ? (
                "Complete Purchase"
              ) : (
                <>
                  Continue
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-sm max-h-screen">
          <DialogHeader>
            <DialogTitle>Transaction Receipt</DialogTitle>
          </DialogHeader>
          {transactionDetails && (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-center space-y-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    completed
                  </Badge>
                  <h3 className="text-xl font-semibold">Transaction Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Here is a Summary of your Airtime Purchase
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Transaction type</span>
                  <span className="font-medium text-sm">Airtime Purchase</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium text-sm">₦{transactionDetails.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span className="font-medium text-sm">{transactionDetails.phoneNumber}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-medium text-sm">{transactionDetails.network}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground ">Date | Time</span>
                  <span className="font-medium text-sm">{format(new Date(transactionDetails.completedAt), 'dd - MMM - yy | HH:mm:ss')}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium font-mono text-sm">{transactionDetails.transactionId}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-sm">{transactionDetails.status}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Save Receipt
                </Button>
                <Button className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
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