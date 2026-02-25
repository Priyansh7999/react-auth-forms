import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center h-screen gap-4'>
            <button
                className="font-sans bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
                onClick={() => navigate('/sign-in')}
            >
                Sign In
            </button>
            <button
                className="font-sans bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
                onClick={() => navigate('/sign-up')}
            >
                Sign Up
            </button>
        </div>
    )
}
