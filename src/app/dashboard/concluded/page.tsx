import { Container } from "@/components/container"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { TicketConcluded } from "./components/ticketConcluded"
import { prisma } from "@/lib/prisma"
import { ArrowLeft } from "lucide-react"
import { ButtonReflesh } from "../components/buttonReflesh"


export default async function Concluded() {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        redirect("/")
    }

    const tickets = await prisma.ticket.findMany({
        where: {
            status: "FECHADO",
            customer: {
                userId: session.user.id
            }
        }, include: {
            customer: true
        },
        orderBy: {
            created_at: "desc"
        }
    })

    return(
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between mb-8 mt-7">
                    <h1 className="text-3xl font-bold"> 
                        Chamados concluidos
                    </h1>
                
                <div>
                    <ButtonReflesh />
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

                    {tickets.map((ticket) => (
                        <TicketConcluded 
                        key={ticket.id}
                        tickets={ticket}
                        customer={ticket.customer}
                        />
                    ))}
            </table>

            {tickets.length === 0 && (
                <div className="text-center mt-8 text-gray-400 text-xl">
                    <h2> Nenhum chamado concluido </h2>
                </div>
            )}

            </main>
        </Container>
    )
}