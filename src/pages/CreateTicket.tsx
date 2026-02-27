import { Form, Formik, type FormikHelpers } from 'formik'
import React from 'react'
import { createTicket } from '../services/ticketService.js'
import { toast } from 'react-hot-toast'
import { CreateTicketSchema } from '../schemas/CreateTicketSchema.js'
import InputField from '../components/InputField.js'

type CreateTicketValues = {
    title: string
    description: string
}

export default function CreateTicket() {
    const initialValues: CreateTicketValues = {
        title: '',
        description: ''
    }

    const handleSubmit = async (
        values: CreateTicketValues,
        { resetForm }: FormikHelpers<CreateTicketValues>
    ) => {
        try {
            await createTicket(values)
            toast.success('Ticket created successfully!')
            resetForm()
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('Something went wrong')
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                
                <h3 className="text-2xl font-bold mb-6 text-center">
                    Create Ticket
                </h3>

                <Formik<CreateTicketValues>
                    initialValues={initialValues}
                    validationSchema={CreateTicketSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="space-y-5">
                        
                        <InputField
                            label="Title"
                            type="text"
                            name="title"
                        />

                        <InputField
                            label="Description"
                            type='text'
                            name="description"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-2.5 rounded-lg"
                        >
                            Create Ticket
                        </button>

                    </Form>
                </Formik>
            </div>
        </div>
    )
}