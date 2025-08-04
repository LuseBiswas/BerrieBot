"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative mt-36 flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent">
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          Blog
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-12">
        <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium bg-gradient-to-b from-[#252527] to-[#ADADAEB0] text-transparent bg-clip-text">
          Smart Ideas, No
          <br />
          Robot Jargon
        </h1>
      </div>

      
    </section>
  );
}
