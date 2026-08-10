export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import StoreProvider from "@/components/react-components/StoreProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-sans",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FUNance",
    description: "Manage your finance with us",
    icons: {
        icon: "/images/investment.png",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();

    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased scrollbar-none`}
        >
            <body className="min-h-full flex flex-col">
                <StoreProvider initialUser={user}>{children}</StoreProvider>
            </body>
        </html>
    );
}
