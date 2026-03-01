import Button from '../components/Button.js'
import { useNavigate } from 'react-router-dom'
import { getUserDetails } from '../services/userService.ts'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { signOut } from '../utils/auth.ts'

type User = {
    name: string
    email: string
    role: string
}

export default function HomePage() {
    const navigate = useNavigate()
    const [user, setUser] = useState<User>()

    const handleSignOut = () => {
        signOut();
        navigate('/sign-in')
    }

    const fetchUser = async () => {
        try {
            const response = await getUserDetails()
            setUser(response?.data)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('Something went wrong')
            }
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-1/3 text-center space-y-4">
                <p className="text-sm text-gray-500 uppercase">
                    {user?.role}
                </p>
                <h1 className="text-xl font-semibold">
                    Welcome Back
                </h1>

                <h2 className="text-2xl font-bold">
                    HELLO, {user?.name}
                </h2>

                <div className="text-left text-sm space-y-1">
                    <p><span className="font-medium">Name:</span> {user?.name}</p>
                    <p><span className="font-medium">Email:</span> {user?.email}</p>
                    <p><span className="font-medium">Role:</span> {user?.role}</p>
                </div>
                <Button title="Sign Out" onClick={handleSignOut} />
            </div>
        </div>
    )
}