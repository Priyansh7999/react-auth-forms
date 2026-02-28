import * as Yup from 'yup'
export const AddCommentSchema = Yup.object({
    body: Yup.string().max(1000, "Maximum 100 characters").required("body is required").trim(),
});