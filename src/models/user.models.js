import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    verificationToken: String,
    verificationExpires: Date,
    enrollmentNo: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length === 8;
            },
            message: props => `${props.value} is not an 8-character enrollment number!`
        },
        unique: true
    },
    semester: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', "volunteer"],
        required: true,
        default: 'user'
    },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],

}, { timestamps: true })
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;
