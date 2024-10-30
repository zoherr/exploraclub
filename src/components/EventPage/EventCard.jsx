import React from 'react';
import Image from "next/image";
import Link from 'next/link'; // Import the Link component

const EventCard = ({ event }) => {
    return (
        <div className="p-4 rounded-lg shadow-lg sm:w-[25rem]  relative bg-white bg-opacity-10  backdrop-blur-lg border border-white/20"
            style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
   <Link href={`/events/${event._id}`}>
            {/* Date Tag */}
            <div className="absolute top-5 right-5 bg-gray-100/80 text-md px-2 py-1 rounded-md shadow-sm">
                {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'long' }) : "N/A"}

            </div>

            {/* Event Image */}
            <div className="flex justify-center mb-4">
                <Image
                    src={event.image}
                    alt="Event Image"
                    width={430}
                    height={100}
                    className="rounded-lg"
                />
            </div>

            {/* Event Name */}
            <p className="text-lg font-semibold text-gray-900 mb-2">{event.name}</p>

            {/* Short Description */}
            <p className="text-gray-700 text-sm">{event.shortDesc.slice(0, 50)}...</p>
            </Link>
        </div>
    );
};

export default EventCard;
