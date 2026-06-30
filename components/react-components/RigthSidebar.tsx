import { User } from "@/types/User";
import TotalBanks from "@/types/totalBanks";
import { Transaction } from "@/types/transaction";

export default function RigthSidebar({
    user,
    allTransactio,
    allBanks,
}: {
    user: User;
    allTransactio: Transaction[];
    allBanks: TotalBanks[];
}) {
    return (
        <aside className="scrollbar-none hidden xl:block">
            <h1>sidebarR</h1>
        </aside>
    );
}
