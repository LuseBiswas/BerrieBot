'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// JSON data structure for founder carousel
const FOUNDERS = [
  {
    id: 1,
    image: "/image/Founder/img_1.png",
    name: "CXO",
    heading: "AI is the future <br/> of Interviewing. <br/> GenZ's will look <br/> forward to <br/> using Berribot",
    company: "CXO of a Fortune 500 IT Services firm"
  },
  {
    id: 2,
    image: "/image/Founder/img_2.png",
    name: "Director",
    heading: "Berribot <br/> changed the way <br/> L1 interviews are <br/> conducted for us",
    company: "Director of a Fortune 500 IT Services firm"
  },
  {
    id: 3,
    image: "/image/Founder/img_3.png",
    name: "CXO",
    heading: "Berribot delivers the  <br/> exact need of the hour <br/> with their <br/> exceptional products",
    company: "CXO of a billion dollar US based Mortgage Refinancing business"
  },
  {
    id: 4,
    image: "/image/Founder/img_3.png",
    name: "Global Recruitment Head",
    heading: "We should learn to <br/> adapt ourselves with <br/> the use of AI tools in <br/> Hiring and Berribot <br/> has just stepped up <br/> their game.",
    company: "of a billion dollar IT firm"
  },
  {
    id: 5,
    image: "/image/Founder/img_3.png",
    name: "Head of Talent Acquisition",
    heading: "Berribot has significantly Revolutionalized the <br/> way we hire and also lead the way to the future <br/> of Gen AI hiring",
    company: "of a Fortune 200 Digital and Technology Enterprise"
  },
  {
    id: 6,
    image: "/image/Founder/img_3.png",
    name: "Global Head of TA",
    heading: "Berribot has helped enhance our candidate experience and improved our hiring turn around <br/> times especially in the LATAM markets",
    company: "Digital Engineering Firm"
  },
];

export default function MobileProductTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === FOUNDERS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? FOUNDERS.length - 1 : prevIndex - 1
    );
  };

  const currentFounder = FOUNDERS[currentIndex];
  const Heading = currentFounder.heading;

  return (
    <section className="relative bg-[#FAFAFA] py-16 px-4 overflow-hidden">


      {/* Bottom Left - 7.png */}
      {/* <div className="absolute z-1 pointer-events-none" style={{ bottom: '500px', left: '-350px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image Bottom Left"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]  opacity-[40%]"
        />
      </div>
       */}
      {/* Top Right - 8.png */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '0px', left: '-300px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image Top Right"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]  opacity-[50%]"
        />
      </div>

      {/* Top Left Image - Positioned below subheading */}
      <div className="absolute z-1" style={{ top: '0px', left: '0px' }}>
        <Image 
          src="/image/mobile/line_3.png"
          alt="Top Left Lines"
          width={248}
          height={99}
          className="w-[248px] h-[99px]"
        />
      </div>

      {/* Navigation Arrows - Centered between criss-cross images */}
      <div 
        className="absolute left-4 right-4 flex justify-between items-center z-20"
        style={{ top: 'calc(10px + 200px)' }}
      >
        <button
          onClick={prevSlide}
          className="p-3 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-sm mx-auto relative z-10">

        {/* Heading */}
        <h2 
          className="text-black text-center mb-8"
          style={{ 
            fontSize: '38px', 
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 500
          }}
        >
          "What do <br /> our clients say"
        </h2>

        {/* Founder Carousel Content */}
        <div className="text-center h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFounder.id}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6"
            >
              {/* Heading Text */}
              <div className="flex justify-center">
                <div 
                  className="text-black text-center"
                  style={{ 
                    fontSize: '30px', 
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.1
                  }}
                  dangerouslySetInnerHTML={{ __html: Heading }}
                />
              </div>

              {/* Person Name */}
              <div 
                className="text-black font-medium"
                style={{ 
                  fontSize: '18px', 
                  fontFamily: 'Manrope, sans-serif' 
                }}
              >
                {currentFounder.name}
              </div>

              {/* Company Name */}
              <div 
                className="text-black"
                style={{ 
                  fontSize: '14px', 
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: '300'
                }}
                dangerouslySetInnerHTML={{ __html: currentFounder.company }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Right Image */}
      <div className="absolute bottom-0 right-0">
        <Image 
          src="/image/mobile/line_4.png"
          alt="Bottom Right Lines"
          width={248}
          height={99}
          className="w-[248px] h-[99px]"
        />
      </div>
    </section>
  );
} 