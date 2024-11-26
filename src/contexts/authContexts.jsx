/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Corrected import

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(true); // Initially set to true to wait for loading
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // Retrieve token and user from localStorage on initial mount


    // Token validity check using JWT
    const isTokenValid = (token) => {
        if (!token) return false;
        try {
            const decoded = jwtDecode(token); // Decode the JWT token
            const currentTime = Date.now() / 1000; // Current time in seconds
            return decoded.exp > currentTime; // Check if the token is still valid
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    // Computed boolean indicating if the user is authenticated
    const isAuthenticated = !!token && isTokenValid(token);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && isTokenValid(storedToken)) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        } else {
            // If token is invalid or not present, clear any existing data
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }

        setLoading(false); // Data loading is complete
    }, [isAuthenticated]);



    const signup = async (data) => {
        // setLoading(true);
        const { firstName, lastName, email, password, phoneNumber } = data

        const newData = { firstName, lastName, email, password, phoneNumber }
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, newData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { token, user } = res.data.data;
            setToken(token);
            setUser(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Registration successful");
            return res.data.data
        } catch (err) {
            console.log('Err Data Auth', err);

            // toast.error(err?.response?.data.message || "An Error occurred");

            //iF ERROR MESSAGE INCLUDES DUPLICATE

            // if (err?.response?.data.message.includes("duplicate key error")) {
            //     const errMessage = err?.response?.data.message
            //     const errorMessage = errMessage.split("index:")[1].split("_1 dup key")[0].trim() + ' exits already. Please use another '
            //     toast.error(errorMessage)
            // }

            return err?.response?.data.message
        } finally {
            // setLoading(false);
        }
    };

    const login = async (data) => {
        // setLoading(true);

        try {
            const res = await axios.post(`${apiUrl}/auth/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { token, user } = res.data.data;
            setToken(token);
            setUser(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login Successful");
            return res.data.data;
        } catch (err) {
            toast.error(err || "An Error occurred");
            return err;
        } finally {
            // setLoading(false);
        }
    };

    // In your UserContext
    const fetchUserData = useCallback(async () => {
        // setLoading(true);
        try {
            const res = await axios.get(`${apiUrl}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const user = res.data.data.user;
            console.log('user', user);
    
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            // Ensure loading state is reset regardless of success or error
            // setLoading(false);
        }
    }, [token]);
    // Token as dependency if it can change

    const updateProfile = async (data) => {
        // setLoading(true);
        try {
            console.log('Data', data);

            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                address: data.address,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,

            }

            console.log('payload', payload);
            
            
            const res = await axios.patch(`${apiUrl}/users/profile`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Res',res);
            

            const updatedUser = res.data.data.user;
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            return res.data
            // toast.success("Profile Updated");
        } catch (err) {
            toast.error(
                err?.response?.data.message ||
                "Profile update failed! An Error occurred"
            );
        } finally {
            // setLoading(false);
        }
    };

    const updatePin = async (data) => {
        try {

            const payload = {
                email: data.email,
                transactionPin: data.pin
            }

            console.log('Payload', payload);


            const res = await axios.patch(`${apiUrl}/auth/set-pin`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log('cont res', res);
            // return res.data

            return res.data

        } catch (error) {
            console.log('Auth err', error.response.data);
            return error.response.data

        }
    }

    const changePin = async (data) => {
        try {

            const payload = {
                email: user.email,
                oldTransactionPin: data.oldPin,
                newTransactionPin: data.newPin,
                confirmNewTransactionPin: data.confirmPin
            }

            console.log('Payload', payload);


            const res = await axios.patch(`${apiUrl}/auth/change-pin`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            }); 
            return res.data

        } catch (error) {
            console.log('Auth err', error.response.data);
            return error.response.data

        }
    }

    const resetPin = async (data) => {
        try {

            const payload = {
                email: user.email,
                password: data.password,
                transactionPin: data.newPin
            }

            console.log('Payload', payload);
            const res = await axios.patch(`${apiUrl}/auth/set-pin`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log('cont res', res);
            return res.data

        } catch (error) {
            console.log('Auth err', error.response.data);
            return error.response.data

        }
    }

    const changePassword = async (data) => {
        try {
            console.log('Data', data);
            
            const payload = {
                email: user.email,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmNewPassword: data.confirmPassword
            }

            console.log('Payload', payload);
            const res = await axios.patch(`${apiUrl}/auth/change-password`, payload, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            return res.data

        } catch (error) {
            console.log('Auth err', error.response.data);
            return error.response.data

        }

    }

    const forgetPassword = async (data) => {
        try {
            console.log('Data', data);

            const payload = {
                email: data.email
            }

            console.log('Payload', payload);
            const res = await axios.post(`${apiUrl}/auth/forgot-password`, payload, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            return res.data

        } catch (error) {
            console.log('Auth err', error.response.data);
            return error.response.data

        }
    }



    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout Successful");
    };



    const values = {
        loading,
        token,
        user,
        signup,
        login,
        logout,
        updateProfile,
        isAuthenticated,
        isTokenValid,
        fetchUserData,
        updatePin,
        changePin,
        resetPin,
        changePassword,
        forgetPassword
    };

    return (
        <AuthContext.Provider value={values} className="flex align-center justify-center">
            {loading ? (
                <div className="loading-container h-screen flex items-center justify-center">
                    <div className="flex flex-row gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;
