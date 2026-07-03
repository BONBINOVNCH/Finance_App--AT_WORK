import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4 md:p-6">
            <div className="main_auth_block grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <div className="main_auth_block_left flex flex-col p-6 md:p-10 justify-between bg-white">
                    <header className="sidebar_header flex mb-8">
                        <div className="flex gap-3 w-max items-center ">
                            <div className="flex  items-center justify-center    rounded-full shadow-md shadow-emerald-100 shrink-0">
                                <Image
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    src="/images/investment.png"
                                    className="object-contain"
                                />
                            </div>

                            <div className="flex flex-col ">
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight font-sans leading-none">
                                    FUN
                                    <span className="text-emerald-600">
                                        nance
                                    </span>
                                </h3>
                            </div>
                        </div>
                    </header>

                    <div className="w-full my-auto mx-auto max-w-md p-6 md:p-8 bg-white border border-gray-200/80 rounded-2xl shadow-sm ring-1 ring-gray-950/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/[0.02]">
                        {children}
                    </div>

                    <div className="mt-8 text-center text-xs text-gray-400">
                        © 2026 FUNnance. All rights reserved.
                    </div>
                </div>

                <div className="main_auth_block_right hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 to-green-700 p-12 text-white  overflow-hidden">
                    <div className="max-w-sm text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">
                            Smart Way to Invest Your Money
                        </h2>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                            Join thousands of users managing their financial
                            future today. Easy tracking, secure investments, and
                            fun experience.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
