"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Berribot changed L1 interviews forever at Wipro.",
    author: "Anisha",
    title: "Global Head - Talent, Wipro",
    company: "wipro",
    logo: "/image/company/wipro.png",
  },
  {
    id: 2,
    quote: "AI-powered screening reduced our hiring time by 60% at Cognizant.",
    author: "Rajesh Kumar",
    title: "VP - Human Resources, Cognizant",
    company: "cognizant",
    logo: "/image/company/wipro.png",
  },
  {
    id: 3,
    quote:
      "Berribot's automation helped us scale our recruitment process seamlessly.",
    author: "Sarah Chen",
    title: "Director - Talent Acquisition, TCS",
    company: "tcs",
    logo: "/image/company/wipro.png",
  },
  {
    id: 4,
    quote:
      "The fraud detection feature saved us countless hours of manual verification.",
    author: "Michael Rodriguez",
    title: "Head of Recruitment, Infosys",
    company: "infosys",
    logo: "/image/company/wipro.png",
  },
  {
    id: 5,
    quote:
      "Our candidate experience improved dramatically with Berribot's human-like AI.",
    author: "Priya Sharma",
    title: "Chief People Officer, HCL",
    company: "hcl",
    logo: "/image/company/wipro.png",
  },
];

export default function CompanyTestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Triggers when 50% of component is in view (centered)
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress for different animations
  const verticalLinesProgress = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    [0, 1]
  );
  const contentProgress = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]); // Content reveals when component is centered
  // 0 → 1 between 0 % and 30 % scroll
  const topLineProgress = useTransform(scrollYProgress, [0.0, 0.3], [0, 1]);

  // 0 → 1 between 15 % and 45 % scroll  (starts later, ends later)
  const bottomLineProgress = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    [0, 1]
  );

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-black text-white">
      <div className="relative mt-20">
        {/* Horizontal lines that extend full width */}
        {/* TOP — grows left → right immediately */}
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-white origin-left"
          style={{ scaleX: topLineProgress }}
        />

        {/* BOTTOM — grows right → left, but only after the delay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-white origin-right"
          style={{ scaleX: bottomLineProgress }}
        />

        {/* Content container with vertical lines */}
        <div className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto relative">
            {/* Vertical lines */}
            <motion.div
              className="absolute top-[-10%] bottom-[80%] right-[100%] border-l border-white pointer-events-none hidden lg:block origin-top"
              style={{ scaleY: verticalLinesProgress }}
            />
            <motion.div
              className="absolute top-[80%] bottom-[-10%] right-0 border-l border-white pointer-events-none hidden lg:block origin-bottom"
              style={{ scaleY: verticalLinesProgress }}
            />

            {/* Main content */}
            <motion.div className="py-20" style={{ opacity: contentProgress }}>
              {/* Floating quote icon */}
              <motion.div
                className="absolute top-0 left-[12%] mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: [0, -8, 0], // Floating up and down
                        rotate: [0, 2, -2, 0], // Slight rotation
                      }
                    : { opacity: 0, y: -20 }
                }
                transition={{
                  opacity: { duration: 0.8, delay: 0.2 },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  },
                }}
              >
                <Image
                  src="/image/components/inverted_comma.png"
                  alt="Quote"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </motion.div>

              {/* Testimonial content */}
              <motion.div
                className="text-center max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
                layout
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    className="min-h-[200px] flex flex-col justify-center"
                    layout
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <motion.h2
                      className="text-4xl sm:text-5xl lg:text-6xl font-inter font-light leading-tight mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      layout
                    >
                      &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                    </motion.h2>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`author-${activeTestimonial}`}
                    className="min-h-[80px] flex flex-col justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    layout
                  >
                    <h3 className="text-2xl font-inter font-medium text-[#04BBA6] mb-2">
                      {TESTIMONIALS[activeTestimonial].author}
                    </h3>
                    <p className="text-lg text-gray-400">
                      {TESTIMONIALS[activeTestimonial].title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Company logos */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {TESTIMONIALS.map((testimonial, index) => (
                  <motion.button
                    key={testimonial.id}
                    onClick={() => setActiveTestimonial(index)}
                    className="w-[142.33px] h-[141.83px] border border-white transition-all duration-300 cursor-pointer flex items-center justify-center bg-black"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {index === activeTestimonial ? (
                      // Active state - show company logo with teal background
                      <div className="w-full h-full bg-[#04BBA6] flex items-center justify-center">
                        <Image
                          src={testimonial.logo}
                          alt={testimonial.company}
                          width={100}
                          height={50}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            // Fallback if image doesn't load
                            e.currentTarget.style.display = "none";
                            const nextElement = e.currentTarget
                              .nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = "flex";
                            }
                          }}
                        />
                        {/* Fallback for broken images */}
                        <div className="w-full h-full bg-[#04BBA6] items-center justify-center text-black font-bold text-xs hidden">
                          {testimonial.company.toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      // Inactive state - gray rectangle for ALL inactive boxes
                      <div className="w-[50px] h-[45px] bg-[#B0B0B0]"></div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
