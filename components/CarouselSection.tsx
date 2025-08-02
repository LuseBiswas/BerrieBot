'use client';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { Clock, Plus } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "INTERVIEW & VERIFY",
    image: "/image/prodcut/ProductImagery_1.png"
  },
  {
    id: 2,
    title: "INTERVIEW & VERIFY",
    description: "Automated interviews with human-like interactions",
    image: "/image/prodcut/ProductImagery_1.png"
  },
  {
    id: 3,
    title: "HIRE & ONBOARD",
    description: "Streamlined hiring process with smart onboarding",
    image: "/image/prodcut/ProductImagery_1.png"
  },
  {
    id: 4,
    title: "HIRE & ONBOARD",
    description: "Streamlined hiring process with smart onboarding",
    image: "/image/prodcut/ProductImagery_1.png"
  }
];

const SLIDE_DURATION = 5000; // 5 seconds

export default function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentSlide(prevSlide => (prevSlide - 1 + SLIDES.length) % SLIDES.length);
          return 0;
        }
        return prev + 2; // Increment by 2% every 100ms for smooth animation
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center ">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />
      
      <motion.div 
        className="relative z-10 w-full text-center bg-[#101010] rounded-3xl p-12"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Grid pattern with + signs at grid intersections */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-white/20 opacity-[5%]" />
            ))}
          </div>
          
          {/* + signs at every grid intersection */}
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 13 }, (_, row) => 
              Array.from({ length: 13 }, (_, col) => (
                <div 
                  key={`${row}-${col}`}
                  className="absolute text-white/20 opacity-[10%]"
                  style={{
                    top: `${row * (100/12)}%`,
                    left: `${col * (100/12)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Plus className="w-9 h-9" />
                </div>
              ))
            )}
          </div>
        </div>
        
                  {/* Headline */}
          <div className="space-y-4 mb-12">
            <h2 className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px]">
              <span className="text-teal-400">The Agentic Hiring</span>
              <br />
              <span className="text-teal-400">Stack {""}</span>
              <span className="bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">that Does the <br /></span>
              <span className="bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">Work for You</span>
            </h2>
            <p className="text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto mb-8">
              From outreach to offer, the Berri Suite delivers speed, <br /> accuracy, and security—on autopilot.
            </p>
          </div>

        {/* Slide indicators - centered */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {SLIDES.map((slide, index) => (
            <div key={slide.id} className="relative">
              {index === currentSlide ? (
                // Active slide - wider box with teal background
                <motion.div
                  layout
                  className="w-[434px] h-[87px] border-2 border-[#04BBA6] rounded-lg cursor-pointer relative overflow-hidden bg-[#181818]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(index);
                    setProgress(0);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Teal fill animation - fills from left to right */}
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 bg-[#04BBA6]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                  
                  <div className="flex items-center justify-center h-full relative z-10">
                    <span className="font-medium font-inter text-base text-white">
                      {slide.title}
                    </span>
                  </div>
                </motion.div>
              ) : (
                // Inactive slide - square box with icon
                <motion.div
                  layout
                  className="w-[93px] h-[87px] border-2 border-teal-400 rounded-lg cursor-pointer flex items-center justify-center bg-[#181818]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(index);
                    setProgress(0);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <img src="/image/icons/clock.png" alt="Clock" className="w-6 h-6" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Image carousel - below the boxes */}
        <div className="relative w-[1027px] h-[471px] rounded-2xl overflow-hidden mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              <img
                src={SLIDES[currentSlide].image}
                alt={SLIDES[currentSlide].title}
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay with slide info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {SLIDES[currentSlide].title}
                </h3>
                <p className="text-gray-300">
                  {SLIDES[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
} 