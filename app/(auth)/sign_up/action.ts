"use server";

import connectToDB from "@/backend/config/db";
import User from "@/backend/schemas/UserSchema";
import { formSchema } from "@/lib/utils";
import bcrypt from "bcryptjs";
import z from "zod";

const personalFormSchema = formSchema("sign-up");

export default async function signUpUser(
    rawData: z.infer<typeof personalFormSchema>,
) {
    try {
        const data = personalFormSchema.parse(rawData);
        await connectToDB();
        console.log("підключоне");

        const existingUserEmail = await User.findOne({ email: data.email });
        if (existingUserEmail) {
            console.log("Той самий емейл!");
            return {
                success: false,
                error: "same_email",
                message: "Той самий емейл!",
            };
        }

        const existingUserSsn = await User.findOne({ ssn: data.ssn });
        if (existingUserSsn) {
            console.log("Той самий snn!");
            return {
                success: false,
                error: "same_snn",
                message: "Той самий snn!",
            };
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hashSync(data.password, salt);

        const newUser = await User.create({
            ...data,
            password: hashPassword,
        });

        const newObjectUser = JSON.parse(JSON.stringify(newUser));
        delete newObjectUser.password;

        return { success: true, data: newObjectUser };
    } catch (e: any) {
        console.log("Щось пішло не так ): ", e.message);
        return {
            success: false,
            error: e.message,
            message: "Щось пішло не так ):",
        };
    }
}
