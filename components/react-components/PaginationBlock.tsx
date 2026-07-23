"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { formUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function PaginationBlock({
    startLoading,
    pages,
    currentPage,
}: {
    startLoading: () => void;
    pages: string;
    currentPage: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const truePage =
        Number(currentPage) > Number(pages) ? pages : Number(currentPage);

    useEffect(() => {
        if (Number(currentPage) > Number(pages)) {
            startLoading();
            const newUrl = formUrl({
                searchParams: searchParams.toString(),
                key: "page",
                value: pages,
            });

            router.replace(newUrl);
        }
    }, [currentPage, pages, router, searchParams, startLoading]);

    const handleOnClick = (type: string) => {
        startLoading();
        const selectedPage =
            type === "left" ? Number(truePage) - 1 : Number(truePage) + 1;

        const newUrl = formUrl({
            searchParams: searchParams.toString(),
            key: "page",
            value: selectedPage.toString(),
        });

        router.push(newUrl);
    };

    return (
        <div className="pb-1">
            <Pagination className="my-4">
                <PaginationContent className="flex items-center gap-2 p-1.5 bg-background border rounded-xl shadow-sm  mx-auto">
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                Number(truePage) > 1 && handleOnClick("left")
                            }
                            aria-disabled={Number(truePage) <= 1}
                            tabIndex={Number(truePage) <= 1 ? -1 : undefined}
                            className={`h-9 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                                Number(truePage) <= 1
                                    ? "pointer-events-none opacity-40 text-muted-foreground"
                                    : "cursor-pointer hover:bg-accent hover:text-accent-foreground active:scale-95"
                            }`}
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <div className="flex items-center justify-center min-w-[70px] h-9 px-3 bg-muted/60 rounded-lg text-xs sm:text-sm font-medium border border-border/50 select-none">
                            <span className="text-foreground font-semibold">
                                {truePage}
                            </span>
                            <span className="text-muted-foreground/60 mx-1">
                                /
                            </span>
                            <span className="text-muted-foreground">
                                {pages}
                            </span>
                        </div>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                Number(truePage) < Number(pages) &&
                                handleOnClick("right")
                            }
                            aria-disabled={Number(truePage) >= Number(pages)}
                            tabIndex={
                                Number(truePage) >= Number(pages)
                                    ? -1
                                    : undefined
                            }
                            className={`h-9 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                                Number(truePage) >= Number(pages)
                                    ? "pointer-events-none opacity-40 text-muted-foreground"
                                    : "cursor-pointer hover:bg-accent hover:text-accent-foreground active:scale-95"
                            }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
