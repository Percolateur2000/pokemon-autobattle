'use client'

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if ( !name || !email || !password ) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        try {
            const resUserExist = await fetch('/api/userExist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            const { user } = await resUserExist.json();

            if ( user ) {
                setError("Cet utilisateur existe déjà");
                return;
            }

            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })
            if ( res.ok ) {
                const form = e.target;
                form.reset();
                router.push('/dashboard');
            } else {
                console.log('Une erreur est survenue');
            }
        } catch ( error ) {
            console.log('Une erreur est survenue', error);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="border-2 border-blue-200 rounded-md p-4 ">
                <h1 className="text-2xl text-center mb-4">Créer un compte</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input onChange={(e) => setName(e.target.value)} type="name" placeholder="Prénom" />
                        <input onChange={(e) => {setEmail(e.target.value), setError('')}} type="email" placeholder="Email" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mot de passe" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enregistrer</button>

                        {error && (
                            <div className="text-white bg-red-600 py-1 px-2 rounded w-fit self-center">{error}</div>
                        )}

                        <Link className="text-right underline pt-2" href={"/"}>Se connecter</Link>
                </form>
            </div>
        </div>
    )
}