import type { CreateTicketValues } from "../types/createTicket.js";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};
export const createTicket = async (values: CreateTicketValues) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify(values)
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.message || 'Failed to create ticket');
    }
    return data;
};
export const viewAllTickets = async()=>{
     const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets`,
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

    return data;
}