"use client";
import { motion, useInView, useScroll } from "framer-motion";
import React, { useRef, useEffect } from "react";

/* ---------- Custom Hook for Word Animation ---------- */
// Commented out unused function to avoid ESLint warning
// function useWordAnimation(scrollProgress: MotionValue<number>, wordIndex: number, lineIndex: number) {
//   const lineDelay = lineIndex * 0.25; // Increased delay between lines
//   const wordDelay = wordIndex * 0.015; // Increased delay between words
//   const startPoint = 0.3 + lineDelay + wordDelay; // Later start point
//   const endPoint = startPoint + 0.08; // Longer animation duration
//
//   const wordProgress = useTransform(
//     scrollProgress,
//     [startPoint, endPoint],
//     [0, 1]
//   );
//
//   const colorTransform = useTransform(
//     wordProgress,
//     [0, 1],
//     ["#6B7280", "#FFFFFF"]
//   );
//
//   return { wordProgress, colorTransform };
// }

// Custom component to display animated numbers
function AnimatedNumber({
  targetValue,
  format,
  showActual,
  dynamicFormat,
}: {
  targetValue: number;
  format: (num: number) => string;
  showActual: boolean;
  dynamicFormat?: (
    num: number,
    showActual: boolean,
    isMounted?: boolean
  ) => string;
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

      const currentVal = startVal + diff * easeOut;
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
      key={showActual ? "actual" : "random"}
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{
        scale: 1,
        opacity: 1,
        color: showActual ? "#007E79CF" : "#007E79AA", // Slightly different opacity for random vs actual
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${
        showActual ? "drop-shadow-lg" : ""
      } transition-all duration-300`}
      style={{
        textShadow: showActual ? "0 0 20px rgba(4, 187, 166, 0.3)" : "none",
      }}
    >
      {getSafeDisplayValue()}
    </motion.span>
  );
}

export default function MobileAboutStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // State to control showing actual values (like APPLY/OFFER in HeroSection)
  const [showActualValues, setShowActualValues] = React.useState(false);

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Switch to actual values at specific scroll percentage (like HeroSection)
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      if (v >= 0.5)
        setShowActualValues(true); // Show actual values at 50% scroll
      else if (v <= 0.4) setShowActualValues(false); // Show random numbers below 40% scroll
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center pt-10 pb-20  px-4 overflow-visible bg-white "
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />

      {/* Background Images */}
      {/* Top Left - 7.png */}
      {/* <div className="absolute z-1 pointer-events-none overflow-hidden" style={{ top: '0px', left: '-200px', height: '250px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image Top Left"
          width={377}
          height={336}
          className="w-[377.31px] h-[336px] opacity-[70%]"
          style={{ marginTop: '-120px' }}
        />
      </div>
      
      {/* Top Right - 8.png */}
      {/* <div className="absolute z-1 pointer-events-none" style={{ top: '-00px', right: '-200px' }}>
        <Image 
          src="/image/mobile/8.png"
          alt="Background Image Top Right"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px] "
        /> 
      </div> */}

      {/* Bottom Right - 8.png behind stats container */}
      {/* <div className="absolute z-5 pointer-events-none" style={{ bottom: '-211px', right: '-150px' }}>
        <Image 
          src="/image/mobile/8.png"
          alt="Background Image Bottom Right"
          width={544}
          height={462}
          className="w-[543.6px] h-[562px]"
        />
      </div>
       */}
      {/* Grid pattern with + signs at grid intersections - section level */}

      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Stacked Layout for Mobile */}
        <div className="flex flex-col items-center text-center space-y-8">
          {/* "Get Started" pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#028374] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
              Solutions
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center max-w-2xl mx-auto">
              <p
                className="leading-[1.4] font-light text-black mb-4"
                style={{
                  fontSize: "26px",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                We solve these challenges with a <br />
                complete Agentic platform that <br />
                automates the transactional, protects <br />
                the integrity of the process, and gives <br />
                recruiters more time to make high- <br />
                value decisions.
              </p>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h1
              className="tracking-tight font-medium text-black text-center"
              style={{
                fontSize: "76px",
                fontFamily: "Manrope, sans-serif",
                lineHeight: "1.2",
              }}
            >
              We’ve already
              <br />
              delivered measurable
              <br />
              results with;
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center max-w-2xl mx-auto">
              <p
                className="leading-[1.4] font-light text-black mb-4"
                style={{
                  fontSize: "26px",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Top Tier Technology firms
              </p>
            </div>
          </motion.div>

          {/* Stats Container - Bottom */}
          <motion.div
            className="bg-white rounded-2xl flex items-center justify-center"
            style={{
              boxShadow: "10px 20px 60px 2px rgba(4, 187, 166, 0.3)",
              width: "666px",
              height: "533px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Stats grid - 2x2 for mobile */}
            <div className="grid grid-cols-2 gap-12 p-2">
              {/* Stat 1 */}
              <div className="text-center">
                <div
                  className="text-[64px] font-light text-[#007E79CF] mb-2 leading-none"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <AnimatedNumber
                    targetValue={50}
                    format={(num) => Math.round(num).toLocaleString("en-US")}
                    showActual={showActualValues}
                  />
                  %
                </div>
                <div
                  className="text-[22px] font-extralight text-[#060606] leading-tight"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Reduction in
                  <br />
                  time-to-hire
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div
                  className="text-[64px] font-light text-[#007E79CF] mb-2 leading-none"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <AnimatedNumber
                    targetValue={78}
                    format={(num) => `${Math.round(num)}%`}
                    showActual={showActualValues}
                  />
                </div>
                <div
                  className="text-[22px] font-extralight text-[#060606] leading-tight"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  savings in
                  <br />
                  recruiter & panel <br /> hours
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div
                  className="text-[64px] font-light text-[#007E79CF] mb-2 leading-none flex items-center justify-center"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <AnimatedNumber
                    targetValue={2}
                    format={(num) => `${Math.round(num)}x↑`}
                    showActual={showActualValues}
                    dynamicFormat={(num, showActual, isMounted) => {
                      if (showActual) {
                        return `${Math.round(num)}x↑`;
                      } else if (isMounted) {
                        // Random letters but keep ↑ static (only after mount)
                        const letters = [
                          "x",
                          "y",
                          "z",
                          "a",
                          "b",
                          "c",
                          "d",
                          "e",
                          "f",
                          "g",
                          "h",
                        ];
                        const randomLetter =
                          letters[Math.floor(Math.random() * letters.length)];
                        return `${Math.round(num)}${randomLetter}↑`;
                      } else {
                        // Consistent fallback for SSR
                        return `${Math.round(num)}x↑`;
                      }
                    }}
                  />
                </div>
                <div
                  className="text-[22px] font-extralight text-[#060606] leading-tight"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  show-up rates
                </div>
              </div>

              {/* Stat 4 */}
              <div className="text-center">
                <div
                  className="text-[64px] font-light text-[#007E79CF] mb-2 leading-none"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <AnimatedNumber
                    targetValue={47}
                    format={(num) => (num / 10).toFixed(1)}
                    showActual={showActualValues}
                  />
                  /5
                </div>
                <div
                  className="text-[22px] font-extralight text-[#060606] leading-tight"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  candidate
                  <br />
                  satisfaction <br /> scores
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
