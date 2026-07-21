"use server";

import { User } from "@sentry/nextjs";
import {
    CountryCode,
    ProcessorTokenCreateRequest,
    ProcessorTokenCreateRequestProcessorEnum,
    Products,
    DepositoryAccountSubtype,
} from "plaid";
import { plaidClient } from "../plaid";

import { encryptId } from "../utils";
import { revalidatePath } from "next/cache";
import { addFundingSource } from "./dwolla.actions";
import connectToDB from "@/backend/config/db";
import Bank from "@/backend/schemas/BankSchema";
//import User from "@/types/user";

interface CreateBankAccountProps {
    userId: string;
    bankId: string;
    accountId: string;
    accessToken: string;
    fundingSourceUrl: string;
    sharableId: string;
}

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user._id.toString(),
            },
            client_name: `${user.firstName} ${user.lastName}`,
            products: ["auth", "transactions"] as Products[],
            language: "en",
            country_codes: ["US"] as CountryCode[],
            account_filters: {
                depository: {
                    account_subtypes: [
                        DepositoryAccountSubtype.Checking,
                        DepositoryAccountSubtype.Savings,
                    ],
                },
            },
        };

        const response = await plaidClient.linkTokenCreate(tokenParams);
        return JSON.parse(
            JSON.stringify({ linkToken: response.data.link_token }),
        );
    } catch (e) {
        console.log(e);
    }
};

export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    sharableId,
}: CreateBankAccountProps) => {
    try {
        await connectToDB();

        const newBankAccount = await Bank.create({
            userId,
            bankId,
            accountId,
            accessToken,
            fundingSourceUrl,
            sharableId,
        });

        return JSON.parse(JSON.stringify(newBankAccount));
    } catch (e) {
        console.error("Помилки при збережені банку:", e);
        throw e;
    }
};

export const exchangePublicToken = async ({
    publicToken,
    user,
}: {
    publicToken: string;
    user: User;
}) => {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountsResponse.data.accounts[0];

        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
        };

        const processorTokenResponse =
            await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name,
        });

        if (!fundingSourceUrl) throw Error;

        await createBankAccount({
            userId: user._id.toString(),
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(accountData.account_id),
        });

        revalidatePath("/");

        return JSON.parse(JSON.stringify({ publicTokenExchange: "complete" }));
    } catch (e) {
        console.error("Помилка пов'язана з обміном токену: ", e);
    }
};
