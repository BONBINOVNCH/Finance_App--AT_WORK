"use client";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

const formSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters.")
        .max(10, "Username must be at most 10 characters.")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores.",
        ),
});

export default function SignForm({ varient }: { varient: string }) {
    const [user, setUser] = useState(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
    }

    return (
        <section className="auth">
            <article className="auth_title">
                <h1 className="auth_title_bogText">Login</h1>
                <p className="auth_title_smallText">
                    Welcome back! Please enter your details.
                </p>
            </article>

            <div className="auth_form_block">
                <form
                    className="auth_form"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Bug Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />
                                <FieldDescription>
                                    Provide a concise title for your bug report.
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </form>
            </div>
        </section>
    );
}
