import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

//my functions

export function formatAmount(money: number): string {
    const formated = Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "UAH",
    }).format(money);

    return formated;
}
