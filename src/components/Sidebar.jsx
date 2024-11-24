import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  CreditCard, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2">
          {[
            { icon: Home, label: 'Home', path: '/' },
            { icon: FileText, label: 'Transactions', path: '/transactions' },
            { icon: CreditCard, label: 'Cards', path: '/cards' },
            { icon: Users, label: 'Customers', path: '/customers' },
            { icon: Settings, label: 'Settings', path: '/settings' },
          ].map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.path}
                className="flex items-center p-2 rounded hover:bg-gray-800"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <Link to="/help" className="flex items-center p-2 rounded hover:bg-gray-800">
          <HelpCircle className="mr-3 h-5 w-5" />
          Help & Support
        </Link>
        <Link to="/logout" className="flex items-center p-2 rounded hover:bg-gray-800">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;