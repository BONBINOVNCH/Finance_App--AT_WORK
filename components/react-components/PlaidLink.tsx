import { User } from "@sentry/nextjs";
import { Button } from "../ui/button";
import {
    PlaidLinkOnSuccess,
    PlaidLinkOptions,
    usePlaidLink,
} from "react-plaid-link";
import { useCallback, useEffect, useState } from "react";
import { StyledString } from "next/dist/build/swc/types";
import { useRouter } from "next/navigation";
import {
    createLinkToken,
    exchangePublicToken,
} from "@/lib/actions/user.actions";
import { useDispatch } from "react-redux";
import { updated } from "@/store/userSlice";
import { MdAddCard } from "react-icons/md";
import Link from "next/link";

export default function PlaidLink({
    user,
    varient,
    type,
}: {
    user: User;
    varient: "primary" | "ghost" | string;
    type?: "mobile";
}) {
    const dispatch = useDispatch();
    const router = useRouter();

    const [token, setToken] = useState("");

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            if (data?.linkToken) {
                setToken(data?.linkToken);
            }
        };
        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(
        async (public_token: string) => {
            const updatedUser = await exchangePublicToken({
                publicToken: public_token,
                user,
            });
            if (updatedUser) {
                dispatch(updated(updatedUser));
            }
            router.push("/");
        },
        [user, router],
    );

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <>
            {varient === "primary" ? (
                <Button
                    className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold text-base rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all duration-200  cursor-pointer"
                    onClick={() => open()}
                    disabled={!ready}
                >
                    Connect to a bank
                </Button>
            ) : varient === "ghost" ? (
                <Button
                    className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold text-base rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all duration-200  cursor-pointer"
                    type="submit"
                >
                    Connect to a bank
                </Button>
            ) : (
                <Link
                    href="#"
                    className=" flex w-max md:w-auto items-center gap-3 px-4 py-3  font-medium text-sm transition-all duration-200 hover:bg-green-50/50 text-green-700"
                    type="submit"
                    onClick={() => open()}
                >
                    <MdAddCard className="text-xl" />
                    <span
                        className={
                            type !== "mobile" ? "md:block hidden" : "block"
                        }
                    >
                        Connect bank
                    </span>
                </Link>
            )}
        </>
    );
}
