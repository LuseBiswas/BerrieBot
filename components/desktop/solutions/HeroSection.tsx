"use client";
import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force consistent className after hydration
  const sectionClassName =
    "relative mt-36 flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent";

  return (
    <section
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: "9rem" }}
    >
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          Solutions
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-7xl mx-auto relative z-10 mb-12"style={{ fontFamily: 'Manrope, sans-serif' }}>
        <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium text-[#252527] bg-clip-text">
        Smart bots. Less
          <br />
          busywork.
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-8"style={{ fontFamily: 'Manrope, sans-serif' }}>
        <p className="font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light text-[#969696] max-w-5xl mx-auto">
        At Berribot, we believe in tag-teaming with AI to take the grind out of  <br /> everyday workflows. Whether you&apos;re hiring at scale, vetting online  <br />participants, or texting leads like a boss—we&apos;ve got a bot for that.
        </p>
      </div>

      {/* ---- Book a Demo Button ---- */}
      {/* <div className="relative z-10">
        <button className="bg-[#04BBA6] text-white font-inter font-medium text-lg px-8 py-3 rounded-full hover:bg-[#00AFA7] transition-colors duration-300">
          Book a Demo
        </button>
      </div> */}
    </section>
  );
}
