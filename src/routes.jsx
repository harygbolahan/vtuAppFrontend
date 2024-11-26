import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/LandingPage'
import Dashboard from './pages/dashboard'
import Transactions from './pages/transactions'
import TransactionDetail from './pages/transactionDetails'
import FundWallet from './pages/fundWallet'
import ManualDeposit from './pages/ManualDeposit'
import DataBundle from './pages/dataBundle'
import AirtimeRecharge from './pages/AirtimeRecharge'
import CableSubscription from './pages/CableSubcriptions'
import ElectricityBillPayment from './pages/Electricity'
import OneTimeAccount from './pages/oneTimeAccount'
import CardPayment from './pages/CardPayment'
import Profile from './pages/Profile'
import Referral from './pages/Referral'
import UpdatePassword from './pages/UpdatePassword'
import UpdatePin from './pages/UpdatePin'
import UpdateProfile from './pages/UpdateProfile'
import DeveloperAPI from './pages/Developers'
import Support from './pages/Support'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminDashboard from './admin/pages/Dashboard'
import UsersManagement from './admin/pages/Users'
import ServicesManagement from './admin/pages/Services'
import TransactionsManagement from './admin/pages/Transactions'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route path="/fund-wallet" element={<FundWallet />} />
        <Route path="/manual-deposit" element={<ManualDeposit />} />
        <Route path="/buy-data" element={<DataBundle />} />
        <Route path="/airtime" element={<AirtimeRecharge />} />
        <Route path="/cable-tv" element={<CableSubscription />} />
        <Route path="/electricity" element={<ElectricityBillPayment />} />
        <Route path="/onetime-account" element={<OneTimeAccount />} />
        <Route path="/card-payment" element={<CardPayment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/referrals" element={<Referral />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/update-pin" element={<UpdatePin />} />
        <Route path="/profile-settings" element={<UpdateProfile />} />
        <Route path="/developer-api" element={<DeveloperAPI />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/services" element={<ServicesManagement />} />
        <Route path="/admin/transactions" element={<TransactionsManagement />} />



      </Routes>
    </Router>
  )
}

export default AppRoutes