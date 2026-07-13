import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import z from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --Zod Schemas-- //

export const formSchema = (varient: string) =>
    z.object({
        firstName:
            varient === "login"
                ? z
                      .string()
                      .min(3, {
                          message: "First name must be at least 3 characters",
                      })
                      .optional()
                : z.string().min(3, {
                      message: "First name is required (min 3 characters)",
                  }),

        lastName:
            varient === "login"
                ? z
                      .string()
                      .min(3, {
                          message: "Last name must be at least 3 characters",
                      })
                      .optional()
                : z.string().min(3, {
                      message: "Last name is required (min 3 characters)",
                  }),

        address1:
            varient === "login"
                ? z
                      .string()
                      .max(50, { message: "Maximum 50 characters allowed" })
                      .optional()
                : z
                      .string()
                      .min(1, { message: "Address is required" })
                      .max(50, { message: "Maximum 50 characters allowed" }),

        state:
            varient === "login"
                ? z.string().min(2).max(2).optional()
                : z.string().length(2, {
                      message: "State must be a 2-letter code (e.g., NY)",
                  }),

        postalCode:
            varient === "login"
                ? z.string().min(3).max(6).optional()
                : z
                      .string()
                      .min(3, { message: "Postal code is too short" })
                      .max(6, { message: "Postal code is too long" }),

        dateOfBirth:
            varient === "login"
                ? z.string().optional()
                : z
                      .string()
                      .date()
                      .min(1, { message: "Date of birth is required" }),

        ssn:
            varient === "login"
                ? z.string().min(3).optional()
                : z
                      .string()
                      .min(9, { message: "SSN must be at least 9 digits" }),

        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid email format" }),

        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
    });
