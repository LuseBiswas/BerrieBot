"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface SolutionSlide {
  id: number;
  lordicon: string;
  content: string;
}

const solutionsData: SolutionSlide[] = [
  {
    id: 1,
    lordicon: "https://cdn.lordicon.com/gjopwtdp.json",
    content: "Verifies participantidentity using trusteddatabases."
  },
  {
    id: 2,
    lordicon: "https://cdn.lordicon.com/jwpaspoo.json", 
    content: "Flags red flagslike impersonation,deepfakes, audio-lip sync issues(yes, really)."
  },
  {
    id: 3,
    lordicon: "https://cdn.lordicon.com/glzqezmf.json",
    content: "Makes sure only the right people get in - and stay in."
  }
];

export default function MobileSolutionsCarousel_2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Load lordicon script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://cdn.lordicon.com/lordicon.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < solutionsData.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="bg-black py-0 px-4 relative overflow-hidden mt-[-10px]">
      {/* Background Image */}
      {/* <div className="absolute pointer-events-none" style={{ top: '-100px', left: '-200px', zIndex: 1 }}>
        <Image
          src="/image/mobile/5.png"
          alt="Background"
          width={1266}
          height={956}
          className="w-[1266px] h-[956px] "
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
            Real-Time <br /> Proctoring 
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
            Eyes on Screen. Always On Guard.
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
            Secure online meetings or assessments shouldn’t feel like a gamble. BerriProctor is your AI-powered watchdog for all things video - interviews, tests or meetings - you name it.
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
                  <div className="w-full h-full flex items-center justify-center">
                    <div 
                      dangerouslySetInnerHTML={{
                        __html: `<lord-icon
                          src="${solutionsData[currentIndex].lordicon}"
                          trigger="loop"
                          stroke="bold"
                          colors="primary:#00AD96,secondary:#ffffff"
                          style="width:137px;height:137px">
                        </lord-icon>`
                      }}
                    />
                  </div>
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