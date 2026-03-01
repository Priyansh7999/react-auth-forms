import { useEffect, useState } from 'react'
import Button from '../components/Button.js'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
    const navigate = useNavigate()
    const handleSignOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/sign-in')
    }
    return (
        <div className='flex flex-col justify-center items-center p-2 gap-4 w-full h-full'>
            <h1 className='text-4xl font-bold'>Welcome to the Home Page!</h1>
            <Button title='Sign Out' onClick={handleSignOut}/>
        </div>
    )
}
