/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContexts';
import { Eye, EyeOff } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext); 

  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // Function to check if the token is valid or expired
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      toast.error(`${error}`);
      return false; // If there's an error decoding the token, consider it invalid
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenValid(token)) {
        toast.success('Logged in successfully')
        navigate('/dashboard');
      } else {
        // If the token is expired, remove it and notify the user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please log in again.');
      }
    }
  }, [navigate]); // Run this effect only once when the component mounts

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Logging form values for debugging
      console.log('Submitted values:', values);
      // setIsLoading(true);
      setSubmitting(true);

      // Call the login function from AuthContext
      const response = await login(values);

      // Log the response from the login function
      // console.log('Login response:', response);

      if (response && response.token) {
        // setIsLoading(false);
        // Redirect to the dashboard after a successful login
        navigate('/dashboard');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // toast.error(`${error}`)
      // console.error('Login Error:', error);
      setSubmitting(false);

      // Display an error toast notification
      toast.error(error?.message || 'Login failed, please try again');
    } finally {
      // setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-[90%] max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-gray-600 mt-2">Please enter your details to sign in</p>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                </div>

                <div className="flex items-center justify-between">
                  

                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-[#8B0000] hover:text-orange-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#8B0000] hover:bg-orange-500" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-[#8B0000] hover:text-orange-500">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;