/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './authContexts';
import { date } from 'yup';

const WalletContext = createContext();

export const UseWallet = () => {
    return useContext(WalletContext);
}

export const WalletProvider = ({ children }) => {
    const { user, token, isAuthenticated, } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL

    const [loading, setLoading] = useState(false);
    // const [accounts, setAccounts] = useState([]);


    useEffect(() => {
        if (isAuthenticated) {
            //   fetchAccounts();
            console.log(user);

        }
    }, [isAuthenticated]);


    const verifyNIN = async (verificationNumber) => {
        try {

            const nin = verificationNumber
            const response = await axios.post(`${apiUrl}/monnify/nin-details`, { nin }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status == '200') {
                toast.success('NIN verified successfully');
                return response.data.data;
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);

            toast.error('Error verifying BVN');
        }

    }

    const verifyBVN = async (verificationNumber, name, formattedDate, mobileNumber) => {

        const bvn = verificationNumber
        const dateOfBirth = formattedDate
        const mobileNo = mobileNumber

        try {
            const response = await axios.post(`${apiUrl}/monnify/bvn-details`, { bvn, name, dateOfBirth, mobileNo }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Auth BVN', response);


            if (response.status == '200') {
                toast.success('BVN verified successfully');
                return response.data.data;
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);

            toast.error('Error verifying BVN');
        }
    }

    const values = {
        // loading,
        // accounts,
        verifyNIN,
        verifyBVN
    }

    return (
        <WalletContext.Provider value={values} className="flex align-center justify-center">
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
        </WalletContext.Provider>
    );


}

export { WalletContext };

export default WalletProvider


