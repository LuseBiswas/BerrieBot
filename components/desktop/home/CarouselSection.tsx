'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';

/* ---------- Custom Hook for Word Animation ---------- */
function useWordAnimation(scrollProgress: MotionValue<number>, wordIndex: number, lineIndex: number) {
  const lineDelay = lineIndex * 0.15;
  const wordDelay = wordIndex * 0.015;
  const startPoint = 0.2 + lineDelay + wordDelay;
  const endPoint = startPoint + 0.06;
  
  const wordProgress = useTransform(
    scrollProgress,
    [startPoint, endPoint],
    [0, 1]
  );
  
  const colorTransform = useTransform(
    wordProgress,
    [0, 1],
    ["#6B7280", "#FFFFFF"]
  );
  
  return { wordProgress, colorTransform };
}

/* ---------- Animated Word Component ---------- */
function AnimatedWord({ 
  word, 
  wordIndex, 
  scrollProgress, 
  lineIndex 
}: { 
  word: string; 
  wordIndex: number; 
  scrollProgress: MotionValue<number>; 
  lineIndex: number; 
}) {
  const { colorTransform } = useWordAnimation(scrollProgress, wordIndex, lineIndex);
  
  return (
    <motion.span
      style={{ color: colorTransform }}
      className="inline-block mr-1"
    >
      {word}
    </motion.span>
  );
}

/* ---------- Animated Text Component ---------- */
function AnimatedText({ 
  text, 
  scrollProgress,
  lineIndex = 0
}: { 
  text: string; 
  scrollProgress: MotionValue<number>;
  lineIndex?: number;
}) {
  const words = text.split(' ');
  
  return (
    <span>
      {words.map((word, wordIndex) => (
        <AnimatedWord
          key={wordIndex}
          word={word}
          wordIndex={wordIndex}
          scrollProgress={scrollProgress}
          lineIndex={lineIndex}
        />
      ))}
    </span>
  );
}

const SLIDES = [
  {
    id: 1,
    title: "Stop chasing.<br/> Start connecting.",
    indicatorText: "BERRI-CONNECT",
    description: "Handle high-volume outreach and follow-ups across phone, WhatsApp,SMS, and email.",
    description2: "BerriConnect does the boring bits, calls, reminders and scheduling, automatically.",
    buttonName: "Learn More",
    image: "/image/prodcut/ProductImagery_1.png"
  },
  {
    id: 2,
    title: "The shortlist that builds itself.",
    indicatorText: "BerriSearch & Match", 
    description: "BerriSearch parses your JDs and ranks the best-fit candidates instantly. BerriSearch reads between the lines, contextually matching for skills, recency, and relevance. Not just keyword hits.",
    buttonName: "Get Started", 
    image: "/image/prodcut/ProductImagery_1.png"
  },
  {
    id: 3,
    title: "Your star interviewer, on call 24/7.",
    indicatorText: "BerriMastermind",
    description: "BerriMastermind conducts adaptive, unbiased interviews anytime, scoring both technical depth and soft skills.",
    buttonName: "Explore Features",
    image: "/image/prodcut/ProductImagery_1.png"
  },
  {
    id: 4,
    title: "Protect the process integrity.",
    indicatorText: "BerriProctor: Real-Time Identity & Fraud Detection",
    description: "BerriProctor ensures every candidate is who they say they are. Deepfake detection, biometric matching, and 3D liveness checks running in the background.", 
    buttonName: "View Demo",
    image: "/image/prodcut/ProductImagery_1.png"
  }
];

export default function CarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldProgress, setShouldProgress] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Scroll-based animations for heading (entrance and outro)
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [50, 0, 0, -50]);

  // Scroll-based animations for description (entrance and outro)
  const descriptionOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const descriptionY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [30, 0, 0, -30]);

  // Progress timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && shouldProgress) {
        setProgress(prev => prev + 2);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isHovered, shouldProgress]);

  // Handle slide progression when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      console.log(`Progress reached 100, changing from slide ${currentSlide}`);
      const nextSlide = (currentSlide + 1) % SLIDES.length;
      console.log(`Next slide will be: ${nextSlide}`);
      setCurrentSlide(nextSlide);
      setProgress(0);
    }
  }, [progress, currentSlide]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center ">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />
      
      <motion.div 
        className="relative z-10 w-full text-center bg-[#101010] rounded-3xl p-12 mb-10"
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
            <motion.h2 
              className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium text-[#252527] bg-clip-text"
              style={{ 
                opacity: headingOpacity, 
                y: headingY,
                willChange: 'transform'
              }}
            >
              <span className="text-white">The Agentic Hiring</span>
              <br />
              <span className="text-white">Stack that Does the</span> <br />
              <span className="text-white bg-clip-text">Work for You</span>
            </motion.h2>
            <motion.div 
              className="font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-5xl mx-auto mb-6"
              style={{ 
                opacity: descriptionOpacity, 
                y: descriptionY,
                willChange: 'transform'
              }}
            >
              <AnimatedText 
                text="From outreach to offer, the Berri Suite delivers speed,"
                scrollProgress={scrollYProgress}
                lineIndex={0}
              />
              <br />
              <AnimatedText 
                text="accuracy, and security—on autopilot."
                scrollProgress={scrollYProgress}
                lineIndex={1}
              />
            </motion.div>
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
                    console.log(`Manual click to slide ${index}`);
                    setCurrentSlide(index);
                    setProgress(0);
                    setShouldProgress(false);
                    setTimeout(() => setShouldProgress(true), 1000); // Resume after 1 second
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Teal fill animation - fills from left to right */}
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 bg-[#028374]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                  
                  <div className="flex items-center justify-center h-full relative z-10">
                    <span className="font-medium font-inter text-base text-white">
                      {slide.indicatorText}
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
                    console.log(`Manual click to slide ${index}`);
                    setCurrentSlide(index);
                    setProgress(0);
                    setShouldProgress(false);
                    setTimeout(() => setShouldProgress(true), 1000); // Resume after 1 second
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image src="/image/icons/clock.png" alt="Clock" width={24} height={24} className="w-6 h-6" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Image carousel - below the boxes */}
        <div 
          className="relative w-[1027px] h-[443px] rounded-2xl overflow-hidden mx-auto bg-[#181818]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-full h-full flex"
            >
              {/* Left side - Title and description */}
              <div className="flex-1 flex flex-col justify-around p-4 text-left">
                {/* Debug info */}
                
                <h3 
                  className="font-inter text-[30px] font-normal text-white mb-4 leading-tight"
                  dangerouslySetInnerHTML={{ __html: SLIDES[currentSlide].title }}
                />
                {SLIDES[currentSlide].description && (
                  <p 
                    className="font-inter text-[18px] font-extralight text-gray-300 mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: SLIDES[currentSlide].description }}
                  />
                )}
                {SLIDES[currentSlide].description2 && (
                  <p 
                    className="font-inter text-[18px] font-extralight text-gray-300 mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: SLIDES[currentSlide].description2 }}
                  />
                )}
                {SLIDES[currentSlide].buttonName && (
                  <motion.button 
                    className="font-inter text-[14px] bg-white text-black px-6 py-3 rounded-[26px] w-fit transition-colors flex items-center gap-2 cursor-pointer"
                    whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {SLIDES[currentSlide].buttonName}
                  </motion.button>
                )}
              </div>
              
              {/* Right side - Image */}
              <div className="relative w-[655px] h-full">
                <Image
                  src={SLIDES[currentSlide].image}
                  alt={SLIDES[currentSlide].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
} 