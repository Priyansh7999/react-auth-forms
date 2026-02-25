import { Form, Formik } from 'formik'
import React from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { SignInSchema } from '../schemas/signinSchema'
import { useNavigate } from 'react-router-dom'
export default function SignIn() {
  const initialState = {
    email: '',
    password: ''
  }
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    alert(`Email: ${values.email}\nPassword: ${values.password}`)
    navigate('/')
  }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col border border-gray-300 rounded-lg p-6 bg-white shadow-md'>
        <h3 className='text-2xl font-bold mb-4 text-center'>Sign In</h3>
        <Formik
          initialValues={initialState}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField label="Email" type="email" name="email" />
            <InputField label="Password" type="password" name="password" />
            <div className="mt-4 flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </div>
          </Form>
        </Formik>
        <h2 className="mt-4 text-center text-lg text-gray-600">Don't have an account? <span className='cursor-pointer text-blue-500' onClick={() => navigate('/sign-up')}>Sign Up</span></h2>
      </div>
    </div>
  )
}
