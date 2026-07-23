import { countCategories } from "@/lib/utils";
import Transaction from "@/types/transaction";

import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

import { MdFastfood, MdOutlinePayments, MdCardTravel } from "react-icons/md";
import { LuCoins } from "react-icons/lu";

export default function Category({
    transactions,
}: {
    transactions: Transaction[];
}) {
    const categories = countCategories(transactions);
    const categoriesArray = Object.entries(categories);

    const chooseCategoryStyle = (name: string) => {
        switch (name) {
            case "Food and Drink":
                return {
                    icon: (
                        <MdFastfood className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    ),
                    bg: "bg-amber-100 dark:bg-amber-950/40",
                    progressClass: "[&>div]:bg-amber-500",
                };
            case "Payment":
                return {
                    icon: (
                        <MdOutlinePayments className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ),
                    bg: "bg-emerald-100 dark:bg-emerald-950/40",
                    progressClass: "[&>div]:bg-emerald-500",
                };
            case "Travel":
                return {
                    icon: (
                        <MdCardTravel className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    ),
                    bg: "bg-sky-100 dark:bg-sky-950/40",
                    progressClass: "[&>div]:bg-sky-500",
                };
            default:
                return {
                    icon: (
                        <LuCoins className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    ),
                    bg: "bg-purple-100 dark:bg-purple-950/40",
                    progressClass: "[&>div]:bg-purple-500",
                };
        }
    };

    const sum = Object.values(categories).reduce(
        (start, num) => start + num,
        0,
    );

    return (
        <>
            <div className="category m-8">
                <header className="category_top font-semibold text-lg mb-4">
                    Top categories
                </header>
                <div className="category_block space-y-4">
                    {categoriesArray.map((category, index) => {
                        const categoryName = category[0];
                        const categoryCount = category[1];

                        const style = chooseCategoryStyle(categoryName);

                        if (index <= 2) {
                            return (
                                <div
                                    key={categoryName}
                                    className="category_item flex items-center justify-between gap-4"
                                >
                                    <div
                                        className={`category_item_left p-2.5 rounded-xl flex items-center justify-center ${style.bg}`}
                                    >
                                        {style.icon}
                                    </div>
                                    <div className="category_item_right w-full">
                                        <Field className="w-full max-w-sm">
                                            <FieldLabel>
                                                <span>{categoryName}</span>
                                                <span className="ml-auto font-medium">
                                                    {categoryCount}
                                                </span>
                                            </FieldLabel>
                                            <Progress
                                                value={
                                                    sum > 0
                                                        ? (categoryCount *
                                                              100) /
                                                          sum
                                                        : 0
                                                }
                                                className={style.progressClass}
                                            />
                                        </Field>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}
