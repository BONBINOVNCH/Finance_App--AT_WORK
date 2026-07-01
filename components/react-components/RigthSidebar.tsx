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
        <aside className="right-sidebar scrollbar-none hidden xl:block w-[392px]">
            <section className="right-sidebar_header_colorful_section">
                <Image
                    src={"/images/green-gradient.png"}
                    alt="#"
                    height={60}
                    width={0}
                    className="h-[120px] w-[392px]"
                />
            </section>
            <div className="right-sidebar_header">
                <div className="right-sidebar_header_avatar">
                    <Image
                        src={"/images/investment.png"}
                        alt="#"
                        height={70}
                        width={70}
                    />
                </div>
                <div className="right-sidebar_header_userInfo">
                    <h3 className="right-sidebar_header_userInfo_name">
                        Andrij
                    </h3>
                    <p className="right-sidebar_header_userInfo_email">
                        andri@111.com
                    </p>
                </div>
            </div>
            <div className="right-sidebar_banks">
                <div className="right-sidebar_banks_addBank">
                    <p className="right-sidebar_banks_addBank_title">
                        My Banks
                    </p>
                    <button className="right-sidebar_banks_addBank_add">
                        + Add Bank
                    </button>
                </div>
                <div className="right-sidebar_banks_cards w-[344px]">
                    {allBanks.length > 0 ? (
                        <div className="right-sidebar_banks_cards_container">
                            <div className="right-sidebar_banks_card_container relative ">
                                <div className="right-sidebar_banks_card_personal_container z-[4] relative">
                                    <UserCard />
                                </div>

                                {allBanks[1] ? (
                                    <div className="right-sidebar_banks_card_container absolute z-[3] w-full right-[-28px] bottom-[-32px]">
                                        <div className="right-sidebar_banks_card_personal_container">
                                            <UserCard />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : (
                        <p>No Cards</p>
                    )}
                </div>
            </div>
        </aside>
    );
}
