import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import { prisma } from "@/lib/prisma";


export default async function Customer(){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect("/")
    }

    const customers = await prisma.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    return(
        <Container>
            <main>
                <div className="flex  justify-between items-center ">
                    <h1 className="text-3xl font-medium"> Meus Clientes </h1>
                    <Link href="/dashboard/customer/new" className="bg-green-500 text-white px-3 py-2 rounded items-center hover:text-black hover:scale-105 transition-all duration-300">
                        Novo Cliente
                    </Link>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                   {customers.map((customer) => (
                     <CardCustomer  key={customer.id} customer={customer}/>
                   
                   ))}
                </section>
            
                   { customers.length === 0 && (
                    <div className="flex items-center justify-center h-52 p-5">
                        <h1 className="text-center text-gray-500 text-xl">
                            Nenhum cliente cadastrado ainda. Clique no botão <span className="font-medium">"Novo Cliente"</span> para cadastrar seu primeiro cliente.
                        </h1>
                    </div>
                   )}                 
                
            </main>
        </Container>
    )
}