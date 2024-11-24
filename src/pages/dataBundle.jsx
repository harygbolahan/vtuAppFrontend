'use client'

import { AuthContext } from "../contexts/authContexts"
import { TransactionContext } from "../contexts/txnContext"
import { useState, useContext, useEffect, useMemo } from "react"
import { ArrowLeft, Copy, Check, Users, Home, Receipt, Share2 } from 'lucide-react'
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
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
import { format } from 'date-fns'

const orangeAccent = "bg-[#8B0000] text-white"

const networks = [
  { id: "1", name: "MTN", networkId: 1, logo: "src/assets/logos/mtnLogo.png" },
  { id: "4", name: "Airtel", networkId: 4, logo: "src/assets/logos/airtelLogo.png" },
  { id: "2", name: "Glo", networkId: 2, logo: "src/assets/logos/gloLogo.png" },
  { id: "3", name: "9mobile", networkId: 3, logo: "src/assets/logos/9mobileLogo.png" },
]

export default function Component() {
  const { isAuthenticated, isTokenValid, token, user } = useContext(AuthContext)
  const { plans, buyData } = useContext(TransactionContext)
  const [step, setStep] = useState(1)
  const [networkTypes, setNetworkTypes] = useState([])
  const [formData, setFormData] = useState({
    network: "",
    networkType: "",
    plan: "",
    phoneNumber: "",
    pin: "",
    amount: "",
  })

  console.log('user', user.transaction_pin);
  
  const [isLoading, setIsLoading] = useState(false)
  const [purchaseResult, setPurchaseResult] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.")
      navigate("/login")
    }
  }, [isAuthenticated, token, navigate, isTokenValid])

  useEffect(() => {
    if (!plans) {
      toast.error("Error fetching data plans. Please try again later.")
    }
  }, [plans])

  useEffect(() => {
    if (formData.network && plans?.allPlans) {
      const selectedNetwork = networks.find((n) => n.id === formData.network)

      if (selectedNetwork) {
        const availableTypes = plans.allPlans
          .filter((provider) =>
            provider.plans.some((plan) => plan.network === selectedNetwork.networkId)
          )
          .flatMap((provider) =>
            provider.plans
              .filter((plan) => plan.network === selectedNetwork.networkId && plan.type)
              .map((plan) => plan.type)
          )

        const uniqueTypes = [...new Set(availableTypes)]
        setNetworkTypes(uniqueTypes)
      }
    } else {
      setNetworkTypes([])
    }
  }, [formData.network, plans])

  const handleNetworkSelect = (value) => {
    setFormData((prev) => ({ ...prev, network: value, networkType: "", plan: "" }))
  }

  const handleNetworkTypeSelect = (value) => {
    setFormData((prev) => ({ ...prev, networkType: value, plan: "" }))
  }

  const handlePlanSelect = (value) => {
    setFormData((prev) => ({ ...prev, plan: value }))
  }

  const handlePhoneNumberChange = (e) => {
    setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
  }

  const handlePinInput = (digit) => {
    if (formData.pin.length < 4) {
      setFormData((prev) => ({ ...prev, pin: prev.pin + digit }))
    }
  }

  const handlePinClear = () => {
    setFormData((prev) => ({ ...prev, pin: "" }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleCompletePurchase = async () => {
    setIsLoading(true)
    try {
      const res = await buyData(formData)
      setIsLoading(false)
      setStep(4)
      setPurchaseResult(res)
      console.log('DataBundle', res)

      if (res.message === "Data purchase successful") {
        toast.success(`Data purchase successful`)
      } else {
        toast.error("Data purchase failed; refund issued")
      }
    } catch (error) {
      console.log('catch error', error)
      setPurchaseResult(error)
      setStep(4) // Move to step 4 even if there's an error
      toast.error("Data purchase failed. Please try again.")
    } finally {
      setIsLoading(false)
      setFormData((prev) => ({ ...prev, pin: "" }))
    }
  }

  const filteredPlans = useMemo(() => {
    if (formData.network && formData.networkType && plans?.allPlans) {
      const selectedNetwork = networks.find((n) => n.id === formData.network)

      return plans.allPlans
        .flatMap((provider) =>
          provider.plans.filter(
            (plan) =>
              plan.network === selectedNetwork.networkId &&
              plan.type === formData.networkType
          )
        )
    }
    return []
  }, [formData.network, formData.networkType, plans])

  const selectedPlan = filteredPlans?.find((plan) => plan.planId === formData.plan)

  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, amount: selectedPlan.improvedPrice }))
    }
  }, [selectedPlan])

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label>Select Network</Label>
        <div className="flex justify-between mt-2">
          {networks.map((network) => (
            <button
              key={network.id}
              className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-colors ${formData.network === network.id ? orangeAccent : "hover:bg-orange-100"
                }`}
              onClick={() => handleNetworkSelect(network.id)}
            >
              <img src={network.logo} alt={network.name} className="w-8 h-8 mb-1" />
              <span className="text-xs font-medium">{network.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Network Type</Label>
        <Select value={formData.networkType} onValueChange={handleNetworkTypeSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Choose network type" />
          </SelectTrigger>
          <SelectContent>
            {networkTypes.map((type) => (
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
        <Label>Select Data Plan</Label>
        {filteredPlans?.length > 0 ? (
          <Select value={formData.plan || ''} onValueChange={handlePlanSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a data plan" />
            </SelectTrigger>
            <SelectContent>
              {filteredPlans
                .filter((plan) => plan.planId && plan.planId !== '')
                .map((plan) => (
                  <SelectItem key={plan.planId} value={plan.planId}>
                    {plan.dataSize} {plan.type} - ₦{plan.improvedPrice} ({plan.validity})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-gray-500">Select network type.</p>
        )}
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
          <span className="font-medium">₦{selectedPlan?.improvedPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Network:</span>
          <span className="font-medium">
            {networks.find((n) => n.id === formData.network)?.name} ({formData.networkType})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Plan:</span>
          <span className="font-medium">
            {selectedPlan?.dataSize} ({selectedPlan?.validity})
          </span>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
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
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4 items-center">
        <div className="text-center space-y-4">
          <div className={`text-3xl font-bold ${purchaseResult?.message === "Data purchase successful" ? "text-green-700" : "text-red-700"}`}>
            {purchaseResult?.message === "Data purchase successful" ? "Success!" : "Purchase Failed"}
          </div>
          <p>
            {purchaseResult?.message || "An error occurred during the purchase."}
          </p>
          {purchaseResult && purchaseResult.transaction && (
            <div className="mt-4 text-left">
              <h3 className="font-semibold mb-2">Transaction Details:</h3>
              <p>Amount: ₦{purchaseResult.transaction.amount}</p>
              <p>Network: {purchaseResult.transaction.network}</p>
              <p>Phone Number: {purchaseResult.transaction.phoneNumber}</p>
              <p>Previous Balance: ₦{purchaseResult.transaction.previousBalance}</p>
              <p>New Balance: ₦{purchaseResult.transaction.newBalance}</p>
              <p>Cashback: ₦{purchaseResult.transaction.cashback}</p>
              <p>Discount: ₦{purchaseResult.transaction.discount}</p>
              <p className="mt-2 text-sm">{purchaseResult.transaction.response}</p>
            </div>
          )}
          <div className="flex justify-center space-x-4 mt-4">
            {purchaseResult?.message === "Data purchase successful" && (
              <Button className={`${orangeAccent}`} onClick={() => setShowReceipt(true)}>
                <Receipt className="w-4 h-4 mr-2" />
                View Receipt
              </Button>
            )}
            <Link to="/dashboard">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>

            {purchaseResult?.message !== "Data purchase successful" && (
              <Button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    amount: "",
                    phoneNumber: "",
                    network: "",
                    pin: "",
                  });
                }}
                className={`${orangeAccent}`}
              >
                <Receipt className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <Card className="max-w-md mx-auto">
        <Link to="/dashboard">
          <ArrowLeft className="w-6 h-6 mt-4 mx-5 bold" />
        </Link>
        <CardHeader>
          <div className="flex items-center gap-4">
            {step > 1 && step < 4 && (
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <CardTitle>
              {step === 1 && "Buy Data"}
              {step === 2 && "Confirm Purchase"}
              {step === 3 && "Enter PIN"}
              {step === 4 && (purchaseResult?.message === "Data purchase successful" ? "Purchase Complete" : "Purchase Failed")}
            </CardTitle>
          </div>
          <div className="flex gap-1 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= step ? "bg-[#8B0000]" : "bg-gray-200"
                  }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </CardContent>
        <CardFooter>
          {step < 4 && (
            <Button
              className={`w-full ${orangeAccent}`}
              onClick={step === 3 ? handleCompletePurchase : handleNext}
              disabled={
                (step === 1 && (!formData.network || !formData.plan || !formData.phoneNumber)) ||
                (step === 3 && formData.pin.length !== 4) ||
                isLoading
              }
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : step === 3 ? "Complete Purchase" : (
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
          {purchaseResult && purchaseResult.transaction && (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-center space-y-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    completed
                  </Badge>
                  <h3 className="text-xl font-semibold">Transaction Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Here is a Summary of your Data Purchase
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Transaction type</span>
                  <span className="font-medium text-sm">Data Purchase</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium text-sm">₦{purchaseResult.transaction.amount}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span className="font-medium text-sm">{purchaseResult.transaction.phoneNumber}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-medium text-sm">{purchaseResult.transaction.network}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Date | Time</span>
                  <span className="font-medium text-sm">{format(new Date(), 'dd - MMM - yy | HH:mm:ss')}</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium font-mono text-sm">{purchaseResult.transaction.id}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-sm">Successful</span>
                </div>
                <div className="flex justify-between py-1 bg-muted/50 px-4 rounded">
                  <span className="text-muted-foreground">Response</span>
                  <span className="font-medium text-sm text-right">{purchaseResult.transaction.response}</span>
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