"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MobileHeroSection() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');

  // Screen size detection
  useEffect(() => {
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

  // Responsive sizing based on mobile dimensions
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          // Popup video: mobile 343x355 -> large 480x497 (1.4x)
          videoWidth: '480px',
          videoHeight: '497px',
          // Popup pill: mobile 163x26 -> large 228x36 (1.4x)
          pillWidth: '228px',
          pillHeight: '36px'
        };
      case 'tablet':
        return {
          // Popup video: mobile 343x355 -> tablet 412x426 (1.2x)
          videoWidth: '412px',
          videoHeight: '426px',
          // Popup pill: mobile 163x26 -> tablet 196x31 (1.2x)
          pillWidth: '196px',
          pillHeight: '31px'
        };
      default: // mobile
        return {
          videoWidth: '343px',
          videoHeight: '355px',
          pillWidth: '163px',
          pillHeight: '26px'
        };
    }
  };

  const sizes = getResponsiveSizes();

  return (
    <motion.section 
      className="bg-transparent flex flex-col items-center justify-start px-4 pt-20 pb-8 relative overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="max-w-sm md:max-w-md lg:max-w-lg mx-auto relative flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Pill Shape */}
        <motion.div 
          className="bg-[#028374] text-white rounded-full flex items-center justify-center text-sm md:text-base lg:text-lg font-medium z-30 mb-4"
          style={{
            width: sizes.pillWidth,
            height: sizes.pillHeight,
            fontFamily: 'Manrope, sans-serif'
          }}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          Berri is a MasterMind
        </motion.div>

        {/* YouTube Video - Larger */}
        <motion.div 
          className="rounded-2xl overflow-hidden mb-8 relative mx-auto"
          style={{
            width: sizes.videoWidth,
            height: sizes.videoHeight
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <iframe
            src="https://www.youtube.com/embed/ww3flTt--Xw?autoplay=1&mute=1&loop=1&playlist=ww3flTt--Xw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            style={{ 
              border: 'none',
              transform: 'scale(1.9)',
              transformOrigin: 'center center'
            }}
          />
        </motion.div>

        {/* Text Content */}
        <motion.div 
          className="text-center px-4 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <p 
            className="text-white leading-relaxed text-[24px] md:text-[28px] lg:text-[32px]"
            style={{
              fontFamily: 'Manrope, sans-serif'
            }}
          >
            Hi this is Berri, your complete agentic AI recruiter. Let&apos;s get started?!
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
} 