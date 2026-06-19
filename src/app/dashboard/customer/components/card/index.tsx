'use client'

import { api } from "@/lib/api";
import { CustomerProps } from "@/util/customer.type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CustomerItemprops {
    customer: CustomerProps
}




export function CardCustomer({customer}: CustomerItemprops) {
    const router = useRouter();

    async function deleteCustomer() {

    try {
        const response = await api.delete("/api/customer", {
            params: {
                id: customer.id
            }
        })

        toast.success("Cliente deletado com sucesso!", {
            duration: 4000,
            style: {
                borderRadius: "10px",
                background: "#ffffff",
                color: "#0d9c20",
                fontSize: "1.1rem",
                fontWeight: "600"
            }
        });
        router.refresh();
    }catch (err) {
        toast.error("Failed to delete customer");
    }
}

    return(
            <article className="text-lg flex flex-col gap-1 p-2 border-8 border-gray-300 rounded my-5 hover:scale-105 duration-300 ">
                <h1> <span className="font-bold">Nome:</span> {customer.name} </h1>
                <h1> <span className="font-bold">Email:</span> {customer.email} </h1>
                <h1> <span className="font-bold">Telefone:</span> { customer.phone} </h1>
                <h1> <span className="font-bold">Endereço:</span> { customer.address || "Não informado" } </h1>
                <button
                onClick={deleteCustomer}
                 className="bg-red-500 text-white font-medium p-1 rounded w-25 hover:bg-red-700 cursor-pointer">
                     Deletar
                 </button>
            </article>
        
    )
}