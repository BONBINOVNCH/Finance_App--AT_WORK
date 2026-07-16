import mongoose from "mongoose";

const BankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Користувач є обов'язковим для прив'язки банку"],
    },
    bankId: {
        type: String,
        required: true,
    },
    accountId: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    fundingSourceUrl: {
        type: String,
        required: true,
    },
    sharableId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Bank = mongoose.models.Bank || mongoose.model("Bank", BankSchema);

export default Bank;
