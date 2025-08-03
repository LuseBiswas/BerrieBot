"use client"
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TestimonialCard from "./TestimonialCard";

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
    <section ref={ref} className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
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
            
            <motion.h2 
              className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px]"
              style={{ 
                opacity: headingOpacity, 
                y: headingY,
                willChange: 'transform'
              }}
            >
              <span className="text-[#04BBA6]">One Platform.</span>{" "}
              <span className="text-white">Every</span><br />
              
              <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
               Recruiting Task.
              </span>
            </motion.h2>
            <motion.p 
              className="mt-6 text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto "
              style={{ 
                opacity: descriptionOpacity, 
                y: descriptionY,
                willChange: 'transform'
              }}
            >
              From outreach to offer, the Berri Suite delivers speed, <br /> accuracy, and security—on autopilot.
            </motion.p>
          </div>
        </div>

        {/* Overlapping Cards Layout */}
        <div className="relative min-h-[750px] max-w-5xl mx-auto">
          {/* Recruiters Card (top-left) */}
          <motion.div 
            className="my-8 lg:my-0 lg:absolute lg:top-0 lg:left-[-200] lg:w-[48%] z-20"
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
              description="Automatically search, connect and followup with candidates without getting overwhelmed."
              buttonText="Learn More"
              profileImage={{
                src: "/image/profile/profile_3.jpg",
                alt: "Recruiter Profile"
              }}
            />
          </motion.div>

          {/* CHROs & Leaders Card (bottom-left) */}
          <motion.div 
            className="my-8 lg:my-0 lg:absolute lg:bottom-[310] lg:left-[220] lg:w-[48%] z-10"
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
              description="Schedule and assess candidate skills with a 24/7 Agentic interviewer."
              buttonText="Learn More"
              profileImage={{
                src: "/image/profile/profile_2.jpg",
                alt: "CHRO Profile"
              }}
            />
          </motion.div>

          {/* Candidates Card (center, prominent) */}
          {/* <div className="my-8 lg:my-0 lg:absolute lg:top-[100] lg:left-[650] lg:-translate-x-1/2 lg:w-[48%] z-30">
            <TestimonialCard
              variant="blue"
              title="Candidates"
              description="Interview anytime, anywhere. No waiting. No awkward silence. Just a conversation with our AI."
              buttonText="Learn More"
              icon={
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            }
          />
          </div> */}

         

          {/* Compliance Card (bottom-right) */}
          <motion.div 
            className="my-8 lg:my-0 lg:absolute lg:bottom-[450] lg:right-[-80] lg:w-[48%] z-40"
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
              description="Find verified candidates with advanced fraud detection, biometrics and authentication systems."
              buttonText="Learn More"
              profileImage={{
                src: "/image/profile/profile_1.jpg",
                alt: "Compliance Profile"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}