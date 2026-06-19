"use client";

import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const schema = z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Digite um email valido").min(1, "Email é obrigatório"),
        phone: z.string().refine((value) => {
            return /^(?:\(d{2}\)\s)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value);
        },{
            message: "Digite um número de telefone válido no formato (XX) XXXXX-XXXX, XX XXXXX-XXXX ou XXXXXXXXXXX"
        }),
        address: z.string(),
    })

     type FormData = z.infer<typeof schema>;

export function FormCustomer({userId}: {userId: string}) {
    const router = useRouter();   
    const { register, handleSubmit, formState:{ errors }} = useForm<FormData> ({
        resolver: zodResolver(schema)
    })


 async function handleRegister(data: FormData) {
    const response = await api.post("/api/customer",{
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            userId: userId
    })

    if(response.status === 201){
        toast.success("Cliente cadastrado com sucesso! 👏",{
            duration: 4000,
            style: {
                borderRadius: "10px",
                background: "#ffffff",
                color: "#0d9c20",
                fontSize: "1.1rem",
                fontWeight: "600"
            }
        });

    router.refresh();
    router.replace("/dashboard/customer")
    } else {
       toast.error("Falha ao cadastrar cliente, tente novamente.")
    }
   
     }

    return(
        <form className="flex flex-col gap-2 mt-10" onSubmit={handleSubmit(handleRegister)}>
            <label className="font-medium">
                Nome completo
            </label>
            <Input 
                type="text"
                placeholder="Digite o nome completo do cliente..."
                name="name"
                register={register}
                error={errors.name?.message}
            />

            <section className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="font-medium">
                        Email 
                    </label>
                    <Input 
                        type="text"
                        placeholder=" Digite o email... "
                        name="email"
                        register={register}
                        error={errors.email?.message}
                    /> 
                </div>

                <div className="flex-1">
                    <label className="font-medium">
                        Telefone 
                    </label>
                    <Input 
                        type="number"
                        placeholder=" Digite o telefone... "
                        name="phone"
                        register={register}
                        error={errors.phone?.message}
                    /> 
                </div>
            </section>

                    <label className="font-medium">
                        Endereço 
                    </label>
                    <Input 
                        type="address"
                        placeholder=" Digite o endereço... "
                        name="address"
                        register={register}
                        error={errors.address?.message}
                    />

                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 w-full cursor-pointer"
                type="submit"
                >
                 Cria um novo cliente
                </button>
        </form>
    )
}