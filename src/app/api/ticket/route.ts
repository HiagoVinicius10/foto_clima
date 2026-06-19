import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// PATCH serves to update the status of a ticket to "FECHADO" (closed)
export async function PATCH(request: Request) {
 
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 } 
        )
    }

    const { id } = await request.json();

   
        const findTicket = await prisma.ticket.findFirst({
            where: {
                id: id as string
            }
        })

        if(!findTicket) {
            return NextResponse.json(
                { error: "Falha ao atualizar o chamado" },
                { status: 400 }
            )
        }

        try{
            await prisma.ticket.update({
                where: {
                    id: id as string
                }, 
                data: {
                    status: "FECHADO",
                }
            }) 

            return NextResponse.json(
            { message: "Ticket encontrado com sucesso!" },
            { status: 200 }
        )
    }catch(err) {
        return NextResponse.json(
            { error: " Falha ao atualizar o CHAMADO " }, 
            { status: 400 }
        );
    }

}

export async function POST(request: Request) {
    const { customerId, description, title } = await request.json();

    if(!customerId || !description || !title) {
        return NextResponse.json(
            { error: "Failed to create ticket" },
            { status: 400 }
        );
    }

    try{
        const createTicket = await prisma.ticket.create({
            data: {
                title: String(title),
                description: String(description),
                customerId: String(customerId),
                status: "ABERTO",
            }
        })

        return NextResponse.json(
            { message: "Chamado criado com sucesso!", ticket: createTicket },
            { status: 200 }
        );

    }catch(err) {
        return NextResponse.json(
            { error: "Failed to create ticket" }, 
            { status: 400 }
        );
    }
}

export async function DELETE(request: Request) {

    try{
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 } 
            )
        }

        const { searchParams } = new URL(request.url)
        const ticketId = searchParams.get("id");

        if(!ticketId) {
            return NextResponse.json(
                { error: "ID Do Chamado Nao Encontrado" },
                { status: 400 }
            );
        }

        const findTicket = await prisma.ticket.delete({
            where: {
                id: ticketId
            }
        })
        
        return NextResponse.json(
        { message: "Chamado excluido com sucesso!" },
        { status: 200 }
    );    

    }catch(err) {

        return NextResponse.json(
            { error: "Failed to delete ticket" }, 
            { status: 400 }
        );
    }

    
}