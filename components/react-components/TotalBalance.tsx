import CounterAnimated from "./CounterAnimated";
import CircleChart from "./CircleChart";

import type TotalBalance from "@/types/totalBalance";

// interface TotalBalance {
//     totalBanks: []; // <--- Не забудь тут поміняти тип !!!!!!!
//     totalAccounts: number;
//     totalCurrentBalance: number;
// }

export default function TotalBalance({
    totalBanks,
    totalAccounts,
    totalCurrentBalance,
}: TotalBalance) {
    return (
        <section className="flex m-8 flex-col sm:flex-row items-center gap-6 rounded-2xl border border-green-100 bg-white p-7 shadow-sm shadow-green-100/50 font-sans">
            <div className="flex items-center justify-center min-w-[100px] max-w-[160px]">
                <CircleChart totalBanks={totalBanks} />
            </div>

            <div className="flex-1 w-full space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <h4 className="text-sm font-semibold tracking-tight text-green-900 sm:text-base">
                        {totalAccounts} Bank Accounts Connected
                    </h4>

                    <button className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100 active:bg-green-200 cursor-pointer">
                        <span className="text-sm font-bold leading-none">
                            +
                        </span>
                        <span>Add Bank</span>
                    </button>
                </div>

                <div className=" rounded-xl bg-gradient-to-r from-green-50/60 to-emerald-50/40 p-5 border border-green-50/80 w-max">
                    <p className="text-xs font-semibold tracking-wide uppercase text-green-600/90 ">
                        Total Current Balance
                    </p>
                    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-green-950 sm:text-3xl ">
                        <CounterAnimated amount={totalCurrentBalance} />
                    </h2>
                </div>
            </div>
        </section>
    );
}
