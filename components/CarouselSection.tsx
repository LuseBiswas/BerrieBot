'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    title: "SEARCH & MATCH",
    description: "AI-powered candidate matching and screening",
    image: "/image/screenshot_1.png"
  },
  {
    id: 2,
    title: "INTERVIEW & VERIFY",
    description: "Automated interviews with human-like interactions",
    image: "/image/screenshot_2.png"
  },
  {
    id: 3,
    title: "HIRE & ONBOARD",
    description: "Streamlined hiring process with smart onboarding",
    image: "/image/screenshot_3.png"
  }
];

const SLIDE_DURATION = 5000; // 5 seconds

export default function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentSlide(prevSlide => (prevSlide + 1) % SLIDES.length);
          return 0;
        }
        return prev + 2; // Increment by 2% every 100ms for smooth animation
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        
                  {/* Headline */}
          <div className="space-y-4 mb-12">
            <h2 className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl font-inter font-medium leading-24">
              <span className="text-teal-400">The Agentic Hiring</span>
              <br />
              <span className="text-teal-400">Stack {""}</span>
              <span className="bg-gradient-to-r from-white to-gray-950 text-transparent bg-clip-text">that Does the <br /></span>
              <span className="bg-gradient-to-r from-white to-gray-950 text-transparent bg-clip-text">Work for You</span>
            </h2>
            <p className="text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto mb-8">
              From outreach to offer, the Berri Suite delivers speed, <br /> accuracy, and security—on autopilot.
            </p>
          </div>

        {/* Slide indicators - centered */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {SLIDES.map((slide, index) => (
            <div key={slide.id} className="relative">
              <motion.div
                className={`px-6 py-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  index === currentSlide 
                    ? 'border-teal-400 bg-teal-400/10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(index);
                  setProgress(0);
                }}
              >
                <span className={`font-semibold text-sm ${
                  index === currentSlide ? 'text-teal-400' : 'text-gray-400'
                }`}>
                  {slide.title}
                </span>
                
                {/* Progress fill animation */}
                {index === currentSlide && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-teal-400 rounded-b-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Image carousel - below the boxes */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={SLIDES[currentSlide].image}
                alt={SLIDES[currentSlide].title}
                className="w-full h-full object-cover"
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
      </div>
    </section>
  );
} 