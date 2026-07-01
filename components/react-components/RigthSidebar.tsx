import User from "@/types/user";
import TotalBanks from "@/types/totalBanks";
import Transaction from "@/types/transaction";
import Image from "next/image";
import UserCard from "./UserCard";

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
        <aside className="right-sidebar scrollbar-none hidden xl:flex h-screen w-[392px] flex-col border-l border-gray-100 bg-white shadow-sm ">
            <section className="right-sidebar_header_colorful_section relative h-[120px] w-full overflow-hidden">
                <Image
                    src={"/images/green-gradient.png"}
                    alt="#"
                    fill
                    sizes="auto"
                    priority
                    className="object-cover"
                />
            </section>
            <div className="right-sidebar_header px-6 pb-6 flex flex-col mt-[-35px] relative z-10 gap-3">
                <div className="right-sidebar_header_avatar relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-tr from-emerald-500 to-green-400 p-1 shadow-md overflow-hidden">
                    <Image
                        src={"/images/investment.png"}
                        alt="#"
                        width={70}
                        height={70}
                        className="object-contain"
                    />
                </div>
                <div className="right-sidebar_header_userInfo flex flex-col">
                    <h3 className="right-sidebar_header_userInfo_name text-xl font-bold text-gray-900 tracking-tight">
                        Andrij
                    </h3>
                    <p className="right-sidebar_header_userInfo_email text-sm font-medium text-gray-500">
                        andri@111.com
                    </p>
                </div>
            </div>
            <div className="right-sidebar_banks flex flex-col gap-6 px-6 py-4">
                <div className="right-sidebar_banks_addBank flex justify-between items-center">
                    <p className="right-sidebar_banks_addBank_title text-lg font-bold text-gray-900">
                        My Banks
                    </p>
                    <button className="right-sidebar_banks_addBank_add flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-95">
                        + Add Bank
                    </button>
                </div>
                <div className="right-sidebar_banks_cards w-full flex justify-center pt-2">
                    {allBanks.length > 0 ? (
                        <div className="right-sidebar_banks_cards_container relative w-full max-w-[320px]">
                            <div className="right-sidebar_banks_card_container relative z-[4]">
                                <div className="right-sidebar_banks_card_personal_container">
                                    <UserCard />
                                </div>

                                {allBanks[1] ? (
                                    <div className="right-sidebar_banks_card_container absolute z-[-10] top-4 left-5 w-full opacity-45 transition-all duration-300 hover:opacity-85 hover:translate-x-2">
                                        <div className="right-sidebar_banks_card_personal_container">
                                            <UserCard />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm font-medium text-gray-400 py-4">
                            No Cards
                        </p>
                    )}
                </div>
            </div>
        </aside>
    );
}
