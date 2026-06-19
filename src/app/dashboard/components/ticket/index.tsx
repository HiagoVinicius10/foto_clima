"use client";
import { api } from '@/lib/api';
import { ModalContext } from '@/providers/modal';
import { CustomerProps } from '@/util/customer.type';
import { TicketProps } from '@/util/tickets.type';
import { FileText, SquareCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import toast from 'react-hot-toast';

interface TicketItemProps {
    tickets: TicketProps;
    customer: CustomerProps | null;
}

export function TicketItem({ tickets, customer }: TicketItemProps) {
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

    async function handleChangeStatus() {
        try {
            const response = await api.patch("/api/ticket", {
                id: tickets.id
            })

            toast.success("Cliente concluido com sucesso!", {
                duration: 4000,
                style: {
                    borderRadius: "10px",
                    background: "#0cb336",
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                }
            });
            router.refresh();
        } catch (err) {
            toast.error("Failed to conclude ticket");
            return
        }
    }
    function btnOpenModal() {
        handleModalVisible();
        setDetailTicket({
            ticket: tickets,
            customer: customer,
        })
    }

    return (
        <>
            <tr className=' border-b-3 border-b-slate-300 h-12 last:border-b-0 bg-slate-200 hover:bg-blue-300 hover:font-bold hover:text-blue-500 duration-300 cursor-pointer'>
                <td className='text-left pl-2 rounded-l'>
                    {customer?.name}
                </td>
                <td className='text-left hidden sm:table-cell'>
                    {tickets.created_at?.toLocaleDateString("pt-BR")}
                </td>
                <td className="bg-green-500 pl-1 w-20 text-center">
                    <span className='text-black text-sm font-medium'> {tickets.status} </span>
                </td>
                <td className='flex justify-center items-center text-center pt-3 pr-1 '>
                    <button
                        onClick={handleChangeStatus}
                        className='cursor-pointer hover:scale-125 rounded p-1 duration-300 mr-3'>
                        <SquareCheckBig size={24} color="#5e6063" />
                    </button>

                    <button
                        onClick={btnOpenModal}
                        className='cursor-pointer hover:scale-105 rounded p-1 duration-300'>
                        <FileText size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}