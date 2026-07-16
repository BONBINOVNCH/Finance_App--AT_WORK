export interface CreateFundingSourceOptions {
    customerId: string;
    fundingSourceName: string;
    plaidToken: string;
    _links?: any;
}

export interface NewDwollaCustomerParams {
    firstName: string;
    lastName: string;
    email: string;
    type: "personal" | "business" | "receive-only";
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn?: string;
    phone?: string;
    businessName?: string;
}

export interface TransferParams {
    sourceFundingSourceUrl: string;
    destinationFundingSourceUrl: string;
    amount: string; // Dwolla приймає суму як рядок (наприклад, "10.00")
}

export interface AddFundingSourceParams {
    dwollaCustomerId: string;
    processorToken: string;
    bankName: string;
}
