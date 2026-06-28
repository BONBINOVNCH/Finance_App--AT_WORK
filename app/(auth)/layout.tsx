export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="main_auth_block">
                <div className="main_auth_block_left">
                    <h1 className="auth_title">FUNnance</h1>
                    {children}
                </div>
                <div className="main_auth_block_right">
                    <img className="auth_image_example" src="#" alt="#" />
                </div>
            </div>
        </main>
    );
}
