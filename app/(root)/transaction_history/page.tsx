import Header from "@/components/react-components/Header";
import { PaginationBlock } from "@/components/react-components/PaginationBlock";
import TransactionCover from "@/components/react-components/TransactionCover";
import TransactionTable from "@/components/react-components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getCurrentUser } from "@/lib/auth";

type SearchParams = {
    id?: string;
    page?: string;
};

export default async function Transaction_history({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const user = await getCurrentUser();

    const { id, page } = await searchParams;
    const numberPage = Number(page as string) || 1;

    // console.log(loggedUser);
    const accounts = await getAccounts({ userId: user._id });
    const account = await getAccount({ bankId: id || accounts.data[0].bankId });

    //console.log(account);

    if (!accounts) {
        return;
    }

    return (
        <div className="transactionHistory overflow-x-auto scrollbar-none sm:h-screen">
            <Header
                smallText="See all your transactions in one place"
                mainText="Transaction history"
            />

            <div className="transactionHistory_bankInfo m-8">
                <div className="flex flex-wrap justify-between items-center p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-lg border border-emerald-700/40 backdrop-blur-sm gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold tracking-tight text-emerald-50">
                            {account?.data.name}
                        </h2>
                        <p className="text-xs font-medium text-emerald-200/80 uppercase tracking-wider">
                            {account?.data.officialName}
                        </p>
                        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-600/30 w-max">
                            <span className="text-xs font-mono tracking-widest text-emerald-300">
                                •••• •••• •••• {account?.data.mask}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center bg-emerald-950/30 p-4 rounded-xl border border-emerald-600/20">
                        <p className="text-xs font-medium text-emerald-300 uppercase tracking-wider mb-1">
                            Current balance
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-40 text-emerald-100">
                            {account?.data.currentBalance} $
                        </h2>
                    </div>
                </div>
                {/* <TransactionTable transactions={account?.transactions} />
                <PaginationBlock
                    //startLoading={() => startLoading()}
                    pages={Math.ceil(
                        account?.transactions.length / 10,
                    ).toString()}
                    currentPage={numberPage.toString()}
                /> */}
                <TransactionCover
                    transactions={account?.transactions}
                    numberPage={numberPage.toString()}
                />
            </div>
        </div>
    );
}
