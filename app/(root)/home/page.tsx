import Header from "@/components/react-components/Header";
import Total_balance from "@/components/react-components/Total_balance";

export default async function Home() {
    return (
        <section>
            <Header
                mainText="Welcom,"
                smallText="Access and manage your transaction"
                selectedText="Adrian"
            />
            <Total_balance
                totalBanks={[]}
                totalAccounts={2}
                totalCuurentBalance={13222}
            />
        </section>
    );
}
