export default interface Transaction {
    id: string;
    $id: string;
    name: string;
    paymentChannel: string;
    transaction_id: string;
    accountId: string;
    amount: number;
    pending: boolean;
    category: string;
    date: string;
    image: string;
    type: string;
    $createdAt: string;
    payment_channel: string;
    senderBankId: string;
    receiverBankId: string;
}
