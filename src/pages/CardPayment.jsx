import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import { PaystackButton } from 'react-paystack';
import 'react-toastify/dist/ReactToastify.css';

const CardPayment = () => {  // <-- Use PascalCase here
  const [amount, setAmount] = useState('');
  const [chargePercentage] = useState(2); // The percentage value for dynamic charges (e.g., 2%)
  const [calculatedCharge, setCalculatedCharge] = useState(0);

  // Paystack configuration
  const publicKey = 'your-paystack-public-key'; // Replace with your actual Paystack public key
  const userEmail = 'user@example.com'; // Replace with user's email, could be from user profile

  // Handle the change in amount input
  const handleAmountChange = (e) => {
    const enteredAmount = parseFloat(e.target.value);
    if (!isNaN(enteredAmount)) {
      setAmount(enteredAmount);
      const charge = (enteredAmount * chargePercentage) / 100;
      setCalculatedCharge(charge);
    } else {
      setAmount('');
      setCalculatedCharge(0);
    }
  };

  // Paystack payment success and close callbacks
  const handlePaymentSuccess = (response) => {
    toast.success(`Payment Successful. Reference: ${response.reference}`);
  };

  const handlePaymentClose = () => {
    toast.info("Payment window closed.");
  };

  // Calculate total amount in Naira and convert to Kobo for Paystack
  const totalAmount = parseFloat(amount) + calculatedCharge;
  const paystackAmount = totalAmount * 100; // Paystack uses Kobo (Naira * 100)

  // Paystack button configuration
  const paystackConfig = {
    email: userEmail,
    amount: paystackAmount,
    publicKey,
    onSuccess: handlePaymentSuccess,
    onClose: handlePaymentClose,
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
          <Link to="/" className="p-2">
            <MdArrowBack className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold">Card Payment</h1>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-md p-4">
          <div className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-4 bg-white p-4 rounded-md shadow-md">
              <label className="block text-sm font-semibold">Enter Amount</label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter the amount you want to pay"
              />
            </div>

            {/* Charges Display */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-sm font-medium mb-2">Payment Details</h2>
              <p className="text-gray-700 text-sm">
                Entered Amount: <span className="font-semibold">₦{amount || 0}</span>
              </p>
              <p className="text-gray-700 text-sm">
                Charges ({chargePercentage}%): <span className="font-semibold">₦{calculatedCharge.toFixed(2)}</span>
              </p>
              <p className="text-gray-700 text-sm font-semibold">
                Total to Pay: <span className="font-bold">₦{totalAmount.toFixed(2) || 0}</span>
              </p>
            </div>

            {/* Paystack Payment Button */}
            <div className="flex gap-3">
              <PaystackButton
                {...paystackConfig}
                className="flex-1 rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                text="Pay with Card"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
