"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image"
function Loader() {
    const [count, setCount] = useState(0);

    return (
        <div
            className="bg-[#212121]  text-[#f1f1f1] w-full h-full flex items-center justify-center z-50"
        >
            <div className=" text-[#CDEA68] flex items-center h-screen w-full justify-center ">

                <motion.div
                    className="hidden absolute sm:flex gap-10 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
                >
                    <div className="sm:w-[12vw] w-[15vw] h-[15vw] sm:h-[12vw] flex rounded-full bg-white items-center justify-center">
                        <motion.div
                            className="w-[10vw] h-[10vw] sm:w-[8vw] sm:h-[8vw]  flex items-center justify-center rounded-full bg-black"
                            // whileInView={{rotate:0}}
                            animate={{ rotate: 360 }}
                            transition={{ ease: "linear", duration: 2, repeat: Infinity }}
                        >
                            <div className="line w-full h-8 flex ">
                                <div className="bg-white w-[2vw] h-[2vw] rounded-full m-[0.25rem]"></div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="sm:w-[12vw] w-[15vw] h-[15vw] sm:h-[12vw] flex rounded-full bg-white items-center justify-center">
                        <motion.div
                            className="w-[10vw] h-[10vw] sm:w-[8vw] sm:h-[8vw] flex items-center justify-center rounded-full bg-black"
                            animate={{ rotate: 360 }}
                            // whileInView={{rotate:0}}
                            transition={{ ease: "linear", duration: 2, repeat: Infinity }}
                        >
                            <div className="line w-full h-8 flex ">
                                <div className="bg-white w-[2vw] h-[2vw] m-[0.25rem] rounded-full"></div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
                <div className="textstructure  flex text-[#CDEA68] ">
                    <div className="masker  FoundersGrotesk-Semibold">
                        {["Work in ", "progress!!"].map((item, index) => {
                            return (
                                <>
                                    <div className="flex justify-center items-center" key={index}>
                                        <h1
                                            className="uppercase sm:text-[14.1rem] text-[#CDEA68] sm:leading-[11.5vw] leading-[16.5vw] text-[5.1rem] sm:my-0"

                                        >
                                            {item}
                                        </h1>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="absolute text-[#f1f1f1] FoundersGrotesk-Semibold tracking-widest bottom-10 left-1/2 transform -translate-x-1/2 text-3xl">
                @exploraclub
            </div>
        </div>
    );
}

export default Loader;
