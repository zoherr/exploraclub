"use client";  // Marking this as a client-side component
import dynamic from "next/dynamic";
import HomePage from "@/components/HomePage/page";
import HomeMarquee from "@/components/Marquee/home";
import Navbar from "@/components/navbar/page";
import { useEffect, useRef } from 'react';
import Vision from "@/components/Vision/Vision";
import { GridBackground } from "@/components/Grid/page";

// Disable SSR for this component to ensure it's only rendered on the client
const Home = () => {
//   const scrollRef = useRef(null);

//   useEffect(() => {


//     const scroll = new LocomotiveScroll({
//       el: scrollRef.current,
//       smooth: true,  // Enable smooth scrolling
//       smoothMobile: true,  // Optional, if you want smooth scrolling on mobile too
//       inertia: 0.75,  // Optional, customize inertia (scroll speed)
//     });


//   }, []);

  return (
    <div >
      <div className="bg-grid-[#6A9C89]/[0.2] min-w-screen min-h-screen pb-8">
        <Navbar />
        <HomePage />
        <HomeMarquee />
        <Vision />
      </div>
    </div>
  );
};

export default Home;
