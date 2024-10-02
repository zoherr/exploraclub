"use client";  // Marking this as a client-side component
import dynamic from "next/dynamic";
import Image from "next/image";

import HomeMarquee from "../components/Marquee/home";
import Navbar from "../components/navbar/page";
import { useEffect, useRef, useState } from 'react';
import Vision from "../components/Vision/Vision";
import Events from "../components/Events/Events";
import HomePage from "../components/HomePage/page";

import Loader from "../components/Loading"


const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set a timeout for 5 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // 5000 milliseconds = 5 seconds

        // Cleanup the timeout when the component unmounts
        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        return <Loader />; // Loading state
    }
    return (
        <div >
            <div className=" min-w-[100%]  pb-8">


                <HomePage />
                <HomeMarquee />
                <Vision />
                <Events />

            </div>
        </div>
    );
};

export default Home;
