import * as Yup from 'yup'
export const CreateTicketSchema = Yup.object({
    title: Yup.string().min(5, "Minimum 5 characters").max(100, "Maximum 100 characters").required("Title is required").trim(),
    description: Yup.string().min(10, "Minimum 10 characters").max(1000, "Maximum 1000 characters").required("Description is required").trim()
});