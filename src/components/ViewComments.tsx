import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { CommentProps, ViewCommentValues } from "../types/ticketComments.ts";
import { viewAllComments } from "../services/commentService.ts";

export default function ViewComments({ ticketId }: CommentProps) {
    const [comments, setComments] = useState<ViewCommentValues[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const result = await viewAllComments(ticketId);
                setComments(result?.data || []);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("Something went wrong");
                }
            }
        };

        fetchComments();
    }, [ticketId]);

    if (comments.length === 0) {
        return (
            <div className="mt-6 text-center text-gray-500">
                No comments yet.
            </div>
        );
    }

    return (
        <div className="mt-8 flex flex-col gap-6">
            {comments.reverse().map((comment, index) => (
                <div key={index} className=" border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">
                            {comment.commenter}
                        </h3>
                        <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                            <span> </span>
                            {new Date(comment.createdAt).toLocaleTimeString()}
                        </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">
                        {comment.comment}
                    </p>
                </div>
            ))}
        </div>
    );
}