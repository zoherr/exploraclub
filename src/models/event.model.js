import mongoose from "mongoose"
import { type } from "os";

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    shortDesc: String,
    semester: Number,
    teamMember: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
    },
    time: {
        type: String, // Consider using a more structured format if needed
    },
    location: {
        type: String,
    },
    eventImages: [String],
    image: String,
    winner:String,
    feedback:String,
    isCompleted: { type: Boolean, default: false },
    registered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    registerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'registers' }],
}, { timestamps: true })
const Event = mongoose.models.events || mongoose.model("events", eventSchema)

export default Event;
