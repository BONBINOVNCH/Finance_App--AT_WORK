import MobileNavbar from "@/components/react-components/MobileNavbar";
import Sidebar from "@/components/react-components/Sidebar";
import Image from "next/image";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const logged = {
        name: "Max",
        surname: "Zal",
    };
    return (
        <main className="flex h-screen ">
            <aside className="border-r-1 border-emerald-100">
                <Sidebar user={logged} />
            </aside>
            <div className="main_block flex-1  ">
                <div className="navbar_mobile_container ">
                    <div className="navbar_mobile flex justify-between items-center my-4 mx-8">
                        <Image
                            src="/images/investment.png"
                            alt="#"
                            width={30}
                            height={30}
                        />
                        <div className="navbar_mobile_main">
                            <MobileNavbar />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}
