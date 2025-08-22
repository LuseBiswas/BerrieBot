"use client";
import React, { useState, useEffect } from "react";

export default function MobileResourcesHeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force consistent className after hydration
  const sectionClassName = "relative mt-20 flex flex-col items-center justify-center px-4 bg-transparent";

  return (
    <section 
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: '5rem' }}
    >
      {/* ---- "Resources" pill ---- */}
      <div className="mb-8 relative z-10">
        <div 
          className="bg-[#028374] text-white px-6 py-1 rounded-full font-medium text-lg flex items-center justify-center"
          style={{
            width: '140px',
            height: '25px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          Resources
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-sm mx-auto relative z-10 mb-6">
        <h1 
          className="tracking-tight mb-6 font-medium text-[#252527] bg-clip-text"
          style={{
            fontSize: '48px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          Learn. Explore.
          <br />
          Get Smarter.
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-sm mx-auto relative z-10">
        <p 
          className="leading-[1.4] font-light text-[#969696] mx-auto"
          style={{
            fontSize: '20px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          <span className="text-[#3d3d3d]">Welcome to your go-to hub for all </span> things Berribot and beyond. <br />
          Whether you&apos;re curious about AI, exploring automation strategies, <br />
          or just want to see how others are scaling smarter —not harder <br />
          —you&apos;re in the right place.
        </p>
      </div>
    </section>
  );
} 