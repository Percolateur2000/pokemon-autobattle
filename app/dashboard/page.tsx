import UserInfo from "@/components/UserInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
const session = await getServerSession(AuthOptions)

    if (!session) redirect('/')

    return <UserInfo />

}