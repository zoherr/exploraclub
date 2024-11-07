"use client"
import React, { useEffect, useState } from 'react'
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
        <div className='  border-[#DCDCDC]  border-t-[1px]'>

            {
                event.filter(event => event.isCompleted).map((item, index) => (
                    <div key={index} className="sm:flex pt-[1.5rem] sm:pt-[2rem] NeueMontreal-Regular justify-between text-black border-[#DCDCDC] pb-9  border-b-[1px]">

                        <p className='sm:text-xl text-2xl sm:w-[20%] '>{item.name}</p>

                        <div className="flex justify-center sm:hidden ">
                            <Image
                                src={item.image}
                                alt="Description of image"
                                width={250}
                                height={250}
                                className='sm:mt-0 mt-8 rounded-xl '
                            />
                        </div>

                        <div className=" sm:hidden sm:w-[25%] mt-10 sm:mt-0">
                            <p>{item.shortDesc.slice(0, 300)}...</p>
                        </div>

                        <div className="mt-10 sm:mt-0 ">
                            <p className='sm:text-lg text-xl underline sm:w-[20%]'>Winners:</p>
                            <div className="mt-5">
                                <p className='text-lg sm:w-[25%] block sm:hidden'>{item.winner}</p>
                                <div className="mt-5 sm:block hidden">
                                    {item.winner.split(',').map((part, index) => (
                                        <span key={index}>
                                            {part.trim()}
                                            {index < item.winner.split(',').length - 1 && <br />}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className=" sm:block hidden sm:w-[25%] mt-10 sm:mt-0">
                            <p>{item.shortDesc.slice(0, 300)}...</p>
                        </div>

                        <div className="sm:block hidden ">
                            <Image
                                src={item.image}
                                alt="Description of image"
                                width={250}
                                height={250}
                                className='sm:mt-0 mt-8 rounded-xl '
                            />
                        </div>



                    </div>
                ))
            }

        </div>
    )
}

export default HomeEvent
