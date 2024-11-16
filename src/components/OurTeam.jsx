import React from 'react'
import { AnimatedTestimonials } from "./ui/animated-testimonials";

const OurTeam = () => {
    const testimonials = [
        {
          quote:
            "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
          name: "Prof. Twinkle Modi",
          designation: "Co-ordinator",
          src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          quote:
            "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
          name: "Mahi Yadav",
          designation: "Core Member",
          src: "https://res.cloudinary.com/dorbalfdj/image/upload/v1731755444/WhatsApp_Image_2024-11-16_at_16.27.16_0b07789a_nlkdyq.jpg",
        },
        {
          quote:
            "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
          name: "Harsh Soni",
          designation: "Core Member",
          src: "https://res.cloudinary.com/dorbalfdj/image/upload/v1731753070/WhatsApp_Image_2024-11-16_at_15.52.56_9ad2686c_h28hzo.jpg",
        },

      ];
  return (
    <div className='px-4 NeueMontreal-Regular sm:px-16  mb-16 sm:mb-32 '>
    <h1 className='NeueMontreal-Regular text-center text-6xl'>Our Team</h1>
    <AnimatedTestimonials testimonials={testimonials} />
</div>
  )
}

export default OurTeam
