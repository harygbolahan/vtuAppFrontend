import { AuthContext } from "../contexts/authContexts"
import { TransactionContext } from "../contexts/txnContext"
import { useState, useEffect, useContext } from 'react'
import { ArrowLeft, Contact2, Copy, Loader2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

const providers = [
  {
    value: 'DSTV',
    label: 'DSTV',
    logo: 'src/assets/cableLogo/dstv.png?height=48&width=48'
  },
  {
    value: 'GOTV',
    label: 'GOtv',
    logo: 'src/assets/cableLogo/gotv.png?height=48&width=48'
  },
  {
    value: 'SHOWMAX',
    label: 'Showmax',
    logo: 'src/assets/cableLogo/showmax.png?height=48&width=48'
  }
]

export default function CableSubscription() {
  const { isAuthenticated, isTokenValid, token } = useContext(AuthContext)
  const { cablePlans, verifyCablePlan, buyCable } = useContext(TransactionContext)
  const [step, setStep] = useState(1)
  const [provider, setProvider] = useState('')
  const [iuc, setIuc] = useState('')
  const [userName, setUserName] = useState('')
  const [currentPlan, setCurrentPlan] = useState(null)
  const [action, setAction] = useState('renew')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [pin, setPin] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  console.log('GetCable Plans', cablePlans);

  const [availablePlans, setAvailablePlans] = useState([])



  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.")
      navigate("/login")
    }
  }, [isAuthenticated, token, navigate, isTokenValid])

  useEffect(() => {
    if (provider) {
      setAvailablePlans(cablePlans.filter(plan => plan.planType === provider))
    } else {
      setAvailablePlans([])
    }
  }, [provider, cablePlans])

  //verify Cable plan with the provider and IUC from user input

  const verifyIuc = async () => {
    try {
      setIsVerifying(true)
      const response = await verifyCablePlan(provider, iuc)
      console.log('verifyCablePlan', response)
      if (response.message === 'IUC is valid') {
        setUserName(response.cable.customerName)

        setCurrentPlan(response.cable)
        console.log(currentPlan);

        setStep(2)
      } else {
        // toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error)
      console.log(error)
      setIsVerifying(false)
    } finally {
      setIsVerifying(false)
    }
  }


  const processPayment = async () => {
    try {
      setIsProcessing(true);
      console.log('request', currentPlan, selectedPlan);
  
      const response = await buyCable(currentPlan, selectedPlan);
      console.log('buyCablePlan', response);
  
      // Check if the response contains an error
      if (response.error) {
        throw new Error(response.error);
      }
  
      // If no error, proceed to success
      setIsSuccess(true);
      setStep(5);
    } catch (error) {
      // Handle specific error messages
      if (error.message === 'You do not have sufficient balance to process this request') {
        toast.error('Insufficient Balance, Please recharge your wallet and try again.');
      } else {
        toast.error('Cable Subscription failed, Please try again or Contact admin');
      }
  
      setIsSuccess(false); // Indicate failure
      setStep(5);
      console.log('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  

  const activePlan = action === 'renew' ? currentPlan : selectedPlan
  const activePrice = activePlan?.ourPrice || 0

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <div className="p-4 space-y-6">
        {/* Header with Progress Indicator */}
        <Link to='/dashboard'>
          <ArrowLeft className="h-5 w-5" />
        </Link>
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
                  'Pay Cable / TV'}
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
              <Label>Select Provider</Label>
              <div className="grid grid-cols-3 gap-4">
                {providers.map((p) => (
                  <Button
                    key={p.value}
                    variant="outline"
                    className={cn(
                      "h-24 flex flex-col items-center justify-center gap-2",
                      provider === p.value && "border-2 border-red-800"
                    )}
                    onClick={() => setProvider(p.value)}
                  >
                    <img src={p.logo} alt={p.label} className="w-12 h-12" />
                    <span className="text-sm">{p.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iuc">Smartcard Number</Label>
              <div className="relative">
                <Input
                  id="iuc"
                  value={iuc}
                  onChange={(e) => setIuc(e.target.value.slice(0, 10))}
                  maxLength={10}
                  className="pr-10"
                  placeholder="Enter IUC number"
                />
                <Contact2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <div className="font-medium">{userName}</div>
            </div>

            <div className="space-y-2">
              <Label>Current Plan</Label>
              <div className="font-medium">
                {currentPlan.currentPackage + '- ₦' + currentPlan.renewalAmount}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Action</Label>
                <Select value={action} onValueChange={(value) => {
                  setAction(value)
                  setSelectedPlan(null)
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="renew">Renew Current Plan</SelectItem>
                    <SelectItem value="change">Change Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {action === 'change' && (
                <div className="space-y-2">
                  <Label>Select New Plan</Label>
                  <Select value={selectedPlan?._id || ''} onValueChange={(value) => {
                    const plan = availablePlans.find(p => p._id === value)
                    setSelectedPlan(plan || null)
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose new plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePlans
                        .filter(p => p._id !== currentPlan?._id)
                        .map(plan => (
                          <SelectItem key={plan._id} value={plan._id}>
                            {plan.planName} - ₦{plan.ourPrice.toLocaleString()}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">To:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{iuc}</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₦{activePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium">{provider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">
                  {activePlan?.planName}
                </span>
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
                <p className="text-gray-600">Your subscription has been renewed successfully.</p>
              </>
            ) : (
              <>
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
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
              if (step === 1) verifyIuc()
              else if (step === 4) processPayment()
              else setStep(step + 1)
            }}
            disabled={
              (step === 1 && (!provider || !iuc || isVerifying)) ||
              (step === 2 && (action === 'change' && !selectedPlan)) ||
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
              setProvider('')
              setIuc('')
              setUserName('')
              setCurrentPlan(null)
              setSelectedPlan(null)
              setAction('renew')
              setPin('')
              setIsSuccess(false)
            }}
          >
            Make Another Payment
          </Button>
        )}
      </div>
    </div>
  )
}

