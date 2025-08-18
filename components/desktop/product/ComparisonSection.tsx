"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const COMPARISON_DATA = [
  {
    before: "48,283 recruiter hours saved",
    after: "78% reduction in cost per hire",
  },
  {
    before: "$3M in direct savings",
    after: "3,768 offers made through Mastermind",
  },
  {
    before: "Time-to-offer cut by 50%",
    after: "Show-up rates 2x higher than industry average",
  },
  
];

export default function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Scroll progress for the line animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0.18, 1], ["0%", "100%"]);

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

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 bg-[#FFFFFF] bg-transparent"
    >

      {/* Central green line - animated with scroll */}
      <motion.div 
        className="pointer-events-none absolute left-1/2 top-0 w-[2px] bg-[#04BBA6] transform -translate-x-1/2"
        style={{ 
          height: lineHeight,
          boxShadow: '0 0 10px #04BBA6, 0 0 20px #04BBA6, 0 0 40px #04BBA6, 0 0 80px rgba(4, 187, 166, 0.5)',
          filter: 'blur(0.5px)'
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 100, scale: 0.9 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header with icon and arrows */}
        <div className="relative mb-16">
          {/* Title */}
          <div className="relative inline-block mb-8">
            {/* Background to block the line but preserve grid with fading effect */}
            <div className="absolute inset-0 -mx-12 -my-6 rounded-lg" 
                 style={{
                   background: 'radial-gradient(ellipse 70% 60% at center, #FFFFFF 30%, #FFFFFF 60%, transparent 80%)'
                 }}></div>
            <motion.h2 
              className="relative z-10 font-inter text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8 font-medium text-[#252527] bg-clip-text"
              style={{ 
                opacity: headingOpacity, 
                y: headingY,
                willChange: 'transform'
              }}
            >
              <span className="text-black bg-clip-text">
                Proven Results.
              </span>
              <br />
              <span className="text-black bg-clip-text">
                Measurable ROI.
              </span>
            </motion.h2>
          </div>

                     {/* Before/After indicator with arrows */}
           <div className="flex items-center justify-center gap-32 px-8 pt-64">
             {/* Left Side - Arrow with text below */}
             <div className="flex flex-col items-center gap-4">
               
               <motion.span 
                 className="text-black font-medium font-inter text-[48px] mt-10"
                 style={{ 
                   opacity: labelsOpacity, 
                   y: labelsY,
                   willChange: 'transform'
                 }}
               >
                 Cognizant x <br />BerriBot
               </motion.span>
             </div>
             
             {/* Center Icon */}
             <div className="relative w-24 h-24 flex items-center justify-center">
               {/* Background with fading effect */}
               <div className="absolute inset-0 -m-16 rounded-full" 
                    ></div>
               {/* <Image
                src="/image/logo.png"
                alt="Clock Icon"
                width={96}
                height={96}
                className="relative z-10 w-24 h-24 mr-10"
              /> */}
             </div>
             
             {/* Right Side - Arrow with text below */}
             <div className="flex flex-col items-center gap-4">
               
               <motion.span 
                 className="text-black font-medium font-inter text-[48px] mt-10"
                 style={{ 
                   opacity: labelsOpacity, 
                   y: labelsY,
                   willChange: 'transform'
                 }}
               >
                 Wipro x <br />BerriBot
               </motion.span>
             </div>
           </div>
        </div>

                 {/* Comparison table with individual content animations */}
         <div className="w-[1054px] mx-auto mt-16 relative">
           <table className="w-full">
             <tbody>
               {COMPARISON_DATA.map((item, index) => {
                 const { opacity, y } = rowAnimations[index];
                 
                 return (
                   <tr key={index}>
                     <td className="p-8 text-center border-t border-[#04BBA6]">
                       <div className="w-[180px] mx-auto">
                         <motion.p 
                           className="text-black text-[22px] leading-relaxed"
                           style={{ 
                             opacity, 
                             y,
                             willChange: 'transform'
                           }}
                         >
                           {item.before}
                         </motion.p>
                       </div>
                     </td>
                     <td className="p-8 text-center border-t border-[#04BBA6]">
                       <div className="w-[180px] mx-auto">
                         <motion.p 
                           className="text-black text-[22px] leading-relaxed"
                           style={{ 
                             opacity, 
                             y,
                             willChange: 'transform'
                           }}
                         >
                           {item.after}
                         </motion.p>
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