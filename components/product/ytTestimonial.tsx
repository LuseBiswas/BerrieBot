"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

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
    <div className="font-['Dogica_Pixel'] text-[24px] tracking-[1px] text-white">
      {displayText}
    </div>
  );
}

export default function YtTestimonial() {
  const ref = React.useRef(null);

  /* ---------- scroll-linked progress bar ---------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ---------- headline word swap ---------- */
  const [displayText, setDisplayText] = useState("APPLY");
  useEffect(() => {
    const unsub = scrollYProgress.onChange((v) => {
      if (v >= 0.65) setDisplayText("OFFER");
      else if (v <= 0.6) setDisplayText("APPLY");
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-black text-white relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pb-48 mb-10 overflow-visible">
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Side - Content */}
            <div className="lg:w-1/2 text-left">
              {/* Main Heading */}
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl font-inter font-light leading-tight mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-white">The future</span>
                <br />
                <span className="text-white">of recruiting</span>
                <br />
                <span className="text-white">is here.</span>
              </motion.h2>

              {/* Description */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-lg sm:text-xl font-inter font-light text-gray-300 leading-relaxed ">
                  Let Berri-Agents automate your outreach,
                </p>
                <p className="text-lg sm:text-xl font-inter font-light text-gray-300 leading-relaxed">
                  screening, interviewing, and verification.
                </p>
                <p className="text-lg sm:text-xl font-inter font-light text-gray-300 leading-relaxed">
                  Your recruiters can focus on hiring, not chasing.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <button className="bg-white text-black px-8 py-4 rounded-full font-inter font-medium text-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                  See it in action
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </motion.div>
            </div>

            {/* Right Side - YouTube Video with Overlay */}
            <div className="lg:w-1/2 relative">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Teal Background Container - Separate div behind video */}
                <div className="absolute bg-[#00514c] rounded-[42px] w-[600px] h-[470px] bottom-[-80px] right-[-120px] z-0"></div>
                
                {/* Top Pills - Positioned with bottom and left */}
                <div className="absolute bottom-[390px] left-[0px] flex gap-4 z-10">
                  <div className="bg-[#056762] text-white rounded-sm text-sm font-inter  border-[0.02px] border-white flex items-center justify-center h-[36px] w-[264px] font-inter font-light text-[18px]">
                    Berri is a hiring Master-Mind!
                  </div>
                  <div className="bg-[#056762] text-white rounded-sm text-sm font-inter  border-[0.02px] border-white flex items-center justify-center h-[36px] w-[356px] font-inter font-light text-[18px]">
                    Search & Match | Connect | Proctor
                  </div>
                </div>
                
                {/* YouTube Video Container - Separate from background */}
                <div className="relative w-[670px] h-[380px] rounded-[41px] overflow-hidden z-10 border border-[#04BBA6]">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Vr330NM_-8U?si=mWfVII5ZO7Lylusz"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full object-cover rounded-[41px]"
                  />
                </div>
                
                {/* Testimonial Overlay - Outside video container for free positioning */}
                <motion.div
                  className="absolute bottom-[-120px] right-[-140px] bg-[#016e69] text-white p-6 rounded-[42px] max-w-sm border-1 border-[#00C7BE]  shadow-lg z-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    {/* Quote Icon */}
                    <div className="text-white text-3xl font-bold">&quot;</div>
                    
                    {/* Testimonial Content */}
                    <div>
                      <p className="text-white font-inter font-light text-base leading-relaxed">
                        Hi, This is Berri! Your AI recruiter who interviews 
                        hundreds of candidates while you focus on real 
                        work. From coding tests to communication
                      </p>
                    </div>
                  </div>
                </motion.div>



                {/* Decorative Elements */}
                <div className="absolute bottom-[-120] left-[60] transform translate-y-8 -translate-x-8">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Ripple Effect Circles */}
                    <motion.div
                      className="absolute w-32 h-32 border border-white/20 rounded-full"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0, 0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        times: [0, 0.2, 0.7, 1],
                      }}
                    />
                    <motion.div
                      className="absolute w-32 h-32 border border-white/20 rounded-full"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0, 0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.8,
                        times: [0, 0.2, 0.7, 1],
                      }}
                    />
                    <motion.div
                      className="absolute w-32 h-32 border border-white/20 rounded-full"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0, 0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 1.6,
                        times: [0, 0.2, 0.7, 1],
                      }}
                    />
                    
                    {/* Main Circle */}
                    <div className="flex items-center justify-center relative z-10">
                      <div className="w-20 h-20 relative rounded-full flex items-center justify-center overflow-hidden">
                        <Image 
                          src="/image/logo_2.png" 
                          alt="Background" 
                          width={80}
                          height={80}
                          className="absolute inset-0 w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Text scramble ---- */}
      <div className="absolute bottom-4 right-4 text-white">
        <TextScramble currentText={displayText} />
      </div>

      {/* ---- Progress bar ---- */}
      <div className="absolute -bottom-0 left-0 right-0 h-2 bg-white">
        <motion.div
          className="h-full bg-[#04BBA6] origin-left "
          style={{ scaleX }}
        />
      </div>
    </section>
  );
} 