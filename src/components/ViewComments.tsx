import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { CommentProps, ViewCommentsProps, ViewCommentValues } from "../types/ticketComments.ts";
import { viewAllComments } from "../services/commentService.ts";

export default function ViewComments({ comments }: ViewCommentsProps) {

    return (
        <div className="mt-8 flex flex-col gap-6">
            {[...comments].reverse().map((comment, index) => (
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