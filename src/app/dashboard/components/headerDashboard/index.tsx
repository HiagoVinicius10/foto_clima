import { Container } from "@/components/container";
import Link from "next/link";


export function HeaderDahsboard() {


    return(
        <Container>
            <header className="full bg-gray-900 my-4 p-3 px-7 rounded flex justify-between text-white items-center">
                <div className="flex gap-4">
                    <Link href="/dashboard" className="hover:scale-105 transition-transform duration-300 hover:text-blue-500" >
                    Chamados
                    </Link>
                <Link href="/dashboard/customer" className="hover:scale-105 transition-transform duration-300 hover:text-blue-500">
                    Clientes
                </Link>
                </div>

                <div>
                    <Link href="/dashboard/concluded" className="hover:scale-105 transition-transform duration-300 hover:text-blue-500">
                        Concluídos
                    </Link>
                </div>
            </header>
        </Container>
    )
}