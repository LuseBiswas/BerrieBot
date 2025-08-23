"use client";
import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/image/screenshot_3.png",
    title: "BerriMasterMind",
    subtitle: "Our 24/7 asynchronous AI interviewer",
    description: "Custom JD-based questions, real-time scoring, and even coding tests with no human scheduling needed.",
  },
  {
    image: "/image/screenshot_1.png",
    title: "Another Feature",
    subtitle: "Brief description of this feature",
    description: "More details about how this amazing feature will change your life and make hiring a breeze.",
  },
];

export default function DemoCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background elements */}
      
      <div className="absolute inset-0 grid grid-cols-12 gap-x-4 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-white/10 h-full"></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Header Content */}
        <div className="mb-16">
          <h2 className="relative inline-block text-4xl sm:text-5xl lg:text-6xl font-inter font-[500] text-[#04BBA6] mb-6">
            BerriMasterMind
            <Image
              src="/image/components/Start_blue.png"
              alt="Star"
              width={14}
              height={14}
              className="absolute top-[-8px] right-[55px]"
            />
          </h2>
          <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto">
            {slides[activeSlide].description}
          </p>
        </div>

        {/* Image Display */}
        <div className="relative aspect-[16/9]  overflow-hidden shadow-2xl mb-12">
          <Image
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Pill & Dot Navigator */}
        <div className="flex justify-center items-center gap-4">
          <div className="bg-gray-800/50 border border-gray-600/50 rounded-full p-1 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeSlide === index ? "bg-[#04BBA6]" : "bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
          <div className="relative w-24 h-8 bg-gray-800/50 border border-gray-600/50 rounded-full">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-10 h-6 bg-[#04BBA6] rounded-full transition-transform duration-300"
              style={{
                transform: `translateX(${activeSlide * 100}%) translateY(-50%)`,
                left: "4px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
} 