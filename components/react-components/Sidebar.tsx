"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AiOutlineHome } from "react-icons/ai";
import { CiCoinInsert } from "react-icons/ci";
import { MdHistoryEdu, MdAddCard } from "react-icons/md";

interface User {} // <--- Згодом дороби цей тип!!!!!!!!!

const navLinks = [
    { href: "/", label: "Home", icon: <AiOutlineHome className="text-xl" /> },
    {
        href: "/my_banks",
        label: "My Banks",
        icon: <CiCoinInsert className="text-xl" />,
    },
    {
        href: "/transaction_history",
        label: "Transaction History",
        icon: <MdHistoryEdu className="text-xl" />,
    },
    {
        href: "/connect_bank",
        label: "Connect Bank",
        icon: <MdAddCard className="text-xl" />,
    },
];

export default function Sidebar({ user }: { user: User }) {
    const pathname = usePathname();

    return (
        <section className="sidebar flex flex-col md:w-[194px] hidden sm:block">
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
                            FUN<span className="text-emerald-600">nance</span>
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
                    const active = pathname === item.href;
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
            </nav>
        </section>
    );
}
