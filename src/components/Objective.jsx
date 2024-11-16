import React from 'react'
import Image from "next/image";
import { motion, useTransform, useScroll, useViewportScroll } from "framer-motion";

const Objective = () => {
    return (
        <div className='px-4 NeueMontreal-Regular sm:px-16 mt-16 sm:mt-32 mb-16 sm:mb-32 '>
            <h1 className='NeueMontreal-Regular text-center text-6xl'>Our Objectives</h1>
            <div className="mt-16 sm:mt-16">
                {/*  */}
                <div className="sm:flex gap-16 justify-between">
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="sm:w-[50%] bg-[#FFCD62] rounded-lg p-6">
                        <div className="text-center mb-4">
                            <div className="">
                                <Image
                                    src="https://res.cloudinary.com/dorbalfdj/image/upload/v1731739712/undraw_undraw_analytics_mobile_drjl_-1-_5133_rxmmtj.svg"
                                    alt="Description of image"
                                    width={170}
                                    height={170}
                                />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mt-6">Educating Participants About IT Trends:</h3>
                        <p className="text-gray-700 mt-2">Our primary mission is to keep you informed about the latest IT trends. The tech world is a fast-paced arena, and staying updated is essential to thrive. We bring in industry experts to provide insights into current IT trends, ensuring that our members are at the forefront of technology.</p>
                    </motion.div>

                    <motion.div initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }} className="sm:w-[50%] mt-10 sm:mt-0 bg-[#4967FF] text-white rounded-lg p-6">
                        <div className="text-center mb-4">
                            <div className="">
                                <Image
                                    src="https://res.cloudinary.com/dorbalfdj/image/upload/v1731740868/undraw_educator_re_ju47_apiwz9.svg"
                                    alt="Description of image"
                                    width={170}
                                    height={170}
                                />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mt-6">Providing Solutions for Difficult Topics:</h3>
                        <p className=" mt-2">We understand that the journey through IT-related coursework can be challenging. Thats why were here to serve as your support system. IITMBU Explora fosters a sense of community where members can seek advice, mentorship, and guidance from both peers and experienced professionals. No question or difficulty is too big or small for us to address together.</p>
                    </motion.div>
                </div>
                {/* ----------------------- */}
                <div className="sm:flex gap-16 mt-10 justify-between">


                    <motion.div initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }} className="sm:w-[50%] mt-10 sm:mt-0 bg-[#4967FF] text-white rounded-lg p-6">
                        <div className="text-center mb-4">
                            <div className="">
                                <Image
                                    src="https://res.cloudinary.com/dorbalfdj/image/upload/v1731741004/undraw_undraw_undraw_undraw_selection_f3no_jw9h_-1-_nxfh_-1-_6d1x_dkyhob.svg"
                                    alt="Description of image"
                                    width={170}
                                    height={170}
                                />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mt-6">Fostering Software Development Skills:                        </h3>
                        <p className=" mt-2">For those of you interested in software development, we offer a platform to develop and showcase your coding skills. You can collaborate on real-world projects, participate in coding bootcamps, and learn from experienced developers, all within the clubs supportive environment.                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="sm:w-[50%] bg-[#FFCD62] mt-10 sm:mt-0 rounded-lg p-6">
                        <div className="text-center mb-4">
                            <div className="">
                                <Image
                                    src="https://res.cloudinary.com/dorbalfdj/image/upload/v1731741109/undraw_wait_in_line_o2aq_farglb.svg"
                                    alt="Description of image"
                                    width={170}
                                    height={170}
                                />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mt-6">Hosting Technical Events and Sessions:</h3>
                        <p className="text-gray-700 mt-2">At IITMBU Explora we believe in learning by doing. Our club offers a variety of technical events, workshops, and sessions where you can apply your skills. From hackathons and coding competitions to hands-on workshops, we provide opportunities to enhance both your problem-solving abilities and your technical expertise.</p>
                    </motion.div>
                </div>
                {/*  */}
            </div>
        </div>
    )
}

export default Objective
