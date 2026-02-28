import React, { useEffect, useState } from 'react'
import type { GetTicketData } from '../types/viewTickets.js'
import { viewAllTickets } from '../services/ticketService.js'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function ViewAllTickets() {
  const [tickets, setTickets] = useState<GetTicketData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const result = await viewAllTickets()
        setTickets(result?.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('Something went wrong')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [])
  const handleTicketClick=(id: string)=>{
    navigate(`/tickets/${id}`)
  }

  if (isLoading) return <p className="text-center">Loading...</p>

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-center text-2xl font-semibold mb-6">
        ALL TICKETS
      </h2>

      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border-b">Title</th>
            <th className="px-4 py-2 text-left border-b">Description</th>
            <th className="px-4 py-2 text-left border-b">Status</th>
            <th className="px-4 py-2 text-left border-b">Agent</th>
            <th className="px-4 py-2 text-left border-b">Created At</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>handleTicketClick(ticket.id)}>
              <td className="px-4 py-2 border-b">{ticket.title}</td>
              <td className="px-4 py-2 border-b">{ticket.description}</td>
              <td className="px-4 py-2 border-b">{ticket.status}</td>
              <td className="px-4 py-2 border-b">{ticket.agentName}</td>
              <td className="px-4 py-2 border-b">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}