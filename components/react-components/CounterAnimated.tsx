"use client";

import CountUp from "react-countup";

export default function CounterAnimated({ amount }: { amount: number }) {
    return (
        <CountUp
            prefix="₴ "
            decimal=","
            decimals={2}
            duration={1.5}
            end={amount}
        />
    );
}
