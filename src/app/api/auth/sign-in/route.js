import connectDB from "../../../../utils/connectDB"
import User from "../../../../models/user.models"
import { NextRequest,NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import slack from "../../../../services/slack"
import bcryptjs from "bcryptjs"
connectDB()
export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response("Email and Password is required", { status: 401 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return new Response("email does not exist", { status: 400 });
        }
// console.log(user);

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return new Response("Incorrect Password", { status: 400 });
        }

        const tokenData = {
            name:user.name,
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1w' });

        const response = NextResponse.json({ message: "Login successfull" });
        await slack(`#user`,`${user.name} Login`)
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error) {
        console.log("Error", error.message);
        return new Response("Something went wrong ", { status: 500 });
    }
}
