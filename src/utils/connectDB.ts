import mongoose from "mongoose"

export default async function connectDB() {
    try {
        mongoose.connect(process.env.DB_URL).then(() => {
            console.log("DB connected successfully");
        })
    } catch (error) {
        console.log(error);
    }
}
