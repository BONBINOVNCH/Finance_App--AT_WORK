import { IoLogOutOutline } from "react-icons/io5";

import Link from "next/link";
import Image from "next/image";

import type User from "@/types/user";

import NavbarMap from "./NavbarMap";
import { logoutCurrentUser } from "@/lib/auth";
import LogoutButton from "./Logout";

export default function Sidebar({ user }: { user: User }) {
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

                <NavbarMap user={user} />
            </div>

            <LogoutButton user={user} />
        </section>
    );
}
