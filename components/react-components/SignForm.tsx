"use client";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { formSchema } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import InputTemplate from "./InputTemplate";

export default function SignForm({
    varient,
}: {
    varient: "login" | "sign-up";
}) {
    const [user, setUser] = useState(null);
    const personalFormSchema = formSchema(varient);
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
                      state: "",
                      postalCode: "",
                      dateOfBirth: "",
                      ssn: "",
                  },
    });

    function onSubmit(data: z.infer<typeof personalFormSchema>) {
        console.log(data);
    }

    return (
        <section className="auth">
            <article className="auth_title">
                <h1 className="auth_title_bogText">
                    {varient === "login" ? "Login" : "Sign up"}
                </h1>
                <p className="auth_title_smallText">
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
                        <Button type="submit">Submit</Button>
                    </form>
                ) : (
                    <form
                        className="auth_form"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
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

                        <Button type="submit">Submit</Button>
                    </form>
                )}
            </div>
        </section>
    );
}
