import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDB";
import Event from "../../../../models/event.model";
import { redisWithFallback } from "../../../../utils/redis";
import slack from "../../../../services/slack";

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

        return new Response(JSON.stringify({ success: true, data: event }), {
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

export const PUT = async (req, { params }) => {
    await connectDB();

    const { id } = params;
    const updatedData = await req.json();

    try {
        const event = await Event.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!event) {
            return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        await  redisWithFallback("del",'events:all')
        return new Response(JSON.stringify({ success: true, data: event }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        await slack(`#error`, `Error While Updating Data From Event ID: ${error.message}`);

        return new Response(JSON.stringify({ success: false, message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};


export const DELETE = async (req, { params }) => {
    await connectDB();

    const { id } = params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        await  redisWithFallback("del",'events:all')
        return new Response(JSON.stringify({ success: true, message: 'Event deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        await slack(`#error`, `Error While Deleting Data From Event ID: ${error.message}`);

        return new Response(JSON.stringify({ success: false, message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
