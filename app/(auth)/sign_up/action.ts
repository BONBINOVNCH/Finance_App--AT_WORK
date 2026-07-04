"use server";

import connectToDB from "@/backend/config/db";
import { formSchema } from "@/lib/utils";
import z from "zod";

const personalFormSchema = formSchema("sign-up");
export default async function signUpUser(
    data: z.infer<typeof personalFormSchema>,
) {
    await connectToDB();
    console.log("підключоне");
    return { success: true, data: data };
}
