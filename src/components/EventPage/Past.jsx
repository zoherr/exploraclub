"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from "next/image";
import EventCard from "./EventCard"
import Loader from "../Loading"
const Past = () => {
    const [events, setEvent] = useState([]);
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
    if (loading) {
        return <Loader />; // Loading state
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-6 sm:mx-11 ">
            {events
                .filter(event => event.isCompleted) 
                .map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
        </div>

    )
}

export default Past
