import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        });

        // Clear the cookie
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

        // Return the response
        return response;
    } catch (error) {
        // Return an error response with status 500
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
