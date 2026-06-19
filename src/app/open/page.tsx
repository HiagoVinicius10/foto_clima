"use client";

import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search, X } from 'lucide-react';
import { useState } from "react";
import { FormTickets } from "./components/formTckets";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";

interface CustomerProps {
    id: string;
    name: string;
}


const schema = z.object({
    email: z.string().email("Digite o email do Cliente para localizar").min(1, "O Email é obrigatório"),
})


type FormData = z.infer<typeof schema>;

export default function OpenTicket() {
    const [customer, setCustomer] = useState<CustomerProps | null>(null);
    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleClearCustomer() {
        setCustomer(null);
        setValue("email", "")
    }

    async function handleSearchCustomer(data: FormData) {

        try {
            const response = await api.get("/api/customer", {
                params: {
                    email: data.email
                }
            });
            setCustomer({
                id: response.data.id,
                name: response.data.name,
            });
            setValue("email", "");

        } catch (err) {
            setError("email", { type: "custom", message: "Ops, cliente não encontrado" });
            return;
        }

    }

    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="text-3xl font-bold text-center mt-24"> Abrir Chamado </h1>

            <main className="flex flex-col mt-6 mb-2"  >
                {customer ? (
                    <>
                        <div className="bg-slate-200 border-2 border-gray-300 rounded py-4 px-6 flex items-center justify-between">
                            <p> <strong> Cliente selecionado: </strong> {customer.name} </p>
                            <button
                                onClick={handleClearCustomer}
                                className="cursor-pointer hover:scale-110 transition-transform duration-300">
                                <X size={24} color="red" />
                            </button>
                        </div>
                    </>
                ) : (
                    <form
                        className="bg-slate-200 py-6 px-2 rounded-lg shadow-md border-3 border-gray-300"
                        onSubmit={handleSubmit(handleSearchCustomer)} >

                        <div className="flex flex-col gap-2">
                            <Input
                                type="text"
                                placeholder="Digite o email do Cliente..."
                                name="email"
                                register={register}
                                error={errors.email?.message}
                            />

                            <button
                                className="w-full py-2 rounded flex items-center justify-center gap-2 bg-blue-500 text-white font-medium hover:bg-blue-700 transition-colors duration-300 mt-4 cursor-pointer h-11"
                                type="submit">
                                Procurar Cliente...
                                <Search size={24} />
                            </button>

                        </div>
                    </form>
                )}

                {customer !== null && <FormTickets customer={customer} />}

            </main>

        </div>
    )
}