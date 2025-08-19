"use client";
import React, { useState, useEffect } from "react";

export default function MobileProductHeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');

  useEffect(() => {
    setIsMounted(true);
    
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('large');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Responsive sizing - keeping exact proportions
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          pillWidth: '130px', // 98 * 1.33 ≈ 130px
          pillHeight: '33px', // 25 * 1.33 ≈ 33px
          pillFontSize: '19px', // 14 * 1.33 ≈ 19px
          headingFontSize: '64px', // 48 * 1.33 ≈ 64px
          subheadingFontSize: '24px', // 18 * 1.33 ≈ 24px
          descriptionFontSize: '26px', // 20 * 1.3 ≈ 26px
        };
      case 'tablet':
        return {
          pillWidth: '115px', // 98 * 1.17 ≈ 115px
          pillHeight: '29px', // 25 * 1.17 ≈ 29px
          pillFontSize: '16px', // 14 * 1.17 ≈ 16px
          headingFontSize: '56px', // 48 * 1.17 ≈ 56px
          subheadingFontSize: '21px', // 18 * 1.17 ≈ 21px
          descriptionFontSize: '23px', // 20 * 1.17 ≈ 23px
        };
      default: // mobile
        return {
          pillWidth: '199px',
          pillHeight: '25px',
          pillFontSize: '14px',
          headingFontSize: '48px',
          subheadingFontSize: '18px',
          descriptionFontSize: '20px',
        };
    }
  };

  const sizes = getResponsiveSizes();

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
            width: sizes.pillWidth,
            height: sizes.pillHeight,
            fontSize: sizes.pillFontSize,
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          At scale, with precision
        </div>
      </div>

      {/* ---- Main Heading ---- */}
      <div className="text-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto relative z-10 mb-2">
        <h1 
          className="tracking-tight mb-2 font-medium text-[#252527] bg-clip-text"
          style={{
            fontSize: sizes.headingFontSize,
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          Berribot
          <br />
          handles the
          <br />
          busywork.
        </h1>
      </div>

      {/* ---- Subheading ---- */}
      <div className="text-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto relative z-10 mb-6">
        <h2 
          className="leading-[1.4] font-light text-[#666666] mx-auto"
          style={{
            fontSize: sizes.subheadingFontSize,
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          while your team focus on hiring the <br /> right people, faster.
        </h2>
      </div>

      {/* ---- Description ---- */}
      <div className="text-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto relative z-10">
        <p 
          className="leading-[1.4] font-light text-black mx-auto"
          style={{
            fontSize: sizes.descriptionFontSize,
            fontFamily: 'Manrope, sans-serif'
          }}
        >
          Berribot’s suite of <br /> AI-powered recruitment agents <br /> automates outreach, interviews, <br /> fraud detection, and screening. <br /> At scale, with precision.
        </p>
      </div>
    </section>
  );
} 