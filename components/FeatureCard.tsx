"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import FeatureCardItem from "./FeatureCardItem";

/* ---------- feature list ---------- */
const FEATURES = [
  {
    id: 1,
    title: "The Interviewer that Never Sleeps",
    description:
      "Candidates interview anytime. Recruiters wake up to scored reports.",
    icon: "/image/icons/clock.png",
  },
  {
    id: 2,
    title: "An Agent that feels Human",
    description:
      "Natural voice and chat interactions, localised, empathetic, and fluid.",
    icon: "/image/icons/contact.png",
  },
  {
    id: 3,
    title: "Fits Your Workflow",
    description:
      "Integrates with ATS systems like Workday, SAP, SuccessFactors, and MS Teams.",
    icon: null, // No icon for this one
  },
  {
    id: 4,
    title: "Built-In Fraud Detection",
    description:
      "Catch impersonators before they waste your time. 3D liveness, lip-sync, and more.",
    icon: "/image/icons/computer.png",
  },
  {
    id: 5,
    title: "Flexible Pricing",
    description: "Use what you need. P credits or pay-as-you-go.",
    icon: "/image/icons/bill.png",
  },
];

export default function FeatureCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Scroll progress for the line animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative h-[1930px] flex items-center justify-center py-20 mb-11"
    >
      {/* background grid */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />

      {/* vertical teal line - animated with scroll */}
      <motion.div 
        className="pointer-events-none absolute left-1/2 top-0 w-px bg-[#04BBA6]"
        style={{ height: lineHeight }}
      />

      {/* ---------- CENTERED HEADLINE + SUBTITLE (only change) ---------- */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center z-20">
        <div className="bg-black px-8 py-4 inline-block text-center">
          <div className="flex items-center gap-3 justify-center">
            
            <h2 className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl font-inter font-medium leading-24">
              <span className="bg-gradient-to-r from-white to-gray-950 text-transparent bg-clip-text">Recruiting</span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-950 text-transparent bg-clip-text">designed for the</span>
              <br />
              <span className="text-teal-400">AI Era</span>
            </h2>
            
          </div>
          
          <p className="mt-6 text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-3xl mx-auto">
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
          initial={{ x: -400, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -400, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
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
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
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
          className="absolute top-20 right-340 transform -translate-y-1/2 w-80"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
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
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
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
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
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
