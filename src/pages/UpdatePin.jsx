import { AuthContext } from "../contexts/authContexts";
import { useState, useContext, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Home, Wallet, History, Settings } from 'lucide-react';

function UpdatePin() {
  const { isAuthenticated, isTokenValid, token, user, changePin, resetPin } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [showSetPinDialog, setShowSetPinDialog] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isTokenValid(token)) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
    }
    
    // if (!user.transaction_pin) {
    //   setShowSetPinDialog(true);
    // }
  }, [isAuthenticated, token, navigate, isTokenValid, user]);

  // const [setPinFormData, setSetPinFormData] = useState({
  //   newPin: '',
  //   confirmPin: ''
  // });

  const [changeFormData, setChangeFormData] = useState({
    oldPin: '',
    newPin: '',
    confirmPin: ''
  });

  const [resetFormData, setResetFormData] = useState({
    password: '',
    newPin: '',
    confirmPin: ''
  });

  const [showPins, setShowPins] = useState({
    oldPin: false,
    newPin: false,
    confirmPin: false,
    password: false
  });

  // const handleSetPinFormChange = (e) => {
  //   const { name, value } = e.target;
  //   if (value.length <= 4 && /^\d*$/.test(value)) {
  //     setSetPinFormData(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   }
  // };

  const handleChangeFormChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setChangeFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleResetFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password' || (value.length <= 4 && /^\d*$/.test(value))) {
      setResetFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const togglePinVisibility = (field) => {
    setShowPins(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // const handleSetPinSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //   if (setPinFormData.newPin !== setPinFormData.confirmPin) {
  //     toast.error("PINs do not match");
  //     return;
  //   }
  //   const pin = setPinFormData.newPin
  //   const email = user.email
  //   const payload = {pin, email }
  //  const res = await updatePin(payload) 

  //  console.log('Dash res', res.message);
   
  //   if (res.message == 'Transaction pin is too common, Please try another one') {
  //     toast.error('Transaction pin is too common, Please try another one')
  //     throw new Error('Transaction pin is too common, Please try another one')

  //   } else {
  //     toast.success(`${res.message}`)
  //     setShowSetPinDialog(false);

  //   }
  //       console.log('Set PIN submitted', setPinFormData);
  //   } catch (error) {
  //     console.log('error', error);
  //     setShowSetPinDialog(false);
  //     throw new Error (`${error}`)
      
  //   } finally {
  //     setShowSetPinDialog(false);
  //   }
  // };

  const handleChangeSubmit = async (e) => {
   try {
    e.preventDefault();

    if (!changeFormData.oldPin) {
      toast.error("Old PIN is required");
      return;
    }
    if (changeFormData.newPin !== changeFormData.confirmPin) {
      toast.error("New PINs do not match");
      return;
    }
    const res = await changePin(changeFormData) 
    
    console.log('Change PIN submitted', changeFormData);

    console.log('Res', res);

    if (res.message == 'Transaction pin is too common, Please try another one') {
      toast.error('Transaction pin is too common, Please try another one')
      throw new Error('Transaction pin is too common, Please try another one')
    }

    if (res.message == 'Invalid old transaction pin, Please try again.') {
      toast.error('Invalid old pin')
      throw new Error('Invalid old pin')
    } 

    if (res.message == 'Transaction pin changed successfully') {
      toast.success(`${res.message}`)
      setChangeFormData({ oldPin: '', newPin: '', confirmPin: '' });
      // setShowChangePinDialog(false);
    }
    
   } catch (error) {
    toast.error(`${error}`)
    console.log(error);
    
   }
    
  };

  const handleResetSubmit = async (e) => {
    try {
      e.preventDefault();
  
      if (!resetFormData.password) {
        toast.error("Password is required");
        return;
      }
      if (resetFormData.newPin !== resetFormData.confirmPin) {
        toast.error("New PINs do not match");
        return;
      }
      const res = await resetPin(resetFormData) 
      
      console.log('Rset PIN submitted', resetFormData);
  
      console.log('Res', res);
  
      if (res.message == 'Transaction pin is too common, Please try another one') {
        toast.error('Transaction pin is too common, Please try another one')
        throw new Error('Transaction pin is too common, Please try another one')
      }
  
      if (res.message == 'Invalid old transaction pin, Please try again.') {
        toast.error('Invalid old pin')
        throw new Error('Invalid old pin')
      } 
  
      if (res.message == 'Transaction pin set successfully') {
        toast.success(`${res.message}`)
        setResetFormData({ password: '', newPin: '', confirmPin: '' });
        // setShowChangePinDialog(false);
      }
      
     } catch (error) {
      toast.error(`${error}`)
      console.log(error);
      
     }
  };

  const menuItems = [
    { name: 'Home', icon: Home, link: '/' },
    { name: 'Wallet', icon: Wallet, link: '/wallet' },
    { name: 'Transactions', icon: History, link: '/transactions' },
    { name: 'Settings', icon: Settings, link: '/settings' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-1/5 bg-white border-r">
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
      
      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-white">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="dark" />

        {/* Header */}
        <header className="px-6 py-4 border-b">
          <div className="flex items-start gap-3">
            <Link to="/profile" className="mt-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Update PIN</h1>
              <p className="text-sm text-orange-600">
                Secure your transactions by updating your PIN
              </p>
            </div>
          </div>
        </header>

        {/* Set PIN Dialog */}
        {/* <Dialog open={showSetPinDialog} onOpenChange={setShowSetPinDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Your Transaction PIN</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSetPinSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  type={showPins.newPin ? "text" : "password"}
                  name="newPin"
                  placeholder="Enter New PIN"
                  value={setPinFormData.newPin}
                  onChange={handleSetPinFormChange}
                  className="pr-10 w-full"
                  maxLength={4}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => togglePinVisibility('newPin')}
                >
                  {showPins.newPin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPins.confirmPin ? "text" : "password"}
                  name="confirmPin"
                  placeholder="Confirm New PIN"
                  value={setPinFormData.confirmPin}
                  onChange={handleSetPinFormChange}
                  className="pr-10 w-full"
                  maxLength={4}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => togglePinVisibility('confirmPin')}
                >
                  {showPins.confirmPin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <DialogFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-[#8B0000] hover:bg-orange-600 text-white"
                >
                  Set PIN
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog> */}

        {/* Form Content */}
        <div className="px-6 py-6">
          <Tabs defaultValue="change" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="change">Change PIN</TabsTrigger>
              <TabsTrigger value="reset">Reset PIN</TabsTrigger>
            </TabsList>

            {/* Change PIN Form */}
            <TabsContent value="change">
              <form onSubmit={handleChangeSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type={showPins.oldPin ? "text" : "password"}
                    name="oldPin"
                    placeholder="Enter Old PIN"
                    value={changeFormData.oldPin}
                    onChange={handleChangeFormChange}
                    className="pr-10 w-full"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => togglePinVisibility('oldPin')}
                  >
                    {showPins.oldPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showPins.newPin ? "text" : "password"}
                    name="newPin"
                    placeholder="Enter New PIN"
                    value={changeFormData.newPin}
                    onChange={handleChangeFormChange}
                    className="pr-10 w-full"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => togglePinVisibility('newPin')}
                  >
                    {showPins.newPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showPins.confirmPin ? "text" : "password"}
                    name="confirmPin"
                    placeholder="Confirm New PIN"
                    value={changeFormData.confirmPin}
                    onChange={handleChangeFormChange}
                    className="pr-10 w-full"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => togglePinVisibility('confirmPin')}
                  >
                    {showPins.confirmPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#8B0000] hover:bg-orange-600 text-white"
                >
                  Change PIN
                </Button>
              </form>
            </TabsContent>

            {/* Reset PIN Form */}
            <TabsContent value="reset">
              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type={showPins.password ? "text" : "password"}
                    name="password"
                    placeholder="Enter Account Password"
                    value={resetFormData.password}
                    onChange={handleResetFormChange}
                    className="pr-10 w-full"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => togglePinVisibility('password')}
                  >
                    {showPins.password ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showPins.newPin ? "text" : "password"}
                    name="newPin"
                    placeholder="Enter New PIN"
                    value={resetFormData.newPin}
                    onChange={handleResetFormChange}
                    className="pr-10 w-full"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => togglePinVisibility('newPin')}
                  >
                    {showPins.newPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showPins.confirmPin ? "text" : "password"}
                    name="confirmPin"
                    placeholder="Confirm New PIN"
                    value={resetFormData.confirmPin}
                    onChange={handleResetFormChange}
                    className="pr-10 w-full"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => togglePinVisibility('confirmPin')}
                  >
                    {showPins.confirmPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#8B0000] hover:bg-orange-600 text-white"
                >
                  Reset PIN
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default UpdatePin;
