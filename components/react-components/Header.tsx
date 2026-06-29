import { headers } from "next/headers";

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
        <header className="header">
            <h1 className="header_main_text">
                {mainText}{" "}
                {selectedText ? (
                    <span className="header_main_text">{selectedText}</span>
                ) : (
                    ""
                )}
            </h1>
            <p className="header_small_text">{smallText}</p>
        </header>
    );
}
