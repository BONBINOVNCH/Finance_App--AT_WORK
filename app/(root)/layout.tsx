import MobileNavbar from "@/components/react-components/MobileNavbar";
import Sidebar from "@/components/react-components/Sidebar";
import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedUser = await getCurrentUser();

    if (!loggedUser) {
        await redirect("/sign_up");
    }

    return (
        <main className="flex h-screen">
            <aside className="border-r-1 border-emerald-100">
                <Sidebar user={loggedUser} />
            </aside>
            <div className="main_block flex-1 ">
                <div className="navbar_mobile_container ">
                    <div className="navbar_mobile flex justify-between items-center my-4 mx-8 sm:hidden">
                        <Image
                            src="/images/investment.png"
                            alt="#"
                            width={30}
                            height={30}
                        />
                        <div className="navbar_mobile_main ">
                            <MobileNavbar user={loggedUser} />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}
