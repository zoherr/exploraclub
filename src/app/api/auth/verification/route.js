import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/user.models";
import VerificationToken from "../../../../models/verificationToken.model";

connectDB();

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    try {
        if (!token) {
            return new Response("Invalid verification request. Token is missing.", { status: 400 });
        }

        // Fetch the token from MongoDB
        const tokenData = await VerificationToken.findOne({ token });
        if (!tokenData) {
            return new Response("Verification link expired or invalid.", { status: 400 });
        }

        const { name, email, hashedPassword, enrollmentNo, semester } = tokenData;

        // Create the user in the main collection
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            enrollmentNo,
            semester,
            isVerified: true,
        });
        await newUser.save();

        // Remove the token from the database
        await VerificationToken.deleteOne({ token });

        return new Response("Email successfully verified!", { status: 200 });
    } catch (error) {
        return new Response(`Verification failed: ${error.message}`, { status: 500 });
    }
};
