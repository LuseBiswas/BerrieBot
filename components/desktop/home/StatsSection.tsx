'use client';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';

/* ---------- Custom Hook for Word Animation ---------- */
function useWordAnimation(scrollProgress: MotionValue<number>, wordIndex: number, lineIndex: number) {
  const lineDelay = lineIndex * 0.25; // Increased delay between lines
  const wordDelay = wordIndex * 0.015; // Increased delay between words
  const startPoint = 0.3 + lineDelay + wordDelay; // Later start point
  const endPoint = startPoint + 0.08; // Longer animation duration
  
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

// Custom component to display animated numbers
function AnimatedNumber({ targetValue, format, showActual, dynamicFormat }: { 
  targetValue: number, 
  format: (num: number) => string, 
  showActual: boolean,
  dynamicFormat?: (num: number, showActual: boolean, isMounted?: boolean) => string 
}) {
  const [randomValue, setRandomValue] = React.useState(0);
  const [displayValue, setDisplayValue] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);

  // Set mounted flag after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate random numbers when not showing actual (only after mount)
  useEffect(() => {
    if (!showActual && isMounted) {
      const interval = setInterval(() => {
        const random = Math.floor(Math.random() * targetValue * 1.5);
        setRandomValue(random);
      }, 200); // Slower updates for smoother effect
      
      return () => clearInterval(interval);
    }
  }, [showActual, targetValue, isMounted]);

  // Smooth animation to current target value
  useEffect(() => {
    const targetVal = showActual ? targetValue : randomValue;
    const startVal = displayValue;
    const diff = targetVal - startVal;
    const duration = showActual ? 800 : 300; // Slower for actual values, faster for random
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentVal = startVal + (diff * easeOut);
      setDisplayValue(Math.round(currentVal));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [showActual, targetValue, randomValue, displayValue]);

  // Safe format function that doesn't use random during SSR
  const getSafeDisplayValue = () => {
    if (!isMounted) {
      // Show consistent value during SSR/hydration
      return format(0);
    }
    
    if (dynamicFormat) {
      // Pass isMounted flag to dynamicFormat to control random behavior
      return dynamicFormat(displayValue, showActual, isMounted);
    }
    
    return format(displayValue);
  };

  return (
    <motion.span
      key={showActual ? 'actual' : 'random'}
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        color: showActual ? "#007E79CF" : "#007E79AA" // Slightly different opacity for random vs actual
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${showActual ? 'drop-shadow-lg' : ''} transition-all duration-300`}
      style={{
        textShadow: showActual ? '0 0 20px rgba(4, 187, 166, 0.3)' : 'none'
      }}
    >
      {getSafeDisplayValue()}
    </motion.span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // State to control showing actual values (like APPLY/OFFER in HeroSection)
  const [showActualValues, setShowActualValues] = React.useState(false);

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Switch to actual values at specific scroll percentage (like HeroSection)
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      if (v >= 0.5) setShowActualValues(true);      // Show actual values at 50% scroll
      else if (v <= 0.4) setShowActualValues(false); // Show random numbers below 40% scroll
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Transform scroll progress for animations - using more performant ranges
  const leftTextX = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [-100, 0, 0, -100]);
  const rightCardX = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [100, 0, 0, 100]);
  const cardScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.95, 1, 1, 0.95]);

  return (
    <section ref={ref} className="relative  flex items-center justify-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />
      
      <motion.div 
        className="relative z-10 w-full bg-[#101010] rounded-3xl p-12"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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

        <div className="flex items-center justify-center gap-16 min-h-[600px]">
          

          {/* Left side - Text content */}
          <motion.div 
            className="flex-1 max-w-2xl"
            style={{ 
              x: leftTextX,
              willChange: 'transform'
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="font-inter text-[64px] md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.5px] sm:text-6xl mb-8 font-medium text-[#252527] bg-clip-text leading-28" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <span className="text-white bg-clip-text">Recruiters are</span>
                <br />
                <span className="text-white">turbocharged</span>
              <br />
                <span className="text-white bg-clip-text"> by Berribot</span>
              </h2>
              
              <div className="font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-5xl mx-auto">
                <AnimatedText 
                  text="Berribot helps companies save countless recruiter hours and cut hiring time in half."
                  scrollProgress={scrollYProgress}
                  lineIndex={0}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Stats card */}
          <motion.div 
            className="flex-shrink-0"
            style={{ 
              x: rightCardX,
              willChange: 'transform'
            }}
          >
            <motion.div
              className="bg-white rounded-3xl p-12"
              style={{ 
                width: '666px', 
                height: '533px',
                boxShadow: '10px 20px 60px 2px rgba(4, 187, 166, 0.3)',
                scale: cardScale,
                willChange: 'transform'
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-12 h-full">
                {/* Stat 1 */}
                <div className="text-center flex flex-col justify-center">
                  <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">
                    <AnimatedNumber 
                      targetValue={48283}
                      format={(num) => Math.round(num).toLocaleString('en-US')}
                      showActual={showActualValues}
                    />
                  </div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    Recruiter<br />hours saved
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="text-center flex flex-col justify-center">
                  <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">
                    <AnimatedNumber 
                      targetValue={78}
                      format={(num) => `${Math.round(num)}%`}
                      showActual={showActualValues}
                    />
                  </div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    Reduction in<br />Cost-per-Hire
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="text-center flex flex-col justify-center">
                  <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none flex items-center justify-center">
                    <AnimatedNumber 
                      targetValue={2}
                      format={(num) => `${Math.round(num)}x↑`}
                      showActual={showActualValues}
                      dynamicFormat={(num, showActual, isMounted) => {
                        if (showActual) {
                          return `${Math.round(num)}x↑`;
                        } else if (isMounted) {
                          // Random letters but keep ↑ static (only after mount)
                          const letters = ['x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
                          const randomLetter = letters[Math.floor(Math.random() * letters.length)];
                          return `${Math.round(num)}${randomLetter}↑`;
                        } else {
                          // Consistent fallback for SSR
                          return `${Math.round(num)}x↑`;
                        }
                      }}
                    />
                  </div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    show-up rates
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="text-center flex flex-col justify-center">
                  <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">
                    <AnimatedNumber 
                      targetValue={3}
                      format={(num) => `$${Math.round(num)}M+`}
                      showActual={showActualValues}
                      dynamicFormat={(num, showActual, isMounted) => {
                        if (showActual) {
                          return `$${Math.round(num)}M+`;
                        } else if (isMounted) {
                          // Random units but keep $ and + static (only after mount)
                          const units = ['M', 'K', 'B', 'T', 'G', 'P', 'Z', 'E', 'Y', 'X', 'W'];
                          const randomUnit = units[Math.floor(Math.random() * units.length)];
                          return `$${Math.round(num)}${randomUnit}+`;
                        } else {
                          // Consistent fallback for SSR
                          return `$${Math.round(num)}M+`;
                        }
                      }}
                    />
                  </div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    In ROI reported<br />by Fortune 200 client
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 