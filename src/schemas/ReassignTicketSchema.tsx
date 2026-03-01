import * as Yup from 'yup'
export const ReassignTicketSchema = Yup.object({
    agentId: Yup.string().trim(),
});
