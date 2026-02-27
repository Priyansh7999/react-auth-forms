import { Form, Formik } from 'formik'
import React from 'react'
import { CreateTicketSchema } from '../schemas/CreateTicketSchema'
import InputField from '../components/InputField'
import toast from 'react-hot-toast'

export default function CreateTicketModel({handleClose}) {
    const initialValues = {
        title: '',
        description: ''
    }
    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(values)
            })
            const data = await response.json()
            if (!response.ok) {
                const message = data?.message;
                toast.error(message || 'Failed to create ticket');
                return;
            }
            toast.success('Ticket created successfully!');
        } catch (error) {
            console.log(error)
            toast.error(error.message || 'An error occurred while creating the ticket')
        }
    }
    return (
        <div className='flex justify-center items-center h-screen bg-transparent w-full'>
            <div className='absolute bg-black opacity-50 w-full h-full z-0'>
            </div>
            <div className='z-1 w-full max-w-md flex flex-col border border-gray-300 rounded-lg p-8 bg-white shadow-md'>
                <div className='flex justify-end'>
                    <button onClick={handleClose} className=" text-gray-500 hover:text-gray-700">
                        Close
                    </button>
                </div>
                <h3 className='text-2xl font-bold mb-4 text-center'>Create Ticket</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={CreateTicketSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <InputField label="Title" type="text" name="title" />
                        <InputField label="Description" type="text" name="description" />

                        <div className="mt-4 flex justify-center">
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Create Ticket
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}