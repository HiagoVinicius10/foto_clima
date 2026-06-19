import { LoginForm } from "./home/home_login_form/login-form";

export default  async function Home() {
  return ( 
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className=" w-full max-w-md space-y-8">

          <LoginForm />
          
        </div>
      </main>
      
  );
}
