import RegisterForm from "@/components/registerform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/route";

export default async function RegisterPage() {
    const session = await getServerSession(AuthOptions)
    if (session) redirect('/dashboard')
    return <RegisterForm />    
}