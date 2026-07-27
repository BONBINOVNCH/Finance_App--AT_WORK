"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { formSchema } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import InputTemplate from "./InputTemplate";
import signUpUser from "@/app/(auth)/sign_up/action";
import loginUser from "@/app/(auth)/login/action";
import User from "@/types/user";

import PlaidLink from "./PlaidLink";

export default function SignForm({
    varient,
    user,
}: {
    varient: "login" | "sign-up";
    user: User;
}) {
    const personalFormSchema = formSchema(varient);

    const [loading, setLoading] = useState(false);

    console.log(user);

    const form = useForm<z.infer<typeof personalFormSchema>>({
        resolver: zodResolver(personalFormSchema),
        defaultValues:
            varient === "login"
                ? {
                      email: "",
                      password: "",
                  }
                : {
                      email: "",
                      password: "",
                      firstName: "",
                      lastName: "",
                      address1: "",
                      city: "",
                      state: "",
                      postalCode: "",
                      dateOfBirth: "",
                      ssn: "",
                  },
    });

    async function onSubmit(data: z.infer<typeof personalFormSchema>) {
        try {
            setLoading(true);
            if (varient === "login") {
                const result = await loginUser(data);
                console.log(result);
                if (!result?.success) {
                    form.setError("email", {
                        type: "manual",
                        message: "Not right email or password",
                    });
                    form.setError("password", {
                        type: "manual",
                        message: "Not right email or password",
                    });
                }
            }
            if (varient === "sign-up") {
                const result = await signUpUser(data);
                console.log(result);
                if (result?.error === "same_email") {
                    form.setError("email", {
                        type: "manual",
                        message: "This email alredy exist",
                    });
                }
                if (result?.error === "same_snn") {
                    form.setError("ssn", {
                        type: "manual",
                        message: "This ssn alredy exist",
                    });
                }
            }
        } catch {
        } finally {
            setLoading(false);
            console.log(loading);
        }
    }

    if (user) {
        return (
            <section className="auth">
                <article className="auth_title flex flex-col gap-2 mb-8 text-left">
                    <h1 className="auth_title_bigText text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl font-sans">
                        Link your Bank
                    </h1>
                    <p className="auth_title_smallText text-sm font-medium text-gray-500 md:text-base ">
                        Please, choose your bank you want link to FUNance
                    </p>
                </article>

                <PlaidLink varient="primary" user={user} />
            </section>
        );
    }

    return (
        <>
            <section className="auth">
                <article className="auth_title flex flex-col gap-2 mb-8 text-left">
                    <h1 className="auth_title_bigText text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl font-sans">
                        {varient === "login" ? "Login" : "Sign up"}
                    </h1>
                    <p className="auth_title_smallText text-sm font-medium text-gray-500 md:text-base ">
                        {varient === "login"
                            ? "Welcome back! Please enter your details."
                            : "Please enter your details."}
                    </p>
                </article>

                <div className="auth_form_block">
                    {varient === "login" ? (
                        <form
                            className="auth_form"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            {/* <p>{user ? user.firstName : ""}</p> */}
                            <InputTemplate
                                type="email"
                                control={form.control}
                                name="email"
                                placeholder="Enter your email"
                                label="Email"
                            />
                            <InputTemplate
                                type="password"
                                control={form.control}
                                name="password"
                                placeholder="Enter your password"
                                label="Password"
                            />
                            <Button
                                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold text-base rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all duration-200  cursor-pointer"
                                type="submit"
                            >
                                Submit
                            </Button>
                            <div className="mt-8 text-center text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    href="/sign_up"
                                    className="text-emerald-600 font-semibold"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <form
                            className="auth_form"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="auth_form_container flex gap-4 flex-wrap sm:flex-nowrap">
                                <InputTemplate
                                    type="text"
                                    control={form.control}
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    label="First Name"
                                />
                                <InputTemplate
                                    type="text"
                                    control={form.control}
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    label="Last name"
                                />
                            </div>
                            <InputTemplate
                                type="text"
                                control={form.control}
                                name="address1"
                                placeholder="Enter your address"
                                label="Address"
                            />
                            <InputTemplate
                                type="text"
                                control={form.control}
                                name="city"
                                placeholder="Enter your city"
                                label="City"
                            />
                            <div className="auth_form_container flex gap-4 flex-wrap sm:flex-nowrap">
                                <InputTemplate
                                    type="text"
                                    control={form.control}
                                    name="state"
                                    placeholder="ex: CC"
                                    label="State"
                                />
                                <InputTemplate
                                    type="number"
                                    control={form.control}
                                    name="postalCode"
                                    placeholder="ex: 11101"
                                    label="Postal code"
                                />
                            </div>

                            <div className="auth_form_container flex gap-4 flex-wrap sm:flex-nowrap">
                                <InputTemplate
                                    type="text"
                                    control={form.control}
                                    name="dateOfBirth"
                                    placeholder="yyyy-mm-dd"
                                    label="Date Of Birth"
                                />
                                <InputTemplate
                                    type="number"
                                    control={form.control}
                                    name="ssn"
                                    placeholder="1234"
                                    label="SSN"
                                />
                            </div>
                            <InputTemplate
                                type="email"
                                control={form.control}
                                name="email"
                                placeholder="Enter your email"
                                label="Email"
                            />

                            <InputTemplate
                                type="password"
                                control={form.control}
                                name="password"
                                placeholder="Enter your password"
                                label="Password"
                            />

                            <Button
                                type="submit"
                                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold text-base rounded-xl shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all duration-200  cursor-pointer"
                            >
                                Submit
                            </Button>

                            <div className="mt-8 text-center text-sm text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-emerald-600 font-semibold"
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
}
