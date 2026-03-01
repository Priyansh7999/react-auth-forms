import React from "react"
import { toast } from "react-hot-toast"
import { getRole } from "../utils/auth.ts"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { UpdateTicketSchema } from "../schemas/UpdateTicketValidation.tsx"
import { updateTicket } from "../services/ticketService.ts"
import type { UpdateTicketRequest, UpdateTicketValues } from "../types/UpdateTicket.ts"

export default function UpdateTicketModal({ isOpen, onClose, ticket, refresh }: UpdateTicketValues) {
  const role = getRole()
  const initialValues = {
    description: ticket?.description,
    status: ticket?.status,
    priority: ticket?.priority,
  }

  const handleUpdate = async (values: UpdateTicketRequest) => {
    try {
      const payload: UpdateTicketRequest = {}

      if (role === "CUSTOMER") {
        payload.description = values.description
        payload.status = values.status
      } else {
        payload.status = values.status
        payload.priority = values.priority
      }

      await updateTicket(ticket.id, payload)
      toast.success("Ticket updated successfully")
      refresh()
      onClose()
    } catch (err: any) {
      toast.error(err.message)
    }
  }
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6 z-10 space-y-4">
        <button onClick={onClose} className="text-end w-full text-gray-500">
          close
        </button>
        <h3 className="text-2xl font-bold mb-6 text-center">
          Update Ticket
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateTicketSchema}
          onSubmit={handleUpdate}
        >
          <Form className="space-y-4">
            {role === "CUSTOMER" && (
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Field
                  className="w-full border p-2 rounded"
                  type="text"
                  name="description"
                  placeholder="Update description"
                />
                <ErrorMessage name="description" />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Field as="select" name="status" className="w-full border p-2 rounded">
                <option value="OPEN">OPEN</option>
                {role === "SUPPORT_AGENT" && (
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                )}
                <option value="CLOSED">CLOSED</option>
              </Field>
              <ErrorMessage name="status" />
            </div>

            {role === "SUPPORT_AGENT" && (
              <div>

                <label className="block text-sm font-medium mb-1">Priority</label>
                <Field as="select" name="priority" className="w-full border p-2 rounded">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </Field>
                <ErrorMessage name="priority" />
              </div>
            )}
            <button
              type="submit"
              className="font-sans w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
            >
              Update
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}