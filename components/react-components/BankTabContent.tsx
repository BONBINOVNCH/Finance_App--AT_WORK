import { TotalBank } from "@/types/BanksTypes";
import { TabsContent } from "../ui/tabs";
import { FaRegCreditCard } from "react-icons/fa";

export default function BankTabContent({
    account,
    key,
}: {
    account: TotalBank;
    key: string;
}) {
    console.log(account);
    return (
        <TabsContent key={account.id} value={account.id}>
            <div className="tabContent flex items-center w-full">
                <FaRegCreditCard />
                <div>
                    <p>{account.name}</p>
                    <p>{account.currentBalance}</p>
                </div>

                <span>{account.subtype}</span>
            </div>
        </TabsContent>
    );
}
