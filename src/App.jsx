import AppRoutes from "./routes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "./contexts/authContexts";
import TransactionProvider from "./contexts/txnContext";


function App() {


  return (
    <>
      <AuthProvider>
      <TransactionProvider>
        <AppRoutes />
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover theme="dark" />
        </TransactionProvider>
      </AuthProvider>

    </>
  )
}

export default App
