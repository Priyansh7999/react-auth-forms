import type { GetTicketData } from "./viewTickets.ts"

export type UpdateTicketValues = {
  isOpen: boolean
  onClose: () => void
  ticket: GetTicketData
  refresh: () => void
}

export type UpdateTicketRequest = {
  description?: string
  status?: string
  priority?: string
}