"use client";
import { motion, useTransform, useScroll, useViewportScroll } from "framer-motion";
import Link from 'next/link'; // Import the Link component

import React, { useEffect, useState } from 'react';
import Loader from '../Loading';
import Image from "next/image";
import axios from 'axios';

const HomeEvent = () => {
    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                if (response.data.success) {
                    setEvent(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching Events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="border-[#DCDCDC] text-white border-t-[1px] ">
            {loading ? (
                <div className=""></div>
            ) : (
                <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-20 sm:gap-10 NeueMontreal-Regular">
                    {event
                        .filter((event) => event.isCompleted)
                        .map((item, index) => (
                            <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            whileHover={{ scale: 1.1,backgroundColor:"#EBFF57",color:"#f0f0f0" }}
                            whileTap={{ scale: 0.9 }}
                                key={index}
                                className="border sm:flex gap-5 border-gray-300 rounded-lg p-4 bg-white shadow-md"
                            >
                                {/* Image Section */}
                                <div className="mb-4 sm:w-[30%]">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={500}
                                        height={500}
                                        className="rounded-lg mx-auto"
                                    />
                                </div>

                                {/* Text Section */}
                                <Link href={`/events/${item._id}`}  className='ml-2 mt-2 sm:w-[70%] sm:mb-0 mb-7'>
                                    <h3 className="mb-2 text-2xl font-semibold text-gray-800 ">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-600  mt-5">
                                        {item.shortDesc.slice(0, 200)}...
                                    </p>

                                </Link>
                            </motion.div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default HomeEvent;
