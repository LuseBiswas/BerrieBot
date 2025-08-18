"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface SolutionSlide {
  id: number;
  image: string;
  content: string;
}

const solutionsData: SolutionSlide[] = [
  {
    id: 1,
    image: "/image/mobile/solution/6.png",
    content: "Personalized conversations via SMS, Calls, Email, and more."
  },
  {
    id: 2,
    image: "/image/mobile/solution/7.png",
    content: "Handles bookings, confirms calls, sends quotes, and even demos products."
  },
  {
    id: 3,
    image: "/image/mobile/solution/8.png",
    content: "Available 24/7, so you never miss a lead (or a customer craving attention)."
  }
];

export default function MobileSolutionsCarousel_3() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);



  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < solutionsData.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="bg-black py-16 px-4 relative mt-[-10px]">
      {/* Background Images */}
      <div className="absolute pointer-events-none" style={{ top: '0px', left: '-200px', zIndex: 1 }}>
        <Image
          src="/image/mobile/7.png"
          alt="Background Image 1"
          width={377}
          height={336}
          className="w-[377.31px] h-[336px] opacity-[50%]"
        />
      </div>
      
      {/* <div className="absolute pointer-events-none" style={{ top: '100px', right: '-200px', zIndex: 1 }}>
        <Image
          src="/image/mobile/8.png"
          alt="Background Image 2"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px] opacity-[50%]"
        />
      </div> */}
      
      <div className="max-w-sm mx-auto mt-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Title */}
          <h1 
            className="font-medium text-white mb-4"
            style={{
              fontSize: '48px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.2'
            }}
          >
            Live Texting <br /> Assistant
          </h1>
          
          {/* Subtitle */}
          <h2 
            className="font-medium text-white mb-6"
            style={{
              fontSize: '24px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.3'
            }}
          >
            Conversations That Convert
          </h2>
          
          {/* Description */}
          <p 
            className="text-white font-light leading-relaxed"
            style={{
              fontSize: '16px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.5'
            }}
          >
           Say hello to BerriConnect, your always-on, never-boring, AI chat buddy. From answering customer questions to helping close deals - this is not your average chatbot.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative flex items-center justify-center min-h-[300px]">
          {/* Left Arrow */}
          <button
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className={`absolute left-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex === 0 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="flex flex-col items-center justify-center mx-12">
            {/* Image Container - Fixed Size */}
            <div className="mb-6 relative" style={{ width: '137px', height: '137px' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={solutionsData[currentIndex].image}
                    alt={`Solution ${currentIndex + 1}`}
                    width={137}
                    height={137}
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Box Container - Fixed Size */}
            <div className="relative" style={{ width: '226px', height: '126px' }}>
              <AnimatePresence mode="wait" initial={false}>
                                  <motion.div
                    key={`content-${currentIndex}`}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gray-800 rounded-2xl p-4 flex items-center"
                  >
                    {/* 20% - Tick Icon Section */}
                    <div className="flex items-center justify-center" style={{ width: '20%' }}>
                      <div className="w-6 h-6 bg-transparent rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#00AD96]" />
                      </div>
                    </div>
                    
                    {/* 80% - Content Section */}
                    <div className="flex items-center" style={{ width: '80%' }}>
                      <p 
                        className="text-white text-left font-light leading-relaxed"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.4'
                        }}
                      >
                        {solutionsData[currentIndex].content}
                      </p>
                    </div>
                  </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => paginate(1)}
            disabled={currentIndex === solutionsData.length - 1}
            className={`absolute right-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex === solutionsData.length - 1 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        
      </div>
    </div>
  );
} 