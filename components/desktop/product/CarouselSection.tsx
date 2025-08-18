'use client';
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Plus } from 'lucide-react';

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

export default function CarouselSection_2() {
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

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center mt-[-40px] ">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-0" />
      
      <motion.div 
        className="relative z-10 w-full text-center bg-[#101010] rounded-3xl p-12"
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
                  className="absolute text-white opacity-[10%]"
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
              <span className="text-white font-inter font-medium">Hiring is broken</span> <br />
              <span className="text-white font-inter font-medium">we&apos;re fixing it with</span>
              <br />
              <span className="text-white font-inter font-medium">AI Agents {""}</span>
            </motion.h2>
            <motion.div 
              className="font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-[280px] sm:max-w-3xl mx-auto mb-8"
              style={{ 
                opacity: descriptionOpacity, 
                y: descriptionY,
                willChange: 'transform'
              }}
            >
              <AnimatedText 
                text="Modern hiring is slow, expensive, and riddled with inefficiencies. Your best recruiters are stuck doing repetitive tasks. Your best candidates drop off. Fraudsters sneak in."
                scrollProgress={scrollYProgress}
                lineIndex={0}
              />
            </motion.div>
          </div>

          {/* Statistics Box */}
          <motion.div 
            className="relative bg-white rounded-3xl mx-auto mb-12"
            style={{
              width: '890px',
              height: '279px',
              boxShadow: '0 20px 40px rgba(45, 212, 191, 0.15)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Bottom right glow */}
            <div 
              className="absolute bottom-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl"
              style={{ transform: 'translate(25%, 25%)' }}
            />
            
            <div className="relative flex h-full">
              {/* First Stat */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">
                  &gt;60%
                </div>
                <p className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                  of recruiter time is lost<br />
                  to repetitive tasks<br />
                </p>
              </div>
              
              {/* First Divider */}
              <div className="w-px bg-teal-400/30 mx-4" style={{ marginTop: '60px', marginBottom: '60px' }} />
              
              {/* Second Stat */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">
                  &gt;40%
                </div>
                <p className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight ">
                  interview no-<br />
                  show rates
                </p>
              </div>
              
              {/* Second Divider */}
              <div className="w-px bg-teal-400/30 mx-4" style={{ marginTop: '60px', marginBottom: '60px' }} />
              
              {/* Third Stat */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">
                  30%
                </div>
                <p className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                  of resumes are<br />
                  misrepresented
                </p>
              </div>
            </div>
          </motion.div>

          {/* Subheading with Animated Text */}
          <motion.div 
            className="font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <AnimatedText 
              text="We built Berribot to flip the script. With autonomous AI agents that handle"
              scrollProgress={scrollYProgress}
              lineIndex={1}
            />
            <br />
            <AnimatedText 
              text="communication, screening, interviews, and fraud checks, we help you hire"
              scrollProgress={scrollYProgress}
              lineIndex={2}
            />
            <br />
            <AnimatedText 
              text="faster, better - and with zero drama."
              scrollProgress={scrollYProgress}
              lineIndex={3}
            />
          </motion.div>

       
      </motion.div>
    </section>
  );
} 