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
              {/* --- Top logos row (6 cols) --- */}
              {/* Left logo */}
              <motion.div
                className="p-5 flex items-center justify-center h-24 lg:border-r lg:border-black hidden lg:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                  
                    src="/image/mobile/Home/firstsource2.png"
                    alt="Wipro"
                    width={400}
                    height={50}
                    className="object-contain"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              </motion.div>
              
              {/* Teleperformer_3 */}
              <motion.div
                className="p-5 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/Teleperformance4.png"
                  alt="Canva"
                  width={400}
                  height={45}
                  className=""
                />
              </motion.div>

              {/* Firstsource */}
              <motion.div
                className="p-6 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src="/image/mobile/Home/wipro3.png"
                    alt="Stripe"
                    width={400}
                    height={52}
                    className="object-contain"
                    style={{ maxWidth: '400px', maxHeight: '52px' }}
                  />
                </div>
              </motion.div>

              {/* Encora */}
              <motion.div
                className="p-6 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/encora2.png"
                  alt="Booking.com"
                  width={420}
                  height={48}
                  className=""
                />
              </motion.div>

              {/* Indium */}
              <motion.div
                className="p-8 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/indium2.png"
                  alt="Amazon"
                  width={360}
                  height={52}
                  className=""
                />
              </motion.div>
              
              {/* Right logo */}
              <motion.div
                className="p-6 flex items-center justify-center h-24 hidden lg:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src="/image/mobile/Home/Mphasis2.png"
                    alt="Mphaisi"
                    width={600}
                    height={75}
                    className="object-contain"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              </motion.div>

              {/* --- Testimonial row (spans full width) --- */}
              <motion.div 
                className="col-span-2 sm:col-span-3 lg:col-span-6 relative py-16 px-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl tracking-[1px] sm:tracking-[-2.5px] sm:text-6xl lg:text-4xl lg:tracking-[-1px] font-medium text-[#3D3D3D] leading-tight mx-auto max-w-2xl">
                Used by teams at Fortune 500 companies across India, North America, LATAM, SEA <br /> and more...
                </h2>
              </motion.div>

              {/* --- Bottom logos row (6 cols) --- */}
              {/* Left logo */}
              <motion.div
                className="p-7 flex items-center justify-center h-24 lg:border-r lg:border-black hidden lg:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/Citius2.png"
                  alt="VIT"
                  width={450}
                  height={30}
                  className=""
                />
              </motion.div>

              {/* Excelencia */}
              <motion.div
                className="p-7 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/excelencia2.png"
                  alt="Excelencia"
                  width={420}
                  height={35}
                  className=""
                />
              </motion.div>

              {/* Cognizant */}
              <motion.div
                className="p-7 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/cognizant2.png"
                  alt="Cognizant"
                  width={380}
                  height={42}
                  className=""
                />
              </motion.div>

              {/* LTIMindtree */}
              <motion.div
                className="p-7 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/LTIMindtree2.png"
                  alt="LTIMindtree"
                  width={500}
                  height={28}
                  className=""
                />
              </motion.div>

              {/* Mindsprint */}
              <motion.div
                className="p-7 flex items-center justify-center h-24 lg:border-r lg:border-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/Mindsprint2.png"
                  alt="Mindsprint"
                  width={460}
                  height={38}
                  className=""
                />
              </motion.div>
              
              {/* Right logo */}
              <motion.div
                className="p-7 flex items-center justify-center h-24 hidden lg:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/image/mobile/Home/Congruent2.png"
                  alt="Teleperformer"
                  width={450}
                  height={30}
                  className=""
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
