import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdContentCopy } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const OneTimeAccount = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const accountDetails = {
    accountNumber: "123 456 789",
    bankName: "MaxBank",
    accountName: "your_account_name"
  };

  useEffect(() => {
    // Timer countdown logic
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format time from seconds to minutes:seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(accountDetails.accountNumber.replace(/\s/g, ''));
      toast.success("Account number copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy account number");
    }
  };

  const shareDetails = async () => {
    try {
      await navigator.share({
        title: 'Account Details',
        text: `MaxBank Account Number: ${accountDetails.accountNumber}`,
      });
    } catch (error) {
      console.log(error);
      toast.error("Sharing not supported on this device");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme='dark' />

      {/* Sidebar */}
      <div className="hidden lg:block lg:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="flex items-center gap-4 border-b bg-white p-4 shadow-sm">
          <Link to="/fund-wallet" className="p-2">
            <MdArrowBack className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold">One-Time Account Details</h1>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-md p-4">
          <div className="space-y-6">
            {/* Countdown Timer */}
            <div className="bg-red-100 text-red-800 p-3 rounded-md shadow-md text-center">
              <p className="font-semibold">
                This account will expire in: {formatTime(timeLeft)}
              </p>
            </div>

            {/* Account Details */}
            <div className="space-y-4 bg-white p-4 rounded-md shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="text-green-600">₦</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Account Number</div>
                  <div className="text-lg font-semibold">{accountDetails.accountNumber}</div>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="ml-auto p-1 text-gray-500 hover:text-gray-700"
                  title="Copy Account Number"
                >
                  <MdContentCopy className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="text-green-600">₦</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Bank Name</div>
                  <div className="text-lg font-semibold">{accountDetails.bankName}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="text-green-600">₦</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Account Name</div>
                  <div className="text-lg font-semibold">{accountDetails.accountName}</div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-sm font-medium mb-2">One-time use instructions:</h2>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                <li>Copy the MaxBank Account Number: {accountDetails.accountNumber}</li>
                <li>Use your bank app or USSD to make the transfer</li>
                <li>Make sure to complete the transfer within 10 minutes</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={shareDetails}
                className="flex-1 rounded-md bg-green-500 py-2 text-white hover:bg-green-600"
              >
                Share Details
              </button>
              <button
                className="flex-1 rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
              >
                Paid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTimeAccount;
