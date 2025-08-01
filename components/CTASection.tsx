'use client';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="flex items-center justify-center mt-44 ">
      <motion.div 
        className="bg-[#D9D9D9] rounded-t-3xl p-12 flex items-center justify-between shadow-lg"
        style={{ width: '996px', height: '307px' }}
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
            <h2 className="text-[60px] font-inter font-medium leading-tight">
              <span className="bg-gradient-to-b from-[#252527] to-[#ADADAEB0] text-transparent bg-clip-text">Let's make</span>
              <br />
              <span className="bg-gradient-to-b from-[#252527] to-[#ADADAEB0] text-transparent bg-clip-text">it happen -</span>
              <br />
              <span className="text-[#04BBA6]">on Your Cue.</span>
            </h2>
          </motion.div>
        </div>

        {/* Right side - Subtext and CTA */}
        <div className="flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-[24px] text-[#969696] font-inter font-extralight leading-relaxed">
              Your next 10,000 hires<br />
              can be faster, smarter,<br />
              & fraud-free.
            </p>
          </motion.div>
          
          <motion.button
            className="bg-[#04BBA6] text-black px-8 py-4 rounded-2xl font-inter font-light text-[16px] flex items-center gap-3 hover:bg-[#039a87] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Book a Demo
            <div className="bg-white rounded-md p-2">
              <ArrowRight className="w-[25px] h-[25px] text-black" />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
} 