'use client';

import React from 'react'
import { motion, useTransform, useViewportScroll } from "framer-motion";

function AboutMarquee() {
  return (
    <div  className="relative -top-3 w-full ">
    <div>
      <div className="w-full pb-6 sm:pb-16  pt-[4rem] sm:pt-[5rem]  FoundersGrotesk-Semibold bg-white text-[#16423C]">
        <div className="border-t-[1px] uppercase whitespace-nowrap text-[20vw] overflow-hidden border-[#16423C] border-b-[1px] flex">
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 7 }}
            className="sm:mx-10 mx-5 leading-none m-0"
          >
           Core of the team{" "}
          </motion.h1>
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 7 }}
            className="sm:mx-10 mx-5 leading-none m-0"
          >
           Core of the team{" "}
          </motion.h1>
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 7 }}
            className="sm:mx-10 mx-5 leading-none m-0"
          >
           Core of the team{" "}
          </motion.h1>
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 7 }}
            className="sm:mx-10 mx-5 leading-none m-0"
          >
          Core of the team{" "}
          </motion.h1>
          <motion.h1
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 7 }}
            className="sm:mx-10 mx-5 leading-none m-0"
          >
           Core of the team{" "}
          </motion.h1>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AboutMarquee
