"use client";

import Transaction from "@/types/transaction";
import { PaginationBlock } from "./PaginationBlock";
import TransactionTable from "./TransactionsTable";
import { useCallback, useEffect, useState } from "react";
import SkeletonTransaction from "./SkeletonTransaction";

export default function TransactionCover({
    transactions,
    numberPage,
}: {
    transactions: Transaction[];
    numberPage: string;
}) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [transactions]);
    const startLoading = useCallback(() => {
        setLoading(true);
    }, []);
    console.log(loading);

    const maxRows = 10;
    const lastRowIndex = Number(numberPage) * maxRows;
    const firstRowIndex = lastRowIndex - maxRows;

    const currentTransactions = transactions.slice(firstRowIndex, lastRowIndex);

    return (
        <>
            {!loading ? (
                <TransactionTable transactions={currentTransactions} />
            ) : (
                <SkeletonTransaction />
            )}
            <PaginationBlock
                startLoading={() => startLoading()}
                pages={Math.ceil(transactions.length / 10).toString()}
                currentPage={numberPage.toString()}
            />
        </>
    );
}
