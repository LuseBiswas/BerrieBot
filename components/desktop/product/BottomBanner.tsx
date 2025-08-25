"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

/* ---------- Custom Hook for Word Animation ---------- */
function useWordAnimation(scrollProgress: MotionValue<number>, wordIndex: number, lineIndex: number) {
  const lineDelay = lineIndex * 0.15; // Delay between lines
  const wordDelay = wordIndex * 0.02; // Delay between words
  const startPoint = 0.1 + lineDelay + wordDelay; // Early start point
  const endPoint = startPoint + 0.1; // Animation duration
  
  const wordProgress = useTransform(
    scrollProgress,
    [startPoint, endPoint],
    [0, 1]
  );
  
  const colorTransform = useTransform(
    wordProgress,
    [0, 1],
    ["#6B7280", "#FFFFFF"] // grey to white (since background is black)
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

// Company logos data - easily extendable with individual sizes
const COMPANY_LOGOS = [
  {
    id: 1,
    name: "SAP",
    logo: "/image/product/SAP_1.png",
    width: 150,
    height: 75,
  },
  {
    id: 2,
    name: "SuccessFactors",
    logo: "/image/product/successfactors.png",
    width: 320,
    height: 110,
  },
  {
    id: 3,
    name: "Workday",
    logo: "/image/product/workdays1.png",
    width: 165,
    height: 60,
  },
  {
    id: 4,
    name: "And Many More",
    logo: "/image/product/&manymore.png",
    width: 200,
    height: 75,
  },
];

export default function BottomBanner() {
  const ref = useRef(null);
  
  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-black text-white overflow-hidden" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Background pattern from CompanyTestimonialSection */}
      <div className="absolute inset-0">
        {/* You can add any background pattern here similar to CompanyTestimonialSection */}
        <div className="absolute inset-0 bg-black opacity-95" />
      </div>

      <div className="relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.5px] mb-8 font-normal text-[#252527] leading-[1.25]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Plug into</span>{" "}
            <span className="text-white">Your ATS.</span>
            <br />
            <span className="text-white">Scale Across Geos.</span>
          </motion.h2>

          {/* Subheading */}
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light">
              <AnimatedText 
                text="Our agents work across phone, chat, video,"
                scrollProgress={scrollYProgress}
                lineIndex={0}
              />
              <br />
              <AnimatedText 
                text="and documents - and support 36+ languages."
                scrollProgress={scrollYProgress}
                lineIndex={1}
              />
              <br />
              <AnimatedText 
                text="No matter your infra, timezone, or region"
                scrollProgress={scrollYProgress}
                lineIndex={2}
              />
              <br />
              <AnimatedText 
                text="- we've got you covered."
                scrollProgress={scrollYProgress}
                lineIndex={3}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Blue ribbon with static logos - Full width */}
      <motion.div
        className="w-full bg-[#028374] py-8 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {/* Static logos container */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-16">
            {COMPANY_LOGOS.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-center min-w-[200px] h-16"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={company.width}
                  height={company.height}
                  className="object-contain filter brightness-0 invert"
                  style={{
                    maxWidth: `${company.width}px`,
                    maxHeight: `${company.height}px`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
} 