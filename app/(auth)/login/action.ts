"use server";

import { formSchema } from "@/lib/utils";
import z from "zod";
import User from "@/backend/schemas/UserSchema";
import bcrypt from "bcryptjs";
import connectToDB from "@/backend/config/db";
import { cookies } from "next/headers";
import signJwt from "@/lib/auth";

const personalFormSchema = formSchema("login");

export default async function loginUser(
    rawData: z.infer<typeof personalFormSchema>,
) {
    try {
        const data = personalFormSchema.parse(rawData);
        await connectToDB();
        console.log("підключоне");

        const existingUser = await User.findOne({ email: data.email });
        if (!existingUser) {
            return { success: false, message: "Неправильний email або пароль" };
        }

        const match = await bcrypt.compare(
            data.password,
            existingUser.password,
        );
        if (!match) {
            return { success: false, message: "Неправильний email або пароль" };
        }

        const token = await signJwt({
            userId: existingUser._id.toString(),
            email: existingUser.email,
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        const userWithoutPassword = JSON.parse(JSON.stringify(existingUser));
        delete userWithoutPassword.password;

        return { success: true, data: userWithoutPassword };
    } catch (e: any) {
        console.log("Щось пішло не так ): ", e.message);
        return {
            success: false,
            error: e.message,
            message: "Щось пішло не так ):",
        };
    }
}
