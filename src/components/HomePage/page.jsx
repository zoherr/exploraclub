"use client";
import React from 'react'
import Image from "next/image";
import { FlipWords } from '../ui/Flip-word';
import { MdArrowRightAlt } from "react-icons/md";
import HomeMarquee from '../Marquee/home';
import { Spotlight } from '../ui/Spotlight';

function HomePage() {
    const words = ["better", "cute", "beautiful", "modern"];

    return (
        <div   className='z-[999] sm:mt-4 mb-6 sm:mb-0 mt-5 sm:px-10  sm:min-h-screen '>
             <Spotlight
        className="-top-40 hidden sm:flex left-0 md:left-60 md:-top-20"
        fill="white"
      />

            <div className="text-center pt-[5rem] sm:pt-[6rem] justify-center flex text-white ">
                <div className="text-2xl sm:text-6xl font-semibold sm:w-[75%] outfit-medium">
                    <p>Seamless Financial Solution.</p>
                    <div className="flex pt-3 justify-center items-center outfit-medium">
                        <p>Lorem, ipsum </p>
                        <FlipWords words={words} className="text-[#4AFAAB] font-bold outfit-medium" /> <br />
                    </div>
                </div>


            </div>
            <div className="flex gap-6 justify-center mt-16">
                {/* <button className="text-[#4AFAAB] font-semibold">Login</button> */}
                <button className="flex items-center gap-4 px-5 py-2 border border-[#4AFAAB] text-[#16423C] bg-[#4AFAAB] font-semibold  rounded-full">Upcoming Events <MdArrowRightAlt className='text-2xl' />

                </button>
                {/* <button className="flex items-center gap-4 px-5 py-2 border border-[#4AFAAB] text-[#4AFAAB]  font-semibold  rounded-full">Contact Us<MdArrowRightAlt className='text-2xl' />
</button> */}
            </div>
            {/* Desktop */}
            <div className="hidden sm:flex gap-6 object-cover justify-center items-center mt-[7rem] ">

                <Image
                    className='rounded-2xl object-cover w-[80%] h-[35rem]'
                    height={240}
                    width={240}
                    alt="NextUI Fruit Image with Zoom"
                    src="https://images.pexels.com/photos/3269264/pexels-photo-3269264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />

            </div>
             {/* Desktop */}
{/* Mobile */}
<div className="flex sm:hidden gap-4 object-cover justify-center items-center mt-[2rem] ">

                <Image
                    className='rounded-xl object-cover w-[92%] h-[17rem]'
                    height={24}
                    width={24}
                    alt="NextUI Fruit Image with Zoom"
                    src="https://images.pexels.com/photos/3269264/pexels-photo-3269264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />

            </div>
        </div>
    )
}

export default HomePage
