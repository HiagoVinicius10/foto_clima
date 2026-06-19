import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';


export async function GET(res: Request) {
    const { searchParams } = new URL(res.url);
    const customerEmail = searchParams.get("email");

    if(!customerEmail || customerEmail === "") {
        return NextResponse.json({ message: "Failha ao buscar cliente" }, { status: 400 });
    }

  try {
        const customer = await prisma.customer.findFirst({
            where: {
                email: customerEmail

            }
        })


    return  NextResponse.json(customer)
  } catch (err) {
    return NextResponse.json({ message: "Failha ao buscar cliente" }, { status: 400 });
  }

   
}

export async function DELETE(res: Request) {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { searchParams } = new URL(res.url);
    const userId = searchParams.get("id");


    if(!userId) {
        return NextResponse.json({ error: "Failed to delete customer" }, { status: 400 });
    }

    

    const ticketWithCustomer = await prisma.ticket.findFirst({
        where: {
            customerId: userId,
            status: "ABERTO"
        }
    })

    if(ticketWithCustomer) {
        return NextResponse.json({ error: "Cannot delete customer with open tickets" }, { status: 400 });
    }
  

    try {
        await prisma.customer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({ message: "Cliente deletado com sucesso" }, {status: 200 });

    }catch (err: any) {

        return NextResponse.json(
            { error: "Failed to delete customer" }, 
            { status: 400 });
    }

}

export async function POST (res: Request) {

    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const {name, email, phone, address, userId} = await res.json();

    try {
        const customer = await prisma.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userId: userId
            }
        })

        return NextResponse.json({ message: " Cliente cadastrado com sucesso", customer }, { status: 201 });

    }catch (err){
        return NextResponse.json({ error: "Failed to create customer" }, { status: 400 });
    }

}