import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContexts';
import { Eye, EyeOff } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  phoneNumber: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10, 'Must be at least 10 digits').required('Phone number is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {signup} = useContext(AuthContext)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Submitted Value', values);
      setSubmitting(true)

      const response = await signup(values)


      console.log('SignUp response', response);

      if (response && response.token) {
        navigate('/dashboard')
      } else {
        throw new Error (`${response}`)
      }
      

    } catch (error) {
       console.log(error);
       toast.error(`${error}`)
       setSubmitting(false)
        
    } finally{
      setSubmitting(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b px-4 py-4">
        {/* Header content */}
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Create an account</h2>
            <p className="text-gray-600 mt-2">Please fill in your details to sign up</p>
          </div>

          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', phoneNumber: '', terms: false }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Field
                      as={Input}
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && touched.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Field
                      as={Input}
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && touched.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                  </div>
                </div>

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
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Field
                    as={Input}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && touched.phoneNumber && <div className="text-red-500 text-sm">{errors.phoneNumber}</div>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
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

                

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="h-4 w-4 rounded border-gray-300 text-[#8B0000] focus:ring-[#8B0000]"
                  />
                  <Label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{' '}
                    <Link to="/terms" className="font-medium text-[#8B0000] hover:text-orange-600">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-medium text-[#8B0000] hover:text-orange-600">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.terms && touched.terms && <div className="text-red-500 text-sm">{errors.terms}</div>}

                <Button type="submit" className="w-full bg-[#8B0000] hover:bg-orange-600" disabled={isSubmitting}>
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </Button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#8B0000] hover:text-orange-600">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;

