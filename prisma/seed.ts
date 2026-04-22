import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

async function main() {
    const email = "admin-cesar@gmail.com"
    const password = "admin12341234"

    const adminExists = await prisma.user.findUnique({
        where: { email },
    })

    if(adminExists) {
        console.log("🥷🏾Admin ja existe")
        return
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name: "Cesar Administrador",
            email,
            password: hashedPassword,
            role: "ADMIN",
        },
    })

    console.log("🥷🏾Admin criado com sucesso")
}

main()
.catch(console.error)
.finally(async () => {
    await prisma.$disconnect()
})