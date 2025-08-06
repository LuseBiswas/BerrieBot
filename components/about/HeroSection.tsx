"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-transparent">
      {/* ---- "We are Berribot" pill ---- */}
      <div className="mb-12 relative z-10">
        <div className="bg-[#00C7BEB2] text-white px-6 py-1 rounded-full font-inter font-medium text-lg">
          We are Berribot
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10 mb-12">
        <h1 className="font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium text-white bg-clip-text">
          So...Who are we,
          <br />
          you ask?
        </h1>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-4xl mx-auto relative z-10">
        <p className="font-inter text-[36px] sm:text-2xl md:text-[36px] leading-[1.4] sm:leading-[1.5] font-light text-white max-w-5xl mx-auto">
          Berribot is an AI-powered whiz kid that <br />tackles all the boring{" "}
          <span className="text-[#969696]">admin stuff so your <br /> team can focus on actual work—the kind <br /> humans are great at. </span> 
        </p>
      </div>
    </section>
  );
}
