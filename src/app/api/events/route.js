import connectDB from "../../../utils/connectDB"
import Event from "../../../models/event.model"
import { NextRequest,NextResponse } from "next/server";


connectDB();
export const POST = async (req) => {
    await connectDB();
    try {

      const body = await req.json();
      console.log(body);

      const event = new Event(body);
      await event.save();

     // Success response
     return new Response(JSON.stringify({ success: true, data: event }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {


        return new Response(JSON.stringify({ success: false, message: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });

    }
  };

  export const GET = async (req) => {
    // await connectDB();
    try {

        const events = await Event.find();

        return new Response(JSON.stringify({ success: true, data: events }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });

    }
  };

  export const PUT = async (req) => {
    await connectDB();

    try {
      const body = await req.json();
      const { id, ...updateData } = body; // Assume the request body contains the ID of the event and the updated data

      // Find the event by ID and update it with new data
      const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedEvent) {
        return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Success response
      return new Response(JSON.stringify({ success: true, data: updatedEvent }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
