'use client';
import { motion, useInView } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { trackNewsletterSignup } from '@/utils/analytics';

export default function MobileResourceCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  
  // Load lord-icon script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && emailRegex.test(email.trim())) {
      // Track newsletter signup
      trackNewsletterSignup(pathname, 'mobile', email);
      setIsSubmitted(true);
      // Here you can add actual email submission logic
      console.log('Email submitted:', email);
    }
  };

  const isValidEmail = email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

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
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {!isSubmitted ? (
            <>
              <p 
                className="text-white/80 font-light leading-relaxed mb-6"
                style={{ 
                  fontSize: '16px',
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                Want to be notified <br /> when something
                new drops?
              </p>
              <textarea
                placeholder="your.email@here.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-black px-4 rounded-[9px] font-inter resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-center mx-auto block"
                style={{
                  width: '220px',
                  height: '42px',
                  fontSize: '14px',
                  lineHeight: '42px',
                  paddingTop: '0',
                  paddingBottom: '0'
                }}
              />
            </>
          ) : (
            <motion.p 
              className="text-white font-light leading-relaxed"
              style={{ 
                fontSize: '16px',
                fontFamily: 'Manrope, sans-serif'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Thank you. <br /> See you in your mailbox!
            </motion.p>
          )}
        </motion.div>

        {/* CTA Button or Animated Icon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          {!isSubmitted ? (
            <motion.button
              onClick={handleSubmit}
              disabled={!isValidEmail}
              className={`px-4 py-2 rounded-2xl font-medium transition-colors relative overflow-hidden ${
                isValidEmail 
                  ? 'bg-[#04BBA6] text-black hover:cursor-pointer' 
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
              }`}
              style={{ 
                fontSize: '14px',
                fontFamily: 'Manrope, sans-serif',
                width: '180px',
                height: '56px'
              }}
              whileHover={isValidEmail ? { scale: 1.05 } : {}}
              whileTap={isValidEmail ? { scale: 0.95 } : {}}
            >
              <motion.div 
                className="flex absolute top-1/2 -translate-y-1/2 left-[180px] -translate-x-1/2"
                initial={{ x: 0 }}
                whileHover={{ x: -180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Default state - Arrow on right */}
                <div className="flex items-center gap-2 w-[180px] justify-center">
                  Berri-Happily
                  <div className="bg-white rounded-md" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight className="w-[20px] h-[20px] text-black" />
                  </div>
                </div>
                
                {/* Hover state - Arrow on left */}
                <div className="flex items-center gap-2 w-[180px] justify-center">
                  <div className="bg-white rounded-md" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight className="w-[20px] h-[20px] text-black" />
                  </div>
                  Berri-Happily
                </div>
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                width: '120px',
                height: '120px'
              }}
            >
              <div 
                className="transform scale-x-[-1]"
                dangerouslySetInnerHTML={{
                  __html: `<lord-icon
                    src="https://cdn.lordicon.com/ohcuigqh.json"
                    trigger="loop"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style="width:120px;height:120px">
                  </lord-icon>`
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
} 