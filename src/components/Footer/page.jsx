import React from "react";

function Footer() {
  return (
    <div data-scroll data-scroll-speed=".10" className="rounded-tl-lg ">
      <div className="sm:flex pb-12 pt-28 px-8 NeueMontreal-Regular bg-[#212121] sm:px-16 text-[#f1f1f1]">
        <div className="sm:w-1/2">
          <p className="FoundersGrotesk-Semibold uppercase sm:text-[10rem] leading-[8.5vw]">
          Innovate, Learn, and Lead!
          </p>
        </div>
        <div className="sm:w-1/2">
          <p className="FoundersGrotesk-Semibold uppercase leading-[8.5vw] sm:text-[10rem]">
         Explora
          </p>
          <p className="mt-28 text-lg">S:</p>
          <div className="mt-5">
            {["Instagram", "Facebook", "Linkedin", "Githib"].map(
              (item, index) => (
                <p key={index} className="underline text-lg">
                  {item}
                </p>
              )
            )}
          </div>
          {/*  */}
          <p className="mt-14 text-lg">L:</p>
          <div className="mt-5">
            {["ITMBU","Vadodara", "Gujarat", "India - 390002"].map((item, index) => (
              <p key={index} className="underline text-lg">
                {item}
              </p>
            ))}
          </div>
          {/*  */}
          <p className="mt-14 text-lg">E:</p>
          <div className="mt-5">
            {["itmbuexploraclub@gmail.com"].map((item, index) => (
              <p key={index} className="underline text-lg">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-[#212121] pb-10 sm:px-16 ">
        <h1 className="font-bold text-2xl   NeueMontreal-Regular">
          Zoher R.
        </h1>
        <div className="gap-2 sm:pl-[16.8rem] text-[#f1f1f1] hidden sm:flex items-center ">
          {["© Zoher R", "2024."].map((item, key) => (
            <a
              href={`#${item.toLowerCase()}`}
              className="font-regular text-lg	 NeueMontreal-Regular"
              key={key}
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href=""
          className="font-regular text-lg 	ml-[9rem] NeueMontreal-Regular"
        >
          Contact us{" "}
        </a>
      </div>
    </div>
  );
}

export default Footer;
