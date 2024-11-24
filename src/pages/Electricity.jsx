import { AuthContext } from "../contexts/authContexts"
import { TransactionContext } from "../contexts/txnContext"
import { useState, useEffect, useContext } from 'react'
import { ArrowLeft, Contact2, Copy, Loader2, Check, X, Receipt, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

// type ValidationResult = {
//   is_valid: boolean
//   customer_name: string
//   customer_address: string
//   customer_district: string
//   customer_phone: string
//   type: 'PREPAID' | 'POSTPAID'
//   disco: string
//   minimum_payable: number
//   outstanding_amount: number | null
// }

// type Disco = {
//   discoName: string
//   discoId: string
//   discoCode: string
//   minAmount: number
//   maxAmount: number
//   convenienceFee: number
//   logo: string
// }

const discos = [
  {
    discoName: "Ibadan [IBEDC]",
    discoId: "607U7960tJ",
    discoCode: "07",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/ibedc.jpg'
  },
  {
    discoName: "Ikeja [IKEDC]",
    discoId: "pPHrxsSyzO",
    discoCode: "02",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/ikedc.jpg'
  },
  {
    discoName: "Kano [KEDCO]",
    discoId: "qCC5Z2NIQA",
    discoCode: "04",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/kedco.png'
  },
  {
    discoName: "Port Harcourt [PHED]",
    discoId: "dyeEhq8w7w",
    discoCode: "05",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/phed.jpg'
  },
  {
    discoName: "Jos [JED]",
    discoId: "U67nPeQSQe",
    discoCode: "06",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/jed.jpg'
  },
  {
    discoName: "Enugu [EEDC]",
    discoId: "xqhoyDHPxl",
    discoCode: "08",
    minAmount: 1000,
    maxAmount: 90000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/enugu.png'
  },
  {
    discoName: "Abuja [AEDC]",
    discoId: "6NJPcB83XM",
    discoCode: "03",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/abuja.png'
  },
  {
    discoName: "Eko [EKEDC]",
    discoId: "uQJ8NKpJBA",
    discoCode: "01",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/eko.jpg'
  },
  {
    discoName: "Benin [BEDC]",
    discoId: "RP3DZNFrQZ",
    discoCode: "09",
    minAmount: 1000,
    maxAmount: 100000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/benin.jpg'
  },
  {
    discoName: "Yola [YEDC]",
    discoId: "5yD8ObMadq",
    discoCode: "10",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/yedc.jpg'
  },
  {
    discoName: "Kaduna [KAEDC]",
    discoId: "nPJ6pv4ZAC",
    discoCode: "11",
    minAmount: 1000,
    maxAmount: 80000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/kaedcp.png'
  },
  {
    discoName: "Aba [APLE]",
    discoId: "zuUCt4l3Hw",
    discoCode: "12",
    minAmount: 1000,
    maxAmount: 100000,
    convenienceFee: 0,
    logo: 'src/assets/electriLogo/aba.jpg'
  }
]

export default function ElectricitySubscription() {
  const { isAuthenticated, isTokenValid, token } = useContext(AuthContext)
  const { verifyMeterNumber, buyElectricToken } = useContext(TransactionContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [selectedDisco, setSelectedDisco] = useState(null)
  const [meterNumber, setMeterNumber] = useState('')
  const [validationResult, setValidationResult] = useState(null)
  const [amount, setAmount] = useState('')
  const [pin, setPin] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [meterToken, setMeterToken] = useState('')

  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.")
      navigate("/login")
    }
  }, [isAuthenticated, token, navigate, isTokenValid])

  const verifyMeter = async () => {
    try {
      setIsVerifying(true)
   const productId = selectedDisco.discoId
    console.log('Metr', meterNumber, productId );
 
    const meterResponse = await verifyMeterNumber(meterNumber, selectedDisco.discoId )

    console.log('meterResponse', meterResponse.data.data);
    
    setIsVerifying(false)
   
    setValidationResult(meterResponse.data.data)
    console.log('Validation', validationResult);

    setStep(2)
    } catch (error) {
      console.log(error);
      setIsVerifying(false)
      
    } finally{
      setIsVerifying(false)
    }
  }

  const processPayment = async () => {
    try {
      setIsProcessing(true)
    const productId = selectedDisco.discoId
    
    const type = 'prepaid'
    console.log('Meteer', meterNumber, productId, amount, type );
 
    const tokenResponse = await buyElectricToken(meterNumber, productId, amount, type )

    console.log(tokenResponse);
        // if tokenRespose = 'Transaction refunded'

      if (tokenResponse.status === '200') {
        setIsProcessing(false)
        setIsSuccess(true)
        setMeterToken(tokenResponse.token)
        setStep(5)
      } else {
        throw new Error(tokenResponse)
      }
      
    } catch (error) {
      console.log(error);

      setIsProcessing(false)
      setIsSuccess(false)
      toast.error(`${error}`)
      setStep(5)
      
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <div className="p-4 space-y-6">
        <Link to='/dashboard'>
          <ArrowLeft className="h-6 w-6" />
        </Link>
        {/* Header with Progress Indicator */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">
              {step === 3 ? 'Confirm Purchase' :
                step === 4 ? 'Enter PIN' :
                  'Pay Electricity Bill'}
            </h1>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full",
                  i < step ? "bg-red-800" : "bg-gray-200"
                )}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Select Disco</Label>
              <div className="grid grid-cols-4 gap-4">
                {discos.map((disco) => (
                  <Button
                    key={disco.discoId}
                    variant="outline"
                    className={cn(
                      "h-24 w-30 flex flex-col items-center justify-center gap-2",
                      selectedDisco?.discoId === disco.discoId && "border-2 border-red-800"
                    )}
                    onClick={() => setSelectedDisco(disco)}
                  >
                    <img src={disco.logo} alt={disco.discoName} className="w-12 h-12" />
                    <span className="text-sm text-center text-wrap">{disco.discoName}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meterNumber">Meter Number</Label>
              <div className="relative">
                <Input
                  id="meterNumber"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value.slice(0, 11))}
                  maxLength={11}
                  className="pr-10"
                  placeholder="Enter meter number"
                />
                <Contact2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && validationResult && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <div className="font-medium">{validationResult.customer_name}</div>
            </div>

            <div className="space-y-2">
              <Label>Customer Address</Label>
              <div className="font-medium">{validationResult.customer_address}</div>
            </div>

            <div className="space-y-2">
              <Label>Meter Type</Label>
              <div className="font-medium">{validationResult.type}</div>
            </div>

            {validationResult.outstanding_amount !== null && (
              <div className="space-y-2">
                <Label>Outstanding Amount</Label>
                <div className="font-medium text-red-600">₦{validationResult.outstanding_amount.toLocaleString()}</div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setAmount(e.target.value); // Allow input update
                  }
                }}
                min={selectedDisco?.minAmount}
                max={selectedDisco?.maxAmount}
                placeholder={`Enter amount (₦${selectedDisco?.minAmount.toLocaleString()} - ₦${selectedDisco?.maxAmount.toLocaleString()})`}
              />
              {amount && selectedDisco && (parseInt(amount) < selectedDisco.minAmount || parseInt(amount) > selectedDisco.maxAmount) && (
                <p className="text-red-500">
                  Amount must be between ₦{selectedDisco.minAmount.toLocaleString()} and ₦{selectedDisco.maxAmount.toLocaleString()}.
                </p>
              )}
            </div>

          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Meter Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{meterNumber}</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₦{parseInt(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Disco:</span>
                <span className="font-medium">{selectedDisco?.discoName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Meter Type:</span>
                <span className="font-medium">{validationResult?.type}</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <Label>Enter Transaction PIN</Label>
              <div className="flex justify-between gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-14 h-14 border-2 rounded-lg flex items-center justify-center text-2xl font-bold",
                      pin[i] ? "border-red-800" : "border-gray-200"
                    )}
                  >
                    {pin[i] ? '•' : ''}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <Button
                  key={num}
                  variant="outline"
                  className="h-14 text-xl font-semibold hover:bg-red-50"
                  onClick={() => {
                    if (pin.length < 4) setPin(prev => prev + num)
                  }}
                >
                  {num}
                </Button>
              ))}
              <Button
                variant="outline"
                className="h-14 text-xl font-semibold hover:bg-red-50"
                onClick={() => setPin('')}
              >
                Clear
              </Button>
              <Button
                variant="outline"
                className="h-14 text-xl font-semibold hover:bg-red-50"
                onClick={() => {
                  if (pin.length < 4) setPin(prev => prev + '0')
                }}
              >
                0
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center space-y-4 py-8">
            {isSuccess ? (
              <>
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold">Payment Successful</h2>
                <p className="text-gray-600">Your electricity bill has been paid successfully.</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4">
                      <Receipt className="mr-2 h-4 w-4" />
                      View Receipt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">Payment Receipt</DialogTitle>
                    </DialogHeader>
                    <Card>
                      <CardContent className="space-y-4 pt-4">
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold">{selectedDisco?.discoName}</h3>
                          <p className="text-sm text-gray-500">Electricity Bill Payment</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="font-medium">Meter Number:</div>
                          <div className="text-right">{meterNumber}</div>
                          <div className="font-medium">Customer Name:</div>
                          <div className="text-right">{validationResult?.customer_name}</div>
                          <div className="font-medium">Amount Paid:</div>
                          <div className="text-right">₦{parseInt(amount).toLocaleString()}</div>
                          <div className="font-medium">Meter Type:</div>
                          <div className="text-right">{validationResult?.type}</div>
                          <div className="font-medium">Meter Token:</div>
                          <div className="text-right font-bold">{meterToken}</div>
                          <div className="font-medium">Transaction Date:</div>
                          <div className="text-right">{new Date().toLocaleString()}</div>
                          <div className="font-medium">Transaction ID:</div>
                          <div className="text-right">{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                        </div>
                      </CardContent>
                    </Card>
                    <DialogFooter className="sm:justify-start mt-4">
                      <Button onClick={() => alert('Receipt saved!')} className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Save Receipt
                      </Button>
                      <Button onClick={() => alert('Receipt shared!')} variant="outline" className="w-full sm:w-auto">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Receipt
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <>
                <div className="inline-flex h-16 w-16 
items-center justify-center rounded-full bg-red-100 text-red-500">
                  <X className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold">Payment Failed</h2>
                <p className="text-gray-600">Sorry, there was an error processing your payment.</p>
              </>
            )}
          </div>
        )}

        {/* Footer Button */}
        {step < 5 && (
          <Button
            className="w-full bg-red-800 hover:bg-red-900 h-12 mt-6"
            onClick={() => {
              if (step === 1) verifyMeter()
              else if (step === 4) processPayment()
              else setStep(step + 1)
            }}
            disabled={
              (step === 1 && (!selectedDisco || !meterNumber || isVerifying)) ||
              (step === 2 && !amount) ||
              (step === 4 && (pin.length !== 4 || isProcessing))
            }
          >
            {step === 1 && isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : step === 4 && isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : step === 4 ? (
              'Complete Purchase'
            ) : (
              'Continue'
            )}
          </Button>
        )}

        {step === 5 && (
          <Button
            className="w-full bg-red-800 hover:bg-red-900 h-12 mt-6"
            onClick={() => {
              setStep(1)
              setSelectedDisco(null)
              setMeterNumber('')
              setValidationResult(null)
              setAmount('')
              setPin('')
              setIsSuccess(false)
              setMeterToken('')
            }}
          >
            Make Another Payment
          </Button>
        )}
      </div>
    </div>
  )
}

