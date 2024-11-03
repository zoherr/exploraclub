// pages/api/attendance.js
import connectDB from '../../../utils/connectDB';
import Register from '../../../models/register.models';
import slack from "../../../services/slack";
import Event from "../../../models/event.model"
import User from "../../../models/user.models"
connectDB();

export const POST = async (req) => {
    try {
        const  {qrCode}  = await req.json(); // Parse JSON body
        // console.log(qrCode);


        const register = await Register.findById(qrCode);
        if (!register) {
            return new Response(JSON.stringify({ error: "Invalid QR Code" }), { status: 400 });
        }

        if (register.attendance) {
            return new Response(JSON.stringify({ error: "Attendance already marked" }), { status: 400 });
        }

        register.attendance = true;
        const user = await User.findById(register.user);
        const event = await Event.findById(register.event);
        const newAttendance = new Set([...event.attendance, user._id, ...register.members]);

        // Convert Set back to an array and assign it to event.attendance
        event.attendance = Array.from(newAttendance);

        await event.save();

        // slack(`#event-attendence`, `${user.name} Scanned`);
        await register.save();

        return new Response(JSON.stringify({ message: "Attendance marked successfully" }), { status: 200 });
    } catch (error) {
        slack(`#error`, `Error marking attendance: ${error.message}`);
        console.error("Error marking attendance:", error);
        return new Response(JSON.stringify({ error: "An error occurred while marking attendance" }), { status: 500 });
    }
};
