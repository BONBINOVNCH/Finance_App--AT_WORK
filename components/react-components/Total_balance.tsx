import { formatAmount } from "@/lib/utils";
import CounterAnimated from "./CounterAnimated";
import CircleChart from "./CircleChart";

type TotalBalance = {
    totalBanks: [];
    totalAccounts: number;
    totalCuurentBalance: number;
};

export default function Total_balance({
    totalBanks,
    totalAccounts,
    totalCuurentBalance,
}: TotalBalance) {
    return (
        <section className="total_balance">
            <div className="total_balance_left">
                <CircleChart />
            </div>
            <div className="total_balance_right">
                <div className="total_balance_right_block">
                    <div className="total_balance_right_banks">
                        <h4 className="total_balance_right_banks_amount">
                            {totalAccounts} Bank Accounts Connected
                        </h4>
                        <div className="total_balance_right_banks_addBank">
                            <span className="pluse">+</span>
                            <span className="total_balance_right_banks_addBank_text">
                                Add Bank
                            </span>
                        </div>
                    </div>
                    <div className="total_balance_right_balance">
                        <p className="balance_text">Total Current Balance</p>
                        <h2 className="balance">
                            <CounterAnimated amount={totalCuurentBalance} />
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
