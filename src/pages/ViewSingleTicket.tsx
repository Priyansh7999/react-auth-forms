import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { viewSingleTicket } from '../services/ticketService.ts';
import type { GetTicketData } from '../types/viewTickets.ts';
import AddComment from '../components/AddComment.tsx';
import ViewComments from '../components/ViewComments.tsx';
import { viewAllComments } from '../services/commentService.ts';
import type { ViewCommentValues } from '../types/ticketComments.ts';
import { getRole } from '../utils/auth.ts';
import Button from '../components/Button.tsx';
import ReassignTicketModal from '../modals/ReassignTicketModal.tsx';
import TicketCard from '../components/TicketCard.tsx';
export default function ViewSingleTicket() {
  const { id } = useParams<string>();
  const [ticket, setTicket] = useState<GetTicketData>();
  const [comments, setComments] = useState<ViewCommentValues[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const [error, setError] = useState<Error>()
  useEffect(() => {
    const fetchTicket = async () => {
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
    fetchTicket();
  }, [id])

  const fetchComments = async () => {
    try {
      const result = await viewAllComments(id!);
      setComments(result?.data || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  useEffect(() => {
    fetchComments();
  }, [id])
  if (error || !id) return <div className='flex h-screen justify-center items-center'>You do not have permission to access this ticket</div>
  return (
    <div className="flex flex-col justify-center">
      <div className='flex flex-col p-3 shadow-md rounded-xl'>
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">
          Ticket Details
        </h1>
        <div className='flex gap-4 justify-center items-center'>
          {
            ticket?.status !== 'CLOSED' || getRole()!="CUSTOMER"
            && <Button title='Assign Ticket to other' onClick={() => setOpenModal(true)} />
          }
          <ReassignTicketModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            ticketId={ticket?.id!}
          />
        </div>
        <TicketCard ticketDetails={ticket}/>
       
      </div>

      <div className='flex flex-col p-2'>
        <h1 className="text-2xl font-bold mb-6 border-b pb-4">
          Comments
        </h1>
        {
          ticket?.status != 'CLOSED' && <AddComment ticketId={id} onCommentAdd={fetchComments} />
        }
        <ViewComments comments={comments} />
      </div>
    </div>
  )
}
