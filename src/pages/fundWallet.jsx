import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../contexts/authContexts"
import { TransactionContext } from "../contexts/txnContext"
import { ArrowLeft, Rocket, CreditCard, Copy, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const FundWalletPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isTokenValid, token } = useContext(AuthContext)
  const { plans } = useContext(TransactionContext)
  const [currentView, setCurrentView] = useState('main');
  const [timeLeft, setTimeLeft] = useState(3600);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.")
      navigate("/login")
    }
  }, [isAuthenticated, token, navigate, isTokenValid])

  const walletAccounts = [
    {
      accountNumber: "8022216524",
      accountName: "Mubarak Oyekanmi",
      bankName: "Safe Haven MFB",
      isRecommended: false,
    },
    {
      accountNumber: "8880000157",
      accountName: "Mubarak Oyekanmi",
      bankName: "Rubies MFB",
      isRecommended: true,
    },
  ];

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
      <Link to='/dashboard'>
      <ArrowLeft className='h-8 w-8 mt-5 mx-10' />

      </Link>
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-14 px-4 max-w-xl mx-auto">
          {currentView !== 'main' && (
            <button onClick={() => setCurrentView('main')} className="mr-3">
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          <h1 className="text-xl font-semibold">
            {currentView === 'main' ? 'Add Funds' : 
             currentView === 'bankTransfer' ? 'Quick Bank Transfer' : 'Fund with Card'}
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

