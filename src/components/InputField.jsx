import { Field, ErrorMessage } from 'formik'
export default function InputField({ label, type, name }) {
  return (
    <div className="mb-4 w-full flex flex-col">
      <label className='mb-2 text-lg font-medium' htmlFor={name}>{label}</label>
      <Field
        type={type}
        name={name}
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1 whitespace-pre-wrap"
      />
    </div>
  )
}