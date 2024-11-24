import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Users, Package, CreditCard, Settings, LogOut } from 'lucide-react';

const sidebarNavItems = [
  {
    title: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    to: "/admin/users",
    icon: Users,
  },
  {
    title: "Services",
    to: "/admin/services",
    icon: Package,
  },
  {
    title: "Transactions",
    to: "/admin/transactions",
    icon: CreditCard,
  },
  {
    title: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // Use this to get the current route

  return (
    <div className="flex h-screen flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
      {/* Header Section */}
      <div className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" to="/">
          <Package className="h-6 w-6" />
          <span>DeviceTopUp</span>
        </Link>
      </div>
      
      {/* Navigation Items */}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {sidebarNavItems.map((item, index) => (
            <Button
              key={index}
              asChild
              variant={location.pathname === item.to ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                location.pathname === item.to && "bg-gray-100 dark:bg-gray-800"
              )}
            >
              <Link to={item.to}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      {/* Logout Button */}
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full" onClick={() => console.log('Logout')}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
