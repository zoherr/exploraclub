import { NextRequest,NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDB"
import Event from "../../../../models/event.model"
connectDB()
export const GET = async (req, { params }) => {
    const { id } = params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, message: "Invalid event ID" }, { status: 400 });
      }
      const event = await Event.findById(id)
      if (!event) {
        return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "Event fetched successfully", data: event });
    } catch (error) {
      // Error response
      return NextResponse.json({ success: false, message: "Error fetching event", error: error.message }, { status: 500 });
    }
  };
