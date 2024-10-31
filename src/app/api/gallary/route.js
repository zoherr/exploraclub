import Gallary from '../../../models/gallary.models';
import connectDB from '../../../utils/connectDB';
import { NextResponse } from 'next/server';
import { redis } from '../../../utils/redis'; // Import Redis
import slack from '../../../services/slack';
;
// POST request handler for uploading images
export const POST = async (req) => {
    await connectDB()
    try {

        const { urls } = await req.json();

        // Check if URLs are provided
        if (!urls || !Array.isArray(urls)) {
            return new Response(JSON.stringify({ message: "Invalid input, URLs array required" }), {
                status: 400,
            });
        }

        // Insert all the URLs at once into the database
        const insertedUrls = await Gallary.insertMany(
            urls.map((url) => ({ url }))
        );

        // Invalidate the cache since new images are added
        await redis.del('galleries'); // Cache key to invalidate

        return new Response(JSON.stringify({ message: "Images uploaded successfully", insertedUrls }), {
            status: 201,
        });
    } catch (error) {
        await slack(`#error`, `Error uploading images: ${error.message}`);
        console.error("Error uploading images:", error);
        return new Response(JSON.stringify({ message: "Error uploading images" }), {
            status: 500,
        });
    }
};

// GET request handler for fetching all gallery items
export const GET = async () => {
    try {
       // Check if galleries are cached
        const cachedGalleries = await redis.get('galleries');
        if (cachedGalleries) {
            return NextResponse.json({ success: true, data: JSON.parse(cachedGalleries) }, { status: 200 });
        }
        await connectDB()
        // Fetch galleries from the database
        const galleries = await Gallary.find({});

        // Cache the fetched galleries for 1 week
        await redis.set('galleries', JSON.stringify(galleries), 'EX', 60 * 60 * 24 * 7); // Cache for 1 week

        return NextResponse.json({ success: true, data: galleries }, { status: 200 });
    } catch (error) {
        await slack(`#error`, `Error Getting Gallery: ${error.message}`);
        return NextResponse.json({ success: false, message: 'Error fetching gallery items' }, { status: 500 });
    }
};

// DELETE request handler for removing a specific gallery item by id
export const DELETE = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get the ID from query string

    try {
        await connectDB();
        const deletedImage = await Gallary.findByIdAndDelete(id);

        if (!deletedImage) {
            return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
        }

        // Invalidate the cache since an image has been deleted
        await redis.del('galleries'); // Cache key to invalidate

        return NextResponse.json({ success: true, message: 'Image deleted successfully' }, { status: 200 });
    } catch (error) {
        await slack(`#error`, `Error deleting image: ${error.message}`);
        return NextResponse.json({ success: false, message: 'Error deleting image' }, { status: 500 });
    }
};
