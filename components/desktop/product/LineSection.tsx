"use client";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

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
    <div className="font-['Dogica_Pixel'] text-[24px] tracking-[1px] text-black">
      {displayText}
    </div>
  );
}

export default function LineSection() {
  const ref = useRef(null);

  /* ---------- scroll-linked progress bar ---------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end start"],
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll-based animations for each step - sync with vertical line (entrance only)
  const step1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const step1X = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);
  
  const step2Opacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const step2X = useTransform(scrollYProgress, [0.25, 0.4], [50, 0]);
  
  const step3Opacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const step3X = useTransform(scrollYProgress, [0.4, 0.55], [50, 0]);
  
  const step4Opacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const step4X = useTransform(scrollYProgress, [0.55, 0.7], [50, 0]);

  /* ---------- headline word swap ---------- */
  const [displayText, setDisplayText] = useState("APPLY");
  useEffect(() => {
    const unsub = scrollYProgress.onChange((v) => {
      if (v >= 0.45) setDisplayText("OFFER");
      else if (v <= 0.3) setDisplayText("APPLY");
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section 
      ref={ref} 
      className="relative bg-transparent"
      style={{ height: "1457px" }}
    >
      <div className="flex h-full" style={{ fontFamily: 'Manrope, sans-serif' }}>
        {/* Left side - 40% with vertical line */}
        <div className="w-2/5 relative flex flex-col items-center justify-center">
          {/* Background vertical line */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-black transform -translate-x-1/2 opacity-30" />
          
          {/* Animated progress line */}
          <motion.div 
            className="absolute left-1/2 top-0 w-[2px] bg-[#04BBA6] transform -translate-x-1/2 origin-top"
            style={{ 
              scaleY,
              height: "100%",
              boxShadow: '0 0 10px #04BBA6, 0 0 20px #04BBA6, 0 0 40px #04BBA6',
            }}
          />

          {/* APPLY/OFFER text with scramble animation positioned parallel to Step 3 on left side */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
            <TextScramble currentText={displayText} />
          </div>
        </div>

        {/* Right side - 60% with content */}
        <div className="w-3/5 flex flex-col justify-center px-0 space-y-24">
          {/* Step 1: Smart Outreach */}
          <motion.div 
            className="space-y-6"
            style={{ 
              opacity: step1Opacity, 
              x: step1X,
              willChange: 'transform'
            }}
          >
            <h3 className="text-4xl font-inter font-semibold text-black mb-4">
              Step 1: Smart Outreach
            </h3>
            <p className="text-lg font-inter font-light text-gray-700 leading-relaxed">
              BerriConnect reaches out,<br />
              confirms availability, sends reminders.
            </p>
            {/* <div className="flex items-center space-x-6 mt-6">
              
              <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center">
                <Image 
                  src="/image/icons/send.png" 
                  alt="Send" 
                  width={24} 
                  height={24}
                  className="w-[45px] h-[45px]"
                />
              </div>
              
             
              <div className="flex items-center space-x-0">
                <div className="w-2 h-2 bg-[#04BBA6] rounded-full"></div>
                <div className="w-6 h-[2px] bg-[#04BBA6]"></div>
                <div className="w-2 h-2 bg-[#04BBA6] rounded-full"></div>
              </div>
              
             
              <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center">
                <Image 
                  src="/image/icons/calander.png" 
                  alt="Calendar" 
                  width={24} 
                  height={24}
                  className="w-[45px] h-[45px]"
                />
              </div>
              
              
              <div className="flex items-center space-x-0">
                <div className="w-2 h-2 bg-[#04BBA6] rounded-full"></div>
                <div className="w-6 h-[2px] bg-[#04BBA6]"></div>
                <div className="w-2 h-2 bg-[#04BBA6] rounded-full"></div>
              </div>
              
              
              <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center">
                <Image 
                  src="/image/icons/bell.png" 
                  alt="Bell" 
                  width={24} 
                  height={24}
                  className="w-[45px] h-[45px]"
                />
              </div>
            </div> */}
          </motion.div>

          {/* Step 2: Screen & Shortlist */}
          <motion.div 
            className="space-y-6"
            style={{ 
              opacity: step2Opacity, 
              x: step2X,
              willChange: 'transform'
            }}
          >
            <h3 className="text-4xl font-inter font-semibold text-black mb-4">
              Step 2: Screen & Shortlist
            </h3>
            <p className="text-lg font-inter font-light text-gray-700 leading-relaxed">
              BerriSearch parses your Job Descriptions<br />
              and resumes to shortlist high-fit candidates.
            </p>
          </motion.div>

          {/* Step 3: Interview at Scale */}
          <motion.div 
            className="space-y-6"
            style={{ 
              opacity: step3Opacity, 
              x: step3X,
              willChange: 'transform'
            }}
          >
            <h3 className="text-4xl font-bold text-black mb-4">
              Step 3: Interview at Scale
            </h3>
            <p className="text-lg font-inter font-light text-gray-700 leading-relaxed">
              BerriMastermind handles interviews 24/7<br />
              -with coding tests and soft-skill scoring.
            </p>
          </motion.div>

          {/* Step 4: Verify & Protect */}
          <motion.div 
            className="space-y-6"
            style={{ 
              opacity: step4Opacity, 
              x: step4X,
              willChange: 'transform'
            }}
          >
            <h3 className="text-4xl font-inter font-semibold text-black mb-4">
              Step 4: Verify & Protect
            </h3>
            <p className="text-lg font-inter font-light text-gray-700 leading-relaxed">
              BerriProctor ensures no fakes slip through.<br />
              Every interview is real and compliant.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 