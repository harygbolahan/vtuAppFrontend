
import { ArrowLeft, ChevronRight, Copy, Users } from 'lucide-react'
import { AuthContext } from "../contexts/authContexts"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { toast } from 'react-toastify'
import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'

export default function ReferAndEarn() {
  const navigate = useNavigate()
  const { isAuthenticated, isTokenValid, token } = useContext(AuthContext)
  const [showGuidelines, setShowGuidelines] = useState(false)
  const referralCode = "harry12345"

  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.")
      navigate("/login")
    }
  }, [isAuthenticated, token, navigate, isTokenValid])

  const referrals = [
    { name: "John Doe", date: "2024-01-20", status: "completed" },
    { name: "Jane Smith", date: "2024-01-19", status: "completed" },
    { name: "Mike Johnson", date: "2024-01-18", status: "pending" },
    { name: "Sarah Williams", date: "2024-01-17", status: "completed" },
    { name: "Robert Brown", date: "2024-01-16", status: "pending" },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      toast.success("Referral code copied!")
    } catch (err) {
      console.log(err);
      
      toast.error("Failed to copy code")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to='/profile'>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          </Link>
          <h1 className="text-xl font-semibold">Refer & Earn</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-[#8B0000] transform rotate-45 relative">
              <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-[#8B0000] rounded-full -translate-x-1/2 translate-y-1/2" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">
            Earn extra bonus with every referral
          </h2>
          <p className="text-gray-600">
            Share your referral code with your friends & family, earn up to NGN50 when they upgrade their account to level 2.
          </p>
        </div>

        {/* Referral Code Section */}
        <Card className="p-4 space-y-2">
          <p className="text-sm text-gray-600">Copy your referral code</p>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-xl font-semibold">{referralCode}</span>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Copy className="h-5 w-5" />
            </Button>
          </div>
          <Button className="w-full bg-[#8B0000] hover:bg-red-700 text-white">
            Invite a friend
          </Button>
        </Card>

        {/* Guidelines Section */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
            >
              <span className="font-semibold">Referral guidelines</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Referral guidelines</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <ol className="list-decimal space-y-4 pl-4">
                <li className="text-gray-600">
                  You are required to complete all account verification steps.
                </li>
                <li className="text-gray-600">
                  Make sure to keep your account active by using it to transact frequently
                </li>
                <li className="text-gray-600">
                  You can cash out your earnings to your wallet when it accumulates to a total sum of <span className="font-semibold">₦5,000.00</span> and above.
                </li>
              </ol>
            </div>
            <DialogFooter >
              <Button onClick={() => setShowGuidelines(false)}
               className="w-full bg-[#8B0000] hover:bg-red-700 text-white"   >
                Okay, Got it
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Stats Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-gray-500" />
              <span className="font-semibold">My Referrals</span>
            </div>
            <span className="text-xl font-bold">{referrals.length}</span>
          </div>

          {/* Referrals List */}
          <Card className="divide-y">
            {referrals.map((referral, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{referral.name}</p>
                  <p className="text-sm text-gray-500">{new Date(referral.date).toLocaleDateString()}</p>
                </div>
                <span className={`text-sm ${
                  referral.status === "completed" ? "text-green-600" : "text-yellow-600"
                }`}>
                  {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                </span>
              </div>
            ))}
          </Card>

          {/* Earnings Section */}
          <Card className="p-4">
            <div className="space-y-4">
              <p className="text-gray-600">Referral Earnings</p>
              <p className="text-3xl font-bold">₦0.00</p>
              <Button 
                className="w-full bg-[#8B0000] text-white hover:bg-red-700 "
                variant="secondary"
              >
                Cash out
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

