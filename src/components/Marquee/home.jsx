'use client';

import React from 'react'
import { motion, useTransform,useScroll, useViewportScroll } from "framer-motion";

function HomeMarquee() {
    const { scrollYProgress } = useScroll();
    // Move the image vertically within the container
    const translateY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']); // Moves the image inside
    // const translateYDesk = useTransform(scrollYProgress, [0, 1], ['0%', '-120%']); // Moves the image inside

  return (
    <div  className="pt-20 sm:pt-10 w-full ">
    <div>
      <div className="w-full pb-16 sm:pb-16 rounded-tl-3xl rounded-tr-3xl pt-[3rem] sm:pt-[5rem]  FoundersGrotesk-Semibold bg-[#16423C] text-[#fff]">
        <div className="border-t-[1px] uppercase whitespace-nowrap text-[20vw] overflow-hidden border-[#fff] border-b-[1px] flex">
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 16 }}
            className="sm:mx-10 mx-5 my-2 leading-none m-0"
          >
Discover, Create, and Grow Together!{" "}
          </motion.h1>
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 16 }}
            className="sm:mx-10 mx-5 my-2 leading-none m-0"
          >
          Discover, Create, and Grow Together!{" "}
          </motion.h1>
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 16 }}
            className="sm:mx-10 mx-5 my-2 leading-none m-0"
          >
           Discover, Create, and Grow Together!{" "}
          </motion.h1>
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 16 }}
            className="sm:mx-10 mx-5 my-2 leading-none m-0"
          >
          Discover, Create, and Grow Together!{" "}
          </motion.h1>
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 16 }}
            className="sm:mx-10 mx-5 my-2 leading-none m-0"
          >
           Discover, Create, and Grow Together!{" "}
          </motion.h1>
        </div>
        <div className="flex justify-center items-center rounded-3xl sm:mt-16 mt-6 pt-2 ">
                    <motion.div className="sm:rounded-2xl rounded-xl h-[250px] sm:min-h-[750px]  w-[90%] sm:w-[90%]  overflow-hidden">
                        <motion.img
                            style={{ translateY}}
                            className="w-full h-[480px] sm:h-[1750px] object-cover rounded-xl"
                            src="https://i.ibb.co/ngwX8Yp/001.jpg"
                            alt=""
                        />

                    </motion.div>
                </div>
      </div>

    </div>
  </div>
  )
}

export default HomeMarquee
