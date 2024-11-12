import User from "../../../../models/user.models"
import { redis2 } from "../../../../utils/redis";
import { addMinutes, isAfter } from 'date-fns';
import connectDB from "../../../../utils/connectDB"
connectDB()
export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    try {

        const userData = await redis2.get(token);
        if (!userData) {
            return new Response("Verification link expired or invalid.", { status: 400 });
        }
        const { name, email, hashedPassword, enrollmentNo, semester } = JSON.parse(userData);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            enrollmentNo,
            semester,
            isVerified: true,
        });
        await newUser.save();
        await redis2.del(token);
        return new Response("Email successfully verified!", { status: 200 });
    } catch (error) {
        return new Response("Verification failed", { status: 500 });
    }
};
