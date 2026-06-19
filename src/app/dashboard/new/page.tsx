import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";



export default async function NewTickets() {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.redirect("/login");
    }

    const customers = await prisma.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleRegisterTicket(formaData: FormData) {
        "use server"

        const title = formaData.get("title")
        const description = formaData.get("description")
        const customerId = formaData.get("customerId")

        if(!title || !description || !customerId) {
             throw new Error(" Preencha todos os campos")
        }

        try {
              await prisma.ticket.create({
                data: {
                    title: String(title),
                    description: String(description),
                    customerId: String(customerId),
                    status: "ABERTO",
                    userId: session?.user.id
                }
            })
        } catch (error) {
            throw new Error("Erro ao criar o chamado")
        }
            
           redirect("/dashboard");
    }


    return(
        <Container>
            <main>
                <div className="flex gap-3 mt-10 items-center  justify-centercurson-pointer">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <button className="bg-gray-900 text-white px-2 py-1 rounded flex items-center jusfify-center hover:bg-gray-700 cursor-pointer">
                    <ArrowLeft size={24} color="#3b82f6"/>  Voltar
                    </button>
                </Link>
                    <h1 className="text-3xl font-medium text-center"> Novo Chamado </h1>
            </div>

            <form
            action={handleRegisterTicket} 
            className="flex flex-col gap-2 mt-7 ">
                <label className="font-medium mb-3 flex flex-col gap-3"> Nome do chamado
                    <input
                    className="border-2 border-gray-300 rounded w-full h-11 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    name="title"
                    placeholder=" Digite o seu chamado..."
                    required
                    />
                </label>


                 <label className="font-medium mb-3 flex flex-col gap-3 ">  Descreva o problema
                    <textarea
                    className="border-2 border-gray-300 rounded w-full px-3 pt-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="description"
                    placeholder=" Digite o problema..."
                    required
                    ></textarea>
                </label>


           { customers.length !== 0 && (
            <>
                <label className="font-medium mb-3 flex flex-col gap-3">
                    Selecione o seu cliente
                </label>

            <select 
            name='customerId'
            className="border-2 border-gray-300 rounded w-full h-11 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-8">
                {customers.map((customer) => (
                    <option
                    key={customer.id}
                    value={customer.id}
                    >
                      {customer.name}
                </option>
                ))}
            </select>
             </>
           )}

           {customers.length === 0 && (
            <p className="text-base text-center mb-4">
                Você precisa cadastrar um cliente para criar um chamado.
                <Link href={"/dashboard/customer/new"} className="text-blue-500 hover:text-blue-700 hover:underline"> Clique aqui </Link>
            </p>
           )}

        <button 
        className="w-full bg-blue-500 h-11 text-white font-medium cursor-pointer rounded hover:bg-blue-700 duration-300 disabled:cursor-not-allowed my-6 hover:scale-105 transition-transform"
        disabled={customers.length === 0}
        type="submit"
        >
            Cadastrar
        </button>

         </form>
            </main>
        </Container>
    )
}