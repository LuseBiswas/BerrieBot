"use client";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";
import FeatureCardItem from "./FeatureCardItem";

/* ---------- Custom Hook for Word Animation ---------- */
function useWordAnimation(scrollProgress: MotionValue<number>, wordIndex: number, lineIndex: number) {
  const lineDelay = lineIndex * 0.25; // Increased delay between lines
  const wordDelay = wordIndex * 0.015; // Increased delay between words
  const startPoint = 0.3 + lineDelay + wordDelay; // Later start point
  const endPoint = startPoint + 0.08; // Longer animation duration
  
  const wordProgress = useTransform(
    scrollProgress,
    [startPoint, endPoint],
    [0, 1]
  );
  
  const colorTransform = useTransform(
    wordProgress,
    [0, 1],
    ["#6B7280", "#FFFFFF"]
  );
  
  return { wordProgress, colorTransform };
}

/* ---------- Animated Word Component ---------- */
function AnimatedWord({ 
  word, 
  wordIndex, 
  scrollProgress, 
  lineIndex 
}: { 
  word: string; 
  wordIndex: number; 
  scrollProgress: MotionValue<number>; 
  lineIndex: number; 
}) {
  const { colorTransform } = useWordAnimation(scrollProgress, wordIndex, lineIndex);
  
  return (
    <motion.span
      style={{ color: colorTransform }}
      className="inline-block mr-1"
    >
      {word}
    </motion.span>
  );
}

/* ---------- Animated Text Component ---------- */
function AnimatedText({ 
  text, 
  scrollProgress,
  lineIndex = 0
}: { 
  text: string; 
  scrollProgress: MotionValue<number>;
  lineIndex?: number;
}) {
  const words = text.split(' ');
  
  return (
    <span>
      {words.map((word, wordIndex) => (
        <AnimatedWord
          key={wordIndex}
          word={word}
          wordIndex={wordIndex}
          scrollProgress={scrollProgress}
          lineIndex={lineIndex}
        />
      ))}
    </span>
  );
}

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
  const bottomLeftCardX = useTransform(scrollYProgress, [0, 0.8, 0.95, 1], [-400, 0, 0, -400]);
  const bottomRightCardX = useTransform(scrollYProgress, [0, 0.7, 0.95, 1], [400, 0, 0, 400]);

  return (
    <section
      ref={ref}
      className="relative h-[2530px] flex items-center justify-center py-20 "
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
            
            <h2 className="font-inter text-[64px]  md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.5px] sm:text-6xl mb-8 font-medium text-[#252527] bg-clip-text" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <span className="text-white bg-clip-text">Recruiting</span>
              <br />
              <span className="text-white bg-clip-text">designed for the</span>
              <br />
              <span className="text-white">AI Era</span>
            </h2>
            
          </div>
          
          <div className="relative z-10 mt-6 text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-[280px] sm:max-w-3xl mx-auto mb-6">
            <AnimatedText 
              text="From outreach to offer, the BerriSuite delivers speed,"
              scrollProgress={scrollYProgress}
              lineIndex={0}
            />
            <br />
            <AnimatedText 
              text="accuracy, and security — on autopilot."
              scrollProgress={scrollYProgress}
              lineIndex={1}
            />
          </div>
        </div>
      </div>

      {/* feature cards - manually positioned */}
      <div className="relative w-full h-[1500px] max-w-7xl mx-auto mt-350">
        {/* Top Left */}
        <motion.div 
          className="absolute bottom-580 right-250 w-80"
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
            title="The interviewer <br/> that never sleeps"
            description="Candidates interview <br/> anytime. Recruiters wake up <br/> to scored reports."
            index={0}
            isInView={true}
          />
        </motion.div>

        {/* Top Right */}
        <motion.div 
          className="absolute bottom-520 left-185 w-80"
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
            title="An AI agent <br/> that feels human"
            description="Natural voice and chat interactions, localised, empathetic, and fluid."
            index={1}
            isInView={true}
          />
        </motion.div>

        {/* Middle Left */}
        <motion.div 
          className="absolute bottom-400 right-258 transform -translate-y-1/2 w-80"
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
          className="absolute top-192 right-250 w-80"
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
            description="Catch impersonators before <br/> they waste your time. 3D liveness, lip-sync, and more."
            index={3}
            isInView={true}
          />
        </motion.div>

        {/* Bottom Right */}
        <motion.div 
          className="absolute top-135 right-50 w-80"
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
            lordicon="https://cdn.lordicon.com/jwpaspoo.json"
            title="Flexible pricing"
            description="Use what you need.<br/> Pre-paid credits."
            index={4}
            isInView={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
