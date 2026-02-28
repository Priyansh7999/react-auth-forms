import type { AddCommentFormValues } from "../types/ticketComments.ts";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const addComment = async (ticketId: string, values: AddCommentFormValues) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets/${ticketId}/comments`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        body: values.body,
      }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to add comment");
  }
  return data;
};