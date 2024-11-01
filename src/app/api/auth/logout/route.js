import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        });

        // Set the cookie to expire immediately to effectively clear it
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

        return response;
    } catch (error) {
        slack(`#error`, `Error Logout: ${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
