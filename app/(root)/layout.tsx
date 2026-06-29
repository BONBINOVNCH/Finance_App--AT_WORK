import Sidebar from "@/components/react-components/Sidebar";

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
        <main className="flex h-screen w-full">
            <aside>
                <Sidebar user={logged} />
            </aside>
            <div className="main_block flex-1">{children}</div>
        </main>
    );
}
