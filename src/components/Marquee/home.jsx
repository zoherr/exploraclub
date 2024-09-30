'use client';

import React from 'react'
import { motion, useTransform, useViewportScroll } from "framer-motion";

function HomeMarquee() {
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
      </div>
    </div>
  </div>
  )
}

export default HomeMarquee
