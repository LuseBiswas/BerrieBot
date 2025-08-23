'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// JSON data structure for founder carousel
const FOUNDERS = [
  {
    id: 1,
    image: "/image/profile/Raja.png",
    name: "Raja Lingappaa",
    company: "Founder and CEO,<br/> AI innovator, ex-Meta & SAP, 5 AI patents, 7 books",
    link: "https://www.linkedin.com/in/rajacheers" // Add actual LinkedIn URL
  },
  {
    id: 2,
    image: "/image/profile/Vishnu.png",
    name: "Vishnuvardhan M",
    company: "Founder and COO,<br/> serial entrepreneur, built large-scale hiring ops.",
    link: "https://www.linkedin.com/in/vishnuvardhan-m-9bb6aa20a/" // Add actual LinkedIn URL
  },
  {
    id: 3,
    image: "/image/profile/Satish.png",
    name: "Satish Jeyaraman",
    company: "Cofounder and CGO,<br/> ex-Cognizant HR leader, scaled hiring to 60K+ annually.",
    link: "https://www.linkedin.com/in/satishjeyaraman" // Add actual LinkedIn URL
  }
];

export default function MobileAboutFounderCarousel() {
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

  return (
    <section className="relative bg-black py-16 px-4 overflow-hidden">
      {/* Heading and Sub-heading Section - Above all decorative elements */}
      <div className="text-center mb-12 relative z-20">
        {/* Main Heading */}
        <h1 
          className="tracking-tight font-medium text-white text-center mb-6"
          style={{
            fontSize: '48px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          Our
          <br />
          Leaders
        </h1>

        {/* Description */}
        <div className="text-center max-w-xs mx-auto">
          <p 
            className="leading-[1.4] font-light text-white mb-4"
            style={{
              fontSize: '20px',
              fontFamily: 'Manrope, sans-serif'
            }}
          >
            Berribot is led by a team <br /> with decades of experience <br /> in AI, recruiting, and scaling <br /> global businesses
          </p>
        </div>
      </div>

      {/* Bottom Left - 7.png */}
      <div className="absolute z-1 pointer-events-none" style={{ bottom: '500px', left: '-350px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image Bottom Left"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]  opacity-[40%]"
        />
      </div>
      
      {/* Top Right - 8.png */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '-100px', right: '-200px' }}>
        <Image 
          src="/image/mobile/9.png"
          alt="Background Image Top Right"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]  opacity-[50%]"
        />
      </div>

      {/* Top Left Image - Positioned below subheading */}
      <div className="absolute z-1" style={{ top: '320px', left: '0px' }}>
        <Image 
          src="/image/mobile/line_1.png"
          alt="Top Left Lines"
          width={248}
          height={99}
          className="w-[248px] h-[99px]"
        />
      </div>

      {/* Navigation Arrows - Centered between criss-cross images */}
      <div 
        className="absolute left-4 right-4 flex justify-between items-center z-20"
        style={{ top: 'calc(300px + 200px)' }}
      >
        <button
          onClick={prevSlide}
          className="p-3 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-sm mx-auto relative z-10">

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
              {/* Circular Image */}
              <div className="flex justify-center">
                <a 
                  href={currentFounder.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer"
                >
                  <div 
                    className="rounded-full overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105"
                    style={{
                      width: '185px',
                      height: '185px',
                      backgroundColor: '#D9D9D9'
                    }}
                  >
                    <Image 
                      src={currentFounder.image}
                      alt={currentFounder.name}
                      width={185}
                      height={185}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </a>
              </div>

              {/* Person Name */}
              <div 
                className="text-white font-medium"
                style={{ 
                  fontSize: '18px', 
                  fontFamily: 'Manrope, sans-serif' 
                }}
              >
                {currentFounder.name}
              </div>

              {/* Company Name */}
              <div 
                className="text-white/80"
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
          src="/image/mobile/line_2.png"
          alt="Bottom Right Lines"
          width={248}
          height={99}
          className="w-[248px] h-[99px]"
        />
      </div>
    </section>
  );
} 