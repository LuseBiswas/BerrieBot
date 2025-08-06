"use client";
import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force consistent className after hydration
  const sectionClassName = "relative mt-36 flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent";

  return (
    <section 
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: '9rem' }}
    >
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          Resources
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-12">
        <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium text-[#252527] bg-clip-text">
          Learn. Explore.
          <br />
          Get Smarter.
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-4xl mx-auto relative z-10">
        <p className="font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light text-[#969696] max-w-5xl mx-auto">
          <span className="text-[#3d3d3d]">Welcome to your go-to hub for all </span> things Berribot and beyond. <br />
          Whether you&apos;re curious about AI, exploring automation strategies, <br />
          or just want to see how others are scaling smarter —not harder <br />
          —you&apos;re in the right place.
        </p>
      </div>
    </section>
  );
}
