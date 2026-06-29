import Header from "@/components/react-components/Header";
import TotalBalance from "@/components/react-components/TotalBalance";

export default async function Home() {
    return (
        <section>
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
    );
}
