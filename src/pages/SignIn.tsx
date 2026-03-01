import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { SignInSchema } from '../schemas/SignInSchema.js'
import InputField from '../components/InputField.js'
import { loginUser } from '../services/userService.js'
import type { LoginDetails } from '../types/auth.js'
import { getRole } from '../utils/auth.ts'


export default function SignIn() {
  const navigate = useNavigate()

  const initialState = {
    email: '',
    password: ''
  }

  const handleSubmit = async (values: LoginDetails) => {
    try {
      await loginUser(values);
      toast.success('Login successfully!')
      const role = getRole();

      if (role === 'CUSTOMER') {
        navigate('/customer');
      } else if (role === 'AGENT') {
        navigate('/agent'); 
      } else {
        navigate('/sign-in');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('An error occurred during login')
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md flex flex-col border border-gray-300 rounded-lg p-8 bg-white shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-center">Sign In</h3>

        <Formik<LoginDetails>
          initialValues={initialState}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField label="Email" type="email" name="email" />
            <InputField label="Password" type="password" name="password" />

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </button>
            </div>
          </Form>
        </Formik>

        <h2 className="mt-4 text-center text-lg text-gray-600">
          Don't have an account?{' '}
          <span
            className="cursor-pointer text-blue-500"
            onClick={() => navigate('/sign-up')}
          >
            Sign Up
          </span>
        </h2>
      </div>
    </div>
  )
}