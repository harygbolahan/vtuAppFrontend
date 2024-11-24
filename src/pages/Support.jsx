import  { useState } from 'react';
import { ArrowLeft, Phone, Mail, Users, Video, Send,  } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from 'react-router-dom';
import {Home, Wallet, History, Settings} from 'lucide-react';

function Support() {
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content: "Hello! How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');

  const socialLinks = [
    { name: 'Phone', icon: Phone, color: 'bg-yellow-500', href: 'tel:+1234567890' },
    { name: 'Facebook', icon: 'M', color: 'bg-blue-600', href: 'https://facebook.com' },
    { name: 'WhatsApp', icon: Send, color: 'bg-green-500', href: 'https://wa.me/1234567890' },
    { name: 'Telegram', icon: Send, color: 'bg-blue-400', href: 'https://t.me/username' },
    { name: 'Email', icon: Mail, color: 'bg-red-500', href: 'mailto:support@example.com' },
    { name: 'Group', icon: Users, color: 'bg-purple-500', href: '/group' },
    { name: 'YouTube', icon: Video, color: 'bg-red-600', href: 'https://youtube.com' },
    { name: 'Instagram', icon: 'I', color: 'bg-pink-500', href: 'https://instagram.com' },
  ];

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'agent', content: "Thank you for your message. An agent will respond shortly." }]);
      }, 1000);
    }
  };

  const menuItems = [
    { name: 'Home', icon: Home, link: '/' },
    { name: 'Wallet', icon: Wallet, link: '/wallet' },
    { name: 'Transactions', icon: History, link: '/transactions' },
    { name: 'Settings', icon: Settings, link: '/settings' },
  ]

  return (
    <div className='flex h-screen bg-gray-100'>
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
        <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Header */}
      <header className="px-4 py-4 bg-white border-b">
        <div className="flex items-start gap-3">
          <a href="/profile" className="mt-1">
            <ArrowLeft className="h-5 w-5" />
          </a>
          <div>
            <h1 className="text-xl font-semibold">Help and Support</h1>
            <p className="text-sm">
              Reach out for assistance with your account, services, and more.
              <br />
              We&apos;re here to help you!
            </p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="px-4 pt-6 pb-4 bg-green-500 rounded-b-3xl">
        <h2 className="text-white mb-4">Having an issue? Find quick solutions...</h2>
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search here..." 
            className="w-full bg-white rounded-full pl-4 pr-10 py-2 shadow-lg"
          />
        </div>
      </div>

      {/* Social Links Grid */}
      <div className="px-4 py-8">
        <div className="grid grid-cols-4 gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center text-white`}>
                {typeof link.icon === 'string' ? (
                  <span className="text-lg font-bold">{link.icon}</span>
                ) : (
                  <link.icon className="h-6 w-6" />
                )}
              </div>
              <span className="text-sm text-center">{link.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <Card className="mx-4 mb-4 flex-grow flex flex-col">
        <CardHeader>
          <h2 className="text-lg font-semibold">Chat with Support</h2>
        </CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-end ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className={message.role === 'user' ? 'ml-2' : 'mr-2'}>
                    <AvatarFallback>{message.role === 'user' ? 'U' : 'A'}</AvatarFallback>
                    <AvatarImage src={message.role === 'user' ? '/user-avatar.png' : '/agent-avatar.png'} />
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
            <Input
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
    </div> 
  );
}

export default Support;