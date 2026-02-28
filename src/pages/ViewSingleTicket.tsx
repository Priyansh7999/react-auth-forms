import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { viewSingleTicket } from '../services/ticketService.ts';
import type { GetTicketData } from '../types/viewTickets.ts';
import AddComment from '../components/AddComment.tsx';
export default function ViewSingleTicket() {
  const { id } = useParams<string>();
  const [ticket, setTicket] = useState<GetTicketData>();
  const [error,setError]=useState<Error>()
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const result = await viewSingleTicket(id!)
        setTicket(result?.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error)
          toast.error(error.message)
        } else {
          toast.error('Something went wrong')
        }
      }
    }
    fetchTickets();
  }, [id])
  if(error || !id) return <div className='flex h-screen justify-center items-center'>You do not have permission to access this ticket</div>
  return (
    <div className="flex flex-col justify-center">
      <div className='flex flex-col p-3 shadow-md rounded-xl'>
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">
          Ticket Details
        </h1>

        <div className="space-y-6">

          <div>
            <p className="text-sm text-gray-500">Title</p>
            <h2 className="text-xl font-semibold mt-1">
              {ticket?.title}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="mt-1 text-gray-700 leading-relaxed">
              {ticket?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              {ticket?.status}
            </div>
            <div>
              <p className="text-sm text-gray-500">Assigned Agent</p>
              <p className="mt-1 font-medium">
                {ticket?.agentName || "Not Assigned"}
              </p>
            </div>

          </div>

          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="mt-1">
              {new Date(ticket!?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col p-2'>
         <h1 className="text-2xl font-bold mb-6 border-b pb-4">
          Comments
        </h1>
          <AddComment ticketId={id} />
      </div>
    </div>
  )
}
