import  { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Home, Wallet, History, Settings } from 'lucide-react';

function DeveloperAPI() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('UNAVAILABLE');
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
        console.log(error);
        
      toast.error("Failed to copy to clipboard");
    }
  };

  const menuItems = [
    { name: 'Home', icon: Home, link: '/' },
    { name: 'Wallet', icon: Wallet, link: '/wallet' },
    { name: 'Transactions', icon: History, link: '/transactions' },
    { name: 'Settings', icon: Settings, link: '/settings' },
  ]

  return (
    <div className='flex h-screen bg-gray-100 w-full'>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme='dark'  />

        <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-700">MaxPay</h1>
        </div>
        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.link} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
        <div className="min-h-screen bg-white w-full">
      {/* Header */}
      <header className="px-4 py-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="mt-1">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">Developer API</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* API Image */}
        <div className="rounded-lg overflow-hidden">
          <img 
            src="/placeholder.svg?height=200&width=400" 
            alt="Code Editor"
            className="w-full h-[200px] object-cover"
          />
        </div>

        {/* API Token Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Api Bearer Token</label>
          <div className="text-2xl font-bold">UNAVAILABLE</div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleCopy}
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            Copy API Token
          </Button>
          <Button
            variant="secondary"
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={() => window.open('/docs', '_blank')}
          >
            View Docs
          </Button>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h2 className="font-semibold">Sell Data to your customers in 3 steps</h2>
          <ol className="space-y-3">
            <li className="flex gap-2">
              <span className="text-green-500">1.</span>
              <span>Copy your dedicated API Token above</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500">2.</span>
              <span>View Our documentactions && API endpoints</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500">3.</span>
              <span>Connect and begin to vend data from your website</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DeveloperAPI;