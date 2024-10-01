import mongoose from "mongoose"

const gallarySchema = new mongoose.Schema({
    url: String,


}, { timestamps: true })
const Gallary = mongoose.models.gallarys || mongoose.model("gallarys", gallarySchema)

export default Gallary;
