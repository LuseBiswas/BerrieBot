"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  easeInOut,
  useScroll,
  useSpring,
} from "framer-motion";
import React, { useEffect, useState } from "react";

/* ---------- inner-box pulse ---------- */
const CORE_VARIANTS = {
  pulse: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.02, 1],
    transition: { duration: 3, repeat: Infinity, ease: easeInOut },
  },
};

/* ---------- decorative-box positions ---------- */
const BOXES = [
  { pos: "top-[260px] left-[60px]", delay: 0 },
  { pos: "top-[170px] right-[50px]", delay: 0.5 },
  { pos: "bottom-[-150px] left-[450px]", delay: 1 },
  { pos: "bottom-[-20px] right-[175px]", delay: 1.5 },
];

/* ---------- text-scramble helper ---------- */
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function TextScramble({ currentText }: { currentText: string }) {
  const [displayText, setDisplayText] = useState(currentText);

  useEffect(() => {
    if (displayText === currentText) return;
    const id = setInterval(() => {
      setDisplayText((prev) =>
        prev === currentText
          ? prev
          : prev
              .split("")
              .map((ch, i) =>
                ch === currentText[i]
                  ? ch
                  : chars[Math.floor(Math.random() * chars.length)]
              )
              .join("")
      );
    }, 50);
    return () => clearInterval(id);
  }, [currentText, displayText]);

  return (
    <div className="font-['Dogica_Pixel'] text-[24px] tracking-[1px]">
      {displayText}
    </div>
  );
}

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const ref = React.useRef(null);

  /* ---------- scroll-linked progress bar ---------- */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ---------- headline word swap ---------- */
  const [displayText, setDisplayText] = useState("APPLY");
  useEffect(() => {
    const unsub = scrollYProgress.onChange((v) => {
      if (v >= 0.65) setDisplayText("OFFER");
      else if (v <= 0.6) setDisplayText("APPLY");
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pb-48 mb-80 overflow-visible">
      {/* ---- Decorative boxes: thin dash races around border ---- */}
      <div className="absolute inset-0 pointer-events-none">
        {BOXES.map(({ pos, delay }, idx) => (
          <div
            key={idx}
            className={`absolute ${pos} w-[156px] h-[156px] rounded-2xl bg-[#0a0908]`}
          >
            {/* SVG border highlight */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              fill="none"
              strokeLinecap="round"
              preserveAspectRatio="none"
              initial={{ strokeDashoffset: 0 }}
              animate={
                prefersReduced
                  ? undefined
                  : {
                      strokeDashoffset: -384, // perimeter ≈ 384
                      transition: {
                        duration: 6,
                        ease: "linear",
                        repeat: Infinity,
                        delay,
                      },
                    }
              }
            >
              {/* 50-unit dash, 334-unit gap → longer moving line */}
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                rx="10"
                ry="10"
                stroke="#14b8a6"
                strokeWidth="0.7"
                strokeDasharray="50 334"
              />
            </motion.svg>

            {/* Inner core with soft pulse */}
            <motion.div
              className="absolute inset-0 rounded-xl border border-white/15"
              variants={CORE_VARIANTS}
              animate={prefersReduced ? undefined : "pulse"}
              transition={{ ...CORE_VARIANTS.pulse.transition, delay }}
            />
          </div>
        ))}
      </div>

      {/* ---- Tag line ---- */}
      <div className="mb-2 mt-10 relative z-10">
        <span className="inline-blocktext-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto">
          Automate Interviews. Verify Talent. Hire Smarter.
        </span>
      </div>

      {/* ---- Heading ---- */}
      <div className="text-center w-full max-w-5xl mx-auto relative z-10">
        <h1 className="text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-3.69px] mb-8">
          <span className="text-white">The future of</span>
          <br />
          <span className="bg-gradient-to-br from-white to-gray-500 text-transparent bg-clip-text">
            Recruiting&nbsp;
          </span>
          <span className="text-teal-400">is here.</span>
        </h1>

        <p className="text-base sm:text-[28px] leading-[1.3] sm:leading-[1.5] font-light text-white/90 max-w-[280px] sm:max-w-3xl mx-auto mb-8">
          Hire high-quality candidates at scale with AI that screens,
          <span className="hidden sm:inline">
            <br />
            verifies and interviews with a human touch.
          </span>
        </p>
      </div>

      {/* ---- CTA ---- */}
      <div className="mt-4 sm:mt-12 w-full sm:w-auto px-4 sm:px-0 relative z-10">
        <Link href="/schedule">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full
                       font-semibold text-base sm:text-lg hover:bg-gray-200 transition-colors hover:cursor-pointer"
          >
            Book a Demo
            <ChevronRight className="inline-block ml-2 w-4 sm:w-5 h-4 sm:h-5" />
          </motion.button>
        </Link>
      </div>

      {/* ---- Text scramble ---- */}
      <div className="absolute -bottom-65 right-4 text-white">
        <TextScramble currentText={displayText} />
      </div>

      {/* ---- Progress bar ---- */}
      <div className="absolute   -bottom-70 left-0 right-0 h-2 bg-[#04BBA6]">
        <motion.div
          className="h-full bg-white origin-left "
          style={{ scaleX }}
        />
      </div>
    </section>
  );
}
