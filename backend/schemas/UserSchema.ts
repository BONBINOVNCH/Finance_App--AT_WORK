import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        address1: {
            type: String,
            required: true,
            trim: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
            trim: true,
        },
        ssn: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
