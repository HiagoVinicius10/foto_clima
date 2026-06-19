import { Container } from "@/components/container"
import {getServerSession} from "next-auth"
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation"

import Link from "next/link"
import { ButtonReflesh } from "./components/buttonReflesh"
import { TicketItem } from "./components/ticket"
import { prisma } from "@/lib/prisma";


export default async function Dashboard(){
 const session = await getServerSession(authOptions)

 if(!session || !session.user){
    redirect("/")
 }

 const tickets = await prisma.ticket.findMany({
  where:{
    status: "ABERTO",
    customer:{
      userId: session.user.id,
    }
  },
  include:{
    customer: true,
  },
  orderBy:{
    created_at: "desc"
  }
 })


    return(
       <Container>
           <main className="mt-9 mb-2">
                <div className="flex items-center justify-between mb-8 mt-7">
                  <h1 className="text-3xl font-bold"> Chamados </h1>
                  
                  <div className="flex items-center gap-3">
                  <ButtonReflesh />
                      <Link href={"/dashboard/new"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded items-center">
                      Abrir chamado
                    </Link>
                  </div>
                </div>

              <table className="min-w-full my-2">
                <tbody>
                    <tr className="text-center">
                        <th className="font-medium text-left pl-2">CLIENTE</th>
                        <th className="font-medium text-left hidden sm:block">DATA CADASTRO</th>
                        <th className="font-medium ">STATUS</th>
                        <th className="font-medium ">#</th>
                    </tr>
                </tbody>
                  
                  
                <tbody>
                    {tickets.map((ticket) => (
                        <TicketItem 
                        key={ticket.id}
                        tickets={ticket}
                        customer={ticket.customer}
                        />
                    ))}
                </tbody>

              </table>

              {tickets.length === 0 && (
                  <h2 className="text-center font-medium text-gray-600 mt-8">
                        Nenhum chamado encontrado
                  </h2>
                    )}
           </main>
        </Container>
      
    )
}