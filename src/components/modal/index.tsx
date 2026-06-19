"use client";

import { ModalContext } from "@/providers/modal";
import { useContext, useRef } from "react";


export function ModalTicket() {
    const {handleModalVisible, ticketsDetail} = useContext(ModalContext)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const handleCloseModalBackground = (event: React.MouseEvent<HTMLDivElement>) => {    
        if(modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleModalVisible();
        }
    }
    
  


    return(
    <div 
    onClick={handleCloseModalBackground}
    className= "absolute bg-gray-800/80 w-full min-h-screen"> 
        <main className="absolute inset-0 flex items-center justify-center">

            <div ref={modalRef} className="bg-gray-300 w-4/5 md:w-1/2  max-w-2xl rounded-lg p-4 ">

             <div className="flex justify-between items-center mb-6 font-medium">
                <h1 className=" text-lg  md:text-2xl"> Detalhe do chamado</h1>
                <button 
                onClick={handleModalVisible}
                className="bg-red-500 px-3 py-1 rounded text-white cursor-pointer hover:bg-red-800 duration-300"> Fechar </button>
             </div>

            <article className="mb-2 flex flex-wrap gap-2">
            <h2 className="font-medium"> Nome:</h2> 
            <p> { ticketsDetail?.ticket.title} </p>
           </article>

            <article className="mb-4 flex flex-wrap gap-2">
            <h2 className="font-medium"> Descrição:</h2> 
            <p> { ticketsDetail?.ticket.description} </p>
           </article>

        <div className="w-full border-b border-gray-400 my-4"></div>
        
        <h1 className="text-xl mb-3 font-medium"> Detalhe do cliente </h1>

           <article className="mb-2 flex flex-wrap gap-2">
            <h2 className="font-medium"> Nome:</h2> 
            <p> { ticketsDetail?.customer?.name } </p>
           </article>

            <article className="mb-2 flex flex-wrap gap-2">
            <h2 className="font-medium"> Email:</h2> 
            <p> { ticketsDetail?.customer?.email} </p>
           </article>

           <article className="mb-2 flex flex-wrap gap-2">
            <h2 className="font-medium"> Telefone:</h2> 
            <p> { ticketsDetail?.customer?.phone } </p>
           </article>

           {ticketsDetail?.customer?.address && (
            <article className="mb-2 flex flex-wrap gap-2">
            <h2 className="font-medium"> Endereço:</h2> 
            <p> { ticketsDetail?.customer?.address } </p>
           </article>
           )}
             
            </div>
        </main>
    </div>
    )
}