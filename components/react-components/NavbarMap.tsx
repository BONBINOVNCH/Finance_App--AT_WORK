"use client";

import User from "@/types/user";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { CiCoinInsert } from "react-icons/ci";
import { MdHistoryEdu } from "react-icons/md";
import PlaidLink from "./PlaidLink";

export default function NavbarMap({
    user,
    type,
}: {
    user: User;
    type?: "mobile";
}) {
    const searchParams = useSearchParams();

    const id = searchParams.get("id");
    const page = searchParams.get("page");

    const createLink = (baseLink: string) => {
        const params = new URLSearchParams();
        if (id) params.set("id", id);
        if (page) params.set("page", page);

        const query = params.toString();

        return query ? `${baseLink}?${query}` : baseLink;
    };

    const navLinks = [
        {
            href: createLink("/"),
            label: "Home",
            icon: <AiOutlineHome className="text-xl" />,
        },
        {
            href: createLink("/my_banks"),
            label: "My Banks",
            icon: <CiCoinInsert className="text-xl" />,
        },
        {
            href: createLink("/transaction_history"),
            label: "Transaction History",
            icon: <MdHistoryEdu className="text-xl" />,
        },
    ];

    const pathname = usePathname();

    return (
        <nav className="sidebar_options  ">
            {navLinks.map((item) => {
                const active = pathname === item.href.split("?")[0];
                return (
                    <Link
                        className={`flex flex-1 items-center gap-3 px-4 py-3  font-medium text-sm transition-all duration-200
                                    ${active ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold border-l-4 border-green-500 rounded-l-none" : "text-green-800/80 hover:bg-green-50/50 hover:text-green-700"}`}
                        key={item.href}
                        href={item.href}
                    >
                        {item.icon}{" "}
                        <span
                            className={
                                type !== "mobile" ? "md:block hidden" : "block"
                            }
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}
            <PlaidLink varient="string" user={user} type={type} />
        </nav>
    );
}
