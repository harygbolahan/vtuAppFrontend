import AppRoutes from "./routes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "./contexts/authContexts";
import TransactionProvider from "./contexts/txnContext";
import WalletProvider from "./contexts/walletContexts";



function App() {


  return (
    <>
      <AuthProvider>
        <WalletProvider>
          <TransactionProvider>
            <AppRoutes />
            <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover theme="dark" />
          </TransactionProvider>
        </WalletProvider>
      </AuthProvider>

    </>
  )
}

export default App
