'use client';

import React from 'react'
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { GiFlowerStar  } from "react-icons/gi";

function TeamMarquee() {
  return (
    <div  className="  w-full ">
           <div className="relative left-0 top-0  w-[10%] h-full bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none"></div>
           <div className="relative right-0 top-0  w-[10%] h-full bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none"></div>
    <div>
    <div className="w-full pb-6 sm:pb-16 pt-[4rem] sm:pt-[5rem] text-[8vw] sm:text-[5vw] NeueMontreal-Regular bg-white text-[#16423C]">


  <div className="whitespace-nowrap flex my-5">
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 12 }}
      className="  flex gap-5 items-center leading-none m-0"
    >
      Roshan Singh Baghel <GiFlowerStar className=' sm:text-6xl text-lg' /> Mann Gandhi <GiFlowerStar className=' sm:text-6xl text-lg mr-4'  />
    </motion.h1>
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 12 }}
      className=" flex gap-5 items-center leading-none m-0"
    >
      Roshan Singh Baghel <GiFlowerStar className=' sm:text-6xl text-lg'  /> Mann Gandhi <GiFlowerStar className=' sm:text-6xl text-lg mr-4'  />
    </motion.h1>
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 12 }}
      className=" flex gap-5 items-center leading-none m-0"
    >
      Roshan Singh Baghel <GiFlowerStar className=' sm:text-6xl text-lg'   />Mann Gandhi <GiFlowerStar className=' sm:text-6xl text-lg mr-4'  />
    </motion.h1>
  </div>
  <div className="whitespace-nowrap flex my-5">
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 8 }}
      className=" flex gap-5 items-center leading-none m-0"
    >
       Himani <GiFlowerStar className=' sm:text-6xl text-lg'   /> Krishna <GiFlowerStar className=' sm:text-6xl text-lg'  />Mahin <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'  />
{" "}
    </motion.h1>
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 8 }}
      className="flex gap-5 items-center leading-none m-0"
    >
       Himani <GiFlowerStar className=' sm:text-6xl text-lg'  />Krishna <GiFlowerStar className=' sm:text-6xl text-lg'  /> Mahin <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'  />{" "}
    </motion.h1>
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 8 }}
      className="flex gap-5 items-center leading-none m-0"
    >
       Himani <GiFlowerStar className=' sm:text-6xl text-lg'  />Krishna <GiFlowerStar className=' sm:text-6xl text-lg'  />Mahin <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'  />{" "}
    </motion.h1>
  </div>
  <div className="whitespace-nowrap flex my-5">
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 15 }}
      className=" flex gap-5 items-center leading-none m-0"
    >
     Yash Rathod <GiFlowerStar className=' sm:text-6xl text-lg'  /> Anuj Pramanik <GiFlowerStar className=' sm:text-6xl text-lg'  />Rajendra <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'  />{" "}
    </motion.h1>

    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 15 }}
      className="flex gap-5 items-center leading-none m-0"
    >
     Yash Rathod <GiFlowerStar className=' sm:text-6xl text-lg'  />
 Anuj Pramanik <GiFlowerStar className=' sm:text-6xl text-lg'  />
 Rajendra <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'  />
{" "}
    </motion.h1>
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 15 }}
      className="flex gap-5 items-center leading-none m-0"
    >
     Yash Rathod <GiFlowerStar className=' sm:text-6xl text-lg'  />
 Anuj Pramanik <GiFlowerStar className=' sm:text-6xl text-lg'  />
 Rajendra <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'   />
{" "}
    </motion.h1>
  </div>
  <div className="whitespace-nowrap flex my-5">
  <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 11 }}
      className="flex gap-5 items-center leading-none m-0"
    >
     Yash Patel <GiFlowerStar className=' sm:text-6xl text-lg'  />
 Parmar Chirag <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'  />
{" "}
    </motion.h1>

    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration:11 }}
      className="flex gap-5 items-center leading-none m-0"
    >
     Yash Patel <GiFlowerStar className=' sm:text-6xl text-lg'  />
 Parmar Chirag <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'  />
{" "}
    </motion.h1>
    <motion.h1
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: 11 }}
      className="flex gap-5 items-center leading-none m-0"
    >
     Yash Patel <GiFlowerStar className=' sm:text-6xl text-lg'  />
 Parmar Chirag <GiFlowerStar className=' sm:text-6xl text-lg  mr-4'  />
{" "}
    </motion.h1>
  </div>
</div>

    </div>
  </div>
  )
}

export default TeamMarquee
