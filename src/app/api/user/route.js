import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRETKEY;
export const GET = (req) => {
    const token = req.cookies.get('token')?.value;// Get the token from cookies
    const verifyToken = (token) => {
        return jwt.verify(token, process.env.JWT_SECRETKEY);
    };
    if (!token) {
        return NextResponse.json({ loggedIn: false }, { status: 401 }); // Not logged in
    }

    try {
        const user = verifyToken(token);
        return NextResponse.json({ loggedIn: true, user }); // Send back user info
    } catch (error) {
        return NextResponse.json({ loggedIn: false, message: 'Token is invalid',token }, { status: 403 }); // Token is invalid
    }
}
