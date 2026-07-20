import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TotalBank } from "@/types/BanksTypes";
import BankTab from "./BankTab";
import BankTabContent from "./BankTabContent";
import TransactionTable from "./TransactionsTable";

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
    return (
        <section className="transactions block w-auto m-8">
            <Tabs defaultValue="account">
                <TabsList>
                    {accounts.map((account: TotalBank) => (
                        <BankTab
                            key={account.id}
                            bankId={bankId}
                            account={account}
                        />
                    ))}
                </TabsList>
                {accounts.map((account: TotalBank) => (
                    <BankTabContent key={account.id} account={account} />
                ))}
            </Tabs>
            <TransactionTable transactions={transactions} />
        </section>
    );
}
