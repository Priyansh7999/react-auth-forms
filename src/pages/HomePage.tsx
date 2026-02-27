import { useEffect, useState } from 'react'
import Button from '../components/Button.js'
import CreateTicketModel from '../modals/CreateTicketModal.js'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
    const [modal, setModal] = useState(false)

    const navigate = useNavigate()
    const handleClick = () => {
        setModal(!modal)
    }
    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/sign-in')
    }
    return (
        <div className='flex flex-col justify-center items-center p-2 gap-4 w-full h-full'>
            <h1 className='text-4xl font-bold'>Welcome to the Home Page!</h1>
        </div>
    )
}
