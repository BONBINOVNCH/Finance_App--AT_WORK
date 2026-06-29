"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function CircleChart({ totalBanks }: { totalBanks: [] }) {
    return (
        <Pie
            data={{
                labels: ["Red", "Blue", "Yellow"],
                datasets: [
                    {
                        label: "Your banks",
                        data: [100, 50, 100],
                        backgroundColor: [
                            "rgb(164, 65, 87)",
                            "rgb(54, 162, 235)",
                            "rgb(255, 205, 86)",
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
