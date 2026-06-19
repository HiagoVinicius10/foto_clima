import { Header } from "@/components/header";
import { HeaderDahsboard } from "./components/headerDashboard";
import { Container } from "@/components/container";

export default function DashboardLayout ({ children }: { children: React.ReactNode }) {

 return (
    <>
    <Container>
        <Header />
        <HeaderDahsboard />
        {children}
    </Container>
    </>
 )

}