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

// Company logos data - easily extendable
const COMPANY_LOGOS = [
  {
    id: 1,
    name: "Microsoft Teams",
    logo: "/image/company/c_logo_1.png", // Replace with actual path
  },
  {
    id: 2,
    name: "Workday",
    logo: "/image/company/c_logo_2.png", // Replace with actual path
  },
  {
    id: 3,
    name: "SAP",
    logo: "/image/company/c_logo_3.png", // Replace with actual path
  },
  {
    id: 4,
    name: "SuccessFactors",
    logo: "/image/company/c_logo_4.png", // Replace with actual path
  },
  {
    id: 5,
    name: "Additional Company",
    logo: "/image/company/c_logo_5.png", // Replace with actual path
  },
  {
    id: 6,
    name: "Another Company",
    logo: "/image/company/c_logo_6.png", // Replace with actual path
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
    <section ref={ref} className="relative py-16 sm:py-20 bg-black text-white overflow-hidden">
      {/* Background pattern from CompanyTestimonialSection */}
      <div className="absolute inset-0">
        {/* You can add any background pattern here similar to CompanyTestimonialSection */}
        <div className="absolute inset-0 bg-black opacity-95" />
      </div>

      <div className="relative z-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium text-[#252527] bg-clip-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#04BBA6]">Plug into</span>{" "}
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

      {/* Blue ribbon with marquee - Full width */}
      <motion.div
        className="w-full bg-[#04BBA6] py-8 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
            {/* Marquee container */}
            <div className="flex items-center justify-center relative overflow-hidden">
              {/* First set of logos */}
              <motion.div
                className="flex items-center space-x-16 shrink-0"
                animate={{
                  x: [0, -100 * COMPANY_LOGOS.length],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {COMPANY_LOGOS.map((company) => (
                  <div
                    key={`first-${company.id}`}
                    className="flex items-center justify-center min-w-[200px] h-16"
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={150}
                      height={60}
                      className="max-w-[150px] max-h-12 object-contain filter brightness-0 invert"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Second set of logos (for seamless loop) */}
              <motion.div
                className="flex items-center space-x-16 shrink-0"
                animate={{
                  x: [0, -100 * COMPANY_LOGOS.length],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {COMPANY_LOGOS.map((company) => (
                  <div
                    key={`second-${company.id}`}
                    className="flex items-center justify-center min-w-[200px] h-16"
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={150}
                      height={60}
                      className="max-w-[150px] max-h-12 object-contain filter brightness-0 invert"
                    />
                  </div>
                ))}
              </motion.div>

              {/* "& many more" text at the end */}
              <motion.div
                className="flex items-center justify-center min-w-[300px] h-16"
                animate={{
                  x: [0, -100 * COMPANY_LOGOS.length],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                <span className="text-black text-2xl font-inter font-light">
                  & many more.
                </span>
              </motion.div>
            </div>
          </motion.div>
    </section>
  );
} 