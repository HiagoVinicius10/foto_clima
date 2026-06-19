import Link from "next/link";

export default  function NotFound () {


    return(
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className=" text-red-500 text-5xl font-medium"> 404</h1>
            <h2 className=" text-2xl">  Página não encontrada. </h2>

            <Link 
            className="bg-gray-900 text-white px-2 py-1 rounded flex items-center jusfify-center hover:bg-gray-700 cursor-pointer"
            href="/">
                Voltar para Home
            </Link>
        </main>
    )
}