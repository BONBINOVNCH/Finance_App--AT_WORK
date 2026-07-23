"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TotalBank } from "@/types/BanksTypes";
import BankTab from "./BankTab";
import BankTabContent from "./BankTabContent";
import TransactionTable from "./TransactionsTable";
import { useCallback, useEffect, useState } from "react";
import SkeletonTransaction from "./SkeletonTransaction";
import { useSearchParams } from "next/navigation";
import { PaginationBlock } from "./PaginationBlock";

export default function Transactions({
    accounts,
    transactions = [],
    bankId,
    page,
}: {
    accounts: any; //<--- Дороби цей тип!!!
    transactions: any; //<--- Дороби цей тип!!!
    bankId?: string;
    page: number;
}) {
    transactions;
    //console.log(accounts);

    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const currentPage = searchParams.get("page") || "1";
    console.log(loading);
    useEffect(() => {
        setLoading(false);
    }, [transactions, bankId]);

    const maxRows = 10;
    const lastRowIndex = Number(currentPage) * maxRows;
    const firstRowIndex = lastRowIndex - maxRows;

    const currentTransactions = transactions.slice(firstRowIndex, lastRowIndex);

    console.log(currentPage);

    const startLoading = useCallback(() => {
        setLoading(true);
    }, []);
    return (
        <>
            <section className="transactions block w-auto m-8 h-screen">
                <Tabs defaultValue={id ? id : accounts[0].bankId}>
                    <TabsList>
                        {accounts.map((account: TotalBank, index: number) => (
                            <BankTab
                                key={account.id}
                                startLoading={() => startLoading()}
                                bankId={bankId}
                                account={account}
                                index={index}
                            />
                        ))}
                    </TabsList>
                    {accounts.map((account: TotalBank) => (
                        <BankTabContent key={account.id} account={account} />
                    ))}
                </Tabs>

                {loading ? (
                    <SkeletonTransaction />
                ) : (
                    <TransactionTable transactions={currentTransactions} />
                )}

                <PaginationBlock
                    startLoading={() => startLoading()}
                    pages={Math.ceil(transactions.length / 10).toString()}
                    currentPage={page.toString()}
                />
            </section>
        </>
    );
}
