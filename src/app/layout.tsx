import type { Metadata } from "next";
import "./globals.css";

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
          {children}
      </body>
    </html>
  );
}
