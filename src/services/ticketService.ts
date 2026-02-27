
type TicketValues = {
    title: string,
    description: string
}
export const createTicket = async (values: TicketValues) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/tickets`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || 'Failed to create ticket');
    }

    return data;
}