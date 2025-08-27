"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import FeatureCardItem from "./FeatureCardItem";

/* ---------- Custom Hook for Word Animation ---------- */
// Commented out unused function to avoid ESLint warning
// function useWordAnimation(scrollProgress: MotionValue<number>, wordIndex: number, lineIndex: number) {
//   const lineDelay = lineIndex * 0.25; // Increased delay between lines
//   const wordDelay = wordIndex * 0.015; // Increased delay between words
//   const startPoint = 0.3 + lineDelay + wordDelay; // Later start point
//   const endPoint = startPoint + 0.08; // Longer animation duration
//   
//   const wordProgress = useTransform(
//     scrollProgress,
//     [startPoint, endPoint],
//     [0, 1]
//   );
//   
//   const colorTransform = useTransform(
//     wordProgress,
//     [0, 1],
//     ["#6B7280", "#FFFFFF"]
//   );
//   
//   return { wordProgress, colorTransform };
// }



export default function MobileFeatureCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });
  
  // Scroll progress for the line animation
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Use scroll position to drive line animation like in LineSection
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  
  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setSectionTop(window.scrollY + rect.top);
      setSectionHeight(rect.height);
    };
    
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const timeout = setTimeout(measure, 100);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  
  // Calculate line height based on scroll position
  const lineHeight = useTransform(scrollY, (y) => {
    if (!sectionHeight) return "10%";
    const viewportCenter = y + window.innerHeight / 2;
    const relativePosition = viewportCenter - sectionTop;
    const progress = Math.max(0, Math.min(1, relativePosition / sectionHeight));
    return `${10 + (progress * 90)}%`;
  });

  // Transform scroll progress for card animations - mobile optimized
  const leftCardX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-200, 0, 0, -200]);
  const rightCardX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [200, 0, 0, 200]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Separate transforms for bottom cards
  const bottomLeftCardX = useTransform(scrollYProgress, [0, 0.8, 0.95, 1], [-200, 0, 0, -200]);
  const bottomRightCardX = useTransform(scrollYProgress, [0, 0.7, 0.95, 1], [200, 0, 0, 200]);

  return (
    <section
      ref={ref}
      className="relative h-[2120px] flex items-center justify-center py-10 px-4 bg-transparent"
    >


      {/* vertical teal line - animated with scroll */}
      <motion.div 
        className="pointer-events-none absolute left-1/2 top-0 w-[2px] bg-[#04BBA6] transform -translate-x-1/2"
        style={{ 
          height: lineHeight,
          boxShadow: '0 0 10px #04BBA6, 0 0 20px #04BBA6, 0 0 40px #04BBA6, 0 0 80px rgba(4, 187, 166, 0.5)',
          filter: 'blur(0.5px)'
        }}
      />

      {/* Top Left Background Image - behind top left card */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '-85px', left: '-200px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Top Left Background"
          width={377}
          height={336}
          className="w-[377.31px] h-[336px] opacity-[35%]"
        />
      </div>

      {/* ---------- CENTERED HEADLINE + SUBTITLE (mobile optimized) ---------- */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 flex flex-col items-center justify-start mt-20 text-center z-20">
        
        {/* Background Image - positioned between radial blur and text */}
        <div className="absolute z-8 pointer-events-none" style={{ top: '530px', right: '-300px', transform: 'translateX(-50%)' }}>
          <Image 
            src="/image/mobile/6.png"
            alt="Background Image"
            width={544}
            height={462}
            className="w-[543.6px] h-[462px] opacity-50"
          />
        </div>
        <div className="relative px-4 py-4 inline-block text-center">
          {/* Background to block the line but preserve grid with fading effect */}
          <div className="absolute inset-0 -mx-6 -my-4 rounded-lg" 
               style={{
                 background: 'radial-gradient(ellipse 50% 60% at center, #000000 40%, #000000 70%, transparent 80%)'
               }}></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Star Image */}
            <Image 
              src="/image/mobile/Star_blue.png"
              alt="Blue Star"
              width={54}
              height={60}
              className="w-[54px] h-[60px] mb-4"
            />
            
            <h2 className="text-[58px] sm:text-[58px] tracking-[-1px] mb-6 font-medium text-[#252527] bg-clip-text " style={{ fontFamily: 'Manrope, sans-serif' }}>
              <span className="text-white bg-clip-text">Recruiting</span>
              <br />
              <span className="text-white bg-clip-text">designed for</span>
              <br />
              <span className="text-white">the AI Era</span>
            </h2>
            
          </div>
        
        </div>
      </div>

      {/* feature cards - mobile layout */}
      <div className="relative w-full h-[1200px] max-w-sm mx-auto mt-200">
        {/* Top Left */}
        <motion.div 
          className="absolute bottom-[1300px] left-[0px] w-full"
          style={{ 
            x: leftCardX,
            opacity: cardOpacity
          }}
          animate={isInView ? { 
            y: [0, -8, 0] // Floating up and down
          } : {}}
          transition={{ 
            y: { 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }
          }}
        >
          <FeatureCardItem
            icon="/image/icons/clock.png"
            lordicon="https://cdn.lordicon.com/vnlbhttp.json"
            title="The interviewer that never sleeps"
            description="Candidates interview anytime. Recruiters wake up to scored reports."
            index={0}
            isInView={true}
          />
        </motion.div>

        {/* Top Right */}
        <motion.div 
          className="absolute bottom-[1000px] right-[-110px] w-full"
          style={{ 
            x: rightCardX,
            opacity: cardOpacity
          }}
          animate={isInView ? { 
            y: [0, -6, 0] // Floating up and down
          } : {}}
          transition={{ 
            y: { 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2.5
            }
          }}
        >
          <FeatureCardItem
          
            lordicon="https://cdn.lordicon.com/bmkseyni.json"
            title="An AI agent that feels human"
            description="Natural voice and chat interactions, localised, empathetic, and fluid."
            index={1}
            isInView={true}
          />
        </motion.div>

        {/* Middle Left */}
        <motion.div 
          className="absolute bottom-[700px] left-[-10px] w-full"
          style={{ 
            x: leftCardX,
            opacity: cardOpacity
          }}
          animate={isInView ? { 
            y: [0, -10, 0] // Floating up and down
          } : {}}
          transition={{ 
            y: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1.5
            }
          }}
        >
          <FeatureCardItem
          lordicon="https://cdn.lordicon.com/adbkylwa.json"
            title="Fits your workflow"
            description="Integrates with ATS systems like Workday, SAP, SuccessFactors, and MS Teams."
            index={2}
            isInView={true}
          />
        </motion.div>

        {/* Bottom Left */}
        <motion.div 
          className="absolute bottom-[400px] right-[-150px] w-full"
          style={{ 
            x: bottomLeftCardX,
            opacity: cardOpacity
          }}
          animate={isInView ? { 
            y: [0, -7, 0] // Floating up and down
          } : {}}
          transition={{ 
            y: { 
              duration: 5.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 3
            }
          }}
        >
          <FeatureCardItem
            lordicon="https://cdn.lordicon.com/xxmxrhzj.json"
            title="Built-in fraud detection"
            description="Catch impersonators before they waste your time. 3D liveness, lip-sync, and more."
            index={3}
            isInView={true}
          />
        </motion.div>

        {/* Bottom Right */}
        <motion.div 
          className="absolute bottom-[100px] left-[-10px] w-full"
          style={{ 
            x: bottomRightCardX,
            opacity: cardOpacity
          }}
          animate={isInView ? { 
            y: [0, -9, 0] // Floating up and down
          } : {}}
          transition={{ 
            y: { 
              duration: 4.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }
          }}
        >
          <FeatureCardItem
            lordicon="https://cdn.lordicon.com/yndmpipg.json"
            title="Flexible pricing"
            description="Use what you need. Pre-paid credits."
            index={4}
            isInView={true}
          />
        </motion.div>
      </div>
    </section>
  );
} 