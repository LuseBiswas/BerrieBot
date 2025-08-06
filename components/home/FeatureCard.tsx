"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import FeatureCardItem from "./FeatureCardItem";

export default function FeatureCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  
  // Scroll progress for the line animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to line height - sync with CompaniesSection
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  // Transform scroll progress for card animations
  const leftCardX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-400, 0, 0, -400]);
  const rightCardX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [400, 0, 0, 400]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Separate transforms for bottom cards
  const bottomLeftCardX = useTransform(scrollYProgress, [0, 0.8, 0.85, 1], [-400, 0, 0, -400]);
  const bottomRightCardX = useTransform(scrollYProgress, [0, 0.7, 0.8, 1], [400, 0, 0, 400]);
  const bottomCardOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[1930px] flex items-center justify-center py-20 "
    >
      {/* background grid */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />

      {/* vertical teal line - animated with scroll */}
      <motion.div 
        className="pointer-events-none absolute left-1/2 top-0 w-[2px] bg-[#04BBA6] transform -translate-x-1/2"
        style={{ 
          height: lineHeight,
          boxShadow: '0 0 10px #04BBA6, 0 0 20px #04BBA6, 0 0 40px #04BBA6, 0 0 80px rgba(4, 187, 166, 0.5)',
          filter: 'blur(0.5px)'
        }}
      />

      {/* ---------- CENTERED HEADLINE + SUBTITLE (only change) ---------- */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center z-20">
        <div className="relative px-8 py-4 inline-block text-center">
          {/* Background to block the line but preserve grid with fading effect */}
          <div className="absolute inset-0 -mx-12 -my-6 rounded-lg" 
               style={{
                 background: 'radial-gradient(ellipse 50% 60% at center, #000000 40%, #000000 70%, transparent 80%)'
               }}></div>
          <div className="relative z-10 flex items-center gap-3 justify-center">
            
            <h2 className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px]">
              <span className="text-white bg-clip-text">Recruiting</span>
              <br />
              <span className="text-white bg-clip-text">designed for the</span>
              <br />
              <span className="text-white">AI Era</span>
            </h2>
            
          </div>
          
          <p className="relative z-10 mt-6 text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto">
            From outreach to offer, the BerriSuite delivers speed, 
            accuracy, and security&nbsp;— on autopilot.
          </p>
        </div>
      </div>

      {/* feature cards - manually positioned */}
      <div className="relative w-full h-[600px] max-w-7xl mx-auto mt-20">
        {/* Top Left */}
        <motion.div 
          className="absolute bottom-200 right-290 w-80"
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
            title="The Interviewer that Never Sleeps"
            description="Candidates interview anytime. Recruiters wake up to scored reports."
            index={0}
            isInView={true}
          />
        </motion.div>

        {/* Top Right */}
        <motion.div 
          className="absolute bottom-180 left-235 w-80"
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
            icon="/image/icons/contact.png"
            title="An Agent that feels Human"
            description="Natural voice and chat interactions, localised, empathetic, and fluid."
            index={1}
            isInView={true}
          />
        </motion.div>

        {/* Middle Left */}
        <motion.div 
          className="absolute top-20 right-318 transform -translate-y-1/2 w-80"
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
          icon="/image/icons/contact.png"
            title="Fits Your Workflow"
            description="Integrates with ATS systems like Workday, SAP, SuccessFactors, and MS Teams."
            index={2}
            isInView={true}
          />
        </motion.div>

        {/* Bottom Left */}
        <motion.div 
          className="absolute top-192 right-280 w-80"
          style={{ 
            x: bottomLeftCardX,
            opacity: bottomCardOpacity
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
            icon="/image/icons/computer.png"
            title="Built-In Fraud Detection"
            description="Catch impersonators before they waste your time. 3D liveness, lip-sync, and more."
            index={3}
            isInView={true}
          />
        </motion.div>

        {/* Bottom Right */}
        <motion.div 
          className="absolute top-135 right-[-40] w-80"
          style={{ 
            x: bottomRightCardX,
            opacity: bottomCardOpacity
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
            icon="/image/icons/bill.png"
            title="Flexible Pricing"
            description="Use what you need. P credits or pay-as-you-go."
            index={4}
            isInView={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
