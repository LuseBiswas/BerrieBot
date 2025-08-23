"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Mic, Users } from "lucide-react";

export default function MobileAboutProductDisplay() {
  const productCards = [
    {
      id: 1,
      icon: Code,
      title: "Too much time <br/> on the wrong tasks",
      description: "Over 60% of recruiter time <br/> is lost to repetitive admin.",
    },
    {
      id: 2,
      icon: Mic,
      title: "High opportunity costs",
      description: "Scarcity of technical <br/> interviewers delays hiring <br/> by weeks.",
    },
    {
      id: 3,
      icon: Users,
      title: "Verification challenges",
      description: "30% of applicants <br/> misrepresent credentials.",
    },
  ];

  return (
    <section className="relative min-h-screen bg-transparent px-4 py-16 overflow-visible mb-[-100]">
      {/* Background Image */}
      <div className="absolute pointer-events-none" style={{ top: '500px', right: '-200px', zIndex: 0 }}>
        <Image
          src="/image/mobile/9.png"
          alt="Background"
          width={877}
          height={836}
          className="w-[1043.6px] h-[1262px] opacity-[70%] "
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-left">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-[76px] font-normal text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Recruitment
            <br />
            has a few problems
          </h2>
        </motion.div>

        {/* Product Cards */}
        <div className="flex justify-center items-center gap-6 w-full">
          {productCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                className="w-[220px] h-[256px] flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.2 }}
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 h-full flex flex-col">
                  {/* Icon and Title */}
                  <div className="flex flex-col items-start text-left">
                    <div className="w-[40px] h-[40px] bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-[24px] h-[24px] text-white" />
                    </div>
                    <h3 
                      className="font-bold text-[18px] text-white leading-tight text-base mb-3"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />
                  </div>

                  {/* Description */}
                  <div className="flex-1">
                    <p 
                      className="text-white/90 text-[14px] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
