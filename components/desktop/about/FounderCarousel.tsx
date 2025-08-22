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
    name: "Raja Lingappaa",
    company: "CEO, AI innovator, <br/> ex-Meta & SAP, 5 AI patents."
  },
  {
    id: 2,
    image: "/image/Founder/img_2.png",
    name: "Vishnuvardhan M",
    company: "COO, serial entrepreneur, <br/> built large-scale hiring ops."
  },
  {
    id: 3,
    image: "/image/Founder/img_3.png",
    name: "Satish Jeyaraman",
    company: "CGO, ex-Cognizant HR leader, <br/> scaled hiring to 60K+ annually."
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
      <div className="text-center mb-16 relative z-20">
        {/* Main Heading */}
        <h1 
          className="tracking-tight font-medium text-white text-center mb-6"
          style={{
            fontSize: '76px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          Our
          Leaders
        </h1>

        {/* Description */}
        <div className="text-center max-w-2xl mx-auto">
          <p 
            className="leading-[1.4] font-light text-white mb-4"
            style={{
              fontSize: '36px',
              fontFamily: 'Manrope, sans-serif'
            }}
          >
            Berribot is led by a team with <br /> decades of experience in AI, recruiting, <br /> and scaling global businesses
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
      <div className="absolute z-1 pointer-events-none" style={{ top: '-300px', right: '-200px' }}>
        <Image 
          src="/image/mobile/9.png"
          alt="Background Image Top Right"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]  opacity-[50%]"
        />
      </div>

      {/* Top Left Image - Positioned below subheading */}
      <div className="absolute z-1" style={{ top: '350px', left: '0px' }}>
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
        className="absolute left-8 right-8 flex justify-between items-center z-20"
        style={{ top: 'calc(400px + 300px)' }}
      >
        <button
          onClick={prevSlide}
          className="p-4 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="p-4 rounded-full backdrop-blur-sm transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto relative z-10">

        {/* Founder Carousel Content */}
        <div className="text-center h-[600px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFounder.id}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-10"
            >
              {/* Circular Image */}
              <div className="flex justify-center">
                <div 
                  className="rounded-full overflow-hidden"
                  style={{
                    width: '300px',
                    height: '300px',
                    backgroundColor: '#D9D9D9'
                  }}
                >
                  <Image 
                    src={currentFounder.image}
                    alt={currentFounder.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Person Name */}
              <div 
                className="text-white font-medium"
                style={{ 
                  fontSize: '32px', 
                  fontFamily: 'Manrope, sans-serif' 
                }}
              >
                {currentFounder.name}
              </div>

              {/* Company Name */}
              <div 
                className="text-white/80"
                style={{ 
                  fontSize: '24px', 
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