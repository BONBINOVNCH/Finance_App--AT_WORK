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

export default function SignForm({ varient }: { varient: string }) {
    const [user, setUser] = useState(null);
    const personalFormSchema = formSchema(varient);
    const form = useForm<z.infer<typeof personalFormSchema>>({
        resolver: zodResolver(personalFormSchema),
        defaultValues: {
            email: "",
            password: "",
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
                            control={form.control}
                            name="email"
                            placeholder="Enter your email"
                            label="Email"
                        />
                        <InputTemplate
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
                            control={form.control}
                            name="email"
                            placeholder="Enter your email"
                            label="Email"
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                )}
            </div>
        </section>
    );
}
