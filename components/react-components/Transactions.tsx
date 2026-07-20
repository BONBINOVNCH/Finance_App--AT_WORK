"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TotalBank } from "@/types/BanksTypes";
import BankTab from "./BankTab";
import BankTabContent from "./BankTabContent";
import TransactionTable from "./TransactionsTable";
import { useEffect, useState } from "react";
import SkeletonTransaction from "./SkeletonTransaction";

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
    console.log(loading);
    useEffect(() => {
        setLoading(false);
    }, [transactions, bankId]);

    return (
        <section className="transactions block w-auto m-8 h-screen">
            <Tabs defaultValue={accounts[0].id}>
                <TabsList>
                    {accounts.map((account: TotalBank) => (
                        <BankTab
                            key={account.id}
                            startLoading={() => setLoading(true)}
                            bankId={bankId}
                            account={account}
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
                <TransactionTable transactions={transactions} />
            )}
        </section>
    );
}
