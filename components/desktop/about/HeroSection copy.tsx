"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MobileAboutHeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force consistent className after hydration
  const sectionClassName = "relative mt-50 flex flex-col items-center justify-center px-4 bg-transparent mb-20";

  return (
    <section 
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: '5rem' }}
    >
      {/* Logo */}
      <div className="mb-16 relative z-10 w-[98px] h-[97px] flex items-center justify-center mx-auto">
        {/* Ripple circles */}
        <motion.div
          className="absolute w-16 h-16 border border-[#00AD96]/40 rounded-full pointer-events-none"
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
          className="absolute w-16 h-16 border border-[#00AD96]/40 rounded-full pointer-events-none"
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
          className="absolute w-16 h-16 border border-[#00AD96]/30 rounded-full pointer-events-none"
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
        
        <Image
          src="/image/logo.png"
          alt="BerriBot Logo"
          width={98}
          height={97}
          className="object-contain relative z-10"
          style={{
            width: '98px',
            height: '97px'
          }}
        />
      </div>

      {/* "Get Started" pill */}
      <div className="mb-8 relative z-10">
        <div 
          className="bg-white text-[#00BCA3] px-6 py-1 rounded-full font-bold flex items-center justify-center"
          style={{
            width: '155px',
            height: '25px',
            fontSize: '14px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          We are BerriBot
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto relative z-10 mb-6">
        <h1 
          className="tracking-tight mb-6 font-medium text-white"
          style={{
            fontSize: '76px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          We build digital agents
          <br />
           that let recruiters
          <br />
           do their best work 
        </h1>
      </div>

      {/* Description */}
      <div className="text-center w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto relative z-10">
        <p 
          className="leading-[1.4] font-light text-white mx-auto mb-4"
          style={{
            fontSize: '36px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          From automating candidate outreach to running unbiased interviews;
        </p>
        <p 
          className="leading-[1.4] font-light text-white mx-auto mb-4"
          style={{
            fontSize: '36px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          From real-time fraud detection to intelligent matching;
        </p>
        <p 
          className="leading-[1.4] font-light text-white mx-auto"
          style={{
            fontSize: '36px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          Berribot integrates seamlessly into your hiring process. We make it faster, fairer, and more efficient.
        </p>
      </div>
    </section>
  );
} 