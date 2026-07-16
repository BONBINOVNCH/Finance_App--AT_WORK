import User from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
    address1: "",
    dateOfBirth: "",
    email: "",
    firstName: "",
    lastName: "",
    postalCode: "",
    ssn: "",
    state: "",
    city: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updated: (state, action: PayloadAction<User>) => {
            return action.payload;
        },
    },
});

export default userSlice.reducer;
export const { updated } = userSlice.actions;
