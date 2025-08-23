"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Code, Mic, Users, ChevronRight } from "lucide-react";

export default function MobileProductDisplay() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');

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

  // Screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('large');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Responsive sizing based on mobile dimensions
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          // Card sizes: mobile 165.5x117 -> large 232x164 (1.4x)
          cardWidthCollapsed: 'w-[232px]',
          cardWidthExpanded: 'w-[326px]', // 233 * 1.4 = 326
          cardHeightCollapsed: 'h-[164px]', // 117 * 1.4 = 164
          cardHeightExpanded: 'h-[358px]', // 256 * 1.4 = 358
          // Logo container: mobile 128x128 -> large 179x179 (1.4x)
          logoSize: 'w-44 h-44', // w-44 = 176px, close to 179px
          logoImageSize: { width: 106, height: 105 }, // 76*1.4=106, 75*1.4=105
          // Font sizes
          titleSize: 'text-[81px]', // 58 * 1.4 = 81
          iconSize: 'w-[34px] h-[34px]' // 24 * 1.4 = 34
        };
      case 'tablet':
        return {
          // Card sizes: mobile 165.5x117 -> tablet 199x140 (1.2x)
          cardWidthCollapsed: 'w-[199px]',
          cardWidthExpanded: 'w-[280px]', // 233 * 1.2 = 280
          cardHeightCollapsed: 'h-[140px]', // 117 * 1.2 = 140
          cardHeightExpanded: 'h-[307px]', // 256 * 1.2 = 307
          // Logo container: mobile 128x128 -> tablet 154x154 (1.2x)
          logoSize: 'w-38 h-38', // w-38 = 152px, close to 154px
          logoImageSize: { width: 91, height: 90 }, // 76*1.2=91, 75*1.2=90
          // Font sizes
          titleSize: 'text-[70px]', // 58 * 1.2 = 70
          iconSize: 'w-[29px] h-[29px]' // 24 * 1.2 = 29
        };
      default: // mobile
        return {
          cardWidthCollapsed: 'w-[165.5px]',
          cardWidthExpanded: 'w-[233px]',
          cardHeightCollapsed: 'h-[117px]',
          cardHeightExpanded: 'h-[256px]',
          logoSize: 'w-32 h-32',
          logoImageSize: { width: 76, height: 75 },
          titleSize: 'text-[58px]',
          iconSize: 'w-[24px] h-[24px]'
        };
    }
  };

  const sizes = getResponsiveSizes();

  // Responsive card dimensions
  const getCardHeight = (cardId: number) =>
    expandedCard === cardId ? sizes.cardHeightExpanded : sizes.cardHeightCollapsed;
  
  const getCardWidth = (cardId: number) =>
    expandedCard === cardId ? sizes.cardWidthExpanded : sizes.cardWidthCollapsed;

  return (
    <section className="relative min-h-screen bg-transparent px-4 py-16 overflow-visible">
      {/* Background Image */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none">
        <Image
          src="/image/mobile/5.webp"
          alt="Background"
          width={750}
          height={1184}
          loading="lazy"
          sizes="(max-width: 768px) 412px, (max-width: 1024px) 750px, 1200px"
          className="object-cover w-[412px] h-[650px]"
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

      <div className="relative z-10 max-w-sm md:max-w-md lg:max-w-lg mx-auto text-center">
        {/* One Berribot Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className={`${sizes.titleSize} font-medium text-white leading-tight`} style={{ fontFamily: 'Manrope, sans-serif' }}>
            One
            <br />
            Berribot.
          </h1>
        </motion.div>

        {/* Logo with Ripple Animation */}
        <motion.div
          className={`relative ${sizes.logoSize} mx-auto mb-12 flex items-center justify-center`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Ripple circles */}
          <motion.div
            className={`absolute ${sizes.logoSize} border-2 border-white/40 rounded-full pointer-events-none`}
            animate={{ 
              scale: [1, 2, 3.5], 
              opacity: [0.8, 0.4, 0] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeOut",
              repeatDelay: 0.5
            }}
          />
          <motion.div
            className={`absolute ${sizes.logoSize} border-2 border-white/40 rounded-full pointer-events-none`}
            animate={{ 
              scale: [1, 2, 3.5], 
              opacity: [0.8, 0.4, 0] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeOut", 
              delay: 1,
              repeatDelay: 0.5
            }}
          />
          <motion.div
            className={`absolute ${sizes.logoSize} border-2 border-white/30 rounded-full pointer-events-none`}
            animate={{ 
              scale: [1, 2, 3.5], 
              opacity: [0.6, 0.3, 0] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeOut", 
              delay: 2,
              repeatDelay: 0.5
            }}
          />

          {/* Logo */}
          <div className={`relative rounded-full overflow-hidden z-10 backdrop-blur-sm flex items-center justify-center`} style={{ width: `${sizes.logoImageSize.width}px`, height: `${sizes.logoImageSize.height}px` }}>
            <Image src="/image/logo_2.png" alt="BerriBot Logo" width={sizes.logoImageSize.width} height={sizes.logoImageSize.height} className="object-cover" />
          </div>
        </motion.div>

        {/* Every Recruiting Task Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className={`${sizes.titleSize} font-medium text-white leading-tight`} style={{ fontFamily: 'Manrope, sans-serif' }}>
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
                    <div className={`bg-white/20 rounded-full flex items-center justify-center mb-3`} style={{ width: `${parseInt(sizes.iconSize.match(/\d+/)?.[0] || '24') * 1.67}px`, height: `${parseInt(sizes.iconSize.match(/\d+/)?.[0] || '24') * 1.67}px` }}>
                      <Icon className={`${sizes.iconSize} text-white`} />
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
