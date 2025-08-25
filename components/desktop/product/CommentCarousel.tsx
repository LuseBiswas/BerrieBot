"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { useSearchParams } from "next/navigation";

/* ---------- Custom Hook for Word Animation ---------- */
function useWordAnimation(scrollProgress: MotionValue<number>, wordIndex: number, lineIndex: number) {
  const lineDelay = lineIndex * 0.15; // Delay between lines
  const wordDelay = wordIndex * 0.02; // Delay between words
  const startPoint = 0.1 + lineDelay + wordDelay; // Much earlier start point
  const endPoint = startPoint + 0.1; // Animation duration
  
  const wordProgress = useTransform(
    scrollProgress,
    [startPoint, endPoint],
    [0, 1]
  );
  
  const colorTransform = useTransform(
    wordProgress,
    [0, 1],
    ["#6B7280", "#000000"] // grey to black instead of white
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

// Carousel data - easily extendable
const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Berri Search & Match",
    subtitle: "AI-Powered Resume Screening & Matching.",
    
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    lordicons: [
      "https://cdn.lordicon.com/ypagsvdy.json", // Box 1
      "https://cdn.lordicon.com/hcsnfpqp.json", // Box 2
      "https://cdn.lordicon.com/gnxqymui.json"  // Box 3
    ],
    keyHighlights: [
      "Intelligent resume parsing and analysis",
      "Job description matching algorithms",
      "Automated candidate ranking and scoring"
    ],
    useCase: "Large-scale recruitment with thousands of applications requiring efficient screening."
  },
  {
    id: 2,
    title: "Berri Connect",
    subtitle: "Automated Candidate Communication & Scheduling.",
    
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    lordicons: [
      "https://cdn.lordicon.com/vpbspaec.json", // Box 1
      "https://cdn.lordicon.com/odpyouay.json", // Box 2
      "https://cdn.lordicon.com/sylzqxek.json"  // Box 3
    ],
    keyHighlights: [
      "Bulk calling, WhatsApp, SMS, email follow-ups",
      "Live reminders & interview confirmations",
      "High-volume hiring, dormant ATS database activation, time-sensitive roles."
    ],
    useCase: "High-volume hiring, dormant ATS database activation, time-sensitive roles."
  },
  {
    id: 3,
    title: "Berri Mastermind",
    subtitle: "Intelligent Interview Automation Platform.",
    
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    lordicons: [
      "https://cdn.lordicon.com/ailnzwyn.json", // Box 1
      "https://cdn.lordicon.com/idpbgtvy.json", // Box 2
      "https://cdn.lordicon.com/euflfcqp.json"  // Box 3
    ],
    keyHighlights: [
      "24/7 automated interview scheduling",
      "Technical and behavioral assessment",
      "Real-time candidate evaluation and scoring"
    ],
    useCase: "Technical hiring at scale with consistent evaluation criteria across all interviews."
  },
  {
    id: 4,
    title: "Berri Proctor",
    subtitle: "Fraud Detection & Verification System.",
    description: "Ensure interview integrity with advanced proctoring technology that detects and prevents fraudulent activities.",
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    lordicons: [
      "https://cdn.lordicon.com/gjopwtdp.json", // Box 1
      "https://cdn.lordicon.com/kdibbosx.json", // Box 2
      "https://cdn.lordicon.com/nwwurnnq.json"  // Box 3
    ],
    keyHighlights: [
      "Real-time fraud detection technology",
      "Identity verification and authentication",
      "Comprehensive interview monitoring"
    ],
    useCase: "Remote hiring with enhanced security and integrity verification requirements."
  }
];

// Product name to slide index mapping
const PRODUCT_SLIDE_MAP: { [key: string]: number } = {
  'berriconnect': 0,
  'berrisearch': 1,
  'berrimastermind': 2,
  'berriproctor': 3,
  'berri360': 4,
};

export default function CommentCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const searchParams = useSearchParams();
  const ref = useRef(null);
  
  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Handle URL parameter navigation
  useEffect(() => {
    const product = searchParams.get('product');
    if (product) {
      const slideIndex = PRODUCT_SLIDE_MAP[product.toLowerCase()];
      if (slideIndex !== undefined) {
        setActiveSlide(slideIndex);
      }
    }
  }, [searchParams]);

  // Auto-slide functionality (only if no hash is present)
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-advance if there's no hash in the URL
      if (!window.location.hash) {
        setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
      }
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} id="products" className="py-16 sm:py-20 bg-white text-black">
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="text-[64px]  md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.5px] sm:text-6xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <span className="">One Platform.</span>
            <br />
            <span className="">Four Powerful Products.</span>
          </motion.h2>

          {/* Subheading */}
          <motion.div
            className="text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-[280px] sm:max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AnimatedText 
              text="The Berri Suite automates the entire hiring lifecycle - so your"
              scrollProgress={scrollYProgress}
              lineIndex={0}
            />
            <br />
            <AnimatedText 
              text="teams focus on decisions, not logistics."
              scrollProgress={scrollYProgress}
              lineIndex={1}
            />
          </motion.div>

          {/* Carousel Indicators - Pill shaped */}
          <motion.div
            className="flex justify-center items-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {CAROUSEL_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-4 transition-all duration-300 rounded-full ${
                  activeSlide === index
                    ? "w-16 bg-[#04BBA6]"
                    : "w-4 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </motion.div>

          {/* Carousel Slide Content */}
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                className="min-h-[300px] flex flex-col"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Slide Title */}
                <h3 className="text-[34px] sm:text-[34px] lg:text-[34px] font-inter font-semibold text-black mb-4 text-center">
                  {CAROUSEL_SLIDES[activeSlide].title}
                </h3>

                {/* Slide Subtitle */}
                <h4 className="text-[24px] sm:text-[24px] font-inter font-medium text-black mb-8 text-center">
                  {CAROUSEL_SLIDES[activeSlide].subtitle}
                </h4>

                {/* Slide Description */}
                <p className="text-lg sm:text-xl font-inter font-light text-gray-600 leading-relaxed mb-12 text-center">
                  {CAROUSEL_SLIDES[activeSlide].description}
                </p>

                {/* Main Content Layout - Animated Boxes Left, Content Right */}
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  {/* Left Side - Three Animated Boxes */}
                  <div className="lg:w-[526px] flex-shrink-0 relative h-[669px]">
                    {/* Box 1 - Top Left */}
                    <motion.div
                      className="absolute bg-[#1E1E1E] rounded-[20px] flex items-center justify-center"
                      style={{ 
                        width: '252px', 
                        height: '167.8px',
                        top: '0px',
                        left: '20px',
                        boxShadow: '0 0 22.2px rgba(4, 187, 166, 0.3)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div 
                        dangerouslySetInnerHTML={{
                          __html: `<lord-icon
                            src="${CAROUSEL_SLIDES[activeSlide].lordicons[0]}"
                            trigger="loop"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#04BBA6"
                            style="width:144px;height:144px">
                          </lord-icon>`
                        }}
                      />
                    </motion.div>

                    {/* Box 2 - Top Right */}
                    <motion.div
                      className="absolute bg-[#1E1E1E] rounded-[20px] flex items-center justify-center"
                      style={{ 
                        width: '252px', 
                        height: '167.8px',
                        top: '210px',
                        left: '230px',
                        boxShadow: '0 0 22.2px rgba(4, 187, 166, 0.3)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <div 
                        dangerouslySetInnerHTML={{
                          __html: `<lord-icon
                            src="${CAROUSEL_SLIDES[activeSlide].lordicons[1]}"
                            trigger="loop"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#04BBA6"
                            style="width:144px;height:144px">
                          </lord-icon>`
                        }}
                      />
                    </motion.div>

                    {/* Box 3 - Bottom Center */}
                    <motion.div
                      className="absolute bg-[#1E1E1E] rounded-[20px] flex items-center justify-center"
                      style={{ 
                        width: '252px', 
                        height: '167.8px',
                        top: '450px',
                        left: '137px',
                        boxShadow: '0 0 22.2px rgba(4, 187, 166, 0.3)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <div 
                        dangerouslySetInnerHTML={{
                          __html: `<lord-icon
                            src="${CAROUSEL_SLIDES[activeSlide].lordicons[2]}"
                            trigger="loop"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#04BBA6"
                            style="width:144px;height:144px">
                          </lord-icon>`
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Right Side - Key Highlights and Use Case */}
                  <div className="flex-1 text-left flex flex-col min-h-[669px] mt-20">
                    {/* Key Highlights Section */}
                    <div>
                      <h5 className="text-[34px] font-inter font-light text-black mb-6 text-left">
                        Key Highlights
                      </h5>
                      <div className="space-y-6">
                        {CAROUSEL_SLIDES[activeSlide].keyHighlights.map((highlight, index) => (
                          <div key={index} className="w-full">
                            <div className="flex items-start gap-4">
                              <span className="text-[20px] font-inter font-medium text-black">
                                {index + 1}.
                              </span>
                              <p className="text-[20px] font-inter font-light text-black leading-relaxed flex-1">
                                {highlight}
                              </p>
                            </div>
                            {/* Teal divider - spans full width including bullet number */}
                            <div className="w-full h-[1px] bg-[#04BBA6] mt-4"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Use Case Section - Positioned at bottom */}
                    <div className="mt-8">
                      <h5 className="text-[34px] font-inter font-light text-black mb-6">
                        Use Case:
                      </h5>
                      <div className="w-full">
                        <p className="text-[20px] font-inter font-light text-black leading-relaxed">
                          {CAROUSEL_SLIDES[activeSlide].useCase}
                        </p>
                        {/* Teal divider */}
                        <div className="w-full h-[1px] bg-[#04BBA6] mt-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 