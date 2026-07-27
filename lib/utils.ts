import connectToDB from "@/backend/config/db";
import Bank from "@/backend/schemas/BankSchema";
import Transaction from "@/types/transaction";
import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

import z from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function encryptId(id: string) {
    return btoa(id);
}

export function extractCustomerIdFromUrl(url: string) {
    const array = url.split("/");
    return array[array.length - 1];
}

export function formUrl({
    searchParams,
    key,
    value,
}: {
    searchParams: string;
    key: string;
    value?: string;
}) {
    const params = new URLSearchParams(searchParams);
    if (value !== undefined) {
        params.set(key, value);
    } else {
        params.delete(key);
    }
    return params.toString() ? `?${params.toString()}` : "";
}

export const removeCharacters = (value: string) => {
    return value.replace(/[^\w\s]/gi, "");
};

export const statusOfTransaction = (date: Date) => {
    const now = new Date();
    const twoDaysAgo = now.getTime() - 2 * 24 * 60 * 60 * 1000;
    return date.getTime() < twoDaysAgo ? "Success" : "Processing";
};

export const countCategories = (transactions: Transaction[]) => {
    const categories: { [category: string]: number } = {};

    transactions &&
        transactions.forEach((transaction) => {
            if (categories.hasOwnProperty(transaction.category[0])) {
                categories[transaction.category[0]] += 1;
            } else {
                categories[transaction.category[0]] = 1;
            }
        });
    let array = Object.entries(categories);
    array.sort((a, b) => b[1] - a[1]);
    const result = Object.fromEntries(array);

    return result;
};

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

        city:
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
                : z.enum(
                      [
                          "AL",
                          "AK",
                          "AZ",
                          "AR",
                          "CA",
                          "CO",
                          "CT",
                          "DE",
                          "FL",
                          "GA",
                          "HI",
                          "ID",
                          "IL",
                          "IN",
                          "IA",
                          "KS",
                          "KY",
                          "LA",
                          "ME",
                          "MD",
                          "MA",
                          "MI",
                          "MN",
                          "MS",
                          "MO",
                          "MT",
                          "NE",
                          "NV",
                          "NH",
                          "NJ",
                          "NM",
                          "NY",
                          "NC",
                          "ND",
                          "OH",
                          "OK",
                          "OR",
                          "PA",
                          "RI",
                          "SC",
                          "SD",
                          "TN",
                          "TX",
                          "UT",
                          "VT",
                          "VA",
                          "WA",
                          "WV",
                          "WI",
                          "WY",
                      ],
                      "Wrong state or format (ex: NY)",
                  ),

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
