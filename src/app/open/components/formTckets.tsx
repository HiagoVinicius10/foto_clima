"use client";

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema =  z.object({
    title: z.string().min(1, "O título do chamado é obrigatório"),
    description: z.string().min(1, "A descrição do chamado é obrigatória"),
})

type FormData = z.infer<typeof schema>;
export function FormTickets({customer}: {customer: {id: string, name: string} }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
     async function handleOpenTicket(data: FormData) {   
            const response =  await api.post("/api/ticket", {
                title: data.title,
                description: data.description,
                customerId: customer.id
            })

            if(response.status === 200 || response.status === 201) {
                toast.success("Cadastrado com sucesso!", {
                    duration: 4000,
                style: {
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#0d9c20",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                    }
                });
                 setValue("title", "");
                 setValue("description", "");
                 return;                    
            } else {
                toast.error("Falha ao cadastrar o chamado. Tente novamente.");
                return;
            }
    }

    return (
        <form 
        onSubmit={handleSubmit(handleOpenTicket)}
        className="bg-slate-200 py-6 px-2 rounded-lg shadow-md border-3 border-gray-300 mt-6" >
            <label className="font-medium mb-3 px-1 flex flex-col gap-2">
                Nome do Chamado
            </label>
            <Input
           type="text"
           placeholder="Digite o título do chamado..."
           name="title"
           register={register}
           error={errors.title?.message}
           />

            <label 
            className="font-medium px-1 flex flex-col gap-2 mt-6 mb-2"> Descrição do problema </label>
            <textarea
                placeholder="Descreva o problema..."
                className="border-2 border-gray-300 rounded px-3 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="description"
                {...register("description")}
            ></textarea>
                {errors.description?.message && <p className="text-red-500 text-sm mb-4">{errors.description.message}</p>}

        <button 
        className="w-full bg-blue-500 text-white font-medium rounded h-11 hover:bg-blue-700 transition-transform duration-300 flex items-center justify-center gap-2 cursor-pointer"
        type="submit"
        >
            Cadastrar Chamado
        </button>

        </form>
    )
}