"use client";

import User from "@/types/user";
import store from "../../store/store";
import { Provider } from "react-redux";
import { useRef } from "react";
import { updated } from "@/store/userSlice";

export default function StoreProvider({
    children,
    initialUser,
}: {
    children: React.ReactNode;
    initialUser: User;
}) {
    const initialize = useRef(false);

    if (!initialize.current) {
        if (initialUser) {
            store.dispatch(updated(initialUser));
        }
        initialize.current = true;
    }

    return <Provider store={store}>{children}</Provider>;
}
