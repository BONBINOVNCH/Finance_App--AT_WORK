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
    email: z.string().email("Must be a real email"),
    password: z.string(),
});

export default function SignForm({ varient }: { varient: string }) {
    const [user, setUser] = useState(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
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
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className="form_label">
                                    Email
                                </FieldLabel>
                                <div className="form_input_container">
                                    <Input
                                        {...field}
                                        placeholder="Enter your email"
                                        className="form_input"
                                    />
                                </div>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className="form_label">
                                    Password
                                </FieldLabel>
                                <div className="form_input_container">
                                    <Input
                                        {...field}
                                        placeholder="Enter your password"
                                        className="form_input"
                                    />
                                </div>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </section>
    );
}
