"use client";

import { ArrowLeft, Camera, Check, CalendarIcon } from 'lucide-react';
import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from "../contexts/authContexts";
import { format, startOfMonth, endOfMonth, isSameMonth, isSameDay } from 'date-fns';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

export default function ProfileDetails() {
  const navigate = useNavigate();
  const { isAuthenticated, isTokenValid, token, updateProfile, user, fetchUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [profile, setProfile] = useState(null); // State to hold user profile data
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch user profile data when component mounts
    const fetchData = async () => {
      try {
        if (!isAuthenticated || !isTokenValid(token)) {
          toast.error("Session expired. Please login again.");
          navigate("/login");
        } else {
         const userProfile = user// Fetch user profile from context or API
          setProfile({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            middleName: userProfile.middleName,
            email: userProfile.email,
            phoneNumber: userProfile.phoneNumber,
            address: userProfile.address,
            gender: userProfile.gender,
            dateOfBirth: userProfile.dateOfBirth,
            avatar: userProfile.avatar || "/placeholder.svg?height=200&width=200"
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, token, navigate, isTokenValid, fetchUserProfile]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar: imageUrl }));
      toast.success("Profile picture updated successfully");
    }
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Updating profile:", profile);

      const res = await updateProfile(profile);

      if (res.status !== 'success') {
        throw new Error(res.message);
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };

  const handleDateSelect = (date) => {
    handleInputChange("dateOfBirth", date);
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = monthStart;
    const endDate = monthEnd;

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`p-2 text-center cursor-pointer ${!isSameMonth(day, monthStart)
              ? "text-gray-400"
              : isSameDay(day, profile?.dateOfBirth || new Date())
                ? "bg-blue-500 text-white rounded-full"
                : ""
              }`}
            key={day.toString()}
            onClick={() => handleDateSelect(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = new Date(day.getTime() + 24 * 60 * 60 * 1000); // Add a day
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-2">{rows}</div>;
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading indicator
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to='/profile'>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <ArrowLeft className="h-6 w-6" />
            </button>
          </Link>
          <h1 className="text-xl font-semibold">Profile Details</h1>
        </div>
      </header>

      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full border-2 border-gray-200 overflow-hidden cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  src={profile?.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">{`${profile?.firstName} ${profile?.lastName}`}</h2>
              <div className="flex items-center justify-center gap-2 text-orange-500">
                <Check className="h-4 w-4" />
                <span>Level 2</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    id="firstName"
                    className="w-full p-2 border rounded-md"
                    value={profile?.firstName || ''}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    id="lastName"
                    className="w-full p-2 border rounded-md"
                    value={profile?.lastName || ''}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                <input
                  id="middleName"
                  className="w-full p-2 border rounded-md"
                  value={profile?.middleName || ''}
                  onChange={(e) => handleInputChange("middleName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <input
                    id="email"
                    className="w-full p-2 border rounded-md bg-gray-50 pr-10"
                    value={profile?.email || ''}
                    readOnly
                  />
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  id="phoneNumber"
                  className="w-full p-2 border rounded-md"
                  value={profile?.phoneNumber || ''}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  id="address"
                  className="w-full p-2 border rounded-md"
                  value={profile?.address || ''}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  className="w-full p-2 border rounded-md"
                  value={profile?.gender || ''}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-2 relative">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <div className="relative">
                  <input
                    id="dateOfBirth"
                    type="text"
                    className="w-full p-2 border rounded-md cursor-pointer"
                    value={profile?.dateOfBirth ? format(new Date(profile?.dateOfBirth), "MMMM d, yyyy") : ''}
                    readOnly
                    onClick={() => setShowCalendar(!showCalendar)}
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
                </div>
                {showCalendar && (
                  <div className="absolute z-10 bg-white border mt-2 p-4 rounded-lg shadow">
                    <div className="flex justify-between mb-2">
                      <select
                        className="mr-2 border rounded-md p-2"
                        value={MONTHS[currentDate.getMonth()]}
                        onChange={(e) =>
                          setCurrentDate(
                            new Date(
                              currentDate.getFullYear(),
                              MONTHS.indexOf(e.target.value)
                            )
                          )
                        }
                      >
                        {MONTHS.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>

                      <select
                        className="ml-2 border rounded-md p-2"
                        value={currentDate.getFullYear()}
                        onChange={(e) =>
                          setCurrentDate(
                            new Date(
                              Number(e.target.value),
                              currentDate.getMonth()
                            )
                          )
                        }
                      >
                        {YEARS.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    {renderCalendar()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#8B0000] text-white p-2 rounded-md hover:bg-red-600">
            Update Profile
          </button>
        </form>
      </main>
    </div>
  );
}
