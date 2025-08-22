"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function MobileAboutSubHeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force consistent className after hydration
  const sectionClassName = "relative mt-20 flex flex-col items-center justify-center px-4 bg-transparent mb-20 overflow-visible";

  return (
    <section 
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: '5rem' }}
    >
      {/* Background Image */}
      <div className="absolute pointer-events-none" style={{ top: '-80px', left: '-230px', zIndex: 1 }}>
        <Image
          src="/image/mobile/7.png"
          alt="Background"
          width={577}
          height={536}
          className="w-[877.31px] h-[836px] opacity-[60%]"
        />
      </div>
      
      {/* Second Background Image */}
      <div className="absolute pointer-events-none" style={{ top: '-250px', right: '-230px', zIndex: -1 }}>
        <Image
          src="/image/mobile/9.png"
          alt="Background 2"
          width={377}
          height={336}
          className="w-[543px] h-[462px] "
        />
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
          Why we exist?
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
          At Berribot, we believe the future belongs to businesses where people focus on creativity, problem-solving, and strategy while AI handles the repetitive, time-consuming work.
        </p>
        <p 
          className="leading-[1.4] font-light text-white mx-auto mb-4"
          style={{
            fontSize: '36px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          Our mission is simple: unleash human ingenuity by giving organizations intelligent digital agents that work at scale, without compromise.
        </p>
      </div>
    </section>
  );
} 