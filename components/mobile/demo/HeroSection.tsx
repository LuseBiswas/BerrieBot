"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function MobileDemoHeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force consistent className after hydration
  const sectionClassName = "relative mt-20 flex flex-col items-center justify-center px-4 bg-transparent mb-20";

  return (
    <section 
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: '5rem' }}
    >
      {/* Logo */}
      <div className="mb-16 relative z-10">
        <Image
          src="/image/logo.png"
          alt="BerriBot Logo"
          width={76}
          height={75}
          className="object-contain"
          style={{
            width: '76px',
            height: '75px'
          }}
        />
      </div>

      {/* "Get Started" pill */}
      <div className="mb-8 relative z-10">
        <div 
          className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-medium flex items-center justify-center"
          style={{
            width: '140px',
            height: '25px',
            fontSize: '14px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          Get Started
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center w-full max-w-sm mx-auto relative z-10 mb-6">
        <h1 
          className="tracking-tight mb-6 font-medium text-white"
          style={{
            fontSize: '48px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          Your demo
          <br />
          is just one <br />
          form away!
        </h1>
      </div>

      {/* Description */}
      <div className="text-center w-full max-w-sm mx-auto relative z-10">
        <p 
          className="leading-[1.4] font-light text-white mx-auto mb-4"
          style={{
            fontSize: '20px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          From automating candidate outreach to running unbiased interviews;
        </p>
        <p 
          className="leading-[1.4] font-light text-white mx-auto mb-4"
          style={{
            fontSize: '20px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          From real-time fraud detection to intelligent matching;
        </p>
        <p 
          className="leading-[1.4] font-light text-white mx-auto"
          style={{
            fontSize: '20px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          Berribot integrates seamlessly into your hiring process. We make it faster, fairer, and more efficient.
        </p>
      </div>
    </section>
  );
} 