import mongoose from "mongoose"

const registerSchema = new mongoose.Schema({
    qr: String,
    semester: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'events' },
    attendance: { type: Boolean, default: false },
    members:[{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],

}, { timestamps: true })
const Register = mongoose.models.registers || mongoose.model("registers", registerSchema)

export default Register;
