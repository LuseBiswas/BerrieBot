"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function YtTestimonial() {

  return (
    <section
      className="py-16 sm:py-20 bg-black text-white relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pb-48 mb-10 overflow-visible"
    >
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Side - Content */}
            <div className="lg:w-1/2 text-left">
              {/* Main Heading */}
              <motion.h2
                className="text-[64px] sm:text-[64px] md:text-[64px] lg:text-[64px] tracking-[-2.5px] sm:tracking-[-2.5px] font-medium text-[#252527] bg-clip-text mb-8 leading-[1]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <span className="text-white">The future</span>
                <br />
                <span className="text-white">of recruiting</span>
                <br />
                <span className="text-white">is here.</span>
              </motion.h2>

              {/* Description */}
              <motion.div
                className="font-inter text-[18px] sm:text-[18px] md:text-[18px] leading-[1.4] sm:leading-[1.5] font-light text-[#969696] max-w-5xl mx-auto mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <p className="text-gray-300">
                  Let Berri-Agents automate your outreach,
                </p>
                <p className="text-gray-300">
                  screening, interviewing, and verification.
                </p>
                <p className=" text-gray-300 ">
                  Your recruiters can focus on hiring, not chasing.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link href="/product">
                  <button className="bg-white text-black px-8 py-4 rounded-full font-inter font-medium text-lg hover:bg-gray-200 transition-colors flex items-center gap-2 hover:cursor-pointer ">
                    See it in action
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Side - YouTube Video with Overlay */}
            <div className="lg:w-1/2 relative">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Teal Background Container - Separate div behind video */}
                <div className="absolute bg-[#00514c] rounded-[42px] w-[650px] h-[504px] bottom-[-45px] right-[50px] z-0"></div>

                

                {/* YouTube Video Parent Container - Maintains layout position */}
                <div className="relative w-[815px] h-[461px] mr-240">
                  {/* YouTube Video Container - Absolute positioned within parent */}
                  <div className="absolute top-[0px] left-[-170px] w-[815px] h-[461px] rounded-[41px] overflow-hidden z-10 border border-[#04BBA6]">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/ww3flTt--Xw?autoplay=1&mute=1&loop=1&playlist=ww3flTt--Xw"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full object-cover rounded-[41px]"
                    />
                  </div>
                </div>

                {/* Testimonial Overlay - Outside video container for free positioning */}
                <motion.div
                  className="absolute bottom-[400px] right-[0px] text-white p-3 rounded-[42px] w-[384px] h-[141px] shadow-lg z-20"
                  style={{
                    backgroundImage: "url('/image/BG_1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Inverted Comma Image */}
                  
                    
                  <div className="flex items-center justify-center h-full">
                    {/* Testimonial Content */}
                    
                    <div>
                      <p className="text-white text-[18px] font-inter font-light text-center leading-relaxed">
                        Hi, This is Berri! Your AI recruiter <br />
                         who interviews hundreds of candidates <br /> while you focus on real work.
                        
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute bottom-[-120] left-[-120] transform translate-y-8 -translate-x-8">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Ripple Effect Circles */}
                    <motion.div
                      className="absolute w-32 h-32 border border-white/20 rounded-full"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0, 0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        times: [0, 0.2, 0.7, 1],
                      }}
                    />
                    <motion.div
                      className="absolute w-32 h-32 border border-white/20 rounded-full"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0, 0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.8,
                        times: [0, 0.2, 0.7, 1],
                      }}
                    />
                    <motion.div
                      className="absolute w-32 h-32 border border-white/20 rounded-full"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0, 0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 1.6,
                        times: [0, 0.2, 0.7, 1],
                      }}
                    />

                    {/* Main Circle */}
                    <div className="flex items-center justify-center relative z-10">
                      <div className="w-20 h-20 relative rounded-full flex items-center justify-center overflow-hidden">
                        <Image
                          src="/image/logo_2.png"
                          alt="Background"
                          width={80}
                          height={80}
                          className="absolute inset-0 w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
