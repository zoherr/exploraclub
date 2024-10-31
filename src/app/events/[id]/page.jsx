"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import Loader from "../../../components/Loading";
import parse from 'html-react-parser';
import { FaCalendarCheck } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import EventGallary from '../../../components/ImageGrid/EventGallary';
import { SiTicktick } from "react-icons/si";
import { useSelector } from "react-redux";

const Page = ({ params }) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [numOfMembers, setNumOfMembers] = useState(1); // Default selection minimum of 2
    const [enrollmentNos, setEnrollmentNos] = useState([]);
    const user = useSelector((state) => state.user.user);
    const isRegistered = event?.registered?.includes(user?.id);
    const [loader, setLoader] = useState(false)
    const [loaderr, setLoaderr] = useState(false)

    const isAttende = event?.attendance?.includes(user?.id);
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`/api/events/${params.id}`);
                setEvent(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [params]);

    const handleJoinClick = () => {

        if (event.teamMember === 1) {
            // Directly register with an empty array for team members
            registerForEvent([]);
        } else {
            // Show popup for selecting team members
            setShowPopup(true);
        }
    };

    const registerForEvent = async (members) => {
        try {
            setLoader(true)
            await axios.post('/api/register', {
                userId: user.id,
                eventId: event._id,
                members
            });
            alert('Registration successful!');
            setShowPopup(false);
            setLoader(false)
        } catch (error) {
            alert('Failed to register.');
            setLoader(false)
        }
    };

    const handleConfirm = () => {
        registerForEvent(enrollmentNos);
    };

    if (loading) {
        return <Loader />;
    }

    if (!event) {
        return <div>No event data available.</div>;
    }

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    const formattedTime = eventDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return (
        <div className="mt-10 NeueMontreal-Regular mb-16">
            <div className='sm:mx-24 mx-5 sm:flex'>
                <div className="sm:w-[50%] flex justify-center">
                    <div className="flex-row items-center mb-4">
                        <Image
                            src={event.image}
                            alt="Event Image"
                            width={330}
                            height={100}
                            className="rounded-lg"
                        />
                        {
                            !event.isCompleted && (
                                user ? (
                                    isRegistered ? (
                                        <>
                                            {
                                                isAttende ? <div className="bg-[#CDEA68]  px-2 py-3 text-xl flex items-center justify-center font-semibold text-center rounded-xl mt-5">
                                                    <SiTicktick className='mr-2' />
                                                    Attendance Done
                                                </div> : <div className="bg-gray-400 px-2 py-3 text-xl flex items-center justify-center font-semibold text-center rounded-xl mt-5">
                                                    <SiTicktick className='mr-2' />
                                                    Going in
                                                </div>
                                            }
                                        </>

                                    ) : (
                                        <div
                                            className="bg-[#CDEA68] px-2 py-3 text-xl flex items-center justify-center font-semibold text-center rounded-xl mt-5 cursor-pointer"
                                            onClick={handleJoinClick}
                                        >
                                            <SiTicktick className='mr-2' />
                                            {loader ? "Loading" : "Join Now"}
                                        </div>
                                    )
                                ) : (
                                    <div className="bg-[#CDEA68] px-2 py-3 text-xl flex items-center justify-center font-semibold text-center rounded-xl mt-5">
                                        <SiTicktick className='mr-2' />
                                        Sign In First
                                    </div>
                                )
                            )
                        }


                        <div className="flex items-center mt-8 gap-2 bg-[#16423C] px-3 py-2 rounded-xl">
                            <FaCalendarCheck className="text-5xl text-[#fff]" />
                            <div className="text-white text-lg font-medium">
                                <p>{event.time}</p>
                                <p>{formattedDate}</p>
                            </div>
                        </div>
                        <div className="flex gap-16 font-semibold mt-5 items-center bg-[#f0f0f0] px-3 py-2 rounded-xl">
                            <div className="flex text-lg items-center gap-3">
                                Team: <p>{event.teamMember}</p>
                            </div>
                            <div className="flex text-lg">
                                Sem: {event.semester}
                            </div>
                        </div>
                        <div className="flex text-lg mt-5 bg-[#f0f0f0] px-3 py-2 rounded-xl">
                            <span className='font-semibold mr-2'>Location:</span> {event.location}
                        </div>
                        {
                            event.isCompleted && (
                                <div className="mt-6 text-xl">
                                    <p className='underline'>Winners:</p>
                                    <p className='sm:w-[21rem] text-lg'>{event.winner}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="sm:w-[50%] NeueMontreal-Regular sm:mt-0 mt-10">
                    <h1 className='text-3xl font-bold'>{event.name}</h1>
                    <div className="mt-5 border-b-[2.5px] opacity-35"></div>
                    <div className='mt-10 NeueMontreal-Regular'>
                        {parse(event.description)}
                    </div>
                    <EventGallary images={event.eventImages} />
                    {
                        event.isCompleted && (
                            <div className='mt-10 NeueMontreal-Regular'>
                                <h1 className='text-2xl font-semibold mb-3'>Feedback:</h1>
                                {event.feedback}
                            </div>
                        )
                    }
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Select Team Members</h2>
                        <label className="block mb-2">
                            Number of Members:
                            <select
                                className="w-full p-2 mt-2 border rounded"
                                value={numOfMembers}
                                onChange={(e) => setNumOfMembers(parseInt(e.target.value))}
                            >
                                {Array.from({ length: event.teamMember - 1 }, (_, i) => i + 1).map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </label>
                        {Array.from({ length: numOfMembers }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                className="w-full p-2 border rounded mt-2"
                                placeholder="Enter Enrollment Number"
                                onChange={(e) => {
                                    const newEnrollmentNos = [...enrollmentNos];
                                    newEnrollmentNos[index] = e.target.value;
                                    setEnrollmentNos(newEnrollmentNos);
                                }}
                            />
                        ))}
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                onClick={handleConfirm}
                            >
                                {loader ? "Loading" : "Confirm"}
                            </button>
                            <button
                                className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
