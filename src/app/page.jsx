"use client";  // Marking this as a client-side component
import dynamic from "next/dynamic";
import HomePage from "@/components/HomePage/page";
import HomeMarquee from "@/components/Marquee/home";
import Navbar from "@/components/navbar/page";
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import Vision from "@/components/Vision/Vision";

// Disable SSR for this component to ensure it's only rendered on the client
const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,  // Enable smooth scrolling
      smoothMobile: true,  // Optional, if you want smooth scrolling on mobile too
      inertia: 0.75,  // Optional, customize inertia (scroll speed)
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>

      <div data-scroll-section className="min-w-screen min-h-screen pb-8">
      <Navbar />
        <HomePage />
        <HomeMarquee />
        <Vision />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
