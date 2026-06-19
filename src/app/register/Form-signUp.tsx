'use client';

import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function FormSignUp() {
    const [btnLoading, setBtnLoading] = useState(false)
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const router = useRouter();

    async function handleRegister(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        try{
            setBtnLoading(true)

        const res = await api.post("/api/register", {
            name,
            email,
            password
        });     

        if(res.status === 200) {
            toast.success("Cadastro realizado com sucesso!",{
                duration: 4000,
                style: {
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#0d9c20",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                }
            })
            router.replace("/")
        } 

        }catch(error: any) {
            if(error.response?.status === 400) {
                toast.error(" Esse email já está cadastrado! ")
            } else {
                toast.error(" Falha no cadastro, tente novamente. ")
            }

        } finally {
            setBtnLoading(false)
        }
          
    }

    return(
        <form 
        onSubmit={handleRegister}
        className="bg-amber-50 p-20 rounded-lg w-3xl max-w-full flex justify-center items-center flex-col gap-2 border-3 border-gray-300 shadow-lg">
            <div>
                <h1 className="text-3xl font-bold"> 
                Foto<span className="text-blue-600">Clima ❄️</span>
                </h1>

                <p className="mt-2 text-sm text-muted-foreground"> 
                    Crie sua conta para gerenciar seus clientes  
                </p>
            </div>

            <label className="text-start font-bold flex flex-col gap-0.5">
                Nome
                <input
                className="border-2 border-gray-300 p-2 rounded-md w-80 focus:outline-none focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                name="name"
                type="text"
                required
                />
            </label>

            <label className="text-start font-bold flex flex-col gap-0.5">
                Email
                <input
                className="border-2 border-gray-300 p-2 rounded-md w-80 focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                name="email"
                type="email"
                required
                />
            </label>

            <label className="text-start font-bold flex flex-col gap-0.5">
                Senha
                <input
                className="border-2 border-gray-300 p-2 rounded-md w-80 focus:outline-none focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                name="password"
                type="password"
                required
                />
            </label>

            <button 
            disabled={btnLoading}
            className={`w-full bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-600 transition-colors duration-300 cursor-pointer
             ${btnLoading ? "opacity-70 animate-pulse scale-95 cursor-not-allowed" : "hover:scale-105 hover:bg-gray-800 duration-300"}`}
             type="submit"
            >
                { btnLoading ? "Cadastrando..." : " Cadastrar"}
            </button>

            <p className="mt-2">
                Já possui uma conta? <Link href={"/"} className="text-blue-600 hover:underline font-medium"> Faça login!</Link>
            </p>

        </form>
    )
}