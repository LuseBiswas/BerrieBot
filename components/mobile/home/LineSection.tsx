"use client";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";

/* ---------- text-scramble helper ---------- */
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function TextScramble({ currentText }: { currentText: string }) {
  const [displayText, setDisplayText] = useState(currentText);
  useEffect(() => {
    if (displayText === currentText) return;
    const id = setInterval(() => {
      setDisplayText((prev) =>
        prev === currentText
          ? prev
          : prev
              .split("")
              .map((ch, i) =>
                ch === currentText[i]
                  ? ch
                  : chars[Math.floor(Math.random() * chars.length)]
              )
              .join("")
      );
    }, 50);
    return () => clearInterval(id);
  }, [currentText, displayText]);
  return (
    <div className="font-['Dogica_Pixel'] text-[18px] tracking-[1px] text-white">
      {displayText}
    </div>
  );
}

export default function MobileLineSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Keep your existing scroll progress for content fades
  const { scrollYProgress, scrollY } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 10%"],
  });

  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.05, 0.2], [50, 0]);

  /* ---------- headline word swap ---------- */
  const [displayText, setDisplayText] = useState("FROM");
  const [applyText, setApplyText] = useState("APPLY");
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v >= 0.6) {
        setDisplayText("TO");
        setApplyText("OFFER");
      } else if (v <= 0.4) {
        setDisplayText("FROM");
        setApplyText("APPLY");
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  const allSteps = [
    {
      stepNumber: 1,
      title: "Step 1: Smart Outreach",
      description:
        "BerriConnect reaches out, confirms availability, sends reminders.",
      cardTitle: "BerriConnect",
      features: [
        "Bulk calling, WhatsApp, SMS, email follow-ups",
        "Live reminders & interview confirmations",
        "High-volume hiring, time-sensitive roles",
      ],
    },
    {
      stepNumber: 2,
      title: "Step 2: Screen & Shortlist",
      description:
        "BerriSearch parses your Job Descriptions and resumes to shortlist high-fit candidates.",
      cardTitle: "BerriSearch & Match",
      features: [
        "Intelligent resume parsing and analysis",
        "Job description matching algorithms",
        "Automated candidate ranking and scoring",
      ],
    },
    {
      stepNumber: 3,
      title: "Step 3: Interview at Scale",
      description:
        "BerriMastermind handles interviews 24/7 - with coding tests and soft-skill scoring.",
      cardTitle: "BerriMasterMind",
      features: [
        "24/7 automated interview scheduling",
        "Technical & behavioural assessment",
        "Real-time candidate evaluation and scoring",
      ],
    },
    {
      stepNumber: 4,
      title: "Step 4: Verify & Protect",
      description:
        "BerriProctor ensures no fakes slip through. Every interview is real and compliant.",
      cardTitle: "BerriProctor",
      features: [
        "Real-time fraud detection technology",
        "Identity verification & authentication",
        "Comprehensive interview monitoring",
      ],
    },
  ];

  /* ---------- LEFT RAIL: measure + animate progress ---------- */
  const railRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [circleYs, setCircleYs] = useState<number[]>([]);
  const [railTopAbs, setRailTopAbs] = useState(0);
  const [railHeight, setRailHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  // Height of the green progress (animated)
  const progressPx = useMotionValue(0);
  const progressSpring = useSpring(progressPx, {
    stiffness: 900,
    damping: 24,
    mass: 0.6,
  });

  // Measure positions of each step center relative to the rail
  const measureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Debounce measurements to prevent excessive reflows
    if (measureTimeoutRef.current) {
      clearTimeout(measureTimeoutRef.current);
    }

    measureTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        const r = rail.getBoundingClientRect();
        const topAbs = window.scrollY + r.top;
        const height = r.height;

        const ys = stepRefs.current.map((el) => {
          if (!el) return 0;
          const br = el.getBoundingClientRect();
          const centerAbs = window.scrollY + br.top + br.height / 2;
          const rel = centerAbs - topAbs; // relative to rail top
          return Math.max(0, Math.min(height, rel)); // clamp to rail bounds
        });

        setCircleYs(ys);
        setRailTopAbs(topAbs);
        setRailHeight(height);
      });
    }, 16); // Debounce to ~60fps
  }, []);

  // Measure on mount + resize + font load
  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    const id1 = setTimeout(measure, 100); // settle layout
    const id2 = setTimeout(measure, 500); // extra settle time for increased spacing
    const id3 = setTimeout(measure, 1000); // ensure full layout completion
    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
      clearTimeout(id3);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [measure]); // Add measure to dependencies

  // Re-measure when content animations complete
  useEffect(() => {
    const checkAnimations = () => {
      const ids = [
        setTimeout(measure, 800),   // re-measure after potential transitions
        setTimeout(measure, 1500),  // re-measure after longer animations
      ];
      return () => ids.forEach(clearTimeout);
    };

    return checkAnimations();
  }, [measure]); // Add measure to dependencies

  // Force re-measure on scroll end (debounced)
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    const onScrollEnd = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(measure, 100);
    };

    window.addEventListener("scroll", onScrollEnd, { passive: true });
    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener("scroll", onScrollEnd);
    };
  }, [measure]); // Add measure to dependencies

  // Drive progress so it crosses a dot when that step is centered in the viewport
  useEffect(() => {
    let lastMeasureTime = 0;
    const unsub = scrollY.on("change", (y) => {
      if (!railHeight) return;
      
      // Re-measure occasionally while scrolling to ensure accuracy
      const now = Date.now();
      if (now - lastMeasureTime > 1000) { // every 1 second
        measure();
        lastMeasureTime = now;
      }
      
      const viewportCenterAbs = y + window.innerHeight / 2;
      const rel = viewportCenterAbs - railTopAbs;
      const clamped = Math.max(0, Math.min(railHeight, rel));
      progressPx.set(clamped);
      
      // Determine which step should be active based on line progress
      let currentActiveStep = -1;
      for (let i = 0; i < circleYs.length; i++) {
        if (clamped >= circleYs[i] - 20) { // 20px threshold before circle
          currentActiveStep = i;
        }
      }
      setActiveStep(currentActiveStep);
    });
    return () => unsub();
  }, [scrollY, railTopAbs, railHeight, progressPx, circleYs, measure]); // Add measure to dependencies

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-black py-8 px-4"
    >
      {/* Animated Stars Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/image/space/BG_Stars.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        animate={{
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Background Image */}
      <div className="absolute top-0 right-0 z-0">
        <Image
          src="/image/mobile/3.1.png"
          alt="Background"
          width={543.6}
          height={462}
          className="object-cover"
        />
      </div>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto relative z-10">
        <div className="flex h-auto min-h-[800px]">
          {/* Left side - 20% with logo and vertical line */}
          <div className="w-1/5 relative flex flex-col items-center">
            {/* Company Logo at top */}
            <div className="absolute w-50 h-50 top-[-60] left-[-35] inset-0 flex items-center justify-center z-0">
                <Image
                  src="/image/mobile/4.1.png"
                  alt="Logo Background"
                  width={441}
                  height={431}
                  className="object-cover"
                />
              </div>
            <motion.div
              className="relative w-[76px] h-[75px] ml-5 flex items-center justify-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Background Image behind logo */}
              
              {/* Ripple circles */}
              <motion.div
                className="absolute w-16 h-16 border border-[#00AD96]/40 rounded-full"
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
                className="absolute w-16 h-16 border border-[#00AD96]/40 rounded-full"
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
                className="absolute w-16 h-16 border border-[#00AD96]/30 rounded-full"
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
              <div className="w-[76px] h-[75px] relative rounded-full overflow-hidden z-10">
                <Image
                  src="/image/logo_2.png"
                  alt="BerriBot Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Vertical rail */}
            <div
              ref={railRef}
              className="relative flex-1 w-full flex flex-col items-center"
            >
              {/* Track */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/20" />

              {/* Progress (animated height) */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#00AD96] shadow-[0_0_10px_#00AD96,0_0_20px_#00AD96] origin-top"
                style={{ height: progressSpring }}
              />

              {/* Circles at each step center */}
              {circleYs.map((y, idx) => (
                <div
                  key={idx}
                  className="absolute left-1/2 -translate-x-1/2 z-10"
                  style={{ top: y - 6 }} // 12px dot -> center align
                >
                  <div className="w-3 h-3 rounded-full bg-[#00AD96] border-2 border-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Right side - 80% with content */}
          <div className="w-4/5 pl-4">
            <motion.div
              className="h-full mt-16"
              style={{ opacity: cardOpacity, y: cardY }}
            >
              {/* FROM/TO APPLY text */}
              <div className="mb-12">
                <TextScramble currentText={displayText} />
                <TextScramble currentText={applyText} />
              </div>

              {/* Steps */}
              <div className="space-y-16">
                {allSteps.map((step, stepIndex) => {
                  const isActive = activeStep >= stepIndex;
                  return (
                  <motion.div
                    key={step.stepNumber}
                    ref={(el) => { stepRefs.current[stepIndex] = el; }}
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    animate={isActive ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 50, y: 20 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut",
                      delay: isActive ? 0.1 : 0 
                    }}
                  >
                    {/* Step Header */}
                    <div className="mb-4">
                      <h3 className="text-[18px] font-bold text-white mb-2"style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {step.title}
                      </h3>
                      <p className="text-white font-medium text-[14px] leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {step.description}
                      </p>
                    </div>

                    {/* Step Card */}
                    <Link href={`/product#${step.cardTitle.toLowerCase().replace(/\s+/g, '').replace('&', '')}`}>
                      <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30 cursor-pointer hover:bg-gray-600/40 transition-colors" >
                        <h4 className="text-[24px] font-medium text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {step.cardTitle}
                        </h4>

                        <div className="space-y-3">
                          {step.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: isActive ? 0.2 + featureIndex * 0.1 : 0,
                              }}
                            >
                              <div className="w-4 h-4 bg-[#00AD96] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                              <p className="text-[#D4D4D4] font-normal text-[14px] leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {feature}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Arrow button */}
                        <motion.div
                          className="flex justify-end mt-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ 
                            duration: 0.3, 
                            ease: "easeOut",
                            delay: isActive ? 0.4 : 0 
                          }}
                        >
                          <div className="w-8 h-8 bg-[#00AD96] rounded-full flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                  );
                })}
              </div>

              {/* TO APPLY text below Step 4 */}
              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
              >
                <TextScramble currentText="TO" />
                <TextScramble currentText="OFFER" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
