import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { removeCharacters, statusOfTransaction } from "@/lib/utils";
import Transaction from "@/types/transaction";

export default function TransactionTable({
    transactions,
}: {
    transactions: Transaction[];
}) {
    console.log(transactions);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((trans) => (
                    <TableRow key={trans.transaction_id}>
                        <TableCell className="font-medium">
                            {removeCharacters(trans.name)}
                        </TableCell>
                        <TableCell className="font-medium">
                            {trans.amount < 0 ? "+ " : "- "}
                            {Math.abs(trans.amount)} $
                        </TableCell>
                        <TableCell className="font-medium">
                            {statusOfTransaction(new Date(trans.date))}
                        </TableCell>
                        <TableCell className="font-medium">
                            {trans.date}
                        </TableCell>
                        <TableCell className="font-medium">
                            {trans.category[0]}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
