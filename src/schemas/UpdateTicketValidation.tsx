import * as Yup from 'yup'
export const UpdateTicketSchema = Yup.object({
    description: Yup.string().min(10, "Minimum 10 characters").max(1000, "Maximum 1000 characters").required("Description is required").trim(),
    status:Yup.string().oneOf(['CLOSED','IN_PROGRESS','OPEN']),
    priority:Yup.string().oneOf(['LOW','MEDIUM','HIGH']),
});