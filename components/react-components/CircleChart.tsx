"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function CircleChart({ totalBanks }: { totalBanks: any[] }) {
    //<---- Дороби цей тип!!!!!

    const bankNames = totalBanks.map((bank) => bank.name);
    const bankBalances = totalBanks.map((bank) => bank.currentBalance);

    return (
        <Pie
            data={{
                labels: bankNames,
                datasets: [
                    {
                        label: "Your banks",
                        data: bankBalances,
                        backgroundColor: [
                            "rgb(46, 117, 89)",
                            "rgb(40, 167, 69)",
                            "rgb(163, 215, 142)",
                        ],
                        hoverOffset: 4,
                        borderWidth: 0,
                    },
                ],
            }}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
}
