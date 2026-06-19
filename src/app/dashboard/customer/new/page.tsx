import { Container } from "@/components/container";
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import { FormCustomer } from "../components/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function NewCustomer() {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        redirect("/");
    }

    return(
        <Container>
            <main>
                <div className="flex gap-3 mt-10 items-center  justify-centercurson-pointer">
                <Link href="/dashboard/customer" className="flex items-center gap-2">
                    <button className="bg-gray-900 text-white px-2 py-1 rounded flex items-center jusfify-center hover:bg-gray-700 cursor-pointer">
                    <ArrowLeft size={24} color="#3b82f6"/>  Voltar
                    </button>
                </Link>
                    <h1 className="text-3xl font-medium text-center"> Novo Cliente </h1>
            </div>
            
             <FormCustomer userId={session.user.id } />
          
            </main>
        </Container>
    )
}