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
}: {
    bankId?: string;
    startLoading: () => void;
    account: TotalBank;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const active = bankId === account.bankId;

    const onClickHandle = () => {
        startLoading();

        const url = formUrl({
            searchParams: searchParams.toString(),
            value: account.bankId,
            key: "id",
        });
        router.push(`${pathName}${url}`);
    };

    return (
        <TabsTrigger onClick={onClickHandle} value={account.id}>
            <p className={active ? "text-green-700" : "text-gray-600"}>
                {account.name}
            </p>
        </TabsTrigger>
    );
}
