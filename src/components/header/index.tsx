"use client"
import Link from "next/link"
import { signOut } from "next-auth/react"



export function Header () {


    async function handleButtonOut() {
        await signOut({ callbackUrl: "/" })
    }

    return(
        <header className="w-full h-16 flex items-center justify-between px-6">
            <div>
                <Link href="/dashboard">
                    <h1 className="font-bold text-2xl text-black hover:scale-105 transition-transform duration-300">
                        Foto<span className="text-blue-500">Clima</span>
                    </h1>
                </Link>
            </div>

            <div>
                <button onClick={handleButtonOut} className="font-medium text- hover:text-red-600 cursor-pointer">
                    Sair
                </button>
            </div>
        </header>
    )
}