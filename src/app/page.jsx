"use client";  // Marking this as a client-side component
import dynamic from "next/dynamic";

import HomeMarquee from "../components/Marquee/home";
import Navbar from "../components/navbar/page";
import { useEffect, useRef } from 'react';
import Vision from "../components/Vision/Vision";
import Events from "../components/Events/Events";
import HomePage from "../components/HomePage/page";



const Home = () => {

    return (
        <div >
            <div className=" min-w-[100%] min-h-screen pb-8">

               
                <HomePage />
                <HomeMarquee />
                <Vision />
                <Events />
            </div>
        </div>
    );
};

export default Home;
