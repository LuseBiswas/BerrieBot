"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
      {/* Rounded Card with diagonal positioning - Full width */}
      <div className="bg-black rounded-3xl w-full p-12 sm:p-16 relative min-h-[80vh] flex flex-col justify-between">
        
        {/* Top Left Section - Header content */}
        <div className="w-full lg:w-[70%]">
          {/* SubHeader */}
          <div className="mb-6">
            <span className="text-[#969696] font-inter text-lg font-medium">
              We are Berribot
            </span>
          </div>
          
          {/* Header */}
          <h1 className="font-inter text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-2px] font-medium text-white leading-tight">
            So...Who are we,
            <br />
            you ask?
          </h1>
        </div>

        {/* Bottom Right Section - Description and buttons */}
        <div className="w-full lg:w-[70%] lg:ml-auto flex flex-col items-end">
          {/* Description */}
          <div className="mb-10 text-right">
            <p className="font-inter text-lg sm:text-xl leading-relaxed font-light text-white max-w-2xl">
              Berribot is an AI-powered whiz kid that tackles all the boring{" "}
              <span className="text-[#969696]">admin stuff so your team can focus on actual work—the kind humans are great at.</span>
            </p>
          </div>
          
          {/* Two Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#00C7BE] text-white px-6 py-3 rounded-full font-inter font-medium text-base hover:bg-[#00A8A1] transition-colors">
              Learn More
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full font-inter font-medium text-base hover:bg-white hover:text-black transition-colors">
              Get Started
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
