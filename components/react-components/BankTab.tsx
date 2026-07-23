"use client";

import { TotalBank } from "@/types/BanksTypes";
import { TabsTrigger } from "../ui/tabs";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { formUrl } from "@/lib/utils";

export default function BankTab({
    bankId,
    startLoading,
    account,
    index,
}: {
    bankId?: string;
    startLoading: () => void;
    account: TotalBank;
    index: number;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const active = bankId ? bankId === account.bankId : index === 0;

    const onClickHandle = () => {
        startLoading();

        const url = formUrl({
            searchParams: searchParams.toString(),
            value: account.bankId,
            key: "id",
        });

        const pageUrl = formUrl({
            searchParams: searchParams.toString(),
            value: "1",
            key: "page",
        });

        router.push(`${pathName}${url}`);
    };

    return (
        <TabsTrigger onClick={onClickHandle} value={account.bankId}>
            <p className={active ? "text-green-700" : "text-gray-600"}>
                {account.name}
            </p>
        </TabsTrigger>
    );
}
