import { NextRequest,NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDB"
import Event from "../../../../models/event.model"
connectDB();
export const GET = async (req, { params }) => {
    const { id } = params; // Extracting ID from params
    try {
      // Find the specific event by ID
      const event = await Event.findById(id);

      if (!event) {
        return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true, data: event }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
        slack(`#error`, `Error While Fetching Data From Event ID : ${error.message}`);

      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
  export const PUT = async (req, { params }) => {
    await connectDB();

    const { id } = params; // Extracting event ID from params
    const updatedData = await req.json(); // Extracting updated event data from the request body

    try {
      // Find the event by its ID and update it with the provided data
      const event = await Event.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure that any model validators are applied
      });

      if (!event) {
        return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true, data: event }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
        slack(`#error`, `Error While Update Data From Event ID : ${error.message}`);

      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
  export const DELETE = async (req, { params }) => {
    await connectDB();

    const { id } = params; // Extracting event ID from params

    try {
      // Find the event by its ID and delete it
      const deletedEvent = await Event.findByIdAndDelete(id);

      if (!deletedEvent) {
        return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true, message: 'Event deleted successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
        slack(`#error`, `Error While Delete Data From Event ID : ${error.message}`);

      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
