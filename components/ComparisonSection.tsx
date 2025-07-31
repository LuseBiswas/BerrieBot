"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 bg-[#101010]"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-0" />

      {/* Central green line - animated with scroll */}
      <motion.div 
        className="pointer-events-none absolute left-1/2 top-0 w-px bg-[#04BBA6]"
        style={{ height: lineHeight }}
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
          <h2 className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl font-inter font-light leading-24 bg-[#101010] mb-8">
            <span className="bg-gradient-to-r from-white to-[#ADADAEB0] text-transparent bg-clip-text">
              Proven to
            </span>{" "}
            <br />
            <span className="bg-gradient-to-r from-white to-[#ADADAEB0] text-transparent bg-clip-text">
              deliver at scale.
            </span>
          </h2>

                     {/* Before/After indicator with arrows */}
           <div className="flex items-center justify-center gap-8 px-8 pt-64">
             {/* Left Side - Arrow with text below */}
             <div className="flex flex-col items-center gap-4">
               <div className="flex items-center">
                 <ArrowLeft className="w-8 h-8 text-white -mr-2" strokeWidth={2} />
                 <div className="w-24 h-0.5 bg-white"></div>
               </div>
               <span className="text-white font-medium font-inter text-[48px] mt-10">BEFORE</span>
             </div>
             
             {/* Center Icon */}
             <div className="w-52 h-52 bg-[#101010] rounded-full flex items-center justify-center">
               <img
                 src="/image/logo.png"
                 alt="Clock Icon"
                 className="w-24 h-24 mr-10"
               />
             </div>
             
             {/* Right Side - Arrow with text below */}
             <div className="flex flex-col items-center gap-4">
               <div className="flex items-center">
                 <div className="w-24 h-0.5 bg-white"></div>
                 <ArrowRight className="w-8 h-8 text-white -ml-2" strokeWidth={2} />
               </div>
               <span className="text-white font-medium font-inter text-[48px] mt-10">AFTER</span>
             </div>
           </div>
        </div>

                 {/* Comparison table */}
         <div className="w-[1054px] mx-auto mt-16 relative">
           <table className="w-full">
             <tbody>
               {COMPARISON_DATA.map((item, index) => (
                 <motion.tr
                   key={index}
                   initial={{ opacity: 0, y: 50 }}
                   animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                   transition={{
                     duration: 0.6,
                     delay: index * 0.1,
                     ease: "easeOut",
                   }}
                 >
                   <td className="p-8 text-center border-t border-white/20">
                     <div className="w-[180px] mx-auto">
                       <p className="text-white text-[22px] leading-relaxed ">
                         {item.before}
                       </p>
                     </div>
                   </td>
                   <td className="p-8 text-center border-t border-white/20">
                     <div className="w-[180px] mx-auto">
                       <p className="text-white text-[22px] leading-relaxed">
                         {item.after}
                       </p>
                     </div>
                   </td>
                 </motion.tr>
               ))}
             </tbody>
           </table>
           

         </div>
      </motion.div>
    </section>
  );
}