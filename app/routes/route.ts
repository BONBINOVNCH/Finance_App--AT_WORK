import connectToDB from "../../backend/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();
        console.log("під'єднано");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("Помилка: ", error);
        return NextResponse.json({ success: false });
    }
}
