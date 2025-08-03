'use client';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to slide up from behind footer
  const y = useTransform(scrollYProgress, [0, 0.7, 1], [400, 0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative flex items-center justify-center  z-0">
              <motion.div 
          className="bg-[url('/image/background/bg_image.png')] bg-cover bg-center rounded-t-3xl p-12 flex items-center justify-between shadow-lg"
        style={{ 
          width: '1176px', 
          height: '307px',
          y: y,
          opacity: opacity
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Left content */}
        <div className="flex-1 flex justify-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-[60px] font-inter font-medium leading-tight">
              <span className="text-white">Join the</span>
              <br />
              <span className="text-white">Berri Bulletin </span>
            </h2>
          </motion.div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-[24px] text-white font-inter font-extralight leading-relaxed">
              Want to be notified when something<br />
              new drops?<br />
              Sign up for occasional updates (no <br />
              spam, no nonsense).
            </p>
          </motion.div>
        </div>

        {/* Right content */}
        <div className="flex-1 flex justify-end">
          <motion.button
            className="bg-white text-black px-8 py-4 rounded-2xl font-inter font-light text-[16px] flex items-center gap-3 hover:bg-[#039a87] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Berri-Happily
            <div className="bg-[#181818] rounded-md p-2">
              <ArrowRight className="w-[25px] h-[25px] text-white" />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
} 