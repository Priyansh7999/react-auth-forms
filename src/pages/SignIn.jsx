import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import InputField from '../components/InputField'
import { SignInSchema } from '../schemas/signinSchema'
import { useNavigate } from 'react-router-dom'
export default function SignIn() {
  const initialState = {
    email: '',
    password: ''
  }
  const navigate = useNavigate()

  const handleSubmit = async(values) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/auth/login`,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body : JSON.stringify(values)
      })
      const data = await response.json()
      if(!response.ok){
        const message = data?.message;
        alert(message)
        return;
      }
      localStorage.setItem('token', data?.data?.token)
      console.log(data)
      console.log(data?.data?.token)
      navigate('/')
    } catch (error) {
      console.log(error)
      alert(error.message || 'An error occurred during login')
    }
  }
  return (
   <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md flex flex-col border border-gray-300 rounded-lg p-8 bg-white shadow-md'>
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
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
