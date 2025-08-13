'use client';
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function CarouselSection_2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Scroll-based animations for heading (entrance and outro)
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [50, 0, 0, -50]);

  // Scroll-based animations for description (entrance and outro)
  const descriptionOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const descriptionY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [30, 0, 0, -30]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center mt-[-40px] ">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-0" />
      
      <motion.div 
        className="relative z-10 w-full text-center bg-[#101010] rounded-3xl p-12"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Grid pattern with + signs at grid intersections */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10">
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
                  className="absolute text-white opacity-[10%]"
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
        
                  {/* Headline */}
          <div className="space-y-4 mb-12">
            <motion.h2 
              className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px]"
              style={{ 
                opacity: headingOpacity, 
                y: headingY,
                willChange: 'transform'
              }}
            >
              <span className="text-[#969696]">Hiring Is Broken</span> <br />
              <span className="text-teal-400">We&apos;re Fixing It</span> <span className='text-[#969696]'>with</span>
              <br />
              <span className="text-[#969696]">AI Agents {""}</span>
            </motion.h2>
            <motion.p 
              className="text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto mb-8"
              style={{ 
                opacity: descriptionOpacity, 
                y: descriptionY,
                willChange: 'transform'
              }}
            >
              Modern hiring is slow, expensive, and riddled with inefficiencies. Your best recruiters are stuck doing repetitive tasks. Your best candidates drop off. Fraudsters sneak in.
            </motion.p>
          </div>

          {/* Statistics Box */}
          <motion.div 
            className="relative bg-white rounded-3xl mx-auto mb-12"
            style={{
              width: '890px',
              height: '279px',
              boxShadow: '0 20px 40px rgba(45, 212, 191, 0.15)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Bottom right glow */}
            <div 
              className="absolute bottom-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl"
              style={{ transform: 'translate(25%, 25%)' }}
            />
            
            <div className="relative flex h-full">
              {/* First Stat */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="font-mono text-[#007E79CF] text-[64px] font-light mb-3">
                  &gt;60%
                </div>
                <p className="text-[#060606] font-mono text-base font-light text-[13px]">
                  of recruiter time is<br />
                  lost to repetitive<br />
                  tasks
                </p>
              </div>
              
              {/* First Divider */}
              <div className="w-px bg-teal-400/30 mx-4" style={{ marginTop: '60px', marginBottom: '60px' }} />
              
              {/* Second Stat */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="font-mono text-[#007E79CF] text-[64px] font-light mb-3">
                  &gt;40%
                </div>
                <p className="text-[#060606] font-mono text-base font-light text-[13px] ">
                  interview no-<br />
                  show rates
                </p>
              </div>
              
              {/* Second Divider */}
              <div className="w-px bg-teal-400/30 mx-4" style={{ marginTop: '60px', marginBottom: '60px' }} />
              
              {/* Third Stat */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="font-mono text-[#007E79CF] text-[64px] font-light mb-3">
                  30%
                </div>
                <p className="text-[#060606] font-mono text-base font-light text-[13px]">
                  of resumes are<br />
                  misrepresented
                </p>
              </div>
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p 
            className="text-base sm:text-xl leading-[1.4] sm:leading-[1.6] text-[24px] font-inter font-light text-white/80 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <span className='text-[#04BBA6]'>We built Berribot to flip the script. </span> With autonomous AI agents that handle <br />
             communication, screening, interviews, and fraud checks, we help you hire <br /> faster, better - and with zero drama.
          </motion.p>

       
      </motion.div>
    </section>
  );
} 