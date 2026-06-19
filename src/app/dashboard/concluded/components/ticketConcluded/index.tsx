"use client";
import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { CustomerProps } from "@/util/customer.type";
import { TicketProps } from "@/util/tickets.type";
import { FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";

interface TicketItemProps {
    tickets: TicketProps;
    customer: CustomerProps | null;
}

export function TicketConcluded({tickets, customer}: TicketItemProps ) {
    const router = useRouter()
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

    function btnOpenModal(){
        handleModalVisible();
        setDetailTicket({
            ticket: tickets,
            customer: customer
        })
    }

    async function btnExcluirTicket(id: string) {       
        const confirm = window.confirm("Tem certeza que deseja excluir este ticket?");

        if(confirm) {
            toast.success("Ticket excluido com sucesso",{
                duration: 4000,
                style: {
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#0d9c20",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                }
            });
        }
    
        try{
         const response = await api.delete(`/api/ticket?id=${id}`);
            router.refresh();        
        }catch(err) {
            toast.error("Failed to delete ticket");
            return 
        }
    }

    return(
        <>
        <tbody>
            <tr className=' border-b-3 border-b-slate-300 h-12 last:border-b-0 bg-slate-200 hover:bg-blue-300 hover:font-bold hover:text-blue-500 duration-300 cursor-pointer'>
                <td className='text-left pl-2 rounded-l'>
                    {customer?.name}
                </td>

                <td className='text-left hidden sm:table-cell'>
                    {tickets.created_at?.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </td>

                <td className="bg-indigo-500 pl-1 w-20 text-center rounded">
                    <span className='text-white text-sm font-medium'> 
                        {tickets.status} 
                    </span>
                </td>

                <td className='flex justify-center items-center text-center pt-3 pr-1 '>
                    <button 
                    onClick={btnOpenModal}
                    className='cursor-pointer hover:scale-105 rounded p-1 duration-300'>
                    <FileText size={24} color="#3b82f6"/>
                   </button>

                    <button 
                    onClick={() => btnExcluirTicket(tickets.id)}
                    className='mr-2 cursor-pointer hover:scale-105 p-1 duration-300'>
                        <Trash2 size={24} color="#Ef4444" />
                   </button>
                </td>
            </tr>
        </tbody>
        </>
    )
}