'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface StackCard {
  id: string;
  top: React.ReactNode;
  ribbon: React.ReactNode;
  bottom: React.ReactNode;
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

  return (
    <div className={`relative mx-auto ${width} ${height} select-none`}>
      <AnimatePresence mode="popLayout">
        {visible.map((card, depth) => {
          const isFront = depth === 0;

          // --- KEEPING YOUR ORIGINAL VISUALS ---
          const yMove = -60 * depth;             // same vertical gap
          const scale = 1 - depth * 0.08;        // same scaling
          const z = 100 - depth;                 // same z-index idea
          const opacity = 1 - depth * 0.15;      // same opacity falloff
          const blur = depth > 0 ? Math.min(depth * 2, 4) : 0; // same blur

          const baseTransform = {
            y: yMove,
            scale,
            opacity,
            x: 0,
            rotate: 0,
            filter: blur > 0 ? `blur(${blur}px)` : 'none',
          };

          const dismissTransform =
            isFront && isDismissing
              ? {
                  x: -300,
                  opacity: 0,
                  rotate: -15,
                  scale: scale * 0.8,
                  y: yMove + 20,
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
                x: 60,
                rotate: 5,
              }}
              animate={dismissTransform}
              exit={{
                opacity: 0,
                y: yMove + 80,
                scale: scale * 0.85,
                x: 60,
                rotate: 5,
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
              className={`absolute inset-0 ${isFront ? 'cursor-pointer' : 'pointer-events-none'}`}
              onClick={isFront ? onFrontClick : undefined}
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
                isFront && !isDismissing
                  ? {
                      scale: scale * 1.03,
                      y: yMove - 5,
                      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                    }
                  : {}
              }
              whileTap={
                isFront && !isDismissing
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
                <div className="flex-1 flex items-center justify-center px-3 py-10">
                  <div className="text-center">
                    <div className="text-[45px] font-light leading-tight text-white">
                      {card.top}
                    </div>
                  </div>
                </div>

                {/* Teal ribbon with scrolling marquee */}
                <div className="relative w-full py-6 bg-gradient-to-r from-teal-600 to-teal-500 overflow-hidden">
                  <div className="relative">
                    <div className="flex animate-marquee whitespace-nowrap">
                      <span className="text-white font-semibold text-sm uppercase tracking-widest mx-8">
                        {card.ribbon}
                      </span>
                      <span className="text-white font-semibold text-sm uppercase tracking-widest mx-8">
                        {card.ribbon}
                      </span>
                      <span className="text-white font-semibold text-sm uppercase tracking-widest mx-8">
                        {card.ribbon}
                      </span>
                      <span className="text-white font-semibold text-sm uppercase tracking-widest mx-8">
                        {card.ribbon}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom section */}
                <div className="flex-1 flex items-center justify-center px-8 py-10">
                  <div className="text-center">
                    <div className="text-[45px] font-light leading-tight text-white">
                      {card.bottom}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle glow effect for front card (unchanged) */}
              {isFront && !isDismissing && (
                <div className="absolute inset-0 rounded-3xl ring-1 ring-teal-500/20 pointer-events-none" />
              )}
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
