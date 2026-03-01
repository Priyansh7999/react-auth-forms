import React from "react";
import type { CommentProps, AddCommentFormValues, } from "../types/ticketComments.ts";
import { Form, Formik, type FormikHelpers } from "formik";
import { AddCommentSchema } from "../schemas/AddCommentSchema.tsx";
import InputField from "./InputField.tsx";
import { addComment } from "../services/commentService.ts";
import { toast } from "react-hot-toast";

export default function AddComment({ ticketId, onCommentAdd }: CommentProps) {
    const initialValues = {
        body: "",
    };
    const handleSubmit = async (values: AddCommentFormValues, { resetForm }: FormikHelpers<AddCommentFormValues>) => {
        try {
            await addComment(ticketId, values);
            onCommentAdd();
            toast.success("Comment added successfully!");
            resetForm();
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to add comment");
            }
        }
    };

    return (
        <div className="mt-6">
            <Formik<AddCommentFormValues>
                initialValues={initialValues}
                validationSchema={AddCommentSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <InputField
                        type="textarea"
                        label="Enter your comment"
                        name="body"
                    />
                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            className="font-sans bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
                        >
                            Send
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}