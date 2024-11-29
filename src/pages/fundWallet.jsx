import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../contexts/authContexts"
import { WalletContext } from '../contexts/walletContexts';
import { ArrowLeft, Rocket, CreditCard, Copy, Building, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const FundWalletPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isTokenValid, token, user, fetchUserData } = useContext(AuthContext)
  const { generateAccountDetails } = useContext(WalletContext)
  const [currentView, setCurrentView] = useState('main');
  const [timeLeft, setTimeLeft] = useState(3600);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   fetchUserData()
  // })


  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.")
      navigate("/login")
    } else {
      // fetchUserData()

    }
  }, [isAuthenticated, token, navigate, isTokenValid, fetchUserData])

  const walletAccounts = user?.bankDetails

  console.log('Wallet accounts', walletAccounts);


  const transferDetails = {
    amount: 505.00,
    bankName: "SafeHaven",
    accountName: "Aimtoget Checkout",
    accountNumber: "6014069091",
  };

  useEffect(() => {
    if (currentView === 'bankTransfer') {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentView]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text, description) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`Copied ${description} to clipboard!`)
    }).catch(() => {
      toast.error(`Failed to copy ${description} to clipboard!`)
    });
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Bank transfer completed!")
      setCurrentView('main');
    }, 2000);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Card payment completed")
      setCurrentView('main');
      setAmount('');
    }, 2000);
  };

  const handleGenerateAccountDetails = async () => {
    try {
      setIsSubmitting(true);

      const reference = `${user?.firstName}${user?.lastName}${Math.floor(Math.random() * 1000000)} `

      const accountData = {
        accountName: user?.firstName + ' ' + user?.lastName,
        customerEmail: user?.email,
        customerName: user?.firstName + ' ' + user?.lastName,
        nin: user?.nin,
        bvn: user?.bvn,
        accountReference: reference
      }

      console.log('Account Deta', accountData);

      const response = await generateAccountDetails(accountData)

      console.log('Response', response);

    } catch (error) {
      console.log('Error', error);

    } finally {
      setIsSubmitting(false);
    }


  };

  const renderVerificationCard = () => (
    <Card className="mb-6">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <AlertCircle className="h-12 w-12 text-yellow-500" />
        <CardTitle className="text-center">Account Verification Required</CardTitle>
        <p className="text-center text-muted-foreground">
          Please verify your account with BVN or NIN to access Dedication accounts
        </p>
        <div className="text-sm text-muted-foreground">
          <p>Why we need this information:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>To comply with CBN Know Your Customer (KYC) regulations</li>
            <li>To protect your account from unauthorized access</li>
            <li>To enable higher transaction limits on your account</li>
            <li>To facilitate seamless inter-bank transactions</li>
          </ul>
        </div>
        <Button className='bg-[#8B0000]' onClick={() => navigate('/verify-account')}>
          Verify Account
        </Button>
      </CardContent>
    </Card>
  );

  const renderMainView = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Card className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setCurrentView('bankTransfer')}>
          <CardContent className="flex items-start gap-4 p-4">
            <Rocket className="h-6 w-6 mt-1" />
            <div>
              <CardTitle className="text-lg mb-1">Quick Bank Transfer</CardTitle>
              <p className="text-sm text-muted-foreground">
                Top-up your wallet with one-time account
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setCurrentView('card')}>
          <CardContent className="flex items-start gap-4 p-4">
            <CreditCard className="h-6 w-6 mt-1" />
            <div>
              <CardTitle className="text-lg mb-1">Card</CardTitle>
              <p className="text-sm text-muted-foreground">
                Fund with your debit card
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-50 px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {user.kycStatus === 'unverified' ? (
        renderVerificationCard()
      ) : user.bankDetails && user.bankDetails.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Wallet Account</CardTitle>
            <p className="text-sm text-muted-foreground">
              Make transfer to any of the below accounts
            </p>
          </CardHeader>
          <CardContent className="grid gap-4">
            {walletAccounts.map((account) => (
              <div
                key={account.accountNumber}
                className="flex items-start justify-between p-4 rounded-lg border"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-lg">{account.accountNumber}</p>
                    <button
                      onClick={() => handleCopy(account.accountNumber, "Account number")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">{account.accountName}</p>
                  <p className="font-medium">{account.bankName}</p>
                </div>
                {account.isRecommended && (
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    Recommended
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <CardTitle>Generate Account Details</CardTitle>
            <p className="text-center text-muted-foreground">
              You don&#39;t have any account details yet. Generate them to receive funds.
            </p>
            <Button onClick={handleGenerateAccountDetails} disabled={isSubmitting}>
              {isSubmitting ? "Generating..." : "Generate Account Details"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderBankTransferView = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg text-center mb-2">Send the exact amount to the account below</h2>
        <p className="text-center text-xl font-semibold">
          Transfer Exactly ₦{transferDetails.amount.toFixed(2)}
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Amount</label>
            <div className="flex items-center justify-between">
              <p className="text-lg font-mono">₦{transferDetails.amount.toFixed(2)}</p>
              <button
                onClick={() => handleCopy(transferDetails.amount.toString(), "Amount")}
                className="text-muted-foreground hover:text-foreground"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Bank Name</label>
            <p className="text-lg font-medium">{transferDetails.bankName}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Account Name</label>
            <p className="text-lg">{transferDetails.accountName}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Account Number</label>
            <div className="flex items-center justify-between">
              <p className="text-lg font-mono">{transferDetails.accountNumber}</p>
              <button
                onClick={() => handleCopy(transferDetails.accountNumber, "Account number")}
                className="text-muted-foreground hover:text-foreground"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-red-600 text-sm">
        Use this account for this transaction only
      </p>

      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full border-2 border-primary p-3">
          <Building className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Expires in</p>
          <p className="text-lg font-medium text-primary">{formatTime(timeLeft)}</p>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleConfirm}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Confirming..." : "I've sent the money"}
      </Button>
    </div>
  );

  const renderCardView = () => (
    <Card>
      <CardHeader>
        <CardTitle>Enter Amount</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCardSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="100"
              step="0.01"
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Proceed"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      <header className="sticky top-0 z-10 bg-white border-b  ">
        <div className="container flex items-center h-14 px-4 max-w-xl mx-auto">
  
          {currentView !== 'main' && (
            <button onClick={() => setCurrentView('main')} className="mr-3">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
  
          <h1 className="text-xl font-semibold  items-center  ">
            {currentView === 'main' ? (
              <Link to="/dashboard">
                <div className='flex items-center'>
                <ArrowLeft className="h-6 w-6 mr-4" />
                <h2>Add Funds</h2>
                </div>
              </Link>
            ) : currentView === 'bankTransfer' ? (
              'Quick Bank Transfer'
            ) : (
              'Fund with Card'
            )}
          </h1>
        </div>
      </header>
      <main className="flex-grow container max-w-xl mx-auto p-4 items-center justify-center">
        {currentView === 'main' && renderMainView()}
        {currentView === 'bankTransfer' && renderBankTransferView()}
        {currentView === 'card' && renderCardView()}
      </main>
    </div>
  );
};

export default FundWalletPage;


