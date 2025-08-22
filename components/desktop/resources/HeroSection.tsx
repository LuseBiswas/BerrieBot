"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, MotionValue, useTransform, useScroll } from "framer-motion";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
      ["#969696", "#3d3d3d"]
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

  /* ---------- Animated Text Component with <br/> Support ---------- */
  function AnimatedTextWithBreaks({ 
    text, 
    scrollProgress,
    className = ""
  }: { 
    text: string; 
    scrollProgress: MotionValue<number>;
    className?: string;
  }) {
    // Split by <br/> to handle line breaks
    const lines = text.split('<br/>');
    
    return (
      <div className={className}>
        {lines.map((line, lineIndex) => {
          const words = line.trim().split(' ').filter(word => word.length > 0);
          
          return (
            <span key={lineIndex}>
              {words.map((word, wordIndex) => (
                <AnimatedWord
                  key={`${lineIndex}-${wordIndex}`}
                  word={word}
                  wordIndex={wordIndex}
                  scrollProgress={scrollProgress}
                  lineIndex={lineIndex}
                />
              ))}
              {lineIndex < lines.length - 1 && <br />}
            </span>
          );
        })}
      </div>
    );
  }

  // Force consistent className after hydration
  const sectionClassName = "relative mt-36 flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent";

  return (
    <section 
      ref={ref}
      id="faq"
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: '9rem' }}
    >
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#028374] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          Resources
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-6">
        <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium text-[#252527] bg-clip-text" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Learn. Explore.
          <br />
          Get Smarter.
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-4xl mx-auto relative z-10">
        {isMounted && (
          <AnimatedTextWithBreaks 
            text="Welcome to your go-to hub for all things Berribot and beyond. <br/>Whether you're curious about AI, exploring automation strategies, <br/>or just want to see how others are scaling smarter —not harder <br/>—you're in the right place."
            scrollProgress={scrollYProgress}
            className="font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-5xl mx-auto"
          />
        )}
      </div>
    </section>
  );
}
