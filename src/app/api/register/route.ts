import { NextResponse } from "next/server"; 
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password:hashedPassword
        },
    });

    return NextResponse.json({ message: "Usuário criado com sucesso!" });
}