import { NextResponse } from "next/server"; 
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const body = await request.json();

   try{
    const { name, email, password } = body;

    const userAlreadyExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(userAlreadyExists){
        return NextResponse.json(
            { error: "Usuário já cadastrado."},
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

     const user = await prisma.user.create({
        data: {
            name,
            email,
            password:hashedPassword
        },
    });

    return NextResponse.json(
        { message: "Usuário criado com sucesso!", user }, 
        { status: 200 }
    );

   } catch (error) {
    return NextResponse.json(
        { error: "Failed to create user" }, 
        { status: 500 }
    );
   }
}