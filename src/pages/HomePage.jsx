import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function HomePage() {
    const {user} = useContext(UserContext)
    return (
        <div className='flex flex-col justify-center items-center h-screen gap-4'>
            <h1 className='text-4xl font-bold'>Welcome to the Home Page!</h1>
            <div>
                <h2 className='text-2xl font-semibold'>User Details:</h2>
                <p className='text-lg'><strong>Name:</strong> {user.name}</p>
                <p className='text-lg'><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    )
}
