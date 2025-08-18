"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Code, Mic, Users, ChevronRight } from "lucide-react";

export default function MobileProductDisplay() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const productCards = [
    {
      id: 1,
      icon: Code,
      title: "Digital Recruiter",
      description:
        "AI-powered recruitment automation that handles candidate sourcing, screening, and initial outreach with human-like precision.",
      redirectUrl: "/product",
      position: "top-0 left-7",
      size: "w-[165.5px]",
    },
    {
      id: 2,
      icon: Mic,
      title: "Digital Interviewer",
      description:
        "Conduct scalable interviews 24/7 with advanced AI that evaluates technical skills and cultural fit through natural conversations.",
      redirectUrl: "/solutions",
      // fixed invalid utility: left-57 -> left-[57%]
      position: "top-15 left-[75%] -translate-x-1/2 z-20",
      size: "w-[165.5px]",
    },
    {
      id: 3,
      icon: Users,
      title: "Digital Verifier",
      description:
        "Comprehensive background verification and fraud detection system ensuring authentic candidate identities and qualifications.",
      redirectUrl: "/schedule",
      // fixed invalid utility: right-30 -> right-[30px]
      position: "top-40 right-[120px]",
      size: "w-[165.5px]",
    },
  ];

  const handleCardClick = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  // Collapsed vs expanded heights
  const collapsedH = "h-[117px]"; // Initial height: 117px
  const getCardHeight = (cardId: number) =>
    expandedCard === cardId ? "h-[256px]" : collapsedH; // Expanded: 256px
  
  const getCardWidth = (cardId: number) =>
    expandedCard === cardId ? "w-[233px]" : "w-[165.5px]"; // Initial: 165.5px, Expanded: 233px

  return (
    <section className="relative min-h-screen bg-transparent px-4 py-16 overflow-visible">
      {/* Background Image */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none">
        <Image
          src="/image/mobile/5.png"
          alt="Background"
          width={1266}
          height={956}
          className="object-cover"
        />
      </div>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-8 grid-rows-12 h-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-white/20" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-sm mx-auto text-center">
        {/* One Berribot Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-[58px] font-medium text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            One
            <br />
            Berribot.
          </h1>
        </motion.div>

        {/* Logo with Ripple Animation */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-12 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Ripple circles */}
          <motion.div
            className="absolute w-32 h-32 border-2 border-white/30 rounded-full pointer-events-none"
            animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-32 h-32 border-2 border-white/30 rounded-full pointer-events-none"
            animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
          />
          <motion.div
            className="absolute w-32 h-32 border-2 border-white/30 rounded-full pointer-events-none"
            animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
          />

          {/* Logo */}
          <div className="w-[76px] h-[75px] relative rounded-full overflow-hidden z-10  backdrop-blur-sm flex items-center justify-center">
            <Image src="/image/logo_2.png" alt="BerriBot Logo" width={76} height={75} className="object-cover" />
          </div>
        </motion.div>

        {/* Every Recruiting Task Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-[58px] font-medium text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Every
            <br />
            Recruiting
            <br />
            Task.
          </h2>
        </motion.div>

        {/* Product Cards - Manual Positioning */}
        <div className="relative min-h-[26rem] w-full">
          {productCards.map((card, index) => {
            const Icon = card.icon;
            const isExpanded = expandedCard === card.id;
            const isBlurred = expandedCard !== null && expandedCard !== card.id;

            return (
              <motion.div
                key={card.id}
                layout
                className={`absolute ${card.position} ${getCardWidth(card.id)} ${getCardHeight(card.id)} transition-all duration-500 ${
                  isBlurred ? "blur-sm opacity-60" : ""
                } ${isExpanded ? "z-30" : "z-10"}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.2 }}
              >
                <motion.div
                  layout
                  transition={{ layout: { duration: 0.45, ease: [0.2, 0.6, 0.2, 1] } }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 cursor-pointer hover:bg-white/15 transition-all duration-500 flex flex-col"
                  onClick={() => handleCardClick(card.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-expanded={isExpanded}
                >
                  {/* Initial Card View - Icon and Title */}
                  <div className="flex flex-col items-start text-left">
                    <div className="w-[40px] h-[40px] bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-[24px] h-[24px] text-white" />
                    </div>
                    <h3 className={`font-semibold text-white leading-tight ${isExpanded ? 'text-lg' : 'text-base'}`}>{card.title}</h3>
                  </div>

                  {/* Expanded Content - Shows only for the clicked card */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 flex flex-col items-start text-left"
                      >
                        {/* Description */}
                        <p className="text-white/90 text-sm leading-relaxed mb-4">
                          {card.description}
                        </p>

                        {/* Arrow Icon */}
                        <motion.button
                          type="button"
                          className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRedirect(card.redirectUrl);
                          }}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.25, delay: 0.1 }}
                          aria-label={`Go to ${card.title}`}
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
