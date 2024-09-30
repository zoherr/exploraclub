import mongoose from "mongoose"

const registerSchema = new mongoose.Schema({
    qr: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'events' },
    attendance: { type: Boolean, default: false },

}, { timestamps: true })
const Register = mongoose.models.registers || mongoose.model("registers", registerSchema)

export default Register;
