'use client';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
  
  // Scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to slide up from behind footer
  const y = useTransform(scrollYProgress, [0, 0.7, 1], [400, 0, -0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const handleSubmit = () => {
    // Open new tab with the Substack embed URL
    window.open('https://berribot.substack.com/embed', '_blank');
    // Show thank you message
    setIsSubmitted(true);
  };

  return (
    <section ref={ref} className="relative flex items-center justify-center  z-0 bg-transparent">
              <motion.div 
          className="bg-[url('/image/background/bg_image_7.png')] bg-cover bg-center rounded-t-3xl p-12 flex items-center justify-between shadow-lg"
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
            className="text-center flex flex-col items-center"
          >
            {!isSubmitted ? (
              <p className="text-[24px] text-white font-inter font-extralight leading-relaxed">
                Want to be notified <br /> when something new drops?
              </p>
            ) : (
              <motion.p 
                className="text-[24px] text-white font-inter font-extralight leading-relaxed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Thanks for subscribing <br /> - we glad to have you with us!
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Right content */}
        <div className="flex-1 flex justify-end">
          {!isSubmitted ? (
            <motion.button
              onClick={handleSubmit}
              className="px-8 py-4 rounded-md font-inter font-light text-[16px] transition-colors relative overflow-hidden w-[180px] h-[56px] bg-white text-black hover:cursor-pointer"
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
                  <div className="bg-[#181818] rounded-md p-2">
                    <ArrowRight className="w-[25px] h-[25px] text-white" />
                  </div>
                  Berri-Happily
                </div>
                
                {/* Hover state - Arrow on right */}
                <div className="flex items-center gap-3 w-[180px] justify-center">
                  Berri-Happily
                  <div className="bg-[#181818] rounded-md p-2">
                    <ArrowRight className="w-[25px] h-[25px] text-white" />
                  </div>
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
                width: '187px',
                height: '187px'
              }}
            >
              <div 
                className="transform scale-x-[-1]"
                dangerouslySetInnerHTML={{
                  __html: `<lord-icon
                    src="https://cdn.lordicon.com/ohcuigqh.json"
                    trigger="loop"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style="width:187px;height:187px">
                  </lord-icon>`
                }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
} 