"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ValuesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress for different animations
  const horizontalLinesProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const verticalLinesProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const contentProgress = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <section ref={ref} className="py-16 sm:py-3.5 bg-[#E0E0E0]">
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
        <div className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto relative">
            {/* Vertical lines */}
            <motion.div 
              className="absolute inset-y-0 left-[20%] border-l border-black pointer-events-none hidden lg:block origin-bottom"
              style={{ scaleY: verticalLinesProgress }}
            />
            <motion.div 
              className="absolute inset-y-0 right-[20%] border-l border-black pointer-events-none hidden lg:block origin-top"
              style={{ scaleY: verticalLinesProgress }}
            />

            {/* Single grid controlling all three rows */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-5"
              style={{ opacity: contentProgress }}
            >
              {/* --- Top row: 5 columns with middle 3 having text --- */}
              {/* Column 1: Empty */}
              <motion.div
                className="p-8 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                viewport={{ once: true }}
              >
                {/* Empty */}
              </motion.div>
              
              {/* Columns 2-4: Mission, Vision, Values */}
              {[
                { title: "Mission", color: "text-black" },
                { title: "Vision", color: "text-gray-400" },
                { title: "Values", color: "text-gray-400" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-8 flex items-center justify-center h-24 lg:border-r lg:border-black"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className={`text-2xl font-medium ${item.color}`}>
                    {item.title}
                  </h3>
                </motion.div>
              ))}
              
              {/* Column 5: Empty */}
              <motion.div
                className="p-8 flex items-center justify-center h-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Empty */}
              </motion.div>

              {/* --- Empty column 1 for middle row --- */}
              <motion.div 
                className="hidden sm:block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              />

              {/* --- Middle section with content (spans middle 3 columns) --- */}
              <motion.div 
                className="col-span-1 sm:col-span-3 relative py-16 px-4 text-center bg-black"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-teal-400 leading-tight mx-auto max-w-2xl mb-6">
                  Automate. Innovate. Transform.
                  <br />
                  (And maybe make your Mondays better)
                </h2>
                <p className="text-base sm:text-lg text-white leading-relaxed mx-auto max-w-2xl mb-4">
                  We're here to rescue teams <span className="text-gray-400">from soul-sucking tasks.</span>
                  <br />
                  Berribot automates the repetitive stuff—calls,
                  <br />
                  scheduling, sorting, screening - so real humans (aka
                  <br />
                  you) can shine where it matters most.
                </p>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed mx-auto max-w-2xl">
                  Basically, we help people do less busywork and more
                  <br />
                  "heck yes" work.
                </p>
              </motion.div>

              {/* --- Empty column 5 for middle row --- */}
              <motion.div 
                className="hidden sm:block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              />

              {/* --- Bottom row: 5 empty sections --- */}
              {[1, 2, 3, 4, 5].map((item, i) => (
                <motion.div
                  key={item}
                  className={`p-8 flex items-center justify-center h-24 ${
                    i < 4 ? "lg:border-r" : ""
                  } lg:border-black`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Empty for now */}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
