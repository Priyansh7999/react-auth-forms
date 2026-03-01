import type { AddCommentFormValues } from "../types/ticketComments.ts";
import { getToken } from "../utils/auth.ts";

const getAuthHeader = () => {
  const token = getToken();
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
  console.log(data)
  return data;
};
export const viewAllComments = async(ticketId:string)=>{
  const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets/${ticketId}/comments`,
        {
            method: 'GET',
            headers: {
                ...getAuthHeader()
            }
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.message || 'Failed to create ticket');
    }
    console.log(data)
    return data;
}