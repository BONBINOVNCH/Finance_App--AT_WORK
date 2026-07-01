import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="main_auth_block">
                <div className="main_auth_block_left">
                    <header className="sidebar_header md:px-3 flex p-2  ">
                        <div className="flex  gap-3 w-max items-center md:p-1.5 transition-all duration-300 hover:bg-gray-50/50">
                            <div className="flex items-center justify-center bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full shadow-md shadow-emerald-100 transition-transform duration-300 group-hover:scale-105 shrink-0">
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
                        </div>
                    </header>
                    {children}
                </div>
                {/* <div className="main_auth_block_right">
                    <img className="auth_image_example" src="#" alt="#" />
                </div> */}
            </div>
        </main>
    );
}
