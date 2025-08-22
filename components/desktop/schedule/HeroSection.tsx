"use client";
import { motion,MotionValue, useTransform, useScroll } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
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
  
  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent">
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          Get Started
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-12">
        <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium bg-white text-transparent bg-clip-text">
          Help is one form or one call
          <br />
          away . What&apos;s your pick? 
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-4xl mx-auto relative z-10">
        {mounted && (
          <div className="font-inter text-[36px] sm:text-2xl md:text-[36px] leading-[1.4] sm:leading-[1.5] font-light text-white max-w-5xl mx-auto">
            <AnimatedText 
              text="Got questions?"
              scrollProgress={scrollYProgress}
              lineIndex={0}
            />
            <br />
            <AnimatedText 
              text="Curious what Berribot can actually do for your team?"
              scrollProgress={scrollYProgress}
              lineIndex={1}
            />
            <br />
            <AnimatedText 
              text="You're in the right place."
              scrollProgress={scrollYProgress}
              lineIndex={2}
            />
          </div>
        )}
      </div>
    </section>
  );
}
