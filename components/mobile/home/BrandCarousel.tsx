"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MobileBrandCarousel() {
  // Brand logos - you can add more as needed
  const brands = [
    { name: "DSPrint", logo: "/image/company/c_logo_1.png" },
    { name: "PayPal", logo: "/image/company/c_logo_2.png" },
    { name: "VIT", logo: "/image/company/c_logo_3.png" },
    { name: "Cognizant", logo: "/image/company/c_logo_4.png" },
    { name: "Excellencia", logo: "/image/company/c_logo_5.png" },
    { name: "LTIMindtree", logo: "/image/company/c_logo_6.png" },
    { name: "Wipro", logo: "/image/company/wipro.png" },
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
                <div className="flex-shrink-0 w-24 h-12 flex items-center justify-center bg-white rounded-lg p-2 shadow-sm">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={80}
                    height={40}
                    className="object-contain max-w-full max-h-full filter grayscale hover:grayscale-0 transition-all duration-300"
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
                <div className="flex-shrink-0 w-24 h-12 flex items-center justify-center bg-white rounded-lg p-2 shadow-sm">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={80}
                    height={40}
                    className="object-contain max-w-full max-h-full filter grayscale hover:grayscale-0 transition-all duration-300"
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
