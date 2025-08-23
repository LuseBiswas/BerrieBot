"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MobileBrandCarousel() {
  // Brand logos - you can add more as needed
  const brands = [
    { name: "DSPrint", logo: "/image/mobile/Home/Teleperformer_2.png" },
    { name: "PayPal", logo: "/image/mobile/Home/Mindsprint_2.png" },
    { name: "VIT", logo: "/image/mobile/Home/VIT_2.png" },
    { name: "Cognizant", logo: "/image/mobile/Home/cognizant.png" },
    { name: "Excellencia", logo: "/image/mobile/Home/excelencia.png" },
    { name: "LTIMindtree", logo: "/image/mobile/Home/LTIMindtree.png" },
  ];

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      

      {/* Top Row - Moving Right to Left */}
      <div className="relative mb-8 border-t border-b border-black py-4">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center gap-8 min-w-max"
            animate={{
              x: ["0%", "-33.33%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div key={`top-${index}`} className="flex items-center gap-8">
                <div className="flex-shrink-0 w-24 h-12 flex items-center justify-center rounded-lg">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={150}
                    height={40}
                    sizes="96px"
                    className="h-6 w-24 object-contain filter brightness-0 invert"
                  />
                </div>
                {index < duplicatedBrands.length - 1 && (
                  <div className="w-px h-12 bg-black flex-shrink-0" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-[30px] text-black " style={{ fontFamily: 'Manrope, sans-serif' }}>
        Used by teams at <br />
          Cognizant, <br />
        Wipro, LTIMindtree,<br />
          Teleperformance <br/>
           and more.
        </p>
      </div>

      {/* Bottom Row - Moving Left to Right */}
      <div className="relative border-t border-b border-black py-4">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center gap-8 min-w-max"
            animate={{
              x: ["-33.33%", "0%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div key={`bottom-${index}`} className="flex items-center gap-8">
                <div className="flex-shrink-0 w-24 h-12 flex items-center justify-center rounded-lg">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={96}
                    height={48}
                    unoptimized
                    className="object-contain max-w-full max-h-full transition-all duration-300"
                  />
                </div>
                {index < duplicatedBrands.length - 1 && (
                  <div className="w-px h-12 bg-black flex-shrink-0" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
