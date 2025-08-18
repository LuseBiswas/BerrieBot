"use client";
import React, { useState, useEffect } from "react";

export default function MobileSolutionsHeroSection() {
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
      {/* ---- "Solutions" pill ---- */}
      <div className="mb-8 relative z-10">
        <div 
          className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-medium flex items-center justify-center"
          style={{
            width: '98px',
            height: '25px',
            fontSize: '14px',
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          Solutions
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
          Smart bots. Less
          <br />
          busywork.
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
          At Berribot, we believe in tag-teaming with AI to take the grind out of everyday workflows. Whether you&apos;re hiring at scale, vetting online participants, or texting leads like a boss—we&apos;ve got a bot for that.
        </p>
      </div>
    </section>
  );
} 