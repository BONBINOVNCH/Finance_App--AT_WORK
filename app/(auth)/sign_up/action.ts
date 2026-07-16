"use server";

import connectToDB from "@/backend/config/db";
import User from "@/backend/schemas/UserSchema";
import { createDwollaCustomer } from "@/lib/actions/dwolla.actions";
import signJwt from "@/lib/auth";
import { extractCustomerIdFromUrl, formSchema } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
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

        if (!newUser) throw new Error("Помилка при створені юзера!");

        console.log(newUser);

        // const newObjectUser = JSON.parse(JSON.stringify(newUser));
        // delete newObjectUser.password;

        const dwollaUserParams = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            address1: newUser.address1,
            state: newUser.state,
            postalCode: newUser.postalCode,
            dateOfBirth: newUser.dateOfBirth,
            ssn: newUser.ssn,
            city: newUser.city,
            type: "personal",
        };

        const dwollaCustomerUrl = await createDwollaCustomer(dwollaUserParams);

        if (!dwollaCustomerUrl) throw new Error("Помилка через Dwolla!");

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        newUser.dwollaCustomerId = dwollaCustomerId;
        newUser.dwollaCustomerUrl = dwollaCustomerUrl;

        await newUser.save();

        const token = await signJwt({
            userId: newUser._id.toString(),
            email: newUser.email,
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        const newObjectUser = {
            _id: newUser._id.toString(),
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            dwollaCustomerId: newUser.dwollaCustomerId,
        };

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
