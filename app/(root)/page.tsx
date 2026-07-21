import Header from "@/components/react-components/Header";
import RigthSidebar from "@/components/react-components/RigthSidebar";
import TotalBalance from "@/components/react-components/TotalBalance";
import Transactions from "@/components/react-components/Transactions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getCurrentUser } from "@/lib/auth";

type SearchParams = {
    id?: string;
    page?: string;
};

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { id, page } = await searchParams;
    const numberPage = Number(page as string) || 1;
    const loggedUser = await getCurrentUser();
    // console.log(loggedUser);
    const accounts = await getAccounts({ userId: loggedUser._id });
    const account = await getAccount({ bankId: id || accounts.data[0].bankId });

    //console.log(account);

    if (!accounts) {
        return;
    }
    //console.log(accounts);

    return (
        <div className="home_container flex ">
            <section className="flex-1 overflow-x-auto scrollbar-none sm:h-screen ">
                <Header
                    user={loggedUser}
                    mainText="Welcom,"
                    smallText="Access and manage your transaction"
                    selectedText={loggedUser.firstName}
                />
                <TotalBalance
                    totalBanks={accounts.data}
                    totalAccounts={accounts.data.length}
                    totalCurrentBalance={accounts.totalCurrentBalance}
                />

                <Transactions
                    accounts={accounts.data}
                    transactions={account?.transactions}
                    bankId={id}
                    page={numberPage}
                />
            </section>

            <RigthSidebar
                user={loggedUser}
                allTransactio={accounts?.transactions}
                allBanks={accounts.data?.slice(0, 2)}
            />
        </div>
    );
}
