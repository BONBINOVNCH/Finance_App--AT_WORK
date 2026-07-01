"use client";
import * as React from "react";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
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

const personalformSchema = formSchema("sign-up");

interface InputType {
    control: Control<z.infer<typeof personalformSchema>>;
    name: FieldPath<z.infer<typeof personalformSchema>>;
    placeholder: string;
    label: string;
}

export default function InputTemplate({
    control,
    name,
    placeholder,
    label,
}: InputType) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="form_label">{label}</FieldLabel>
                    <div className="form_input_container">
                        <Input
                            {...field}
                            placeholder={placeholder}
                            className="form_input"
                            type={name === "password" ? "password" : "text"}
                        />
                    </div>

                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
