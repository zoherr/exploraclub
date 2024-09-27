"use client"
import Image from 'next/image';
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import AboutMarquee from './marquee';

const AboutLandingPage = () => {
    const { scrollYProgress } = useScroll();
    // Move the image vertically within the container
    const translateY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']); // Moves the image inside

    return (
        <div className="w-full pt-2  pb-16 ">
            <div className="textstructure text-[#f1f1f1] mt-20 pb-[4rem] sm:pb-[8rem]">
                <div className="masker px-8 sm:px-16 FoundersGrotesk-Semibold">
                    {["We are", "Explora Club"].map((item, index) => {
                        return (
                            <>
                                {/* Desktop */}
                                <div className="sm:flex hidden items-center">
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
                                        className="uppercase sm:text-[8rem]   sm:leading-[7.5vw] text-6xl  sm:my-0"
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
                                        className="uppercase sm:text-[8rem]   sm:leading-[7.5vw] text-6xl  sm:my-0"
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

            <div className="   pt-[3rem] rounded-tl-3xl rounded-tr-3xl bg-white mt-8">
                <div className="NeueMontreal-Regular px-6 sm:px-20 pb-8">
                    <h1 className='NeueMontreal-Regular text-4xl pb-4  border-[#16423C] border-b-[1px]'>About us</h1>
                    <p className='NeueMontreal-Regular pt-8 text-lg'>
                        The main aim of the club is to provide a vibrant platform to be the driving force behind a community of tech enthusiasts who aspire to push the boundaries of innovation, learn continuously, and make a positive impact on society through technology. Our aim is to inspire members to become lifelong learners and leaders in the ever-evolving field of computer science and IT.
                    </p>
                </div>

            </div>
            <div className="bg-white pb-16">
                < AboutMarquee />
                <div className="flex justify-center items-center rounded-3xl pt-2 sm:pt-20 overflow-hidden">
                    <motion.div className="sm:rounded-2xl rounded-xl h-[250px] sm:h-[750px] w-[85%] sm:w-[90%]  overflow-hidden">
                        <motion.img
                            style={{ translateY }}
                            className="w-full h-[350px] sm:h-[1050px] object-cover rounded-xl"
                            src="https://images.pexels.com/photos/1109763/pexels-photo-1109763.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                        />

                    </motion.div>
                </div>
                <div className="sm:pt-0 pt-8 px-6 sm:px-20">

                    <h1 className="NeueMontreal-Regular text-4xl ">
                        Meet Founders
                    </h1>
                    <div className="border-[#16423C] border-b-[1px] pt-8"></div>

                    <div className="w-full sm:flex mt-8 justify-between">
                        {/* <div className="sm:h-[30rem] sm:w-[85rem] h-[23rem] w-[23rem] flex rounded-lg mt-8 bg-[#f1f1f1]">
                <div className="w-full   ">
<div className="">

    <div className="flex justify-center p-5 mt-2 ">
    <Image
                                                width={150}
                                                height={160}
                                                src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                                alt=""
                                                className="h-[20rem]  w-[90%] rounded-lg object-cover"
                                            />
    </div>
    <div className="flex relative -top-[5rem]  justify-center pb-5  ">
        <h1 className='-leading-5   FoundersGrotesk-Semibold  text-4xl text-[#fff]'>Prof.  Twinkle Modi</h1>
    </div>
</div>

          </div>
                </div> */}
                        {/* <div className="group h-[25rem] w-[22rem] sm:mt-0 mt-7 rounded-xl perspective-1000">
                            <div className="relative h-full w-full duration-700 transform-style preserve-3d group-hover:rotate-y-180">
                                <div className="absolute  h-full w-full bg-[#16423C] rounded-xl  flex justify-center items-center">
                                    <p className="NeueMontreal-Regular text-2xl text-[#fff]">
                                        Prof. Twinkle Modi
                                    </p>
                                </div>

                                <div className="absolute backface-hidden h-full w-full bg-[#f1f1f1] rounded-xl flex flex-col rotate-y-180 justify-center items-center">
                                    <Image
                                        width={150}
                                        height={160}
                                        src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                        alt=""
                                        className="h-[20rem] w-[90%] rounded-lg object-cover"
                                    />
                                    <h1 className="NeueMontreal-Regular mt-4 text-2xl text-[#212121]">Core Member</h1>
                                </div>



                            </div>
                        </div>
                        <div className="group h-[25rem] w-[22rem] sm:mt-0 mt-7 rounded-xl perspective-1000">
                            <div className="relative h-full w-full duration-700 transform-style preserve-3d group-hover:rotate-y-180">
                                <div className="absolute  h-full w-full bg-[#16423C] rounded-xl  flex justify-center items-center">
                                    <p className="NeueMontreal-Regular text-2xl text-[#fff]">
                                        Prof. Twinkle Modi
                                    </p>
                                </div>
                                <div className="absolute backface-hidden h-full w-full bg-[#f1f1f1] rounded-xl flex flex-col rotate-y-180 justify-center items-center">
                                    <Image
                                        width={150}
                                        height={160}
                                        src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                        alt=""
                                        className="h-[20rem] w-[90%] rounded-lg object-cover"
                                    />
                                    <h1 className="NeueMontreal-Regular mt-4 text-2xl text-[#212121]">Core Member</h1>
                                </div>


                            </div>
                        </div>

                        <div className="group h-[25rem] w-[22rem] sm:mt-0 mt-7 rounded-xl perspective-1000">
                            <div className="relative h-full w-full duration-700 transform-style preserve-3d group-hover:rotate-y-180">
                                <div className="absolute  h-full w-full bg-[#16423C] rounded-xl  flex justify-center items-center">
                                    <p className="NeueMontreal-Regular text-2xl text-[#fff]">
                                        Prof. Twinkle Modi
                                    </p>
                                </div>
                                <div className="absolute backface-hidden h-full w-full bg-[#f1f1f1] rounded-xl flex flex-col rotate-y-180 justify-center items-center">
                                    <Image
                                        width={150}
                                        height={160}
                                        src="https://images.pexels.com/photos/15857477/pexels-photo-15857477/free-photo-of-red-walls-of-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr="
                                        alt=""
                                        className="h-[20rem] w-[90%] rounded-lg object-cover"
                                    />
                                    <h1 className="NeueMontreal-Regular mt-4 text-2xl text-[#212121]">Core Member</h1>
                                </div>


                            </div>
                        </div> */}


                    </div>
                </div>

            </div>
        </div>
    )
}

export default AboutLandingPage
