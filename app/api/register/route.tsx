import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({message : "Registration completed"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message : "Registration failed"}, {status: 500});
    }
}