import connectDB from '../../../utils/connectDB';
import Register from '../../../models/register.models';
import slack from "../../../services/slack";
import Event from "../../../models/event.model"
import User from "../../../models/user.models"
connectDB();

export const GET = async (req) => {
    try {
        const {eventId} = await req.json()
        
        return NextResponse.json({ success: true, data: attende }, { status: 200 });

    } catch (error) {
        slack(`#error`, `Error while getting attendence: ${error.message}`);
        // console.error("Error marking attendance:", error);
        return new Response(JSON.stringify({ error: "An error occurred while marking attendance" }), { status: 500 });
    }
};
