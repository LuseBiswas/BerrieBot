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
      position: "top-0 left-7",
    },
    {
      id: 2,
      icon: Mic,
      title: "High opportunity costs",
      description: "Scarcity of technical <br/> interviewers delays hiring <br/> by weeks.",
      position: "top-45 left-[60%] -translate-x-1/2 z-20",
    },
    {
      id: 3,
      icon: Users,
      title: "Verification challenges",
      description: "30% of applicants <br/> misrepresent credentials.",
      position: "top-100 right-[120px]",
    },
  ];

  return (
    <section className="relative min-h-screen bg-transparent px-4 py-16 overflow-visible mb-40">
      {/* Background Image */}
      <div className="absolute pointer-events-none" style={{ top: '500px', right: '-300px', zIndex: 0 }}>
        <Image
          src="/image/mobile/9.png"
          alt="Background"
          width={377}
          height={336}
          className="w-[543.6px] h-[562px] opacity-[70%] "
        />
      </div>
      
      <div className="relative z-10 max-w-sm mx-auto text-left">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-center text-[58px] font-medium text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Recruitment
            <br />
            has a few <br />
             problems.
          </h2>
        </motion.div>

        {/* Product Cards */}
        <div className="relative min-h-[26rem] w-full">
          {productCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                className={`absolute ${card.position} w-[233px] h-[256px] z-10`}
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
