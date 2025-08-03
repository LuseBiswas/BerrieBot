'use client';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';

// Custom component to display animated numbers
function AnimatedNumber({ targetValue, format, showActual, dynamicFormat }: { 
  targetValue: number, 
  format: (num: number) => string, 
  showActual: boolean,
  dynamicFormat?: (num: number, showActual: boolean) => string 
}) {
  const [randomValue, setRandomValue] = React.useState(0);
  const [displayValue, setDisplayValue] = React.useState(0);

  // Generate random numbers when not showing actual
  useEffect(() => {
    if (!showActual) {
      const interval = setInterval(() => {
        const random = Math.floor(Math.random() * targetValue * 1.5);
        setRandomValue(random);
      }, 200); // Slower updates for smoother effect
      
      return () => clearInterval(interval);
    }
  }, [showActual, targetValue]);

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
  }, [showActual ? targetValue : randomValue, showActual]);

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
      {dynamicFormat ? dynamicFormat(displayValue, showActual) : format(displayValue)}
    </motion.span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // State to control showing actual values (like APPLY/OFFER in HeroSection)
  const [showActualValues, setShowActualValues] = React.useState(false);
  const [currentScrollProgress, setCurrentScrollProgress] = React.useState(0);

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Switch to actual values at specific scroll percentage (like HeroSection)
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      setCurrentScrollProgress(v); // Update progress display
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
              <h2 className="text-[60px] font-inter font-light leading-tight mb-8">
                <span className="bg-gradient-to-b from-white to-[#252527] text-transparent bg-clip-text">Recruiters Are</span>
                <br />
                <span className="text-[#04BBA6]">Turbocharged</span>
                <span className="bg-gradient-to-b from-white to-[#252527] text-transparent bg-clip-text"> by</span>
                <br />
                <span className="bg-gradient-to-b from-white to-[#252527] text-transparent bg-clip-text">Berribot</span>
              </h2>
              
              <p className="text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90  sm:max-w-3xl  max-w-lg">
                From Wipro to Cognizant, Berribot helps companies save millions in recruiter hours and cut hiring time in half.
              </p>
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
                      dynamicFormat={(num, showActual) => {
                        if (showActual) {
                          return `${Math.round(num)}x↑`;
                        } else {
                          // Random letters but keep ↑ static
                          const letters = ['x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
                          const randomLetter = letters[Math.floor(Math.random() * letters.length)];
                          return `${Math.round(num)}${randomLetter}↑`;
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
                      dynamicFormat={(num, showActual) => {
                        if (showActual) {
                          return `$${Math.round(num)}M+`;
                        } else {
                          // Random units but keep $ and + static
                          const units = ['M', 'K', 'B', 'T', 'G', 'P', 'Z', 'E', 'Y', 'X', 'W'];
                          const randomUnit = units[Math.floor(Math.random() * units.length)];
                          return `$${Math.round(num)}${randomUnit}+`;
                        }
                      }}
                    />
                  </div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    In ROI reported<br />by Cognizant
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