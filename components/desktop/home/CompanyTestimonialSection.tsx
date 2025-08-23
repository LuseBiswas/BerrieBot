"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

import { ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "AI is the future of Interviewing.<br/> GenZ's will look forward to using Berribot",
    author: "CXO",
    title: "of a Fortune 500 IT Services firm",
    company: "wipro",
  },
  {
    id: 2,
    quote: "Berribot changed the way <br/> L1 interviews are conducted for us",
    author: "Director",
    title: "of a Fortune 500 IT Services firm",
    company: "cognizant",
  },
  {
    id: 3,
    quote:
      "We should learn to adapt ourselves <br/> with the use of AI tools in Hiring and Berribot <br/> has just stepped up their game",
    author: "Global Recruitment Head",
    title: "of a billion dollar IT firm",
    company: "tcs",
  },
  {
    id: 4,
    quote:
      "Berribot delivers the exact need <br/> of the hour with their exceptional products",
    author: "CXO",
    title: "of a billion dollar US based Mortgage Refinancing business",
    company: "infosys",
  },
  {
    id: 5,
    quote:
      "Berribot has significantly <br/> Revolutionalized the way we hire and also <br/> lead the way to the future of Gen AI hiring",
    author: "Head of Talent Acquisition",
    title: "of a Fortune 200 Digital and Technology Enterprise",
    company: "hcl",
  },
  {
    id: 6,
    quote:
      "Berribot has helped enhance our candidate <br/> experience and improved our hiring turn around <br/> times especially in the LATAM markets",
    author: "Global Head of TA",
    title: "Digital Engineering Firm",
    company: "hcl",
  },
];

export default function CompanyTestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Triggers when 50% of component is in view (centered)
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState(0); // Track slide direction

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
    }),
  };

  const nextTestimonial = () => {
    setDirection(1); // Moving forward (slide left)
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setDirection(-1); // Moving backward (slide right)
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

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
            <motion.div className="py-32" style={{ opacity: contentProgress }}>
            

              {/* Testimonial content with arrows */}
              <div className="relative max-w-6xl mx-auto flex items-center min-h-[400px]">
                {/* Left Arrow */}
                <motion.button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 border border-white rounded-full flex items-center justify-center bg-black hover:bg-[#04BBA6] hover:border-[#04BBA6] transition-all duration-300 cursor-pointer z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.8 }}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>

                {/* Right Arrow */}
                <motion.button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 border border-white rounded-full flex items-center justify-center bg-black hover:bg-[#04BBA6] hover:border-[#04BBA6] transition-all duration-300 cursor-pointer z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.8 }}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>

                {/* Testimonial content */}
                <motion.div
                  className="text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.8, delay: 0.4 }}
                  layout
                >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeTestimonial}
                    custom={direction}
                    className="flex flex-col justify-center"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    layout
                  >
                    <motion.h2
                      className="text-4xl sm:text-[44px] lg:text-[44px] font-inter font-light leading-tight mb-12"
                      dangerouslySetInnerHTML={{ 
                        __html: `&ldquo;${TESTIMONIALS[activeTestimonial].quote}&rdquo;` 
                      }}
                    />

                    <motion.div
                      className="flex flex-col justify-center"
                    >
                      <h3 className="text-2xl font-inter font-medium text-[#04BBA6] mb-2">
                        {TESTIMONIALS[activeTestimonial].author}
                      </h3>
                      <p 
                        className="text-[24px] text-[#FAFAFA]"
                        dangerouslySetInnerHTML={{ 
                          __html: TESTIMONIALS[activeTestimonial].title 
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
