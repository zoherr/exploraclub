"use client";  // Marking this as a client-side component
import dynamic from "next/dynamic";
import Image from "next/image";
import CustomCursor from '../components/CustomCursor';
import { motion, useScroll } from "framer-motion";

import HomeMarquee from "../components/Marquee/home";
import Navbar from "../components/navbar/page";
import { useEffect, useRef, useState } from 'react';
import Vision from "../components/Vision/Vision";
import Events from "../components/Events/Events";
import HomePage from "../components/HomePage/page";
import Objective from "../components/Objective"
import Loader from "../components/Loading"
import Footer from "../components/Footer/index"
import OurTeam from "../components/OurTeam"
import Testimonial from "../components/Testimonial/index"
const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        return <Loader />;
    }
    
    return (
        <div className="">
            <div className=" min-w-[100%]  ">
            {/* <CustomCursor label="Anonymous" /> */}

                <HomePage />
                <Objective />
                <Events />
                <OurTeam />
                <Testimonial/>
                <  Footer />

            </div>
        </div>
    );
};

export default Home;
