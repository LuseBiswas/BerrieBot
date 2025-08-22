"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform, useScroll } from "framer-motion";

export default function MobileAboutSubHeroSection() {
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
    const lineDelay = lineIndex * 0.42; // Much larger delay between lines
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
  const sectionClassName = "relative mt-20 flex flex-col items-center justify-center px-4 bg-transparent mb-20 overflow-visible";

  return (
    <section 
      ref={ref}
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: '5rem' }}
      
    >
      {/* Background Image */}
      <div className="absolute pointer-events-none" style={{ top: '-80px', left: '-230px', zIndex: 1 }}>
        <Image
          src="/image/mobile/7.png"
          alt="Background"
          width={577}
          height={536}
          className="w-[877.31px] h-[836px] opacity-[60%]"
        />
      </div>
      
      {/* Second Background Image */}
      <div className="absolute pointer-events-none" style={{ top: '-250px', right: '-230px', zIndex: -1 }}>
        <Image
          src="/image/mobile/9.png"
          alt="Background 2"
          width={377}
          height={336}
          className="w-[543px] h-[462px] "
        />
      </div>
      
      {/* Main Heading */}
      <div className="text-center text-[64px]  md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.5px] sm:text-6xl relative z-10 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <h1 
          className="tracking-tight mb-6 font-medium text-white"
          style={{
            fontSize: '76px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          Why we exist?
        </h1>
      </div>

      {/* Description */}
      <div className="text-center text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-[280px] sm:max-w-3xl mx-auto relative z-10" style={{ fontFamily: 'Manrope, sans-serif' }}>
        {isMounted && (
          <AnimatedTextWithBreaks 
            text="At Berribot, we believe the future belongs to businesses where people focus on creativity, problem-solving, and strategy while AI handles the repetitive, time-consuming work.<br/>Our mission is simple: unleash human ingenuity by giving organizations intelligent digital agents that work at scale, without compromise."
            scrollProgress={scrollYProgress}
            className="leading-[1.4] font-light mx-auto"
            
          />
        )}
      </div>
    </section>
  );
} 