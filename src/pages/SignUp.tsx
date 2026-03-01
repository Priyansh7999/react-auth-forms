import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import InputField from '../components/InputField.js'
import { SignupSchema } from '../schemas/signupSchema.js'
import { registerUser } from '../services/userService.js'
import type { RegistrationDetails } from '../types/auth.js'



export default function SignUp() {
  const navigate = useNavigate()

  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = async (values: RegistrationDetails) => {
    try {
      const { name, email, password } = values;
      await registerUser({name,email,password});
      toast.success('Registration successful! Please sign in.')
      navigate('/sign-in')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('An error occurred during registration')
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md flex flex-col border border-gray-300 rounded-lg p-8 bg-white shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-center">Sign Up</h3>

        <Formik<RegistrationDetails>
          initialValues={initialState}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField label="Name" type="text" name="name" />
            <InputField label="Email" type="email" name="email" />
            <InputField label="Password" type="password" name="password" />
            <InputField label="Confirm Password" type="password" name="confirmPassword" />

            <div className="mt-6">
              <button
                type="submit"
                className="font-sans bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>

        <h2 className="mt-4 text-lg text-center text-gray-600">
          Already have an account?{' '}
          <span
            className="cursor-pointer text-blue-500"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </span>
        </h2>
      </div>
    </div>
  )
}