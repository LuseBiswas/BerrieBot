"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Company logos data
const COMPANY_LOGOS = [
  {
    id: 1,
    name: "Microsoft Teams",
    logo: "/image/company/c_logo_1.png",
  },
  {
    id: 2,
    name: "Workday",
    logo: "/image/company/c_logo_2.png",
  },
  {
    id: 3,
    name: "SAP",
    logo: "/image/company/c_logo_3.png",
  },
  {
    id: 4,
    name: "SuccessFactors",
    logo: "/image/company/c_logo_4.png",
  },
  {
    id: 5,
    name: "Additional Company",
    logo: "/image/company/c_logo_5.png",
  },
  {
    id: 6,
    name: "Another Company",
    logo: "/image/company/c_logo_6.png",
  },
];

export default function BottomBanner() {
  return (
    <section className="relative mt-[-90px] mb-20 bg-black text-white overflow-hidden">
      {/* Blue ribbon with marquee - Full width */}
      <motion.div
        className="w-full bg-[#04BBA6] py-8 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {/* Marquee container */}
        <div className="flex items-center justify-center relative overflow-hidden">
          {/* First set of logos */}
          <motion.div
            className="flex items-center space-x-16 shrink-0"
            animate={{
              x: [0, -100 * COMPANY_LOGOS.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {COMPANY_LOGOS.map((company) => (
              <div
                key={`first-${company.id}`}
                className="flex items-center justify-center min-w-[200px] h-16"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={150}
                  height={60}
                  className="max-w-[150px] max-h-12 object-contain filter brightness-0 invert"
                />
              </div>
            ))}
          </motion.div>

          {/* Second set of logos (for seamless loop) */}
          <motion.div
            className="flex items-center space-x-16 shrink-0"
            animate={{
              x: [0, -100 * COMPANY_LOGOS.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {COMPANY_LOGOS.map((company) => (
              <div
                key={`second-${company.id}`}
                className="flex items-center justify-center min-w-[200px] h-16"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={150}
                  height={60}
                  className="max-w-[150px] max-h-12 object-contain filter brightness-0 invert"
                />
              </div>
            ))}
          </motion.div>

          {/* "& many more" text at the end */}
          <motion.div
            className="flex items-center justify-center min-w-[300px] h-16"
            animate={{
              x: [0, -100 * COMPANY_LOGOS.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            <span className="text-black text-2xl font-inter font-light">
              & many more.
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 