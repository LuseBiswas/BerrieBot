"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Company logos data - mobile optimized sizes
const COMPANY_LOGOS = [
  {
    id: 1,
    name: "SAP",
    logo: "/image/product/SAP_1.png",
    width: 75,
    height: 40,
  },
  {
    id: 2,
    name: "SuccessFactors",
    logo: "/image/product/successfactors.png",
    width: 160,
    height: 55,
  },
  {
    id: 3,
    name: "Workday",
    logo: "/image/product/workdays1.png",
    width: 85,
    height: 30,
  },
  {
    id: 4,
    name: "And Many More",
    logo: "/image/product/&manymore.png",
    width: 100,
    height: 40,
  },
];

export default function MobileBottomBanner() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="relative py-12 bg-black text-white overflow-hidden" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-95" />
      </div>

      {/* Background Images - positioned behind all elements */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '190px', left: '-200px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image 7"
          width={377}
          height={336}
          className="w-[377.31px] h-[336px] opacity-[40%]"
        />
      </div>
      
      <div className="absolute z-1 pointer-events-none" style={{ top: '0px', right: '-150px' }}>
        <Image 
          src="/image/mobile/8.png"
          alt="Background Image 8"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px] "
        />
      </div>

      <div className="relative z-10 px-4">
        <div className="max-w-sm mx-auto text-center">
          {/* Heading - 48px */}
          <motion.h2
            className="font-medium text-white leading-tight mb-6"
            style={{ 
              fontSize: '48px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.2'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Plug into<br />
            Your ATS.<br />
            Scale Across<br />
            Geos.
          </motion.h2>
        </div>
      </div>

      {/* Blue ribbon with marquee logos - Height 60px - MOVED OUTSIDE CONTAINER */}
      <motion.div
        className="w-full bg-[#028374] relative overflow-hidden mb-8"
        style={{ height: '60px' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Marquee logos container */}
        <div className="flex items-center h-full animate-scroll">
          {/* First set */}
          {COMPANY_LOGOS.map((company, index) => (
            <div 
              key={`first-${company.id}`} 
              className={`flex items-center justify-center flex-shrink-0 ${
                index === COMPANY_LOGOS.length - 1 ? 'mx-8 mr-20' : 'mx-8'
              }`}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={company.width}
                height={company.height}
                className="object-contain filter brightness-0 invert"
                style={{
                  maxWidth: `${company.width}px`,
                  maxHeight: `${company.height}px`,
                  height: 'auto'
                }}
              />
            </div>
          ))}
          {/* Second set - exact duplicate for seamless loop */}
          {COMPANY_LOGOS.map((company, index) => (
            <div 
              key={`second-${company.id}`} 
              className={`flex items-center justify-center flex-shrink-0 ${
                index === COMPANY_LOGOS.length - 1 ? 'mx-8 mr-20' : 'mx-8'
              }`}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={company.width}
                height={company.height}
                className="object-contain filter brightness-0 invert"
                style={{
                  maxWidth: `${company.width}px`,
                  maxHeight: `${company.height}px`,
                  height: 'auto'
                }}
              />
            </div>
          ))}
          {/* Third set - extra safety for perfect loop */}
          {COMPANY_LOGOS.map((company, index) => (
            <div 
              key={`third-${company.id}`} 
              className={`flex items-center justify-center flex-shrink-0 ${
                index === COMPANY_LOGOS.length - 1 ? 'mx-8 mr-20' : 'mx-8'
              }`}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={company.width}
                height={company.height}
                className="object-contain filter brightness-0 invert"
                style={{
                  maxWidth: `${company.width}px`,
                  maxHeight: `${company.height}px`,
                  height: 'auto'
                }}
              />
            </div>
          ))}
        </div>

        {/* Marquee animation CSS */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          
          .animate-scroll {
            animation: scroll 25s linear infinite;
            width: max-content;
          }
        `}</style>
      </motion.div>

      <div className="relative z-10 px-4">
        <div className="max-w-sm mx-auto text-center">
          {/* Subheading - 20px */}
          <motion.div
            className="mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div 
              className="font-light leading-relaxed text-white"
              style={{ 
                fontSize: '20px',
                fontFamily: 'Manrope, sans-serif',
                lineHeight: '1.4'
              }}
            >
              Our agents work across phone,
              <br />
              chat, video, and documents -
              <br />
              and support 36+ languages.
              <br />
              No matter your infra, timezone,
              <br />
              or region - we&apos;ve got you covered.
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
} 