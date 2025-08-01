'use client';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import React, { useRef, useEffect } from 'react';

// Custom component to display animated numbers
function AnimatedNumber({ value, format }: { value: any, format: (num: number) => string }) {
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    const unsubscribe = value.on('change', (latest: number) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [value]);

  return <>{format(displayValue)}</>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress for animations - using more performant ranges
  const leftTextX = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [-100, 0, 0, -100]);
  const rightCardX = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [100, 0, 0, 100]);
  const cardScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.95, 1, 1, 0.95]);

  // Animated counting values for stats with spring for smoother animation
  const stat1Value = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 48283]), {
    stiffness: 100,
    damping: 30
  });
  const stat2Value = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 78]), {
    stiffness: 100,
    damping: 30
  });
  const stat3Value = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 2]), {
    stiffness: 100,
    damping: 30
  });
  const stat4Value = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 3]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />
      
      <motion.div 
        className="relative z-10 w-full bg-[#101010] rounded-3xl p-12"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Optimized grid pattern with + icons using CSS and SVG */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10">
          {/* SVG pattern definition */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <pattern id="plusPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Grid lines */}
                <rect width="100" height="1" fill="#191919"/>
                <rect width="1" height="100" fill="#191919"/>
                {/* + icon at intersection */}
                <g transform="translate(50, 50)">
                  <path d="M-18 -2 L18 -2 L18 2 L-18 2 Z M-2 -18 L2 -18 L2 18 L-2 18 Z" fill="#191919"/>
                </g>
              </pattern>
            </defs>
          </svg>
          
          {/* Apply the pattern */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'url(#plusPattern)',
              willChange: 'transform'
            }}
          />
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
              
              <p className="text-[28px] text-white font-inter leading-relaxed max-w-lg">
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
                      value={stat1Value} 
                      format={(num) => Math.round(num).toLocaleString('en-US')}
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
                      value={stat2Value} 
                      format={(num) => `${Math.round(num)}%`}
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
                      value={stat3Value} 
                      format={(num) => `${Math.round(num)}x↑`}
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
                      value={stat4Value} 
                      format={(num) => `$${Math.round(num)}M+`}
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