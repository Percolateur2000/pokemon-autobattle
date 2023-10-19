'use client'

import { signIn } from "next-auth/react";
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                email,
                password, 
                redirect: false,
            })
            if (res?.error) {
                setError("Cet utilisateur n'existe pas");
                return;
            }

            router.replace('/dashboard');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="border-2 border-blue-200 rounded-md p-4 ">
                <h1 className="text-2xl text-center mb-4">Connexion</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mot de passe" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connexion</button>
                        { error && (
                            <div className="text-white bg-red-600 py-1 px-2 rounded w-fit self-center">{error}</div>
                        )}
                        <Link className="text-right underline pt-2" href={"/register"}>Créer un compte</Link>
                </form>
            </div>
        </div>
    )
}