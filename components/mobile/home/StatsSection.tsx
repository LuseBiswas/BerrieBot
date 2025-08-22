'use client';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';

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

export default function MobileStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Screen size detection
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('large');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  
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

  // Responsive sizing - keeping exact proportions
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          containerMaxWidth: 'max-w-lg', // 512px vs mobile 384px (1.33x)
          statsContainerWidth: '432px', // 324 * 1.33 ≈ 432px
          statsContainerHeight: '413px', // 310 * 1.33 ≈ 413px
          descriptionMaxWidth: 'max-w-md', // 448px vs mobile 320px (1.4x)
          // Background image scaling
          bgImage1Width: '502px', // 377.31 * 1.33 ≈ 502px
          bgImage1Height: '447px', // 336 * 1.33 ≈ 447px
          bgImage2Width: '724px', // 543.6 * 1.33 ≈ 724px
          bgImage2Height: '615px', // 462 * 1.33 ≈ 615px
          bgImage3Height: '748px', // 562 * 1.33 ≈ 748px
        };
      case 'tablet':
        return {
          containerMaxWidth: 'max-w-md', // 448px vs mobile 384px (1.17x)
          statsContainerWidth: '379px', // 324 * 1.17 ≈ 379px
          statsContainerHeight: '363px', // 310 * 1.17 ≈ 363px
          descriptionMaxWidth: 'max-w-sm', // 384px vs mobile 320px (1.2x)
          // Background image scaling
          bgImage1Width: '441px', // 377.31 * 1.17 ≈ 441px
          bgImage1Height: '393px', // 336 * 1.17 ≈ 393px
          bgImage2Width: '636px', // 543.6 * 1.17 ≈ 636px
          bgImage2Height: '540px', // 462 * 1.17 ≈ 540px
          bgImage3Height: '658px', // 562 * 1.17 ≈ 658px
        };
      default: // mobile
        return {
          containerMaxWidth: 'max-w-sm',
          statsContainerWidth: '324px',
          statsContainerHeight: '310px',
          descriptionMaxWidth: 'max-w-xs',
          // Background image original sizes
          bgImage1Width: '377.31px',
          bgImage1Height: '336px',
          bgImage2Width: '543.6px',
          bgImage2Height: '462px',
          bgImage3Height: '562px',
        };
    }
  };

  const sizes = getResponsiveSizes();

  // Responsive text and spacing values for stats
  const getStatsSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          statNumberSize: 'text-[48px]', // 36 * 1.33 ≈ 48px
          statLabelSize: 'text-[19px]', // 14 * 1.33 ≈ 19px
          gridGap: 'gap-16', // increased gap for larger container
          gridPadding: 'p-3', // slightly more padding
        };
      case 'tablet':
        return {
          statNumberSize: 'text-[42px]', // 36 * 1.17 ≈ 42px
          statLabelSize: 'text-[16px]', // 14 * 1.17 ≈ 16px
          gridGap: 'gap-14', // increased gap for larger container
          gridPadding: 'p-2', // same as mobile
        };
      default: // mobile
        return {
          statNumberSize: 'text-[36px]',
          statLabelSize: 'text-[14px]',
          gridGap: 'gap-12',
          gridPadding: 'p-2',
        };
    }
  };

  const statsSizes = getStatsSizes();

  return (
    <section ref={ref} className="relative flex items-center justify-center py-10 px-4 overflow-visible">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />
      
      {/* Background Images */}
      {/* Top Left - 7.png */}
      <div className="absolute z-1 pointer-events-none overflow-hidden" style={{ top: '0px', left: '-200px', height: '250px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image Top Left"
          width={377}
          height={336}
          className={`w-[${sizes.bgImage1Width}] h-[${sizes.bgImage1Height}] opacity-[70%]`}
          style={{ marginTop: screenSize === 'large' ? '-160px' : screenSize === 'tablet' ? '-140px' : '-120px' }}
        />
      </div>
      
      {/* Top Right - 8.png */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '-00px', right: '-200px' }}>
        <Image 
          src="/image/mobile/8.png"
          alt="Background Image Top Right"
          width={544}
          height={462}
          className={`w-[${sizes.bgImage2Width}] h-[${sizes.bgImage2Height}]`}
        />
      </div>
      
      {/* Bottom Right - 8.png behind stats container */}
      <div className="absolute z-5 pointer-events-none" style={{ bottom: '-211px', right: '-150px' }}>
        <Image 
          src="/image/mobile/8.png"
          alt="Background Image Bottom Right"
          width={544}
          height={462}
          className={`w-[${sizes.bgImage2Width}] h-[${sizes.bgImage3Height}] opacity-[30%]`}
        />
      </div>
      
      {/* Grid pattern with + signs at grid intersections - section level */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-12">
          {Array.from({ length: 96 }, (_, i) => (
            <div key={i} className="border border-white/20 opacity-[5%]" />
          ))}
        </div>
        
        {/* + signs at every grid intersection */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 9 }, (_, row) => 
            Array.from({ length: 13 }, (_, col) => (
              <div 
                key={`${row}-${col}`}
                className="absolute text-white/20 opacity-[10%]"
                style={{
                  top: `${row * (100/8)}%`,
                  left: `${col * (100/12)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Plus className="w-4 h-4" />
              </div>
            ))
          )}
        </div>
      </div>

      <motion.div 
        className={`relative z-10 w-full ${sizes.containerMaxWidth} mx-auto`}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

        {/* Stacked Layout for Mobile */}
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Title - Top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-[48px] md:text-[56px] lg:text-[64px] tracking-[-1px] mb-4 font-medium text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <span className="text-white">Recruiters Are</span>
              <br />
              <span className="text-white">Turbocharged by</span>
              <br />
              <span className="text-white">Berribot</span>
            </h2>
          </motion.div>

          {/* Description - Middle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`text-[20px] md:text-[23px] lg:text-[26px] leading-relaxed font-light ${sizes.descriptionMaxWidth} mx-auto`} style={{ fontFamily: 'Manrope, sans-serif' }}>
              <AnimatedText 
                text="Fortune 200 or 500 Berribot helps companies save millions in recruiter hours and cut hiring time in half."
                scrollProgress={scrollYProgress}
                lineIndex={0}
              />
            </div>
          </motion.div>

          {/* Stats Container - Bottom */}
          <motion.div
            className="bg-white rounded-2xl flex items-center justify-center"
            style={{ 
              boxShadow: '10px 20px 60px 2px rgba(4, 187, 166, 0.3)',
              width: sizes.statsContainerWidth,
              height: sizes.statsContainerHeight
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Stats grid - 2x2 responsive */}
            <div className={`grid grid-cols-2 ${statsSizes.gridGap} ${statsSizes.gridPadding}`}>
              {/* Stat 1 */}
              <div className="text-center">
                <div className={`${statsSizes.statNumberSize} font-light text-[#007E79CF] mb-2 leading-none`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                  <AnimatedNumber 
                    targetValue={48283}
                    format={(num) => Math.round(num).toLocaleString('en-US')}
                    showActual={showActualValues}
                  />
                </div>
                <div className={`${statsSizes.statLabelSize} font-extralight text-[#060606] leading-tight`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Recruiter<br />hours saved
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className={`${statsSizes.statNumberSize} font-light text-[#007E79CF] mb-2 leading-none`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                  <AnimatedNumber 
                    targetValue={78}
                    format={(num) => `${Math.round(num)}%`}
                    showActual={showActualValues}
                  />
                </div>
                <div className={`${statsSizes.statLabelSize} font-extralight text-[#060606] leading-tight`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Reduction in<br />Cost-per-Hire
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div className={`${statsSizes.statNumberSize} font-light text-[#007E79CF] mb-2 leading-none flex items-center justify-center`} style={{ fontFamily: 'Manrope, sans-serif' }}>
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
                <div className={`${statsSizes.statLabelSize} font-extralight text-[#060606] leading-tight`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                  show-up rates
                </div>
              </div>

              {/* Stat 4 */}
              <div className="text-center">
                <div className={`${statsSizes.statNumberSize} font-light text-[#007E79CF] mb-2 leading-none`} style={{ fontFamily: 'Manrope, sans-serif' }}>
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
                <div className={`${statsSizes.statLabelSize} font-extralight text-[#060606] leading-tight`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                In ROI reported<br />by Fortune 200 client
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 