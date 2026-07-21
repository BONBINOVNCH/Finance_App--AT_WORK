import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { removeCharacters, statusOfTransaction } from "@/lib/utils";
import Transaction from "@/types/transaction";

const getCategoryStyles = (category: string) => {
    switch (category?.toLowerCase()) {
        case "food":
        case "groceries":
            return "bg-emerald-100 text-emerald-800 border-emerald-200";
        case "entertainment":
        case "travel":
            return "bg-sky-100 text-sky-800 border-sky-200";
        case "utilities":
        case "bills":
            return "bg-amber-100 text-amber-800 border-amber-200";
        default:
            return "bg-slate-100 text-slate-800 border-slate-200";
    }
};

const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
        case "success":
            return "bg-green-100 text-green-700";
        case "pending":
            return "bg-yellow-100 text-yellow-700";
        case "failed":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function TransactionTable({
    transactions,
}: {
    transactions: Transaction[];
}) {
    return (
        <div className=" w-full overflow-hidden pb-8 rounded-xl">
            <div className="overflow-x-auto w-full rounded-xl border border-stone-200/80 bg-white shadow-sm">
                <Table className="min-w-[600px] md:min-w-full ">
                    <TableHeader className="bg-gradient-to-br from-green-50 to-emerald-100">
                        <TableRow className="hover:bg-transparent border-b border-stone-200">
                            <TableHead className="font-semibold text-green-900">
                                Transaction
                            </TableHead>
                            <TableHead className="font-semibold text-green-900">
                                Amount
                            </TableHead>
                            <TableHead className="font-semibold text-green-900">
                                Status
                            </TableHead>

                            <TableHead className="font-semibold text-green-900 hidden sm:table-cell">
                                Date
                            </TableHead>

                            <TableHead className="font-semibold text-green-900 hidden md:table-cell">
                                Channel
                            </TableHead>
                            <TableHead className="font-semibold text-green-900">
                                Category
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((trans) => {
                            const status = statusOfTransaction(
                                new Date(trans.date),
                            );
                            const isExpense = trans.amount > 0;

                            return (
                                <TableRow
                                    key={trans.transaction_id}
                                    className="hover:bg-emerald-50/30 transition-colors border-b border-stone-100"
                                >
                                    <TableCell className="font-medium text-stone-800 py-3.5 max-w-[180px] truncate">
                                        {removeCharacters(trans.name)}
                                    </TableCell>

                                    <TableCell
                                        className={`font-semibold tabular-nums ${
                                            isExpense
                                                ? "text-red-700"
                                                : "text-emerald-600"
                                        }`}
                                    >
                                        {isExpense ? "- " : "+ "}
                                        {Math.abs(trans.amount).toFixed(2)} $
                                    </TableCell>

                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(status)}`}
                                        >
                                            {status}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-stone-500 font-normal hidden sm:table-cell">
                                        {trans.date}
                                    </TableCell>

                                    <TableCell className="text-stone-600 capitalize hidden md:table-cell">
                                        {trans.payment_channel}
                                    </TableCell>

                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getCategoryStyles(trans.category[0])}`}
                                        >
                                            {trans.category[0]}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
