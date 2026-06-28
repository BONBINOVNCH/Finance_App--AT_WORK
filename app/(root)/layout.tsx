export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="main_block">
                <aside>sidebar</aside>
                {children}
            </div>
        </main>
    );
}
