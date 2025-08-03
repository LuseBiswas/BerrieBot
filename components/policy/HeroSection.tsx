"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative mt-60 flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent">
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          Our Privacy Policy
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-12">
        <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium bg-gradient-to-b from-[#252527] to-[#ADADAEB0] text-transparent bg-clip-text">
          No Secrets, Just 
          <br />
          Privacy
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-4xl mx-auto relative z-10">
        <p className="font-inter text-[36px] sm:text-2xl md:text-[36px] leading-[1.4] sm:leading-[1.5] font-light text-white max-w-5xl mx-auto">
          We read the fine print so you don’t have to and we <br /> definitely Guard your Data like it's Cake.
          {/* <span className="text-[#969696]">admin stuff so your <br /> team can focus on actual work—the kind <br /> humans are great at. </span>  */}
        </p>
      </div>
    </section>
  );
}
