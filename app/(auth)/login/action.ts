"use server";

import { formSchema } from "@/lib/utils";
import z from "zod";
import User from "@/backend/schemas/UserSchema";
import bcrypt from "bcryptjs";
import connectToDB from "@/backend/config/db";

const personalFormSchema = formSchema("login");

export default async function loginUser(
    rawData: z.infer<typeof personalFormSchema>,
) {
    try {
        const data = personalFormSchema.parse(rawData);
        await connectToDB();
        console.log("підключоне");

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            const hash = await existingUser.password;
            const match = await bcrypt.compare(data.password, hash);

            if (match) {
                console.log("Юзера залоговано!");
                const existingObjectUser = JSON.parse(
                    JSON.stringify(existingUser),
                );
                delete existingObjectUser.password;

                return { success: true, data: existingObjectUser };
            } else {
                console.log("Неправильний пароль!");
                return {
                    success: false,
                    error: "no_password",
                    message: "Неправильний пароль!",
                };
            }
        } else {
            console.log("Нема такого емейлу!");
            return {
                success: false,
                error: "no_email",
                message: "Нема такого емейлу!",
            };
        }
    } catch (e: any) {
        console.log("Щось пішло не так ): ", e.message);
        return {
            success: false,
            error: e.message,
            message: "Щось пішло не так ):",
        };
    }
}
