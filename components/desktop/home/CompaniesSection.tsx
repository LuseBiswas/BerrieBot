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

  // Company logos for the carousel
  const brands = [
    { name: "Teleperformance", logo: "/image/mobile/Home/Teleperformance4.png" },
    { name: "Wipro", logo: "/image/mobile/Home/wipro3.png" },
    { name: "Encora", logo: "/image/mobile/Home/encora2.png" },
    { name: "Indium", logo: "/image/mobile/Home/indium2.png" },
    { name: "Mphasis", logo: "/image/mobile/Home/Mphasis2.png" },
    { name: "Firstsource", logo: "/image/mobile/Home/firstsource2.png" },
    { name: "Citius", logo: "/image/mobile/Home/Citius2.png" },
    { name: "Excelencia", logo: "/image/mobile/Home/excelencia2.png" },
    { name: "Cognizant", logo: "/image/mobile/Home/cognizant2.png" },
    { name: "LTIMindtree", logo: "/image/mobile/Home/LTIMindtree2.png" },
    { name: "Mindsprint", logo: "/image/mobile/Home/Mindsprint2.png" },
    { name: "Congruent", logo: "/image/mobile/Home/Congruent2.png" },
  ];

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section ref={ref} className="py-16 sm:py-3.5 bg-[#FAFAFA] overflow-hidden">
      <div className="relative">
        {/* Horizontal lines that extend full width */}
        <motion.div 
          className="absolute left-0 right-0 top-0 h-[1px] bg-black origin-right"
          style={{ scaleX: horizontalLinesProgress }}
        />
        <motion.div 
          className="absolute left-0 right-0 bottom-0 h-[1px] bg-black origin-left"
          style={{ scaleX: horizontalLinesProgress }}
        />
        
        {/* Content container */}
        <div className="px-0">
          <div className="max-w-full mx-auto relative">

            {/* Top Carousel Row - Moving Right to Left */}
            <motion.div 
              className="relative border-b border-black py-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex overflow-hidden">
                <motion.div
                  className="flex items-center gap-12 min-w-max"
                  animate={{
                    x: ["0%", "-33.33%"],
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {duplicatedBrands.map((brand, index) => (
                    <div key={`top-${index}`} className="flex items-center gap-12">
                      <div className="flex-shrink-0 w-36 h-18 flex items-center justify-center">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={141}
                          height={70}
                          className="object-contain max-w-full max-h-full transition-all duration-300"
                        />
                      </div>
                      {index < duplicatedBrands.length - 1 && (
                        <div className="w-px h-16 bg-black flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Testimonial section */}
            <motion.div 
              className="relative py-16 px-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl tracking-[1px] sm:tracking-[-2.5px] sm:text-6xl lg:text-4xl lg:tracking-[-1px] font-medium text-[#3D3D3D] leading-tight mx-auto max-w-2xl">
                Used by teams at Fortune 500 companies across India, North America, LATAM, SEA <br /> and more...
              </h2>
            </motion.div>

            {/* Bottom Carousel Row - Moving Left to Right */}
            <motion.div 
              className="relative border-t border-black py-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex overflow-hidden">
                <motion.div
                  className="flex items-center gap-12 min-w-max"
                  animate={{
                    x: ["-33.33%", "0%"],
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {duplicatedBrands.map((brand, index) => (
                    <div key={`bottom-${index}`} className="flex items-center gap-12">
                      <div className="flex-shrink-0 w-36 h-18 flex items-center justify-center">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={141}
                          height={70}
                          className="object-contain max-w-full max-h-full transition-all duration-300"
                        />
                      </div>
                      {index < duplicatedBrands.length - 1 && (
                        <div className="w-px h-16 bg-black flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
