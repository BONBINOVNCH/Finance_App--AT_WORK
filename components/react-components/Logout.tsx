"use client";

import { IoLogOutOutline } from "react-icons/io5";
import type User from "@/types/user";
import { logoutCurrentUser } from "@/lib/auth";
import { useTransition } from "react";

export default function LogoutButton({
    user,
    type,
}: {
    user: User;
    type?: "mobile";
}) {
    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        startTransition(async () => {
            await logoutCurrentUser();
        });
    };

    const isMobile = type === "mobile";

    return (
        <button
            onClick={handleLogout}
            disabled={isPending}
            className="logout flex items-center gap-2 p-3  bg-gray-50/80 hover:bg-emerald-50/60 border border-gray-100 transition-all duration-200 group cursor-pointer w-full disabled:opacity-50"
        >
            <div
                className={`${
                    isMobile ? "flex" : "hidden md:flex"
                } items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 text-white font-bold text-sm shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200`}
            >
                {user.firstName?.charAt(0).toUpperCase()}
            </div>

            <div
                className={`${
                    isMobile ? "flex" : "hidden md:flex"
                } w-full flex-col min-w-0 flex-1 leading-tight text-left`}
            >
                <p className="logout_firstname text-sm font-semibold text-gray-800 truncate">
                    {user.firstName}
                </p>
                <p className="logout_email text-xs text-gray-500 truncate">
                    {user.email}
                </p>
            </div>

            <div className="logout_icon flex items-center justify-center text-gray-400 group-hover:text-red-500 transition-colors duration-200 text-xl shrink-0">
                <IoLogOutOutline className="h-full w-[24px]" />
            </div>
        </button>
    );
}
