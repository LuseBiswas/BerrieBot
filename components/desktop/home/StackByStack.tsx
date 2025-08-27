'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface StackCard {
  id: string;
  top?: React.ReactNode; // Made optional
  ribbon?: React.ReactNode; // Made optional
  bottom?: React.ReactNode; // Made optional
  topImage?: string; // Optional image for top section
  bottomImage?: string; // Optional image for bottom section
  ribbonImage?: string; // Optional image for ribbon section
}

interface StackByStackProps {
  cards: StackCard[];
  visibleCount?: number;
  width?: string;
  height?: string;
}

export default function StackByStack({
  cards,
  visibleCount = 3,
  width = 'w-[596px]',
  height = 'h-[596px]',
}: StackByStackProps) {
  // NEW: maintain an internal card order so we can rotate the deck endlessly
  const [order, setOrder] = useState<string[]>(() => cards.map(c => c.id));
  const [isDismissing, setIsDismissing] = useState(false);

  // Keep order in sync if parent changes the cards prop
  useEffect(() => {
    const nextIds = cards.map(c => c.id);
    setOrder(prev => {
      const prevSet = new Set(prev);
      // keep existing order where possible; append new ids; drop removed ids
      const merged = [
        ...prev.filter(id => nextIds.includes(id)),
        ...nextIds.filter(id => !prevSet.has(id)),
      ];
      return merged;
    });
  }, [cards]);

  // Fast lookup
  const idToCard = useMemo(() => {
    const map: Record<string, StackCard> = {};
    for (const c of cards) map[c.id] = c;
    return map;
  }, [cards]);

  const orderedCards: StackCard[] = useMemo(
    () => order.map(id => idToCard[id]).filter(Boolean),
    [order, idToCard]
  );

  // Render first N in the current order; depth = array index
  const visible = orderedCards.slice(0, Math.min(visibleCount, orderedCards.length));

  const onFrontClick = useCallback(() => {
    if (!isDismissing) setIsDismissing(true);
  }, [isDismissing]);

  const onCardClick = useCallback((cardId: string, depth: number) => {
    if (isDismissing) return;
    
    if (depth === 0) {
      // Front card - dismiss it
      setIsDismissing(true);
    } else {
      // Background card - bring it to front
      setOrder(prev => {
        const cardIndex = prev.indexOf(cardId);
        if (cardIndex === -1) return prev;
        
        const newOrder = [...prev];
        const [card] = newOrder.splice(cardIndex, 1);
        newOrder.unshift(card);
        return newOrder;
      });
    }
  }, [isDismissing]);

  return (
    <div className={`relative mx-auto ${width} ${height} select-none`}>
      <AnimatePresence mode="popLayout">
        {visible.map((card, depth) => {
          const isFront = depth === 0;

          // Enhanced positioning for spread layout with plus signs
          const xMove = depth * 175; // Move cards to the right - increased gap
          const yMove = -depth * 45; // Move cards up - increased gap
          const scale = 1 - depth * 0.05; // Subtle scaling
          const z = 100 - depth;
          const opacity = 1 - depth * 0.3; // More pronounced opacity reduction
          const blur = depth > 0 ? depth * 1.5 : 0; // Progressive blur effect
          const rotation = depth * 0; // Slight rotation for depth

          // Base transform for stacked appearance
          const baseTransform = {
            x: xMove,
            y: yMove,
            scale,
            opacity,
            rotate: rotation,
            filter: blur > 0 ? `blur(${blur}px)` : 'none',
          };

          const dismissTransform = isFront && isDismissing
            ? {
                x: -200,
                y: yMove + 20,
                opacity: 0,
                rotate: -15,
                scale: scale * 0.9,
                filter: 'none',
              }
            : baseTransform;

          return (
            <motion.div
              key={card.id}
              layout
              initial={{
                opacity: 0,
                y: yMove + 80,
                scale: scale * 0.85,
                x: xMove + 60,
                rotate: rotation + 5,
              }}
              animate={dismissTransform}
              exit={{
                opacity: 0,
                y: yMove + 80,
                scale: scale * 0.85,
                x: xMove + 60,
                rotate: rotation + 5,
              }}
              transition={
                isFront && isDismissing
                  ? { 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      x: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                      rotate: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                      scale: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                    }
                  : { 
                      type: 'spring', 
                      stiffness: 260, 
                      damping: 20, 
                      mass: 0.8,
                      opacity: { duration: 0.3 },
                      layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                    }
              }
              style={{
                zIndex: z,
                willChange: 'transform, opacity, filter',
              }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => onCardClick(card.id, depth)}
              onAnimationComplete={() => {
                // NEW: after front card finishes dismissing, move it to the back and reset
                if (isFront && isDismissing) {
                  setOrder(prev => {
                    if (prev.length <= 1) return prev;
                    const [first, ...rest] = prev;
                    return [...rest, first];
                  });
                  setIsDismissing(false);
                }
              }}
              whileHover={
                !isDismissing
                  ? {
                      scale: scale * 1.03,
                      y: yMove - 8,
                      x: xMove - (depth * 5), // Slight movement toward front
                      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                    }
                  : {}
              }
              whileTap={
                !isDismissing
                  ? {
                      scale: scale * 0.97,
                      y: yMove + 2,
                      transition: { duration: 0.15 },
                    }
                  : {}
              }
            >
              {/* Main card container (unchanged) */}
              <div
                className={`
                  relative flex flex-col justify-between h-full rounded-3xl 
                  bg-[#1E1E1E] text-white overflow-hidden 
                  ${isFront ? 'shadow-2xl shadow-black/40' : depth === 1 ? 'shadow-xl shadow-black/30' : 'shadow-lg shadow-black/20'}
                `}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Top section */}
                <div className="flex-1 flex items-center justify-center px-6 py-8">
                  <div className="text-center space-y-4">
                    {card.topImage && (
                      <div>
                        <Image 
                          src={card.topImage} 
                          alt="Top section" 
                          width={128}
                          height={128}
                          className="mx-auto max-w-full h-auto max-h-32 object-contain"
                        />
                      </div>
                    )}
                    {card.top && (
                      <div className="text-[45px] font-light leading-tight text-white">
                        {card.top}
                      </div>
                    )}
                  </div>
                </div>

                {/* Ribbon section - teal background only for text, transparent for image */}
                {(card.ribbon || card.ribbonImage) && (
                  <div className={`relative w-full overflow-hidden flex items-center ${
                    card.ribbonImage ? 'py-8' : 'py-6 bg-[#028374]'
                  }`}>
                    <div className="relative w-full flex items-center">
                      {card.ribbonImage ? (
                        // Static image in ribbon without background
                        <div className="w-full flex justify-center">
                          <Image 
                            src={card.ribbonImage} 
                            alt="Ribbon" 
                            width={64}
                            height={64}
                            className="h-16 object-contain"
                          />
                        </div>
                      ) : (
                        // Scrolling text marquee
                        <div className="flex animate-marquee whitespace-nowrap items-center">
                          <span className="text-white font-semibold text-[16px] uppercase tracking-widest mx-8">
                            {card.ribbon}
                          </span>
                          <span className="text-white font-semibold text-[16px] uppercase tracking-widest mx-8">
                            {card.ribbon}
                          </span>
                          <span className="text-white font-semibold text-[16px] uppercase tracking-widest mx-8">
                            {card.ribbon}
                          </span>
                          <span className="text-white font-semibold text-[16px] uppercase tracking-widest mx-8">
                            {card.ribbon}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom section */}
                <div className="flex-1 flex items-center justify-center px-6 py-8">
                  <div className="text-center space-y-4">
                    {card.bottomImage && (
                      <div>
                        <Image 
                          src={card.bottomImage} 
                          alt="Bottom section" 
                          width={128}
                          height={128}
                          className="mx-auto max-w-full h-auto max-h-32 object-contain"
                        />
                      </div>
                    )}
                    {card.bottom && (
                      <div className="text-[45px] font-light leading-tight text-white">
                        {card.bottom}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced glow effect for front card */}
              {isFront && (
                <div className="absolute inset-0 rounded-3xl ring-1 ring-teal-200/40 pointer-events-none" />
              )}

              {/* Plus icon on the right side of each card */}
              <div 
                className="absolute pointer-events-none"
                style={{
                  right: '-120px', // Position 120px to the right of the card
                  bottom: '0%',
                  transform: 'translateY(50%)',
                  zIndex: z + 1,
                  opacity: opacity * 0.8, // Slightly more transparent than the card
                }}
              >
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Click blocker during dismiss animation (unchanged) */}
      {isDismissing && <div className="absolute inset-0 z-50 pointer-events-auto" />}

      {/* Marquee CSS (unchanged) */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
