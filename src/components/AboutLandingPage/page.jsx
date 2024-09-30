"use client"
import Image from 'next/image';
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import AboutMarquee from './marquee';
import TeamMarquee from "./team"
const AboutLandingPage = () => {
    const { scrollYProgress } = useScroll();
    // Move the image vertically within the container
    const translateY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']); // Moves the image inside

    return (
        <div className="w-full pt-2  pb-16 ">
            <div className="textstructure text-[#16423C] mt-20 pb-[4rem] sm:pb-[8rem]">
                <div className="masker px-8 sm:px-16 FoundersGrotesk-Semibold">
                    {["We are", "Explora Club"].map((item, index) => {
                        return (
                            <>
                                {/* Desktop */}
                                <div className="sm:flex hidden items-center" key={index}>
                                    {index === 1 ? (
                                        <motion.div
                                            initial={{ width: 0, marginRight: 0 }}
                                            animate={{ width: "10%", marginRight: "1rem" }}
                                            transition={{
                                                ease: [0.76, 0, 0.24, 1],
                                                duration: 1,
                                                delay: 0.5,
                                            }}
                                            className="relative h-12 w-36 sm:w-16 sm:h-24 overflow-hidden rounded-md sm:rounded-lg bg-[#F1F1F1]  "
                                        >
                                            <Image
                                                width={190}
                                                height={150}
                                                src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                                alt=""
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    ) : null}
                                    <h1
                                        className="uppercase sm:text-[8rem]   sm:leading-[7.5vw]  sm:my-0"
                                        key={index}
                                    >
                                        {item}
                                    </h1>
                                </div>
                                {/* Mobile */}
                                <div className="sm:hidden flex items-center">
                                    {index === 1 ? (
                                        <motion.div
                                            initial={{ width: 0, marginRight: 0 }}
                                            animate={{ width: "19%", marginRight: "0.5rem" }}
                                            transition={{
                                                ease: [0.76, 0, 0.24, 1],
                                                duration: 1,
                                                delay: 0.5,
                                            }}
                                            className="relative h-12 w-36 sm:w-16 sm:h-24 overflow-hidden rounded-md sm:rounded-lg bg-[#F1F1F1]  "
                                        >
                                            <Image
                                                width={190}
                                                height={150}
                                                src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                                alt=""
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    ) : null}
                                    <h1
                                        className="uppercase sm:text-[8rem]   sm:leading-[7.5vw] text-5xl  sm:my-0"
                                        key={index}
                                    >
                                        {item}
                                    </h1>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>

            <div className="   pt-[3rem] rounded-tl-3xl rounded-tr-3xl bg-[#16423C] mt-8">
                <div className="NeueMontreal-Regular px-6 sm:px-20 pb-20">
                    <h1 className='NeueMontreal-Regular text-4xl pb-4 text-white border-[#fff] border-b-[1px]'>About us</h1>
                    <p className='NeueMontreal-Regular text-white pt-8 text-lg'>
                        The main aim of the club is to provide a vibrant platform to be the driving force behind a community of tech enthusiasts who aspire to push the boundaries of innovation, learn continuously, and make a positive impact on society through technology. Our aim is to inspire members to become lifelong learners and leaders in the ever-evolving field of computer science and IT.
                    </p>
                </div>

            </div>
            <div className="rounded-tl-3xl rounded-tr-3xl overflow-hidden  bg-white pb-16 relative -top-5 ">
                < AboutMarquee />
                <div className="flex justify-center items-center rounded-3xl pt-2 sm:pt-10 overflow-hidden">
                    <motion.div className="sm:rounded-2xl rounded-xl h-[250px] sm:h-[750px] w-[85%] sm:w-[90%]  overflow-hidden">
                        <motion.img
                            style={{ translateY }}
                            className="w-full h-[480px] sm:h-[850px] object-cover rounded-xl"
                            src="https://images.pexels.com/photos/1109763/pexels-photo-1109763.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                        />

                    </motion.div>
                </div>
                <div className="sm:pt-0 pt-8 px-6 sm:px-20">
                    <div className="border-[#16423C] hidden sm:block border-b-[1px] mb-8"></div>
                    <div className="sm:flex justify-between">
                        <h1 className="NeueMontreal-Regular text-4xl sm:w-1/2">
                            Co-ordinator
                        </h1>
                        <div className="border-[#16423C] sm:hidden block border-b-[1px] pt-8"></div>
                        <div className="sm:w-1/2 sm:mt-0 mt-8">
                            <div className="h-[21rem] w-[19rem] rounded-xl   overflow-hidden">
                                <Image
                                    width={190}
                                    height={150}
                                    src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className='bg-white bg-opacity-10  border-none w-[12.2rem] backdrop-blur-lg text-white relative -top-[4.5rem]  left-4 NeueMontreal-Regular px-5 py-2   mt-2    rounded-full text-xl'>Prof. Twinkle Modi</h1>
                        </div>

                    </div>



                    <div className="w-full sm:flex mt-8 justify-between">

                    </div>
                </div>
                <div className="sm:pt-0  px-6 sm:px-20">
                    <div className="border-[#16423C] hidden sm:block border-b-[1px] mb-8"></div>
                    <div className="sm:flex justify-between">
                        <h1 className="NeueMontreal-Regular text-3xl sm:w-1/2">
                         Core Members
                        </h1>
                        <div className="border-[#16423C] sm:hidden block border-b-[1px] pt-8"></div>
                        <div className="sm:w-1/2 sm:mt-0 sm:flex sm:justify-between mt-8">
                            <div className="">
                            <div className="h-[21rem] w-[19rem] rounded-xl   overflow-hidden">
                                <Image
                                    width={190}
                                    height={150}
                                    src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className='bg-white bg-opacity-10  border-none w-[8.7rem] backdrop-blur-lg text-white relative -top-[4.5rem]  left-4 NeueMontreal-Regular px-5 py-2   mt-2    rounded-full text-xl'>Mahi Yadav</h1>
                            </div>
                            <div className="">
                            <div className="h-[21rem] w-[19rem] rounded-xl   overflow-hidden">
                                <Image
                                    width={190}
                                    height={150}
                                    src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className='bg-white bg-opacity-10  border-none w-[8.7rem] backdrop-blur-lg text-white relative -top-[4.5rem]  left-4 NeueMontreal-Regular px-5 py-2   mt-2    rounded-full text-xl'>Harsh Soni</h1>
                            </div>
                        </div>

                    </div>



                    <div className="w-full sm:flex mt-8 justify-between">

                    </div>
                </div>
                <div className="sm:pt-0  px-6 sm:px-20">
                    <div className="border-[#16423C] hidden sm:block border-b-[1px] mb-8"></div>
                    <div className="">

                        <h1 className="NeueMontreal-Regular text-5xl text-center ">
                          Members
                        </h1>
                        <div className="border-[#16423C] sm:hidden block w-full border-b-[1px] pt-8"></div>

                        <TeamMarquee />
                    </div>



                    <div className="w-full sm:flex mt-8 justify-between">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutLandingPage
