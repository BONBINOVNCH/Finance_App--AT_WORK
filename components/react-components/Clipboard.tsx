"use client";

import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Clipboard({ sharableId }: { sharableId: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(sharableId);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <Button
            variant="outline"
            onClick={copy}
            className="w-full max-w-[320px] justify-between gap-2 px-3 py-2 font-mono text-xs transition-all hover:bg-accent my-4"
        >
            <span className="truncate text-muted-foreground select-all">
                {sharableId}
            </span>

            <span className="flex shrink-0 items-center justify-center">
                {copied ? (
                    <FaCheck className="h-4 w-4 text-green-500 animate-in zoom-in-50 duration-200" />
                ) : (
                    <MdContentCopy className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
                )}
            </span>
        </Button>
    );
}
