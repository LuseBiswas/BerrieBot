"use client";
import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force consistent className after hydration
  const sectionClassName =
    "relative mt-50 flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent mb-20";

  return (
    <section
      className={sectionClassName}
      suppressHydrationWarning={true}
      style={isMounted ? {} : { marginTop: "9rem" }}
    >
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#028374] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
        At scale, with precision
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-7xl mx-auto relative z-10 mb-8"style={{ fontFamily: 'Manrope, sans-serif' }}>
        <h1 className="text-[64px]  md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.5px] sm:text-6xl">
        Berribot handles the <br /> busywork
        </h1>
      </div>

      <div className="text-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto relative z-10 mb-6">
        <h2 
          className="leading-[1.4] font-light text-[#666666] mx-auto text-[22px]"
        >
          - while your teams focus on hiring the <br /> right people, faster.
        </h2>
      </div>

      {/* ---- Description ----&apos; */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-8"style={{ fontFamily: 'Manrope, sans-serif' }}>
        <p className="text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-[280px] sm:max-w-5xl mx-auto">
        Berribot&apos;s suite of AI-powered recruitment agents automate outreach, <br /> interviews, fraud detection, and screening.
        </p>
      </div>

      {/* ---- Book a Demo Button ---- */}
      {/* <div className="relative z-10">
        <Link href="/schedule">
          <button className="bg-[#028374] text-white font-inter font-medium text-lg px-8 py-3 rounded-full hover:bg-[#00AFA7] hover:cursor-pointer transition-colors duration-300">
            Book a Demo
          </button>
        </Link>
      </div> */}
    </section>
  );
}
