/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/authContexts'
import { Bell, CreditCard, FileText, KeyRound, Lock, LogOut, MessageSquare, PieChart, Shield, Users, UserCircle, Building2, ArrowLeft, Menu } from 'lucide-react'
// import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, token, isTokenValid, fetchUserData } = useContext(AuthContext);

  console.log('User:', user);

  // Effect to check authentication status and token validity
  useEffect(() => {
    if (isAuthenticated && isTokenValid(token)) {
      fetchUserData();
    } else {
      toast.error("Session expired. Please login again.");
      navigate('/login');
    }
  }, [isAuthenticated, token, isTokenValid, navigate]);

  // Logout handler
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#8B0000] text-white p-6 flex items-center">
        <Link to='/dashboard'>
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold mx-5">My Profile</h1>
      </header>

      {/* Profile Info */}
      <div className="p-6 bg-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-[#8B0000]">
            <AvatarImage src="/placeholder.svg" alt="Profile picture" />
            <AvatarFallback>{user?.firstName[0].toUpperCase() + user?.lastName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user?.firstName + ' ' + user?.lastName}</h2>
            <p className="text-gray-600">{user?.bank || 'SafeHaven'}</p>
          </div>
        </div>

        {/* Level Badge */}
        <Card className="mt-4 bg-gray-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className={user?.isVerified ? 'text-green-600' : 'text-[#8B0000]'} size={30} />
              <span className="font-medium text-2xl">{user?.isVerified ? 'Verified' : 'Not Verified'}</span>
            </div>
            {!user?.isVerified && <Button variant="outline" className="text-[#8B0000]">
              Verify
            </Button>}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Account Section */}
        <section>
          <h3 className="text-lg font-medium text-gray-600 mb-3">Account</h3>
          <Card>
            <CardContent className="p-0">
              <MenuLink to="/profile-settings" icon={<UserCircle />} text="Profile Details" />
              {/* <MenuLink to="/request-account" icon={<Building2 />} text="Request Account Number" /> */}
              <MenuLink to="/support" icon={<MessageSquare />} text="Support" />
              <MenuLink to="/account-verification" icon={<Shield />} text="Account Verification" />
              <MenuLink to="/referrals" icon={<Users />} text="Referrals" />
            </CardContent>
          </Card>
        </section>

        {/* Security Section */}
        <section>
          <h3 className="text-lg font-medium text-gray-600 mb-3">Security</h3>
          <Card>
            <CardContent className="p-0">
              <MenuLink to="/update-pin" icon={<KeyRound />} text="Manage PIN" />
              <MenuLink to="/update-password" icon={<Lock />} text="Change Password" />
              {/* <MenuLink to="/biometrics" icon={<Fingerprint />} text="Biometrics" /> */}
            </CardContent>
          </Card>
        </section>

        {/* More Section */}
        <section>
          <h3 className="text-lg font-medium text-gray-600 mb-3">More</h3>
          <Card>
            <CardContent className="p-0">

              <MenuLink to="/privacy-policy" icon={<Bell />} text="Privacy Policy" />
              <MenuLink to="/terms" icon={<FileText />} text="Terms & Condtions" />
              {/* <MenuLink to="/support" icon={<MessageSquare />} text="Contact Support" /> */}
              <MenuLink to="/close-account" icon={<Shield />} text="Close Account" danger />


              {/* <MenuLink to="#" icon={<LogOut />} text="Logout" danger onClick={handleLogout} />    */}

              <Button onClick={handleLogout} className='text-red-600 bg-white hover:bg-white ' >
               <LogOut height='36px' /> <Link to="/logout">Logout</Link>
              </Button>         
              </CardContent>

              
              
          </Card>
        </section>
      </div>

    </div>
  )
}

function MenuLink({ to, icon, text, danger = false, onclick }) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50 ${danger ? 'text-red-600' : ''
        }`}
        onClick={onclick}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500">{icon}</span>
        <span>{text}</span>
      </div>
      <span className="text-gray-400">›</span>
    </Link>
  )
}

