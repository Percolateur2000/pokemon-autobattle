'use client';

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Dashboard() {

    const { data: session } = useSession();

    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col border-2 border-blue-200 rounded-md gap-2 my-6 p-8">
                <div>User : <span className="font-bold">{session?.user?.name}</span></div>
                <div>Email : <span className="font-bold">{session?.user?.email}</span></div>
                <button onClick={() => {signOut()}} className="text-white bg-red-600 mt-4 py-2 px-6 rounded w-fit self-center">Se déconnecter</button>
            </div>
        </div>
    )
}