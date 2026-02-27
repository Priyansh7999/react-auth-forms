import { useEffect, useState } from 'react'
import Button from '../components/Button'
import CreateTicketModel from '../modals/CreateTicketModal'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
    const [modal, setModal] = useState(false)
    const [tickets, setTickets] = useState([])

    const navigate = useNavigate()
    const handleClick = () => {
        setModal(!modal)
    }
    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/sign-in')
    }

    const addTicket = ticket => {
        setTickets([...tickets, ticket])
        console.log('Ticket added:', ticket)
    }
    
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col items-center p-2 h-screen gap-4'>
                <h1 className='text-4xl font-bold'>Welcome to the Home Page!</h1>
                <div>
                    <Button title={"Create Ticket"} onClick={handleClick} />
                </div>
                <div>
                    <Button title="Sign Out" onClick={handleSignOut} />
                </div>
            </div>
            <div>
                {
                    tickets.map((ticket, idx) => (
                        <div
                            key={ticket.id ?? idx}    
                            className='border border-gray-300 rounded-lg p-4 mb-4'
                        >
                            <h2 className='text-xl font-bold mb-2'>{ticket?.data?.title}</h2>
                            <p>{ticket?.data?.description}</p>
                        </div>
                    ))}
            </div>
            <div className={`absolute w-full bg-transparent ${modal ? 'block' : 'hidden'}`}>
                {
                    modal && (
                        <div className='flex justify-center items-center'>
                            <CreateTicketModel handleClose={handleClick} onTicketCreated={addTicket} />
                        </div>)
                }
            </div>
        </div>
    )
}
