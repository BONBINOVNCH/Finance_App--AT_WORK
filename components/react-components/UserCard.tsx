import Image from "next/image";

export default function UserCard() {
    return (
        <section className=" relative w-[320px] h-[190px] rounded-2xl  p-5 flex flex-col justify-between text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden select-none">
            <div className="absolute inset-0  ">
                <Image
                    src="/images/card-line.png"
                    alt="card-line"
                    fill
                    sizes="auto"
                    className="object-cover"
                />
            </div>

            <div className="flex justify-between items-start z-10">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-medium tracking-wider text-sky-100/80 uppercase">
                        JS Mastery Pro.
                    </h3>
                    <h3 className="text-2xl font-bold tracking-tight">
                        $1,230.00
                    </h3>
                </div>

                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md border border-white/10">
                    <Image
                        src="/images/contacles-icon2.png"
                        alt="contactless-icon"
                        width={0}
                        height={20}
                        className="opacity-90 object-contain h-auto w-5"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3 z-10">
                <h2 className="text-lg font-mono tracking-[0.2em] text-white/90 drop-shadow-sm">
                    •••• •••• •••• 1234
                </h2>

                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-sky-200/70 uppercase tracking-widest font-medium">
                            Card Holder
                        </span>
                        <h4 className="text-sm font-semibold tracking-wide">
                            Adrian Hajdin
                        </h4>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-sky-200/70 uppercase tracking-widest font-medium">
                                Expires
                            </span>
                            <h4 className="text-sm font-semibold tracking-wide">
                                06/04
                            </h4>
                        </div>

                        <div className="h-8 flex items-center">
                            <Image
                                src="/images/visa.svg"
                                alt="visa"
                                width={0}
                                height={15}
                                className="object-contain w-[45px] h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
