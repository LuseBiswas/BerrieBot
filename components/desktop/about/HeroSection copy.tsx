"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform, useScroll } from "framer-motion";

export default function MobileAboutHeroSection() {
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

  /* ---------- Animated Text Component with <br/> Support ---------- */
  function AnimatedTextWithBreaks({ 
    text, 
    scrollProgress,
    className = "",
    style = {}
  }: { 
    text: string; 
    scrollProgress: MotionValue<number>;
    className?: string;
    style?: React.CSSProperties;
  }) {
    // Split by <br/> to handle line breaks
    const lines = text.split('<br/>');
    
    return (
      <div className={className} style={style}>
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
  const sectionClassName = "relative mt-50 flex flex-col items-center justify-center px-4 bg-transparent mb-20";

  return (
    <section 
      ref={ref}
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: '5rem' }}
    >
      {/* Logo */}
      <div className="mb-16 relative z-10 w-[98px] h-[97px] flex items-center justify-center mx-auto">
        {/* Ripple circles */}
        <motion.div
          className="absolute w-16 h-16 border border-[#00AD96]/40 rounded-full pointer-events-none"
          animate={{ 
            scale: [1, 2, 3.5], 
            opacity: [0.8, 0.4, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeOut",
            repeatDelay: 0.5
          }}
        />
        <motion.div
          className="absolute w-16 h-16 border border-[#00AD96]/40 rounded-full pointer-events-none"
          animate={{ 
            scale: [1, 2, 3.5], 
            opacity: [0.8, 0.4, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeOut", 
            delay: 1,
            repeatDelay: 0.5
          }}
        />
        <motion.div
          className="absolute w-16 h-16 border border-[#00AD96]/30 rounded-full pointer-events-none"
          animate={{ 
            scale: [1, 2, 3.5], 
            opacity: [0.6, 0.3, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeOut", 
            delay: 2,
            repeatDelay: 0.5
          }}
        />
        
        <Image
          src="/image/logo.png"
          alt="BerriBot Logo"
          width={98}
          height={97}
          className="object-contain relative z-10"
          style={{
            width: '98px',
            height: '97px'
          }}
        />
      </div>

      {/* "Get Started" pill */}
      <div className="mb-8 relative z-10">
      <div className="bg-[#028374] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          We are BerriBot
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-[64px]  md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.5px] sm:text-6xl text-center relative z-10 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <h1 
          className="tracking-tight mb-6 font-medium text-white"
          style={{
            fontSize: '76px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          We build digital agents
          <br />
           that let recruiters
          <br />
           do their best work 
        </h1>
      </div>

      {/* Description */}
      <div className="text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-[280px] text-center sm:max-w-3xl mx-auto relative z-10" style={{ fontFamily: 'Manrope, sans-serif' }}>
        {isMounted && (
          <AnimatedTextWithBreaks 
            text="From automating candidate outreach to running unbiased interviews;<br/>From real-time fraud detection to intelligent matching;<br/>Berribot integrates seamlessly into your hiring process. We make it faster, fairer, and more efficient."
            scrollProgress={scrollYProgress}
            className="leading-[1.4] font-light mx-auto"
            
          />
        )}
      </div>
    </section>
  );
} 