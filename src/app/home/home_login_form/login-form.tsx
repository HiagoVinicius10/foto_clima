"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ loading, setLoading ] = useState(false)
    const router = useRouter()


    async function handleLogin(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true)

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if(!res?.error){

            toast.success("Login realizado com sucesso!",{
                duration: 4000,
                style: {
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#0d9c20",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                }
            })
            router.push("/dashboard")
        }else{
            toast.error("Falha no login. Verifique suas credenciais.");
        }  

   
    }

    return(
        <form 
        onSubmit={handleLogin}
        className="bg-amber-50 p-20 rounded-lg w-3xl max-w-full flex justify-center items-center flex-col gap-2 border-3 border-gray-300 shadow-lg">

        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold"> 
              Foto<span className="text-blue-600">Clima ❄️</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground"> 
              Entre com suas credenciais para acessar sua conta  
            </p>
        </div>

            <label className="text-start font-bold flex flex-col gap-0.5">Email
            <input 
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email" 
            required
            placeholder="Digite o seu email"
            className="input input-primary rounded-md w-80 p-2 border-2 border-gray-300 outline-none focus:border-blue-500 "/>
            </label>

            <label className="text-start font-bold flex flex-col gap-0.5">Senha
            <input 
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password" 
            required
            placeholder="Digite a sua senha"
            className="input input-primary rounded-md w-80 p-2 border-2 border-gray-300 outline-none focus:border-blue-500 "/>
            </label>

            <button 
            disabled={loading}
            type="submit"
           className={`
                    bg-black w-full p-2 rounded-md text-white mt-3
                    transition-all duration-300 ease-in-out
                    ${loading ? "opacity-70 animate-pulse scale-95 cursor-not-allowed" : "hover:scale-105 hover:bg-gray-800"}
                `}>
                    { loading ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-xs mt-4">
                  Ainda não possui uma conta?
                  <Link href="/register" className="text-blue-700 text-base font-medium"> clique aqui </Link> 
             </p>

        </form>
    )

}