import Header from "@/components/react-components/Header";
import RigthSidebar from "@/components/react-components/RigthSidebar";
import TotalBalance from "@/components/react-components/TotalBalance";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
    const loggedUser = await getCurrentUser();
    console.log(loggedUser);
    const accounts = await getAccounts({ userId: loggedUser._id });
    const account = await getAccount({ bankId: accounts.data[0].bankId });

    console.log(account);

    if (!accounts) {
        return;
    }
    console.log(accounts);

    return (
        <div className="home_container flex ">
            <section className="flex-1">
                <Header
                    user={loggedUser}
                    mainText="Welcom,"
                    smallText="Access and manage your transaction"
                />
                <TotalBalance
                    totalBanks={accounts.data}
                    totalAccounts={accounts.data.length}
                    totalCurrentBalance={accounts.totalCurrentBalance}
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
