import connectDB from "../../../../utils/connectDB"
import User from "../../../../models/user.models"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken';

connectDB()
export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        // console.log(body);
        const { name, email, password, enrollmentNo, semester } = body;

        if (!name || !email || !password || !enrollmentNo) {
            return new Response("Name, Username and Password is required", { status: 401 });
        }

        const user = await User.findOne({ enrollmentNo });
        if (user) {
            return new Response("enrollmentNo already exist", { status: 400 });
        }

        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            enrollmentNo, semester

        })
        const tokenData = {
            email,
            enrollmentNo,
            semester

        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1w' });

        await newUser.save();
        const response = NextResponse.json({ message: "User saved successfully" });

        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error) {
        console.log(error);
    }
}
