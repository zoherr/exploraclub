import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDB";
import Event from "../../../../models/event.model";
import { redis } from "../../../../utils/redis"; // Import Redis
import slack from "../../../../services/slack";



// GET: Fetch a specific event by ID
export const GET = async (req, { params }) => {
    const { id } = params; // Extracting ID from params
    try {
        // Check if the event is cached in Redis
        // const cachedEvent = await redis.get(`event:${id}`);
        // if (cachedEvent) {
        //     return new Response(JSON.stringify({ success: true, data: JSON.parse(cachedEvent) }), {
        //         status: 200,
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        // }
        await connectDB();
        // Find the specific event by ID
        const event = await Event.findById(id);
        if (!event) {
            return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        // await redis.set(`event:${id}`, JSON.stringify(event), 'EX', 60 * 60 * 24 * 7); // Cache for 1 week

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

// PUT: Update an event by ID
export const PUT = async (req, { params }) => {
    await connectDB();

    const { id } = params; 
    const updatedData = await req.json();

    try {
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

        // Invalidate cache for this event
        // await redis.del(`event:${id}`);
        await redis.del('events:all');
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

// DELETE: Delete an event by ID
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

        // Invalidate cache for this event
        // await redis.del(`event:${id}`);
        await redis.del('events:all');
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
