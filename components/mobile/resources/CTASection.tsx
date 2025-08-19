'use client';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileResourceCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative bg-black py-16 px-4 overflow-hidden">
      {/* Background Images */}
      {/* Top Left - 7.png */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '-120px', left: '-200px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image Top Left"
          width={377}
          height={336}
          className="w-[377.31px] h-[336px] opacity-[70%]"
        />
      </div>
      
      {/* Top Right - 8.png */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '0px', right: '-200px' }}>
        <Image 
          src="/image/mobile/8.png"
          alt="Background Image Top Right"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto text-center relative z-10">
        
        {/* Headline */}
        <motion.h2 
          className="text-white font-medium leading-tight mb-8"
          style={{ 
            fontSize: '36px',
            fontFamily: 'Manrope, sans-serif'
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join the<br />
          Berri-Bulletin
        </motion.h2>

        {/* Sub-headline */}
        <motion.p 
          className="text-white/80 font-light leading-relaxed mb-12"
          style={{ 
            fontSize: '16px',
            fontFamily: 'Manrope, sans-serif'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Want to be notified when something<br />
          new drops?<br />
          Sign up for occasional updates <br />
          (no spam, no nonsense)
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/schedule">
            <motion.button
              className="bg-[#04BBA6] text-black px-4 py-2 rounded-2xl font-medium transition-colors hover:cursor-pointer relative overflow-hidden"
              style={{ 
                fontSize: '16px',
                fontFamily: 'Manrope, sans-serif',
                width: '207px',
                height: '68px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="flex absolute top-1/2 -translate-y-1/2 left-[207px] -translate-x-1/2"
                initial={{ x: 0 }}
                whileHover={{ x: -207 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Default state - Arrow on right */}
                <div className="flex items-center gap-3 w-[207px] justify-center">
                  Berri-Happily
                  <div className="bg-white rounded-md" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight className="w-[24px] h-[24px] text-black" />
                  </div>
                </div>
                
                {/* Hover state - Arrow on left */}
                <div className="flex items-center gap-3 w-[207px] justify-center">
                  <div className="bg-white rounded-md" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight className="w-[24px] h-[24px] text-black" />
                  </div>
                  Berri-Happily
                </div>
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 