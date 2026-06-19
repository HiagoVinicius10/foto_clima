import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "@/providers/modal";
import toast, { Toaster } from 'react-hot-toast';
export const metadata: Metadata = {
  title: "Site Oficial-FotoClima-Gerenciamento",
  description: "Gerenciamento de controles de clientes FotoClima",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ModalProvider>
          {children}
          <Toaster 
          position="top-center" 
          toastOptions={{ duration: 4000 }} />
        </ModalProvider>
      </body>
    </html>
  );
}
