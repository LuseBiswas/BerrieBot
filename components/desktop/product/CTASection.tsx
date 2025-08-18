'use client';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to slide up from behind footer
  const y = useTransform(scrollYProgress, [0, 0.65, 1], [400, 0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative flex items-center justify-center mt-44 z-0 bg-black">
      <motion.div 
        className="bg-[#D9D9D9] rounded-t-3xl p-12 flex items-center justify-between shadow-lg"
        style={{ 
          width: '1200px', 
          height: '307px',
          y: y,
          opacity: opacity
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Left side - Text content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-[56px] font-inter font-medium leading-tight">
              <span className="text-black bg-clip-text">Meet the agent</span>
              <br />
              <span className="text-black bg-clip-text">that works</span>
              <br />
              <span className="text-black">without sleep.</span>
            </h2>
          </motion.div>
        </div>

        {/* Center - Subtext */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-[24px] text-[#969696] font-inter font-extralight leading-relaxed">
            Start a pilot, book a demo, or <br />
            just see how it works. <br /> 
            Your hiring can be faster,smarter, <br />
             and fraud-free.
            </p>
          </motion.div>
        </div>

        {/* Right side - CTA */}
        <div className="flex-1 flex items-center justify-center">
          <Link href="/schedule">
          <motion.button
            className="bg-[#04BBA6] text-black px-8 py-4 rounded-2xl font-inter font-light text-[16px] hover:bg-[#039a87] hover:cursor-pointer transition-colors relative overflow-hidden w-[180px] h-[56px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div 
              className="flex absolute top-1/2 -translate-y-1/2 left-[180px] -translate-x-1/2"
              initial={{ x: 0 }}
              whileHover={{ x: -180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Default state - Arrow on left */}
              <div className="flex items-center gap-3 w-[180px] justify-center">
                <div className="bg-white rounded-md p-2">
                  <ArrowRight className="w-[25px] h-[25px] text-black" />
                </div>
                Book a Demo
              </div>
              
              
              
              {/* Hover state - Arrow on right */}
              <div className="flex items-center gap-3 w-[180px] justify-center">
                Book a Demo
                <div className="bg-white rounded-md p-2">
                  <ArrowRight className="w-[25px] h-[25px] text-black" />
                </div>
              </div>
            </motion.div>
          </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
} 