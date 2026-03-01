import type { CreateTicketValues } from "../types/createTicket.js";
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
export const viewAllTickets = async () => {
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
export const viewSingleTicket = async (id: string) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets/${id}`,
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
export const updateTicket = async (
  ticketId: string,
  payload: {
    description?: string
    status?: string
    priority?: string
  }) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets/${ticketId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader()
      },
      body: JSON.stringify(payload),
    }
  )
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data?.message || "Failed to update ticket")
  }
  return data
}