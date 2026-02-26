import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
export default function HomePage() {
    const navigate = useNavigate()
    return (
        <div className='flex p-2 justify-center h-screen gap-4'>
            <h1 className='text-4xl font-bold'>Welcome to the Home Page!</h1>
            <div>
                <Button title={"Create Ticket"} onClick={() => navigate('/create-ticket')} />
            </div>
        </div>
    )
}
