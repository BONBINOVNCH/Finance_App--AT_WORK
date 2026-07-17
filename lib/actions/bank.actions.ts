import connectToDB from "@/backend/config/db";
import Bank from "@/backend/schemas/BankSchema";
import { BankType } from "@/types/BanksTypes";
import { plaidClient } from "../plaid";
import { CountryCode } from "plaid";
import mongoose from "mongoose";

export async function getBanks(userId: string) {
    try {
        await connectToDB();

        const updatedUserId = new mongoose.Types.ObjectId(userId);
        const banks = await Bank.find({ userId: updatedUserId });
        return JSON.parse(JSON.stringify(banks));
    } catch (e) {
        console.log(e);
    }
}

export async function getBank(bankId: string) {
    try {
        await connectToDB();

        const bank = await Bank.findOne({ _id: bankId });
        return JSON.parse(JSON.stringify(bank));
    } catch (e) {
        console.log(e);
    }
}

export const getInstitution = async ({
    institutionId,
}: {
    institutionId: string;
}) => {
    try {
        const institutionResponse = await plaidClient.institutionsGetById({
            institution_id: institutionId,
            country_codes: ["US"] as CountryCode[],
        });

        const institution = institutionResponse.data.institution;

        return JSON.parse(JSON.stringify(institution));
    } catch (e) {
        console.log("Помилка в получені акаунту: ", e);
    }
};

export const getAccounts = async ({ userId }: { userId: string }) => {
    try {
        await connectToDB();
        const banks = await getBanks(userId);

        const accounts = await Promise.all(
            banks?.map(async (bank: BankType) => {
                const response = await plaidClient.accountsGet({
                    access_token: bank.accessToken,
                });
                const data = response.data.accounts[0];

                const institution = await getInstitution({
                    institutionId: response.data.item.institution_id!,
                });

                const account = {
                    id: data.account_id,
                    availableBalance: data.balances.available!,
                    currentBalance: data.balances.current!,
                    institutionId: institution.institution_id,
                    name: data.name,
                    officialName: data.official_name,
                    mask: data.mask!,
                    type: data.type as string,
                    subtype: data.subtype! as string,
                    bankId: bank._id,
                    sharaebleId: bank.sharableId,
                };

                return account;
            }),
        );

        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total, account) => {
            return total + account.currentBalance;
        }, 0);

        return JSON.parse(
            JSON.stringify({
                data: accounts,
                totalBanks,
                totalCurrentBalance,
            }),
        );
    } catch (e) {
        console.log(e);
    }
};
