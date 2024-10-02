import connectDB from "../../../utils/connectDB";
import Event from "../../../models/event.model";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "../../../utils/redis"; // Redis import
import slack from "../../../services/slack";

// connectDB();

// POST: Create an Event
export const POST = async (req) => {
  await connectDB();
  try {
    const body = await req.json();
    console.log(body);

    // Store event data temporarily in Redis before saving
    const tempEventKey = `event:temp:${Date.now()}`;
    await redis.set(tempEventKey, JSON.stringify(body), 'EX', 60 * 5); // Set temporary data for 5 minutes

    const event = new Event(body);
    await event.save();

    // Remove temp event data from Redis after saving
    await redis.del(tempEventKey);

    // Success response
    return new Response(JSON.stringify({ success: true, data: event }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log error in Slack
    await slack(`#error`, `Error While Creating Event: ${error.message}`);

    // Return error response
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET: Retrieve all events with caching
export const GET = async (req) => {
  try {
    // Check if events are cached in Redis
    const cachedEvents = await redis.get('events:all');
    if (cachedEvents) {
      return new Response(JSON.stringify({ success: true, data: JSON.parse(cachedEvents) }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    await connectDB();

    // If not cached, retrieve from the database
    const events = await Event.find();

    // Cache the events in Redis for 1 hour
    await redis.set('events:all', JSON.stringify(events), 'EX', 604800); // Cache for 1 hour

    return new Response(JSON.stringify({ success: true, data: events }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log error in Slack
    await slack(`#error`, `Error While Fetching Events: ${error.message}`);

    // Return error response
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
