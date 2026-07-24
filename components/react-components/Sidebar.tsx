"use client";

import { IoLogOutOutline } from "react-icons/io5";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

import type User from "@/types/user";

import { AiOutlineHome } from "react-icons/ai";
import { CiCoinInsert } from "react-icons/ci";
import { MdHistoryEdu, MdAddCard } from "react-icons/md";
import PlaidLink from "./PlaidLink";

export default function Sidebar({ user }: { user: User }) {
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
        <section className="sidebar flex flex-1 justify-between flex-col md:w-[194px] hidden sm:flex overflow-hidden h-full">
            <div className="sidebar_block">
                <header className="sidebar_header md:px-3 flex justify-center  py-2  border-b border-gray-100/80">
                    <Link
                        className="flex items-center gap-3 w-max items-center md:p-1.5 transition-all duration-300 hover:bg-gray-50/50"
                        href="/"
                    >
                        <div className="flex items-center justify-centerbg-gradient-to-tr from-green-500 to-emerald-400 rounded-full shadow-md shadow-emerald-100 transition-transform duration-300 group-hover:scale-105 shrink-0">
                            <Image
                                alt="logo"
                                width={34}
                                height={34}
                                src="/images/investment.png"
                                className=" "
                            />
                        </div>

                        <div className="hidden md:flex flex-col min-w-0 transition-opacity duration-300">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight font-sans leading-none">
                                FUN
                                <span className="text-emerald-600">nance</span>
                            </h3>
                        </div>
                    </Link>
                </header>
                <div className="input_container grow hidden md:inline-block  mx-4 my-4">
                    <input
                        type="text"
                        className=" h-8 p-3 border border-gray-300 rounded-md text-sm w-full outline-none focus:border-green-500"
                    />
                </div>
                <nav className="sidebar_options w-max ">
                    {navLinks.map((item) => {
                        const active = pathname === item.href.split("?")[0];
                        return (
                            <Link
                                className={`flex w-max md:w-auto items-center gap-3 px-4 py-3  font-medium text-sm transition-all duration-200
                                    ${active ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold border-l-4 border-green-500 rounded-l-none" : "text-green-800/80 hover:bg-green-50/50 hover:text-green-700"}`}
                                key={item.href}
                                href={item.href}
                            >
                                {item.icon}{" "}
                                <span className="md:block hidden">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                    <PlaidLink varient="string" user={user} />
                </nav>
            </div>

            <div className="logout flex items-center gap-2 p-3 md:m-2 md:rounded-xl bg-gray-50/80 hover:bg-emerald-50/60 border border-gray-100 transition-all duration-200 group cursor-pointer">
                <div className="logout_avatar hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 text-white font-bold text-sm shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200">
                    {user.firstName?.split("")[0].toUpperCase()}
                </div>

                <div className="logout_info hidden w-full md:flex flex-col min-w-0 flex-1 leading-tight">
                    <p className="logout_firstname text-sm font-semibold text-gray-800 truncate">
                        {user.firstName}
                    </p>
                    <p className="logout_email text-xs text-gray-500 truncate">
                        {user.email}
                    </p>
                </div>

                <div className="logout_icon  flex  items-center justify-center text-gray-400 group-hover:text-red-500 transition-colors duration-200 text-xl shrink-0">
                    <IoLogOutOutline className=" h-full w-[24px]" />
                </div>
            </div>
        </section>
    );
}
