/* eslint-disable react/prop-types */
'use client'

import { Bell, CreditCard, FileText,  KeyRound, Lock, LogOut, MessageSquare, PieChart, Shield, Users, UserCircle, Building2 } from 'lucide-react'
// import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#8B0000] text-white p-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
      </header>

      {/* Profile Info */}
      <div className="p-6 bg-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-[#8B0000]">
            <AvatarImage src="/placeholder.svg" alt="Profile picture" />
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">@harry12345</h2>
            <p className="text-gray-600">Safe Haven MFB - 8022216524</p>
          </div>
        </div>
        
        {/* Level Badge */}
        <Card className="mt-4 bg-gray-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="text-orange-500" />
              <span className="font-medium">Level 2</span>
            </div>
            <Button variant="outline" className="text-[#8B0000]">
              Upgrade
            </Button>
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
              <MenuLink to="/request-account" icon={<Building2 />} text="Request Account Number" />
              <MenuLink to="/live-chat" icon={<MessageSquare />} text="Live Chat" />
              <MenuLink to="/saved-cards" icon={<CreditCard />} text="Saved Cards" />
              <MenuLink to="/account-verification" icon={<Shield />} text="Account Verification" />
              <MenuLink to="/account-levels" icon={<PieChart />} text="Account Levels" />
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
              <MenuLink to="/close-account" icon={<Shield />} text="Close Account" danger />
              <MenuLink to="/privacy-policy" icon={<Bell />} text="Privacy Policy"  />
              <MenuLink to="/terms" icon={<FileText />} text="Terms & Condtions"  />
              <MenuLink to="/contact-support" icon={<MessageSquare />} text="Contact Support" />
              <MenuLink to="/logout" icon={<LogOut />} text="Logout" danger />
            </CardContent>
          </Card>
        </section>
      </div>

    </div>
  )
}

function MenuLink({ to, icon, text, danger = false }) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50 ${
        danger ? 'text-red-600' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500">{icon}</span>
        <span>{text}</span>
      </div>
      <span className="text-gray-400">›</span>
    </Link>
  )
}

