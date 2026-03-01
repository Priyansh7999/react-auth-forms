import React from 'react'
import { getRole } from '../utils/auth.ts'
import type { GetTicketData, TicketCardProps } from '../types/viewTickets.ts'

export default function TicketCard({ ticketDetails }: TicketCardProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">Title</p>
        <h2 className="text-xl font-semibold mt-1">
          {ticketDetails?.title}
        </h2>
      </div>

      <div>
        <p className="text-sm text-gray-500">Description</p>
        <p className="mt-1 text-gray-700 leading-relaxed">
          {ticketDetails?.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Status</p>
          {ticketDetails?.status}
        </div>

        {getRole() === 'CUSTOMER' && (
          <div>
            <p className="text-sm text-gray-500">Assigned Agent</p>
            <p className="mt-1 font-medium">
              {ticketDetails?.agentName || "Not Assigned"}
            </p>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500">Created At</p>
        <p className="mt-1">
          {new Date(ticketDetails?.createdAt!).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}