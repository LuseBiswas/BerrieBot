'use client';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion, easeInOut, useScroll, useSpring } from 'framer-motion';
import React from 'react';

/* ---------- animation preset ---------- */
const BOX_VARIANTS = {
  pulse: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.02, 1],
    transition: { duration: 3, repeat: Infinity, ease: easeInOut },
  },
};

/* ---------- box positions (unchanged) ---------- */
const BOXES = [
  { pos: 'top-[260px] left-[120px]',      delay: 0   },  // top‑left
  { pos: 'top-[170px] right-[100px]',     delay: 0.5 },  // top‑right
  { pos: 'bottom-[-30px] left-[450px]', delay: 1   },  // bottom‑left  ⟵ lives 150 px below bottom
  { pos: 'bottom-[50px] right-[275px]',       delay: 1.5 },  // bottom‑right flush to bottom
];

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center
                px-4 sm:px-6 pb-48 mb-32 overflow-visible"
    >
      {/* ---- Decorative boxes ---- */}
      <div className="absolute inset-0 pointer-events-none">
        {BOXES.map(({ pos, delay }, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-[320px] h-[320px] border-2 border-teal-400 rounded-2xl
                        will-change-[transform,opacity] transform-gpu`}
            style={{ boxShadow: '0 0 40px rgba(45,212,191,.2)' }}
            variants={BOX_VARIANTS}
            animate={prefersReduced ? undefined : 'pulse'}
            transition={{ ...BOX_VARIANTS.pulse.transition, delay }}
          />
        ))}
      </div>

      {/* ---- Tag line ---- */}
      <div className="mb-2 mt-10 relative z-10">
        <span className="inline-block text-white font-bold text-3xl">
          Automate Interviews. Verify Talent. Hire Smarter.
        </span>
      </div>

      {/* ---- Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10">
        <h1 className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8">
          <span className="text-white">The future of</span>
          <br />
          <span className="bg-gradient-to-br from-gray-500 to-gray-800 text-transparent bg-clip-text">
            Recruiting&nbsp;
          </span>
          <span className="text-teal-400">is here.</span>
        </h1>

        <p className="text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto mb-8">
          Hire high‑quality candidates at scale with AI that screens,
          <span className="hidden sm:inline">
            <br />verifies and interviews with a human touch.
          </span>
        </p>
      </div>

      {/* ---- CTA ---- */}
      <div className="mt-4 sm:mt-12 w-full sm:w-auto px-4 sm:px-0 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full
                   font-semibold text-base sm:text-lg hover:bg-gray-200 transition-colors"
        >
          Book a Demo
          <ChevronRight className="inline-block ml-2 w-4 sm:w-5 h-4 sm:h-5" />
        </motion.button>
      </div>

      {/* OFFER text */}
      <div className="absolute -bottom-20 right-4 text-white" style={{ fontFamily: 'Dogica Pixel', fontSize: '24px', letterSpacing: '1px' }}>
        OFFER
      </div>

      {/* Progress bar at bottom of section */}
      <div className="absolute -bottom-25 left-0 right-0 h-2 bg-[#04BBA6]">
        <motion.div
          className="h-full bg-white origin-left"
          style={{ scaleX }}
        />
      </div>
    </section>
  );
}
