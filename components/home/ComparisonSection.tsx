"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import Image from "next/image";

const COMPARISON_DATA = [
  {
    before: "Manual scheduling & chasing",
    after: "9.5 recruiter hours saved per offer",
  },
  {
    before: "25+ days to hire",
    after: "10-day time-to-offer",
  },
  {
    before: "33% select-to-offer ratio",
    after: "78% select-to-offer ratio",
  },
  {
    before: "Fraud detection is manual or absent",
    after: "$198 saved per candidate interview",
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
      className="relative min-h-screen flex items-center justify-center py-20 bg-[#101010]"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />

      {/* Grid pattern with + signs at grid intersections */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
          {Array.from({ length: 144 }, (_, i) => (
            <div key={i} className="border border-white/20 opacity-[5%]" />
          ))}
        </div>
        
        {/* + signs at every grid intersection */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 13 }, (_, row) => 
            Array.from({ length: 13 }, (_, col) => (
              <div 
                key={`${row}-${col}`}
                className="absolute text-white/20 opacity-[10%]"
                style={{
                  top: `${row * (100/12)}%`,
                  left: `${col * (100/12)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Plus className="w-9 h-9" />
              </div>
            ))
          )}
        </div>
      </div>

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
                   background: 'radial-gradient(ellipse 70% 60% at center, #101010 30%, #101010 60%, transparent 80%)'
                 }}></div>
            <motion.h2 
              className="relative z-10 text-[64px] sm:text-6xl md:text-7xl lg:text-8xl font-inter font-light leading-24"
              style={{ 
                opacity: headingOpacity, 
                y: headingY,
                willChange: 'transform'
              }}
            >
              <span className="bg-gradient-to-r from-white to-[#ADADAEB0] text-transparent bg-clip-text">
                Proven to
              </span>{" "}
              <br />
              <span className="bg-gradient-to-r from-white to-[#ADADAEB0] text-transparent bg-clip-text">
                deliver at scale.
              </span>
            </motion.h2>
          </div>

                     {/* Before/After indicator with arrows */}
           <div className="flex items-center justify-center gap-32 px-8 pt-64">
             {/* Left Side - Arrow with text below */}
             <div className="flex flex-col items-center gap-4">
               <div className="flex items-center">
                 <ArrowLeft className="w-8 h-8 text-white -mr-2" strokeWidth={2} />
                 <div className="w-24 h-0.5 bg-white"></div>
               </div>
               <motion.span 
                 className="text-white font-medium font-inter text-[48px] mt-10"
                 style={{ 
                   opacity: labelsOpacity, 
                   y: labelsY,
                   willChange: 'transform'
                 }}
               >
                 BEFORE
               </motion.span>
             </div>
             
             {/* Center Icon */}
             <div className="relative w-24 h-24 flex items-center justify-center">
               {/* Background with fading effect */}
               <div className="absolute inset-0 -m-16 rounded-full" 
                    style={{
                      background: 'radial-gradient(circle, #101010 20%, #101010 40%, transparent 70%)'
                    }}></div>
               <Image
                src="/image/logo.png"
                alt="Clock Icon"
                width={96}
                height={96}
                className="relative z-10 w-24 h-24 mr-10"
              />
             </div>
             
             {/* Right Side - Arrow with text below */}
             <div className="flex flex-col items-center gap-4">
               <div className="flex items-center">
                 <div className="w-24 h-0.5 bg-white"></div>
                 <ArrowRight className="w-8 h-8 text-white -ml-2" strokeWidth={2} />
               </div>
               <motion.span 
                 className="text-white font-medium font-inter text-[48px] mt-10"
                 style={{ 
                   opacity: labelsOpacity, 
                   y: labelsY,
                   willChange: 'transform'
                 }}
               >
                 AFTER
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
                     <td className="p-8 text-center border-t border-white/20">
                       <div className="w-[180px] mx-auto">
                         <motion.p 
                           className="text-white text-[22px] leading-relaxed"
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
                     <td className="p-8 text-center border-t border-white/20">
                       <div className="w-[180px] mx-auto">
                         <motion.p 
                           className="text-white text-[22px] leading-relaxed"
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