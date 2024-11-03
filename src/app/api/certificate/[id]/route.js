import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDB";
import Event from "../../../../models/event.model";
import { redis } from "../../../../utils/redis"; // Import Redis
import slack from "../../../../services/slack";
import User from "../../../../models/user.models";


export const GET = async (req, { params }) => {
    const { id } = params;
    try {
        await connectDB();

        const event = await Event.findById(id);
        if (!event) {
            return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const attendeeDetails = await Promise.all(
            event.attendance.map(async (userId) => {
                const user = await User.findById(userId);

                // Ensure `event.certificate` is defined and is an array, then check if userId is in it
                const hasCertificate = Array.isArray(event.certificate) && event.certificate.includes(userId);

                return user && !hasCertificate ? { userId: user._id, userName: user.name, email: user.email } : null;
            })
        );

        // Filter out any null entries (in case some users weren't found)
        const validAttendees = attendeeDetails.filter(Boolean);

        return new Response(JSON.stringify({ success: true, data: validAttendees }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        await slack(`#error`, `Error While Fetching Data From Event ID: ${error.message}`);
        return new Response(JSON.stringify({ success: false, message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
