import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { SignupSchema } from '../schemas/signupSchema'
import Button from '../components/Button'
import InputField from '../components/InputField'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
export default function SignUp() {
  const { setUser } = useContext(UserContext)
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    const { name, email, password } = values
    setUser({ name, email, password })
    navigate('/sign-in')
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col border border-gray-300 rounded-lg p-6 bg-white shadow-md'>
        <h3 className='text-2xl font-bold mb-4 text-center'>Sign Up</h3>
        <Formik
          initialValues={initialState}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField label="Name" type="text" name="name" />
            <InputField label="Email" type="email" name="email" />
            <InputField label="Password" type="password" name="password" />
            <InputField label="Confirm Password" type="password" name="confirmPassword" />
            <div className="mt-4 flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
        <h2 className="mt-4 text-lg text-center text-gray-600">Already have an account? <span className='cursor-pointer text-blue-500' onClick={() => navigate('/sign-in')}>Sign In</span></h2>
      </div>
    </div>
  )
}