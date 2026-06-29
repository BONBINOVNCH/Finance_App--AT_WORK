export default function Header({
    mainText,
    smallText,
    selectedText,
}: {
    mainText: string;
    smallText: string;
    selectedText?: string;
}) {
    return (
        <header className="header font-sans rounded-xl border-b-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 px-6 py-10 text-center shadow-sm shadow-green-100">
            <h1 className="header_main_text text-3xl font-extrabold tracking-tight text-green-900 md:text-4xl">
                {mainText}{" "}
                {selectedText ? (
                    <span className="header_main_text inline-block rounded-lg border border-green-200 bg-white/80 px-2.5 py-0.5 text-emerald-600 shadow-sm">
                        {selectedText}
                    </span>
                ) : (
                    ""
                )}
            </h1>
            <p className="header_small_text mx-auto mt-2 max-w-xl text-base font-medium text-green-700 md:text-lg">
                {smallText}
            </p>
        </header>
    );
}
