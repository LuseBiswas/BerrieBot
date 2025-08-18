'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// JSON data structure for testimonials
const TESTIMONIALS = [
  {
    id: 1,
    quote: "Berribot<br/>changed L1<br/>interviews<br/>forever.",
    name: "Anisha",
    company: "Global Head - Talent, Wipro"
  },
  {
    id: 2,
    quote: "Our hiring<br/>process is now<br/>10x faster<br/>with Berribot.",
    name: "Rajesh Kumar",
    company: "VP - Recruitment, TCS"
  },
  {
    id: 3,
    quote: "Quality candidates<br/>are automatically<br/>filtered and<br/>ranked perfectly.",
    name: "Sarah Chen",
    company: "Chief People Officer, Microsoft"
  },
  {
    id: 4,
    quote: "The ROI from<br/>Berribot exceeded<br/>all our initial<br/>expectations.",
    name: "David Thompson",
    company: "Director - HR, Cognizant"
  }
];

export default function MobileTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="relative bg-black py-16 px-4 overflow-hidden">
      {/* Background Images */}
      {/* Top Left - 7.png */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '-150px', left: '-150px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image Top Left"
          width={377}
          height={336}
          className="w-[377.31px] h-[336px] opacity-[70%]"
        />
      </div>
      
      {/* Top Right - 8.png */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '0px', right: '-200px' }}>
        <Image 
          src="/image/mobile/8.png"
          alt="Background Image Top Right"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]"
        />
      </div>

      {/* Top Left Image */}
      <div className="absolute top-8 left-8">
        <Image 
          src="/image/mobile/line_1.png"
          alt="Top Left Lines"
          width={248}
          height={99}
          className="w-[248px] h-[99px]"
        />
      </div>

      {/* Navigation Arrows - Centered */}
      <div className="absolute left-4 right-4 top-1/2 transform -translate-y-1/2 flex justify-between items-center z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full  backdrop-blur-sm   transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full  backdrop-blur-sm  transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-sm mx-auto relative z-10">

        {/* Testimonial Content */}
        <div className="text-center h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6"
            >
              {/* Quote */}
              <div 
                className="text-white leading-tight"
                style={{ 
                  fontSize: '48px', 
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: '300'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: currentTestimonial.quote 
                }}
              />

              {/* Person Name */}
              <div 
                className="text-white font-medium"
                style={{ 
                  fontSize: '18px', 
                  fontFamily: 'Manrope, sans-serif' 
                }}
              >
                {currentTestimonial.name}
              </div>

              {/* Company Name */}
              <div 
                className="text-white/80"
                style={{ 
                  fontSize: '14px', 
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: '300'
                }}
              >
                {currentTestimonial.company}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Right Image */}
      <div className="absolute bottom-8 right-8">
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