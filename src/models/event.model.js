import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    isCompleted: { type: Boolean, default: false },
    registered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
}, { timestamps: true })
const Event = mongoose.models.events || mongoose.model("events", eventSchema)

export default Event;
