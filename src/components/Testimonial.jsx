import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  "Framer Motion is amazing!",
  "This tool makes animations super easy.",
  "React developers love Framer Motion.",
  "Smooth animations bring life to apps.",
  "The best library for animations!"
];

const Testimonial = () => {
  return (
    <div className="overflow-hidden  py-8">
      <motion.div
        className="flex space-x-12"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ ease: "linear", repeat: Infinity, duration: 16 }}
      >
        {[...testimonials, ...testimonials].map((text, index) => (
          <div
            key={index}
            className=" mx-9 text-xl bg-[#2C7268] w-44 px-5 py-3 font-medium text-gray-700"
          >
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonial;
