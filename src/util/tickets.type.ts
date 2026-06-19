

export interface TicketProps {
     id: string;
     description: string;
     title: string;
     status: string;
     customerId: string | null;
     userId: string | null;
     created_at: Date | null;
     updated_at: Date | null;
}