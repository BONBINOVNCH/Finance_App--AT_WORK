export interface BankType {
    _id: string;
    userId: string;
    bankId: string;
    accountId: string;
    accessToken: string;
    fundingSourceUrl: string;
    sharableId: string;
    createdAt: string;
}

export interface TotalBank {
    id: string;
    bankId: string;
    institutionId: string;
    sharaebleId: string;
    name: string;
    officialName: string;
    type: "depository" | string;
    subtype: "checking" | string;
    mask: string;
    currentBalance: number;
    availableBalance: number;
}
