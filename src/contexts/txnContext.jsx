/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./authContexts";

const TransactionContext = createContext();

export const useTransaction = () => {
  return useContext(TransactionContext);
};

const TransactionProvider = ({ children }) => {
  const { token, user, isAuthenticated } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [plans, setPlans] = useState([]);
  const [cablePlans, setCablePlans] = useState([])



  // Fetch user's transaction history on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchDataPlans()
      fetchTransactions();
      getCablePlans()
    }
  }, [isAuthenticated]);

  //fetch data plans from backend

  const fetchDataPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/dataPlans/plans`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Correctly access the response data
      const plans = res.data.dataPlans || [];

      console.log('Response', res);

      console.log('Plan res', plans);

      setPlans(plans);
      console.log('DataPlans', plans);

      return plans;
    } catch (err) {
      console.log(`Error fetching data plans: ${err.message}`);
      return err.message
    } finally {
      setLoading(false); // Ensure loading is set to false after request finishes
    }
  };


  // Fetch transaction history
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const id = await user._id
      const res = await axios.get(`${apiUrl}/data/user/:${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);

      setTransactions(res.data.data || []);
      return res;
    } catch (err) {
      toast.error(err?.response?.data.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  //Buy Data

  const buyData = async (formData) => {
    // setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/data/purchase`, {
        formData
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Res", res.data);
      //   setLoading(false)
      return res.data;
    } catch (err) {
      console.log("Error", err.response.data);

      toast.error(err?.response?.data.message || "Failed to buy data");

      return err.response.data.error;

    }
  }

  const buyAirtime = async (formData) => {
    // setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/airtime/purchase`, {
        formData
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Res", res.data);
      //   setLoading(false)
      return res.data;
    } catch (err) {
      console.log("Error", err.response.data);

      toast.error(err?.response?.data.message || "Failed to buy airtime");

      return err.response.data.error;

    }
  }

  const getCablePlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/cablePlans/fetch`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token if necessary
        },
      });

      // console.log('Full Response:', res);
      const cablePlans = res.data || [];

      // console.log('Extracted Cable Plans:', cablePlans);
      setCablePlans(cablePlans);

      return cablePlans;
    } catch (err) {
      console.log(`Error fetching cable plans: ${err.response?.data?.message || err.message}`);
      return err.message;
    } finally {
      setLoading(false); // Ensure loading is set to false after request finishes
    }
  };

  const verifyCablePlan = async (provider, iuc) => {
    // setLoading(true);

    const formData = {
      smartCardNo: iuc,
      cableType: provider
    }

    console.log('FormData', formData);


    try {
      const cableVer = await axios.post(`${apiUrl}/cable/verify-iuc/`, {
        formData
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Res", cableVer);
      //   setLoading(false)
      return cableVer.data;
    } catch (err) {
      console.log("Error", err);

      toast.error(err?.response?.data.message || "Failed to verify cable plan");

      return err.response.data.message;

    }
  }

  const buyCable = async (currentPlan, selectedPlan) => {
    // setLoading(true);
    const year = new Date().getFullYear();
    const reference = `${year}${Date.now()}${Math.floor(Math.random() * 1000000000)}`;

    const payload = {
      cableType: selectedPlan.planType,
      planId: selectedPlan.planId,
      amount: selectedPlan.ourPrice,
      paymentTypes: "TOP_UP",
      customerName: currentPlan.customerName,
      iuc: currentPlan.smartCardNo,
      phoneNo: '08038295877',
      reference
    }

    console.log('Payload', payload);

    try {
      const res = await axios.post(`${apiUrl}/cable/purchase-cable`, {
        payload
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Res", res);
      //   setLoading(false)
      return res.data;
    } catch (err) {
      console.log("Error", err);

      toast.error(err?.response?.data.message || "Failed to buy cable, Please contact admin.");

      return err.response.data;
    }
  }

  const verifyMeterNumber = async (meterNumber, productId) => {
    // setLoading(true);
    const payload = {
      meterNumber: meterNumber,
      productId: productId,
      type: "prepaid"
    }
    try {
      const meterVer = await axios.post(`${apiUrl}/electricDisco/validateMeter`, {
        payload
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Res", meterVer);
      // setLoading(false)
      return meterVer.data;
    } catch (err) {
      console.log("Error", err);

      toast.error(err?.response?.data.message || "Failed to verify meter number");

      return err.response.data.message;

    }
  }

  const buyElectricToken = async (meterNumber, productId, amount, type) => {
    // setLoading(true);

    const payload = {
      meterNumber: meterNumber,
      productId: productId,
      amount: amount,
      type: type,
      pin: '1590'
    }
    try {
      const electricToken = await axios.post(`${apiUrl}/electricDisco/purchase`, {
        payload
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Res", electricToken);
      // setLoading(false)
      return electricToken.data;
    }
    catch (err) {
      console.log("Error", err);

      toast.error(err?.response?.data.error || "Failed to buy token, Please contact admin.");

      return err.response.data.error || err.response.data.message;

    }
  }

  const values = {
    loading,
    transactions,
    selectedTransaction,
    fetchTransactions,
    buyData,
    buyAirtime,
    fetchDataPlans,
    plans,
    getCablePlans,
    cablePlans,
    verifyCablePlan,
    buyCable,
    verifyMeterNumber,
    buyElectricToken
  };

  return (
    <TransactionContext.Provider value={values} className="flex align-center justify-center">
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
    </TransactionContext.Provider>
  );
};

export { TransactionContext };
export default TransactionProvider;
