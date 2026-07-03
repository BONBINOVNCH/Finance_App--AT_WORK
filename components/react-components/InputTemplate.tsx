"use client";
import * as React from "react";
import { Control, Controller, FieldPath } from "react-hook-form";
import * as z from "zod";

import { formSchema } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const personalformSchema = formSchema("sign-up");

interface InputType {
    control: Control<z.infer<typeof personalformSchema>>;
    name: FieldPath<z.infer<typeof personalformSchema>>;
    placeholder: string;
    label: string;
    type: string;
}

export default function InputTemplate({
    control,
    name,
    placeholder,
    label,
    type,
}: InputType) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col gap-1.5 mb-4 w-full"
                >
                    <FieldLabel className="text-sm font-semibold text-gray-700 tracking-wide font-sans">
                        {label}
                    </FieldLabel>

                    <div className="form_input_container relative rounded-xl shadow-sm transition-all duration-200">
                        <Input
                            {...field}
                            placeholder={placeholder}
                            type={type}
                            className={`
                                w-full px-4 py-2.5 text-sm sm:text-base rounded-xl border bg-white text-gray-900 transition-all duration-200
                                placeholder:text-gray-400 font-medium
                                focus:outline-none focus:ring-2 focus:bg-white
                                ${
                                    fieldState.invalid
                                        ? "border-red-300 text-red-900 placeholder:text-red-300 bg-red-50/30  focus:ring-red-500/20"
                                        : "border-gray-200 hover:border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500/20 shadow-sm"
                                }
                            `}
                        />
                    </div>

                    {fieldState.invalid && fieldState.error && (
                        <p className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                            {fieldState.error.message}
                        </p>
                    )}
                </Field>
            )}
        />
    );
}
