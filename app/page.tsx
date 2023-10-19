import LoginForm from "@/components/loginform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(AuthOptions)
  if (session) {redirect('/dashboard')}
  return (<LoginForm />
  );
}