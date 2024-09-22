'use client'
import Image from "next/image";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
const navbarItem = ["Home","Events","About Us","Gallary","Contact Us"]
  return (
    <div className="">
  <div className=" items-center gap-3 sticky top-5  justify-between py-5  px-5  hidden sm:flex  text-black">
<div className="">
<Image
        src="https://i.ibb.co/PW8XbhC/logo.png"
        alt="Description of image"
        width={40}
        height={40}
      />
</div>

<div className=" flex gap-7">{
    navbarItem.map((item,i)=>
    <p className="text-white text-lg hover:text-[#4AFAAB] cursor-pointer" key={i} >{item} </p>
    )
}</div>
<div className="flex gap-6">
    {/* <button className="text-[#4AFAAB] font-semibold">Login</button> */}
    <button className=" border border-[#4AFAAB] text-[#4AFAAB] font-semibold px-7 py-2 rounded-full">Join</button>

</div>
  </div>
  {/* Mobile */}
  <div className=" items-center gap-3 sticky top-0 justify-between flex px-[1rem] pt-4 py-3  bg-opacity-0  sm:hidden  backdrop-blur-lg text-white">
<div className="">
<Image
        src="https://i.ibb.co/PW8XbhC/logo.png"  // Path to your image
        alt="Description of image"  // Alt text for accessibility
        width={40}                // Image width
        height={40}               // Image height
      />
</div>
<div className="hidden  gap-7"></div>
{!isMenuOpen &&
    <div className="flex gap-5 items-center">
    {/* <button className="text-[#4AFAAB] font-semibold">Join</button> */}
    <button className={` bg-[#4AFAAB]  text-[#0A1D26] font-semibold px-3 py-1 rounded-lg`}>Join</button>
    <RiMenu2Fill className="text-2xl mr-1" onClick={()=>{setIsMenuOpen(!isMenuOpen)}} />

</div>
}

  </div>
  {isMenuOpen && <>

  <div className="z-[999] absolute top-0 items-end flex flex-col right-0 pt-8 w-[17rem]  pr-8 h-screen bg-black bg-opacity-10 backdrop-blur-lg text-white">
  <RxCross2 className="text-2xl  mb-5" onClick={()=>{setIsMenuOpen(!isMenuOpen)}} />

  {
    navbarItem.map((item,i)=>
    <p className="text-white text-end text-2xl my-5  hover:text-[#4AFAAB] cursor-pointer" key={i} >{item} </p>
    )
}
  </div>
  </>}
  </div>
  )
}
