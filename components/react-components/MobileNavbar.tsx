"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";
import { CiCoinInsert } from "react-icons/ci";
import { MdHistoryEdu, MdAddCard } from "react-icons/md";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

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

export default function MobileNavbar() {
    const pathname = usePathname();
    return (
        <section>
            <Sheet>
                <SheetTrigger>
                    <RxHamburgerMenu size={24} />
                </SheetTrigger>
                <SheetContent side={"left"}>
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

                            <div className="flex flex-col min-w-0 transition-opacity duration-300">
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight font-sans leading-none">
                                    FUN
                                    <span className="text-emerald-600">
                                        nance
                                    </span>
                                </h3>
                            </div>
                        </Link>
                    </header>
                    {navLinks.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                className={`flex w-auto items-center gap-3 px-4 py-3  font-medium text-sm transition-all duration-200
                                    ${active ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold border-l-4 border-green-500 rounded-l-none" : "text-green-800/80 hover:bg-green-50/50 hover:text-green-700"}`}
                                key={item.href}
                                href={item.href}
                            >
                                {item.icon}{" "}
                                <span className="">{item.label}</span>
                            </Link>
                        );
                    })}
                </SheetContent>
            </Sheet>
        </section>
    );
}
