"use server";

import connectToDB from "@/backend/config/db";
import User from "@/backend/schemas/UserSchema";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "fall_back_secret",
);

export default async function signJwt(payload: {
    userId: string;
    email: string;
}) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(JWT_SECRET);
}

export async function verifyJWT(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { userId: string; email: string };
    } catch (e) {
        return null;
    }
}

//--- Getting and deleting token ---

export async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return null;
        }

        const payload = await verifyJWT(token);
        if (!payload) return null;

        await connectToDB();

        const user = await User.findById(payload.userId).select("-password");
        if (!user) return null;

        return JSON.parse(JSON.stringify(user));
    } catch (e) {
        console.error("Щось пішло не так: ", e);
        return null;
    }
}

export async function logoutCurrentUser() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
}
