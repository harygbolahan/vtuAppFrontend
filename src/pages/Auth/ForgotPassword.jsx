import { ArrowLeft } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

function ForgotPassword() {
const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Forgot password submitted:', values);
    setTimeout(() => {
        navigate('/');
    },3000)
    toast.success('Password reset email sent!');
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b px-4 py-4">
        <Link to="/login" className="inline-flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Login</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Forgot Password</h2>
            <p className="text-gray-600 mt-2">Enter your email to reset your password</p>
          </div>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
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

                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;