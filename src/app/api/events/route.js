import connectDB from "../../../utils/connectDB"
import Event from "../../../models/event.model"
import { NextRequest,NextResponse } from "next/server";


connectDB();
export const POST = async (req) => {

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
