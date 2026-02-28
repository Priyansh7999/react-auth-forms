import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { viewSingleTicket } from '../services/ticketService.ts';
import type { GetTicketData } from '../types/viewTickets.ts';

export default function ViewSingleTicket() {
  const { id } = useParams<string>();
  const [ticket, setTicket] = useState<GetTicketData>();
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const result = await viewSingleTicket(id!)
        setTicket(result?.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('Something went wrong')
        }
      }
    }
    fetchTickets();
  }, [id])
  return (
    <div className="flex flex-col justify-center">
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
  )
}
