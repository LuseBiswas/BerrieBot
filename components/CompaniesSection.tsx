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
  const horizontalLinesProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const verticalLinesProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const contentProgress = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <section ref={ref} className="py-16 sm:py-3.5 bg-[#E0E0E0]">
      <div className="relative">
        {/* Horizontal lines that extend full width */}
        <motion.div 
          className="absolute left-0 right-0 top-0 h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 top-[96px] h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 bottom-[96px] h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 bottom-0 h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        
        {/* Content container with vertical lines */}
        <div className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto relative">
            {/* Vertical lines */}
            <motion.div 
              className="absolute inset-y-0 left-[16.666%] border-l border-black pointer-events-none hidden lg:block origin-top"
              style={{ scaleY: verticalLinesProgress }}
            />
            <motion.div 
              className="absolute inset-y-0 right-0 border-l border-black pointer-events-none hidden lg:block origin-top"
              style={{ scaleY: verticalLinesProgress }}
            />

            {/* Single grid controlling all three rows */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
              style={{ opacity: contentProgress }}
            >
              {/* --- Top logos row (6 cols) --- */}
              {[
                { src: "/image/company/c_logo_1.png", alt: "Airbnb" },
                { src: "/image/company/c_logo_2.png", alt: "Canva" },
                { src: "/image/company/c_logo_3.png", alt: "Stripe" },
                { src: "/image/company/c_logo_4.png", alt: "Booking.com" },
                { src: "/image/company/c_logo_5.png", alt: "Amazon" },
                { src: "/image/company/c_logo_6.png", alt: "Google" },
              ].map((c, i) => (
                <motion.div
                  key={c.alt}
                  className={`p-8 flex items-center justify-center h-24 ${
                    i < 5 ? "lg:border-r" : ""
                  } lg:border-black`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={100}
                    height={30}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              ))}

              {/* --- Testimonial row (spans full width) --- */}
              <motion.div 
                className="col-span-2 sm:col-span-3 lg:col-span-6 relative py-16 px-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#3D3D3D] leading-tight mx-auto max-w-2xl">
                  Used by teams at Cognizant,
                  <br />
                  Wipro, LTIMindtree,
                  <br />
                  Teleperformance and more.
                </h2>
              </motion.div>

              {/* --- Bottom logos row --- */}
              {/* Col 1 spacer to keep the first vertical line continuous */}
              <motion.div 
                className="hidden lg:block border-r border-black"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              />

              {/* Cols 2–6: 5 logos */}
              {[
                { src: "/image/company/c_logo_1.png", alt: "Airbnb" },
                { src: "/image/company/c_logo_2.png", alt: "Canva" },
                { src: "/image/company/c_logo_3.png", alt: "Stripe" },
                { src: "/image/company/c_logo_4.png", alt: "Booking.com" },
                { src: "/image/company/c_logo_5.png", alt: "Amazon" },
              ].map((c, i) => (
                <motion.div
                  key={c.alt}
                  className={`p-8 flex items-center justify-center h-24 ${
                    i < 4 ? "lg:border-r" : ""
                  } lg:border-black`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={100}
                    height={30}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
