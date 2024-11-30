// models/verificationToken.model.js
import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    enrollmentNo: { type: String, required: true },
    semester: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }, // TTL Index (5 minutes)
});

export default mongoose.models.VerificationToken ||
    mongoose.model("VerificationToken", verificationTokenSchema);
