'use client';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import { Plus } from 'lucide-react';

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />
      
      <motion.div 
        className="relative z-10 w-full bg-[#101010] rounded-3xl p-12"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Grid pattern with + signs at grid intersections */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-[#191919]" />
            ))}
          </div>
          
          {/* + signs at every grid intersection */}
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 13 }, (_, row) => 
              Array.from({ length: 13 }, (_, col) => (
                <div 
                  key={`${row}-${col}`}
                  className="absolute text-[#191919]"
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

        <div className="flex items-center justify-center gap-16 min-h-[600px]">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-[60px] font-inter font-light leading-tight mb-8">
                <span className="bg-gradient-to-b from-white to-[#252527] text-transparent bg-clip-text">Recruiters Are</span>
                <br />
                <span className="text-[#04BBA6]">Turbocharged</span>
                <span className="bg-gradient-to-b from-white to-[#252527] text-transparent bg-clip-text"> by</span>
                <br />
                <span className="bg-gradient-to-b from-white to-[#252527] text-transparent bg-clip-text">Berribot</span>
              </h2>
              
              <p className="text-[28px] text-white font-inter leading-relaxed max-w-lg">
                From Wipro to Cognizant, Berribot helps companies save millions in recruiter hours and cut hiring time in half.
              </p>
            </motion.div>
          </div>

          {/* Right side - Stats card */}
          <div className="flex-shrink-0">
            <motion.div
              className="bg-white rounded-3xl p-12"
              style={{ 
                width: '666px', 
                height: '533px',
                boxShadow: '10px 20px 60px 2px rgba(4, 187, 166, 0.3)'
              }}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-12 h-full">
                {/* Stat 1 */}
                <div className="text-center flex flex-col justify-center">
                  <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">48,283</div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    Recruiter<br />hours saved
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="text-center flex flex-col justify-center">
                  <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">78%</div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    Reduction in<br />Cost-per-Hire
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="text-center flex flex-col justify-center">
                  <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none flex items-center justify-center">
                  2x↑
                
                  </div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    show-up rates
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="text-center flex flex-col justify-center">
                  <div className="text-[64px] font-manrope font-light text-[#007E79CF] mb-4 leading-none">$3M+</div>
                  <div className="text-[22px] font-manrope font-extralight text-[#060606] leading-tight">
                    In ROI reported<br />by Cognizant
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 