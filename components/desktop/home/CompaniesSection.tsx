"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CompaniesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress for different animations
  const horizontalLinesProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const verticalLinesProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section ref={ref} className="py-16 sm:py-3.5 bg-[#FAFAFA]">
      <div className="relative">
        {/* Horizontal lines that extend full width */}
        <motion.div 
          className="absolute left-0 right-0 top-0 h-[1px] bg-black origin-right"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 top-[96px] h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 bottom-[96px] h-[1px] bg-black origin-right"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 bottom-0 h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        
        {/* Content container with vertical lines */}
        <div className="px-0">
          <div className="max-w-full mx-auto relative">
            {/* Vertical lines */}
            <motion.div 
              className="absolute inset-y-0 left-[16.64%] border-l border-black pointer-events-none hidden lg:block origin-bottom"
              style={{ scaleY: verticalLinesProgress }}
            />
            <motion.div 
              className="absolute inset-y-0 right-[16.67%] border-l border-black pointer-events-none hidden lg:block origin-top"
              style={{ scaleY: verticalLinesProgress }}
            />

            {/* Single grid controlling all three rows */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
            >
              {/* --- Top logos row (4 cols centered) --- */}
              {/* Empty spacer for left */}
              <div className="hidden lg:block"></div>
              
              {[
                { src: "/image/mobile/Home/Teleperformer_3.png", alt: "Canva" },
                { src: "/image/mobile/Home/VIT_2.png", alt: "Stripe" },
                { src: "/image/mobile/Home/encora.png", alt: "Booking.com" },
                { src: "/image/mobile/Home/indium.png", alt: "Amazon" },
              ].map((c, i) => (
                <motion.div
                  key={c.alt}
                  className={`p-8 flex items-center justify-center h-24 ${
                    i < 3 ? "lg:border-r" : ""
                  } lg:border-black`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={300}
                    height={30}
                    className=""
                  />
                </motion.div>
              ))}
              
              {/* Empty spacer for right */}
              <div className="hidden lg:block"></div>

              {/* --- Testimonial row (spans full width) --- */}
              <motion.div 
                className="col-span-2 sm:col-span-3 lg:col-span-6 relative py-16 px-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:tracking-[-2.5px] sm:text-6xl lg:text-4xl font-medium text-[#3D3D3D] leading-tight mx-auto max-w-2xl">
                  Used by teams at Cognizant,
                  <br />
                  Wipro, LTIMindtree,
                  <br />
                  Teleperformance and more.
                </h2>
              </motion.div>

              {/* --- Bottom logos row (4 cols centered) --- */}
              {/* Left spacer */}
              <div className="hidden lg:block lg:border-r lg:border-black"></div>

              {/* 4 centered logos */}
              {[
                { src: "/image/mobile/Home/excelencia.png", alt: "Excelencia" },
                { src: "/image/mobile/Home/cognizant.png", alt: "Cognizant" },
                { src: "/image/mobile/Home/LTIMindtree_3.png", alt: "LTIMindtree" },
                { src: "/image/mobile/Home/Mindsprint_2.png", alt: "Mindsprint" },
              ].map((c, i) => (
                <motion.div
                  key={`bottom-${c.alt}`}
                  className={`p-7 flex items-center justify-center h-24 ${
                    i < 3 ? "lg:border-r" : ""
                  } lg:border-black`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={450}
                    height={30}
                    className=""
                  />
                </motion.div>
              ))}
              
              {/* Right spacer */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
