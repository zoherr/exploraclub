"use client"
import React, { useEffect, useState } from 'react'
import Loader from '../Loading';
import Image from "next/image";
import Link from "next/link"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MdEditSquare, MdDelete } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const ManageEvent = () => {
    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
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

    const handleDeleteEvent = async (id) => {
        try {
            const response = await axios.delete(`/api/events/${id}`); // Adjust the endpoint as needed

            if (response.data.success) {
                toast.success('Event deleted successfully!');
                // Optionally, refresh the event list or redirect the user
            } else {
                toast.error('Failed to delete event.');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('An error occurred while deleting the event.');
        }
    };

    const handleSendFileToSlack = async (id) => {
        try {
            const response = await axios.post('/api/slack/send-attendance', { eventId: id });
            if (response.data.success) {
                toast.success('File sent to Slack successfully!');
            } else {
                toast.error('Failed to send file to Slack.');
            }
        } catch (error) {
            console.error('Error sending file:', error.message);
            alert('Error sending file to Slack.');
        }
    };
    const handleDeleteClick = (id) => {
        setEventToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        handleDeleteEvent(eventToDelete);
        setShowConfirm(false);
        setEventToDelete(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setEventToDelete(null);
    };

    if (loading) {
        return <Loader />; // Loading state
    }
    return (
        <div className='pt-6 sm:pt-8 sm:px-20 px-3'>
            {event.map((item, index) => (
                <div key={index} className="sm:flex bg-[#004D43] rounded-lg sm:py-5 py-4  mt-7 sm:px-6 px-3 text-[#fff] sm:items-center sm:justify-between border border-gray-300">
                    <div className="sm:flex-1">
                        <p className='sm:text-2xl text-lg font-semibold NeueMontreal-Regular'>{item.name}</p>
                    </div>

                    <div className="flex justify-between space-x-4 mt-4 sm:mt-0">
                        <div className=" flex gap-5">
                            <button
                                onClick={() => handleSendFileToSlack(item._id)}
                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                                aria-label="Send to Slack"
                            >
                                <IoIosSend />
                            </button>

                            <Link href={`/admin/manage-event/${item._id}`}>
                                <button
                                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                                    aria-label="Edit Event"
                                >
                                    <MdEditSquare />
                                </button>
                            </Link>
                        </div>

                        <button
                            onClick={() => handleDeleteClick(item._id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                            aria-label="Delete Event"
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ))}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50  bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-5 w-[80%] sm:w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this event?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={cancelDelete} className="mr-2 p-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                            <button onClick={confirmDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default ManageEvent
