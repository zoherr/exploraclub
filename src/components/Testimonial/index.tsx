"use client";

import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { motion } from "framer-motion";
import SingleTestimonial from "./SingleTestimonial";
import { testimonialData } from "./testimonialData";

const Testimonial = () => {
    return (
        <>
            <section>
                <div className="border-[1px] border-black"></div>
                <h1 className='NeueMontreal-Regular text-center bg-white relative inline ml-5 -top-8 px-4 text-6xl'>Testimonial</h1>


                <motion.div className="mx-auto mt-20  sm:max-w-[70%] px-4 md:px-8  xl:px-0">
                    <div className="swiper   mb-20 pb-22">
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={2}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}

                            modules={[Autoplay, Pagination]}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                            }}
                        >
                            {testimonialData.map((review) => (
                                <SwiperSlide key={review?.id}>
                                    <SingleTestimonial review={review} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </motion.div>
            </section>
        </>
    );
};

export default Testimonial;
