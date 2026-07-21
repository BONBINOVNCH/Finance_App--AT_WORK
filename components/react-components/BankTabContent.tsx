import { TotalBank } from "@/types/BanksTypes";
import { TabsContent } from "../ui/tabs";
import { FaRegCreditCard } from "react-icons/fa";

export default function BankTabContent({ account }: { account: TotalBank }) {
    return (
        <TabsContent
            value={account.bankId}
            className="mt-0 focus-visible:outline-none"
        >
            <div className="tabContent flex items-center justify-between w-full p-4 rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/20 shadow-sm transition-all hover:shadow-md hover:border-emerald-200 mb-4">
                <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                        <FaRegCreditCard className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-stone-500">
                            {account.name}
                        </p>
                        <p className="text-xl font-bold text-stone-800">
                            {account.currentBalance.toFixed(2)} $
                        </p>
                    </div>
                </div>

                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200/60 shadow-2xs">
                    {account.subtype}
                </span>
            </div>
        </TabsContent>
    );
}
