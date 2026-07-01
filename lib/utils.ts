import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import z from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --Zod Schemas-- //

export const formSchema = (varient: string) => {
    const baseSchema = z.object({
        firstName: z.string().min(3),
        lastName: z.string().min(3),
        address1: z.string().max(50),
        state: z.string().min(2).max(2),
        postalCode: z.string().min(3).max(6),
        dateOfBirth: z.string().min(3),
        ssn: z.string().min(3),

        email: z.string().email(),
        password: z.string().min(8),
    });

    if (varient === "login") {
        return baseSchema.pick({ email: true, password: true });
    }

    return baseSchema;
};
