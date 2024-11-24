import { AuthContext } from "../contexts/authContexts";
import  { useState, useContext, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const { isAuthenticated, isTokenValid, token, user, changePassword } = useContext(AuthContext);
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
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
   try {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match")
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    // Here you would typically make an API call to update the password
    console.log('Password update submitted', formData);

    const res = await changePassword(formData);

    console.log('PAss', res);

    if (res.status == 'fail'){
      // toast.error(res.message);
      throw new Error(res.message);
    } else {
      toast.success(res.message)
      console.log(res.message);
      
    }
    
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
   } catch (error) {
    console.log(error);
    toast.error(`${error.message}`);
    
   }
    
   
  };
 

  return (
    <div className='flex h-screen bg-gray-100'>
      
      <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="px-4 py-4 border-b">
        <div className="flex items-start gap-3">
          <Link to="/profile" className="mt-1">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Update Password</h1>
            <p className="text-sm text-orange-600">
              Strengthen your account&apos;s security by updating your payment Password seamlessly
            </p>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type={showPasswords.old ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => togglePasswordVisibility('old')}
            >
              {showPasswords.old ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              placeholder="Enter New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => togglePasswordVisibility('new')}
            >
              {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#8B0000] hover:bg-orange-600 text-white"
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default UpdatePassword;