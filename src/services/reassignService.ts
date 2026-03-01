import type { ReassignTicketValues } from "../types/reassignTicket.ts";
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
export const getAllAgentsList=async()=>{
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/users?role=SUPPORT_AGENT`,
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
export const getUserDetails=async()=>{
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/users/me`,
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
export const reassignTicket=async(ticketId:string,values:ReassignTicketValues)=>{
    const res=await getUserDetails()
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets/${ticketId}/assign`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({
                assignedByUserId:res?.data?.userId,
                assignedToUserId:values.agentId 
            })
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.message || 'Failed to create ticket');
    }
    return data;
}