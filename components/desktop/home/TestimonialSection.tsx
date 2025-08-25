"use client"
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import TestimonialCard from "./TestimonialCard";

/* ---------- Custom Hook for Word Animation ---------- */
function useWordAnimation(scrollProgress: MotionValue<number>, wordIndex: number, lineIndex: number) {
  const lineDelay = lineIndex * 0.15;
  const wordDelay = wordIndex * 0.015;
  const startPoint = 0.2 + lineDelay + wordDelay;
  const endPoint = startPoint + 0.06;
  
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

export default function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    <section ref={ref} className="pt-24 sm:pt-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          {/* Heading Text with Inverted Comma */}
          <div className="relative inline-block">
            {/* Floating Inverted Comma Image */}
            <motion.div
              className="absolute -top-8 -left-10"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: [0, -8, 0], // Floating up and down
                rotate: [0, 2, -2, 0] // Slight rotation
              } : { opacity: 0, y: -20 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2 },
                y: { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                },
                rotate: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.5
                }
              }}
            >
              <Image
                src="/image/components/inverted_comma.png"
                alt="Inverted Comma"
                width={40}
                height={40}
                className="w-12 h-12 sm:w-14 sm:h-14"
              />
            </motion.div>

            {/* Second Floating Inverted Comma Image (Flipped) */}
            <motion.div
              className="absolute top-25 right-10"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: [0, -8, 0], // Floating up and down
                rotate: [0, -2, 2, 0] // Slight rotation (opposite direction)
              } : { opacity: 0, y: -20 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.4 },
                y: { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.2
                },
                rotate: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.8
                }
              }}
            >
              <Image
                src="/image/components/inverted_comma.png"
                alt="Inverted Comma"
                width={40}
                height={40}
                className="w-12 h-12 sm:w-14 sm:h-14 scale-x-[-1] rotate-40"
              />
            </motion.div>
            
            <motion.h2 
              className="font-inter text-[64px]  md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.5px] sm:text-6xl"
              style={{ 
                opacity: headingOpacity, 
                y: headingY,
                willChange: 'transform',
                fontFamily: 'Manrope, sans-serif' 
              }}
            >
              <span className="text-white">One Berribot. Every</span> <br />
              
              <span className="text-white bg-clip-text ">
               recruiting task.
              </span>
            </motion.h2>
            <motion.div 
              className="mt-8 font-inter text-[20px] sm:text-2xl md:text-[26px] leading-[1.4] sm:leading-[1.5] font-light max-w-[280px] sm:max-w-3xl mx-auto "
              style={{ 
                opacity: descriptionOpacity, 
                y: descriptionY,
                willChange: 'transform'
              }}
            >
              <AnimatedText 
                text="Your Complete Recruitment Command Center."
                scrollProgress={scrollYProgress}
                lineIndex={0}
              />
              <br />
              <AnimatedText 
                text="From outreach to offer, the Berri Suite delivers speed,"
                scrollProgress={scrollYProgress}
                lineIndex={1}
              />
              <br />
              <AnimatedText 
                text="accuracy, security and compliance shield."
                scrollProgress={scrollYProgress}
                lineIndex={2}
              />
            </motion.div>
          </div>
        </div>

        {/* Overlapping Cards Layout */}
        <div className="relative min-h-[750px] max-w-5xl mx-auto">
          {/* Recruiters Card (top-left) */}
          <motion.div 
            className="my-8 lg:my-0 lg:absolute lg:top-0 lg:left-[-180] lg:w-[48%] z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { 
              opacity: 1, 
              y: [0, -8, 0] // Floating up and down
            } : { opacity: 0, y: 30 }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.4 },
              y: { 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }
            }}
          >
            <TestimonialCard
              variant="gray"
              title="Digital Recruiter"
              description="Automatically search, connect <br/> and followup with candidates without <br/> getting overwhelmed."
              buttonText="Learn More"
              link="/solutions#live-texting"
            />
          </motion.div>

          {/* CHROs & Leaders Card (bottom-left) */}
          <motion.div 
            className="my-8 lg:my-0 lg:absolute lg:bottom-[310] lg:left-[250] lg:w-[48%] z-50"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { 
              opacity: 1, 
              y: [0, -6, 0] // Floating up and down
            } : { opacity: 0, y: 30 }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.6 },
              y: { 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 3
              }
            }}
          >
            <TestimonialCard
              variant="gray"
              title="Digital Interviewer"
              description="Schedule and assess candidate skills <br/> with a 24/7 Agentic interviewer."
              buttonText="Learn More"
              link="/solutions#recruitment-assistant"
            />
          </motion.div>        

          {/* Compliance Card (bottom-right) */}
          <motion.div 
            className="my-8 lg:my-0 lg:absolute lg:bottom-[450] lg:right-[-180] lg:w-[48%] z-40"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { 
              opacity: 1, 
              y: [0, -10, 0] // Floating up and down
            } : { opacity: 0, y: 30 }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.8 },
              y: { 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2.5
              }
            }}
          >
            <TestimonialCard
              variant="gray"
              title="Digital Proctor"
              description="Find verified candidates with <br/> advanced fraud detection, biometrics <br/> and authentication systems."
              buttonText="Learn More"
              link="/solutions#real-time-proctoring"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}