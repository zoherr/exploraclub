"use client";
import React from "react";
import Image from "next/image";
import { Cover } from "../../components/ui/cover";

function HomePage() {
    return (
        <div className="px-4 sm:px-16 pt-16 sm:pt-20">
            <div className="sm:flex">
                <div className="sm:w-[75%]">
                    <h1 className="text-[3.5rem] text-[#1D2026] sm:text-[7.5rem]  sm:leading-[7rem] poppins-regular"> Welcome to
                    </h1>
                    <h1 className="sm:mt-6 font-bold sm:text-[7rem] text-[3rem] plus-jakarta-sans-bold"><Cover>EXPLORA CLUB.</Cover></h1>
                </div>

                <div className="NeueMontreal-Regular w-[75%] mt-10 sm:mt-20 sm:w-[25%] text-sm sm:ml-5 ml-1">

                    <svg width="50px" height="50px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 960c-92.8 0-160-200-160-448S419.2 64 512 64s160 200 160 448-67.2 448-160 448z m0-32c65.6 0 128-185.6 128-416S577.6 96 512 96s-128 185.6-128 416 62.4 416 128 416z" fill="#050D42" /><path d="M124.8 736c-48-80 92.8-238.4 307.2-363.2S852.8 208 899.2 288 806.4 526.4 592 651.2 171.2 816 124.8 736z m27.2-16c33.6 57.6 225.6 17.6 424-97.6S905.6 361.6 872 304 646.4 286.4 448 401.6 118.4 662.4 152 720z" fill="#050D42" /><path d="M899.2 736c-46.4 80-254.4 38.4-467.2-84.8S76.8 368 124.8 288s254.4-38.4 467.2 84.8S947.2 656 899.2 736z m-27.2-16c33.6-57.6-97.6-203.2-296-318.4S184 246.4 152 304 249.6 507.2 448 622.4s392 155.2 424 97.6z" fill="#050D42" /><path d="M512 592c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zM272 312c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48zM416 880c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z m448-432c-27.2 0-48-20.8-48-48s20.8-48 48-48 48 20.8 48 48-20.8 48-48 48z" fill="#2F4BFF" /></svg>
                    <p className="sm:mt-5 mt-2 sm:w-[70%] sm:text-lg"> Exploring the dynamic world of code: Where innovation meets imagination</p>
                </div>
            </div>
            <video
                className="sm:w-full sm:flex hidden rounded-3xl mt-16 "
                src="https://res.cloudinary.com/dorbalfdj/video/upload/v1731730365/Explora-Club_iphnjz.mp4"
                autoPlay
                loop
                muted
                playsInline
            ></video>
            <video
                className="w-full sm:hidden aspect-square rounded-3xl mt-8 mx-auto object-cover"
                src="https://res.cloudinary.com/dorbalfdj/video/upload/v1731730365/Explora-Club_iphnjz.mp4"
                autoPlay
                loop
                muted
                playsInline
            ></video>

        </div>
    );
}

export default HomePage;
