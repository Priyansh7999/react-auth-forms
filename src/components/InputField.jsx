import { Field, ErrorMessage } from 'formik'
export default function InputField({ label, type, name }) {
  return (
    <div className="mb-4">
      <label className='mb-2 text-xl mt-10 w-full' htmlFor={name}>{label}</label>
      <Field
        type={type}
        name={name}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  )
}