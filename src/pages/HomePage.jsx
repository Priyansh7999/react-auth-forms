import { useState } from 'react'
import Button from '../components/Button'
import CreateTicketModel from '../models/CreateTicketModel'
export default function HomePage() {
    const [model, setModel] = useState(false)
    const handleClick = () => {
        setModel(!model)
    }
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col items-center p-2 h-screen gap-4'>
                <h1 className='text-4xl font-bold'>Welcome to the Home Page!</h1>
                <div>
                    <Button title={"Create Ticket"} onClick={handleClick} />
                </div>
            </div>
            <div className='absolute w-full bg-transparent'>
                {
                    model && (
                        <div className='flex justify-center items-center'> 
                            <CreateTicketModel handleClose={handleClick} />
                        </div>)
                }
            </div>
        </div>
    )
}
