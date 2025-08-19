"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import Image from "next/image";

const COMPARISON_DATA = [
  {
    before: "Fortune <br/> 200 IT <br/> services",
    after: "Fortune <br/> 500 Tech & <br/> Digital Service",
  },
  {
    before: "48,283 recruiter <br/> hours saved",
    after: "78% reduction <br/> in cost per hire",
  },
  {
    before: "$3M in direct <br/> savings",
    after: "3,768 offers <br/> made through <br/> Mastermind",
  },
  {
    before: "Time-to- <br/> offer cut <br/> by 50%",
    after: "Show-up rates <br/> 2x higher than <br/> industry average",
  },
];

export default function MobileComparisonXSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');
  
  // Scroll progress for the line animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0.25, 1], ["0%", "100%"]);

  // Scroll-based animations for heading (entrance and outro)
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [50, 0, 0, -50]);

  // Scroll-based animations for BEFORE/AFTER labels (entrance and outro)
  const labelsOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const labelsY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [30, 0, 0, -30]);

  // Individual row animations (must be separate useTransform calls to follow React Hooks rules)
  const row0Opacity = useTransform(scrollYProgress, [0.4, 0.7, 0.8, 0.95], [0, 1, 1, 0]);
  const row0Y = useTransform(scrollYProgress, [0.4, 0.7, 0.8, 0.95], [40, 0, 0, -40]);
  
  const row1Opacity = useTransform(scrollYProgress, [0.48, 0.78, 0.75, 0.9], [0, 1, 1, 0]);
  const row1Y = useTransform(scrollYProgress, [0.48, 0.78, 0.75, 0.9], [40, 0, 0, -40]);
  
  const row2Opacity = useTransform(scrollYProgress, [0.56, 0.86, 0.7, 0.85], [0, 1, 1, 0]);
  const row2Y = useTransform(scrollYProgress, [0.56, 0.86, 0.7, 0.85], [40, 0, 0, -40]);
  
  const row3Opacity = useTransform(scrollYProgress, [0.64, 0.94, 0.65, 0.8], [0, 1, 1, 0]);
  const row3Y = useTransform(scrollYProgress, [0.64, 0.94, 0.65, 0.8], [40, 0, 0, -40]);

  // Array to access animations by index
  const rowAnimations = [
    { opacity: row0Opacity, y: row0Y },
    { opacity: row1Opacity, y: row1Y },
    { opacity: row2Opacity, y: row2Y },
    { opacity: row3Opacity, y: row3Y }
  ];

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
          // Title: mobile 58px -> large 81px (1.4x)
          titleSize: 'text-[81px]',
          // BEFORE/AFTER labels: mobile 24px -> large 34px (1.4x)
          labelSize: 'text-[34px]',
          // Logo container: mobile 76x75 -> large 106x105 (1.4x)
          logoWidth: '106px',
          logoHeight: '105px',
          logoImageSize: { width: 67, height: 67 }, // 48*1.4=67
          // Ripple circles: mobile 64x64 -> large 90x90 (1.4x)
          rippleSize: 'w-[90px] h-[90px]',
          // Arrow sizes: mobile 16x16 -> large 22x22 (1.4x)
          arrowSize: 'w-[22px] h-[22px]',
          // Arrow line: mobile 80px -> large 112px (1.4x)
          arrowLineWidth: 'w-28', // w-28 = 112px
          // Table text: mobile 18px -> large 25px (1.4x)
          tableTextSize: 'text-[25px]',
          // Plus icons: mobile 16x16 -> large 22x22 (1.4x)
          plusSize: 'w-[22px] h-[22px]'
        };
      case 'tablet':
        return {
          // Title: mobile 58px -> tablet 70px (1.2x)
          titleSize: 'text-[70px]',
          // BEFORE/AFTER labels: mobile 24px -> tablet 29px (1.2x)
          labelSize: 'text-[29px]',
          // Logo container: mobile 76x75 -> tablet 91x90 (1.2x)
          logoWidth: '91px',
          logoHeight: '90px',
          logoImageSize: { width: 58, height: 58 }, // 48*1.2=58
          // Ripple circles: mobile 64x64 -> tablet 77x77 (1.2x)
          rippleSize: 'w-[77px] h-[77px]',
          // Arrow sizes: mobile 16x16 -> tablet 19x19 (1.2x)
          arrowSize: 'w-[19px] h-[19px]',
          // Arrow line: mobile 80px -> tablet 96px (1.2x)
          arrowLineWidth: 'w-24', // w-24 = 96px
          // Table text: mobile 18px -> tablet 22px (1.2x)
          tableTextSize: 'text-[22px]',
          // Plus icons: mobile 16x16 -> tablet 19x19 (1.2x)
          plusSize: 'w-[19px] h-[19px]'
        };
      default: // mobile
        return {
          titleSize: 'text-[58px]',
          labelSize: 'text-[24px]',
          logoWidth: '76px',
          logoHeight: '75px',
          logoImageSize: { width: 48, height: 48 },
          rippleSize: 'w-16 h-16',
          arrowSize: 'w-4 h-4',
          arrowLineWidth: 'w-20',
          tableTextSize: 'text-[18px]',
          plusSize: 'w-4 h-4'
        };
    }
  };

  const sizes = getResponsiveSizes();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-10 px-4 bg-black"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />

      {/* Grid pattern with + signs at grid intersections */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-12">
          {Array.from({ length: 96 }, (_, i) => (
            <div key={i} className="border border-white/20 opacity-[5%]" />
          ))}
        </div>
        
        {/* + signs at every grid intersection */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 9 }, (_, row) => 
            Array.from({ length: 13 }, (_, col) => (
              <div 
                key={`${row}-${col}`}
                className="absolute text-white/20 opacity-[10%]"
                style={{
                  top: `${row * (100/8)}%`,
                  left: `${col * (100/12)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Plus className={sizes.plusSize} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '-100px', left: '-200px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image"
          width={377}
          height={336}
          className="w-[377.31px] h-[336px] opacity-[35%]"
        />
      </div>

      {/* Central green line - animated with scroll */}
      <motion.div 
        className="pointer-events-none absolute left-1/2 top-0 w-[2px] bg-[#04BBA6] transform -translate-x-1/2"
        style={{ 
          height: lineHeight,
          boxShadow: '0 0 15px #04BBA6, 0 0 20px #04BBA6, 0 0 40px #04BBA6, 0 0 80px rgba(4, 187, 166, 0.5)',
          filter: 'blur(0.9px)'
        }}
      />

      {/* Background Image 6.png - positioned between radial blur and text */}
      <div className="absolute z-5 pointer-events-none" style={{ top: '500px', right: '-290px', transform: 'translateX(-50%)' }}>
        <Image 
          src="/image/mobile/6.png"
          alt="Background Image"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px] "
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-sm md:max-w-[1000px] lg:max-w-lg mx-auto text-center"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 100, scale: 0.9 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header with icon and arrows */}
        <div className="relative mb-8" >
          {/* Title */}
          <div className="relative inline-block mb-6">
            {/* Background to block the line but preserve grid with fading effect */}
            <div className="absolute inset-0 -mx-6 -my-4 rounded-lg" 
                 style={{
                   background: 'radial-gradient(ellipse 70% 60% at center, #000000 30%, #000000 60%, transparent 80%)'
                 }}></div>
            <motion.h2 
              className="relative z-10 font-inter text-[58px] md:text-[70px] lg:text-[81px] tracking-[-1px] mb-4 font-medium text-[#252527] bg-clip-text leading-none"
              style={{ 
                opacity: headingOpacity, 
                y: headingY,
                willChange: 'transform',
                fontFamily: 'Manrope, sans-serif'
              }}
            >
              <span className="text-white bg-clip-text">
                Proven to
              </span>
              <br />
              <span className="text-white bg-clip-text">
                Results.  <br />Measurable <br/> ROI.
              </span>
            </motion.h2>
          </div>

          {/* Before/After indicator with arrows - Mobile Layout */}
          <div className="flex items-center justify-center gap-8 px-4 pt-16">
            {/* Left Side - Arrow with text below */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center">
                <ArrowLeft className={`${sizes.arrowSize} text-white -mr-1`} strokeWidth={2} />
                <div className={`${sizes.arrowLineWidth} h-0.5 bg-white`}></div>
              </div>
              <motion.span 
                className="text-white font-medium font-inter text-[24px] md:text-[29px] lg:text-[34px] mt-2"
                style={{ 
                  opacity: labelsOpacity, 
                  y: labelsY,
                  willChange: 'transform',
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                BEFORE
              </motion.span>
            </div>
            
            {/* Center Icon */}
            <div className="relative flex items-center justify-center" style={{ width: sizes.logoWidth, height: sizes.logoHeight }}>
              {/* Ripple circles */}
              <motion.div
                className={`absolute ${sizes.rippleSize} border border-[#00AD96]/40 rounded-full pointer-events-none`}
                animate={{ 
                  scale: [1, 2, 3.5], 
                  opacity: [0.8, 0.4, 0] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeOut",
                  repeatDelay: 0.5
                }}
              />
              <motion.div
                className={`absolute ${sizes.rippleSize} border border-[#00AD96]/40 rounded-full pointer-events-none`}
                animate={{ 
                  scale: [1, 2, 3.5], 
                  opacity: [0.8, 0.4, 0] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeOut", 
                  delay: 1,
                  repeatDelay: 0.5
                }}
              />
              <motion.div
                className={`absolute ${sizes.rippleSize} border border-[#00AD96]/30 rounded-full pointer-events-none`}
                animate={{ 
                  scale: [1, 2, 3.5], 
                  opacity: [0.6, 0.3, 0] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeOut", 
                  delay: 2,
                  repeatDelay: 0.5
                }}
              />
              
              {/* Background with fading effect */}
              <div className="absolute inset-0 -m-8 rounded-full" 
                   style={{
                     background: 'radial-gradient(circle, #101010 20%, #101010 40%, transparent 70%)'
                   }}></div>
              <Image
               src="/image/logo.png"
               alt="Clock Icon"
               width={sizes.logoImageSize.width}
               height={sizes.logoImageSize.height}
               className="relative z-10"
               style={{ width: sizes.logoWidth, height: sizes.logoHeight }}
             />
            </div>
            
            {/* Right Side - Arrow with text below */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center">
                <div className={`${sizes.arrowLineWidth} h-0.5 bg-white`}></div>
                <ArrowRight className={`${sizes.arrowSize} text-white -ml-1`} strokeWidth={2} />
              </div>
              <motion.span 
                className="text-white font-medium font-inter text-[24px] md:text-[29px] lg:text-[34px] mt-2"
                style={{ 
                  opacity: labelsOpacity, 
                  y: labelsY,
                  willChange: 'transform',
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                AFTER
              </motion.span>
            </div>
          </div>
        </div>

        {/* Comparison table with individual content animations - Mobile Layout */}
        <div className="w-full mx-auto mt-8 relative">
          <table className="w-full">
            <tbody>
              {COMPARISON_DATA.map((item, index) => {
                const { opacity, y } = rowAnimations[index];
                
                return (
                  <tr key={index}>
                    <td className="p-4 text-center border-t border-white/20">
                      <div className="w-full mx-auto">
                        <motion.p 
                          className="text-white text-[18px] md:text-[22px] lg:text-[25px] leading-relaxed"
                          style={{ 
                            opacity, 
                            y,
                            willChange: 'transform',
                            fontFamily: 'Manrope, sans-serif'
                          }}
                          dangerouslySetInnerHTML={{ __html: item.before }}
                        />
                      </div>
                    </td>
                    <td className="p-4 text-center border-t border-white/20">
                      <div className="w-full mx-auto">
                        <motion.p 
                          className="text-white text-[18px] md:text-[22px] lg:text-[25px] leading-relaxed font-medium"
                          style={{ 
                            opacity, 
                            y,
                            willChange: 'transform',
                            fontFamily: 'Manrope, sans-serif'
                          }}
                          dangerouslySetInnerHTML={{ __html: item.after }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
} 