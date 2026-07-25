import Clipboard from "@/components/react-components/Clipboard";
import Header from "@/components/react-components/Header";
import UserCard from "@/components/react-components/UserCard";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getCurrentUser } from "@/lib/auth";
import { TotalBank } from "@/types/BanksTypes";

type SearchParams = {
    id?: string;
    page?: string;
};

export default async function My_banks({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const user = await getCurrentUser();

    const { id, page } = await searchParams;
    const numberPage = Number(page as string) || 1;

    const accounts = await getAccounts({ userId: user._id });
    const account = await getAccount({ bankId: id || accounts.data[0].bankId });

    console.log(accounts);

    if (!accounts) {
        return;
    }

    return (
        <>
            <div className="myBanks overflow-x-auto scrollbar-none sm:h-screen">
                <Header
                    smallText="See all your connected banks"
                    mainText="Bank accounts"
                />
                <h3 className="myBanks_main_title ml-8 font-bold text-2xl">
                    Your Cards:
                </h3>
                <div className="myBanks_main flex gap-4 m-8 flex-wrap">
                    {accounts?.data.map((bank: TotalBank) => {
                        return (
                            <div key={bank.id}>
                                <UserCard user={user} bank={bank} />
                                <Clipboard sharableId={bank.sharaebleId} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
