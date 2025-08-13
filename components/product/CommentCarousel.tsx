"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Carousel data - easily extendable
const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "BerriConnect",
    subtitle: "Automated Candidate Communication & Scheduling.",
    
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    keyHighlights: [
      "Bulk calling, WhatsApp, SMS, email follow-ups",
      "Live reminders & interview confirmations",
      "High-volume hiring, dormant ATS database activation, time-sensitive roles."
    ],
    useCase: "High-volume hiring, dormant ATS database activation, time-sensitive roles."
  },
  {
    id: 2,
    title: "BerriSearch",
    subtitle: "AI-Powered Resume Screening & Matching.",
    
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    keyHighlights: [
      "Intelligent resume parsing and analysis",
      "Job description matching algorithms",
      "Automated candidate ranking and scoring"
    ],
    useCase: "Large-scale recruitment with thousands of applications requiring efficient screening."
  },
  {
    id: 3,
    title: "BerriMastermind",
    subtitle: "Intelligent Interview Automation Platform.",
    
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    keyHighlights: [
      "24/7 automated interview scheduling",
      "Technical and behavioral assessment",
      "Real-time candidate evaluation and scoring"
    ],
    useCase: "Technical hiring at scale with consistent evaluation criteria across all interviews."
  },
  {
    id: 4,
    title: "BerriProctor",
    subtitle: "Fraud Detection & Verification System.",
    description: "Ensure interview integrity with advanced proctoring technology that detects and prevents fraudulent activities.",
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    keyHighlights: [
      "Real-time fraud detection technology",
      "Identity verification and authentication",
      "Comprehensive interview monitoring"
    ],
    useCase: "Remote hiring with enhanced security and integrity verification requirements."
  },
  {
    id: 5,
    title: "Berri360",
    subtitle: "Comprehensive Recruitment Management Suite.",
    description: "Complete end-to-end recruitment solution that integrates all Berri products for seamless hiring workflow.",
    image: "/image/prodcut/ProductImagery_1.png", // Update with actual image path
    keyHighlights: [
      "Unified dashboard for all recruitment activities",
      "Advanced analytics and reporting",
      "Complete hiring workflow automation"
    ],
    useCase: "Enterprise-scale recruitment requiring comprehensive management and oversight across all hiring stages."
  },
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

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white text-black">
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl font-inter font-light leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-600 ">One Platform.</span>
            <br />
            <span className="text-[#04BBA6]">Four Powerful Products.</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="font-inter text-[20px] sm:text-2xl md:text-[32px] leading-[1.4] sm:leading-[1.5] font-light text-[#969696] max-w-5xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            The Berri Suite automates the entire hiring lifecycle - so your
            <br />
            teams focus on decisions, not logistics.
          </motion.p>

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

                {/* Main Content Layout - Image Left, Content Right */}
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  {/* Left Side - Image */}
                  <div className="lg:w-[526px] flex-shrink-0">
                    <Image
                      src={CAROUSEL_SLIDES[activeSlide].image}
                      alt={CAROUSEL_SLIDES[activeSlide].title}
                      width={526}
                      height={669}
                      className="w-full h-[669px] object-cover rounded-lg"
                    />
                  </div>

                  {/* Right Side - Key Highlights and Use Case */}
                  <div className="flex-1 text-left flex flex-col justify-between min-h-[669px]">
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
                    <div className="mt-auto">
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