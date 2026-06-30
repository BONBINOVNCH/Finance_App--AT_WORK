import Header from "@/components/react-components/Header";
import RigthSidebar from "@/components/react-components/RigthSidebar";
import TotalBalance from "@/components/react-components/TotalBalance";

export default async function Home() {
    return (
        <div className="home_container flex ">
            <section className="flex-1">
                <Header
                    mainText="Welcom,"
                    smallText="Access and manage your transaction"
                    selectedText="Adrian"
                />
                <TotalBalance
                    totalBanks={[]}
                    totalAccounts={2}
                    totalCurrentBalance={13222}
                />
            </section>

            <RigthSidebar user={{}} allTransactio={[]} allBanks={[]} />
        </div>
    );
}
