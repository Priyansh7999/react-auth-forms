import React, { useEffect, useState } from 'react'
import type { GetAllAgents, ReassignTicketModalProp, ReassignTicketValues } from '../types/reassignTicket.ts'
import { getAllAgentsList, reassignTicket } from '../services/reassignService.ts'
import { toast } from 'react-hot-toast'
import { Field, Form, Formik } from 'formik'
import { ReassignTicketSchema } from '../schemas/ReassignTicketSchema.tsx'
import { useNavigate, useParams } from 'react-router-dom'

export default function ReassignTicketModal({ isOpen, onClose, ticketId }: ReassignTicketModalProp) {
    const [allAgents, setAllAgents] = useState<GetAllAgents[]>([])
    const naviage = useNavigate()
    const initialValues = {
        agentId: ''
    }

    const fetchAllAgents = async () => {
        try {
            const results = await getAllAgentsList()
            setAllAgents(results?.data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('Something went wrong')
            }
        }
    }

    useEffect(() => {
        if (isOpen) {
            fetchAllAgents()
        }
    }, [isOpen])

    const handleSubmit = async (values: ReassignTicketValues) => {
        try {
            await reassignTicket(ticketId, values)
            toast.success("Ticket reassigned successfully")
            naviage('/agent/tickets')

            onClose()
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('Something went wrong')
            }
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 z-10">
                <button onClick={onClose} className="text-end w-full text-gray-500">
                    close
                </button>
                <h3 className="text-2xl font-bold mb-6 text-center">
                    Reassign Ticket
                </h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ReassignTicketSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="space-y-5">
                        <div className="flex flex-col">
                            <label className="mb-2 text-lg font-medium">
                                Select Agent
                            </label>

                            <Field
                                as="select"
                                name="agentId"
                                className="border px-4 py-3 rounded-xl"
                            >
                                <option value="">Select an agent</option>
                                {allAgents.map((agent) => (
                                    <option key={agent.id} value={agent.id}>
                                        {agent.email}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-xl"
                        >
                            Assign Ticket
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}