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
        <section className="sidebar">
            <header className="sidebar_header">
                <Link className="flex items-center" href="/">
                    <Image
                        alt="logo"
                        width={34}
                        height={34}
                        src="/images/investment.png"
                    />
                    <h3 className="sidebar_header_title">FUNnance</h3>
                </Link>
                <input type="text" />
                <div className="sidebar_options">
                    {navLinks.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                                    ${active ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold border-l-4 border-green-500 rounded-l-none" : "text-green-800/80 hover:bg-green-50/50 hover:text-green-700"}`}
                                key={item.href}
                                href={item.href}
                            >
                                {item.icon} {item.label}
                            </Link>
                        );
                    })}
                </div>
            </header>
        </section>
    );
}
