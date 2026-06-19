"use client";

import { ModalTicket } from "@/components/modal";
import { CustomerProps } from "@/util/customer.type";
import { TicketProps } from "@/util/tickets.type";
import { createContext, ReactNode, useState } from "react";


interface ModalContextProps {
    visible: boolean;
    ticketsDetail: TicketInfo | undefined;
    handleModalVisible: () => void;
    setDetailTicket: (detail: TicketInfo) => void;
}

interface TicketInfo {
    ticket: TicketProps;
    customer: CustomerProps | null;  
}

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({ children }: { children: ReactNode } ) => {
    const [ visible, setVisible ] = useState(false);
    const [ ticketsDetail, setTicketsDetail ] = useState<TicketInfo | undefined>()

    const handleModalVisible = () => {
        setVisible(!visible);
    }

    function setDetailTicket(detail: TicketInfo) {
        setTicketsDetail(detail);
    }


    return(
      <ModalContext.Provider value={{ visible, handleModalVisible, ticketsDetail, setDetailTicket }}>
                { visible && <ModalTicket /> }
                { children }
      </ModalContext.Provider>  
    )
}