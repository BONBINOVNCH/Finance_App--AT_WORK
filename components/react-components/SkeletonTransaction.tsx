import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTransaction() {
    return (
        <div className="rounded-xl border border-stone-200/80 bg-white shadow-sm overflow-hidden mt-6 w-full">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-b border-stone-200 flex items-center px-4 py-3.5 gap-4">
                <div className="w-[30%] min-w-[120px]">
                    <div className="h-4 w-24 bg-green-900/20 rounded-sm animate-pulse" />
                </div>

                <div className="w-[15%] min-w-[70px]">
                    <div className="h-4 w-16 bg-green-900/20 rounded-sm animate-pulse" />
                </div>

                <div className="w-[15%] min-w-[80px]">
                    <div className="h-4 w-16 bg-green-900/20 rounded-sm animate-pulse" />
                </div>

                <div className="w-[15%] min-w-[80px] hidden sm:block">
                    <div className="h-4 w-14 bg-green-900/20 rounded-sm animate-pulse" />
                </div>

                <div className="w-[15%] min-w-[80px] hidden md:block">
                    <div className="h-4 w-16 bg-green-900/20 rounded-sm animate-pulse" />
                </div>

                <div className="w-[10%] min-w-[70px] hidden lg:block">
                    <div className="h-4 w-16 bg-green-900/20 rounded-sm animate-pulse" />
                </div>
            </div>

            <div className="flex flex-col">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 px-4 py-4 border-b border-stone-100 last:border-none"
                    >
                        <div className="w-[30%] min-w-[120px]">
                            <Skeleton className="h-5 w-[85%] bg-stone-200/80 dark:bg-stone-800" />
                        </div>

                        <div className="w-[15%] min-w-[70px]">
                            <Skeleton className="h-5 w-[70%] bg-emerald-100/60 dark:bg-emerald-950/40" />
                        </div>

                        <div className="w-[15%] min-w-[80px]">
                            <Skeleton className="h-5 w-[65%] rounded-full bg-stone-200/80" />
                        </div>

                        <div className="w-[15%] min-w-[80px] hidden sm:block">
                            <Skeleton className="h-4 w-[80%] bg-stone-100" />
                        </div>

                        <div className="w-[15%] min-w-[80px] hidden md:block">
                            <Skeleton className="h-4 w-[60%] bg-stone-100" />
                        </div>

                        <div className="w-[10%] min-w-[70px] hidden lg:block">
                            <Skeleton className="h-5 w-full rounded-md bg-stone-200/80" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
