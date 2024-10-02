import Gallary from '../../../models/gallary.models';
import connectDB from '../../../utils/connectDB';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    try {
        await connectDB();
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

        return new Response(JSON.stringify({ message: "Images uploaded successfully", insertedUrls }), {
            status: 201,
        });
    } catch (error) {
        slack(`#error`, `Error uploading images: ${error.message}`);

        console.error("Error uploading images:", error);
        return new Response(JSON.stringify({ message: "Error uploading images" }), {
            status: 500,
        });
    }
};
// GET request handler for fetching all gallery items
export const GET = async () => {
    try {
      await connectDB();
      const galleries = await Gallary.find({});
      return NextResponse.json({ success: true, data: galleries }, { status: 200 });
    } catch (error) {
        slack(`#error`, `Error Getting Gallary: ${error.message}`);
      return NextResponse.json({ success: false, message: 'Error fetching gallery items' }, { status: 500 });
    }
  };

  // DELETE request handler for removing a specific gallery item by id
  export const DELETE = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get the ID from query string

    try {
      await connectDB();
      await Gallary.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'Image deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Error deleting image' }, { status: 500 });
    }
  };
