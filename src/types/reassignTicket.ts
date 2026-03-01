export type GetAllAgents={
    id: string,
    name: string,
    email: string,
    role: "SUPPORT_AGENT"
}
export type ReassignTicketValues={
    agentId:string,
}
export type ReassignTicketModalProp={
    isOpen: boolean
    onClose: () => void
    ticketId: string
}