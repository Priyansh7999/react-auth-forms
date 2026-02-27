import { Form, Formik, type FormikHelpers} from 'formik'
import {toast} from 'react-hot-toast'
import { createTicket } from '../services/ticketService.js'
import { CreateTicketSchema } from '../schemas/CreateTicketSchema.js'
import InputField from '../components/InputField.js'

type CreateTicketModelProps = {
  handleClose: () => void
}

type CreateTicketValues = {
  title: string
  description: string
}

export default function CreateTicketModel({
  handleClose
}: CreateTicketModelProps) {

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
      handleClose()

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-transparent w-full">
      <div className="absolute bg-black opacity-50 w-full h-full z-0" />

      <div className="z-10 w-full max-w-md flex flex-col border border-gray-300 rounded-lg p-8 bg-white shadow-md">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <h3 className="text-2xl font-bold mb-4 text-center">
          Create Ticket
        </h3>

        <Formik<CreateTicketValues>
          initialValues={initialValues}
          validationSchema={CreateTicketSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField label="Title" type="text" name="title" />
            <InputField label="Description" type="text" name="description" />

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Ticket
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}