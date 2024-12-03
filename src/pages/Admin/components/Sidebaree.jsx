import {Link} from "react-router-dom"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Wallet, Users, UserCircle, CreditCard, Tag, Settings, BarChart2, Bell, LogOut } from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Wallet, label: "API Wallet", href: "/api-wallet" },
  { icon: Users, label: "System Users", href: "/system-users" },
  { icon: UserCircle, label: "Customers", href: "/customers" },
  { icon: CreditCard, label: "Credit User", href: "/credit-user" },
  { icon: Tag, label: "Coupon", href: "/coupon" },
  { icon: Settings, label: "Services", href: "/services" },
  { icon: BarChart2, label: "Transactions", href: "/transactions" },
  { icon: BarChart2, label: "Sales Analysis", href: "/sales" },
  { icon: BarChart2, label: "User Analysis", href: "/user-analysis" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Configurations", href: "/configurations" },
]

export function Sidebar() {
  return (
    <div className="hidden border-r bg-white lg:block dark:bg-gray-800">
      <div className="flex h-full flex-col">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <span className="text-xl font-bold text-blue-600">Mabrook</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500",
                    index === 0 && "text-blue-600 dark:text-blue-500"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}

