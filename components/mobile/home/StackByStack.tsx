'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  screenSize?: 'mobile' | 'tablet' | 'large';
}

export default function MobileStackByStack({
  cards,
  visibleCount = 3,
  width = 'w-[259.79px]',
  height = 'h-[259.79px]',
  screenSize = 'mobile',
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

  // Responsive animation values based on screen size
  const getAnimationValues = () => {
    switch (screenSize) {
      case 'large':
        return {
          yMove: -53, // -40 * 1.33 ≈ -53
          dismissX: -266, // -200 * 1.33 ≈ -266
          initialY: 67, // 50 * 1.33 ≈ 67
          initialX: 53, // 40 * 1.33 ≈ 53
          exitY: 67, // 50 * 1.33 ≈ 67
          exitX: 53, // 40 * 1.33 ≈ 53
          hoverY: -4, // -3 * 1.33 ≈ -4
          tapY: 3, // 2 * 1.33 ≈ 3
        };
      case 'tablet':
        return {
          yMove: -47, // -40 * 1.17 ≈ -47
          dismissX: -234, // -200 * 1.17 ≈ -234
          initialY: 58, // 50 * 1.17 ≈ 58
          initialX: 47, // 40 * 1.17 ≈ 47
          exitY: 58, // 50 * 1.17 ≈ 58
          exitX: 47, // 40 * 1.17 ≈ 47
          hoverY: -4, // -3 * 1.17 ≈ -4
          tapY: 2, // 2 * 1.17 ≈ 2
        };
      default: // mobile
        return {
          yMove: -40,
          dismissX: -200,
          initialY: 50,
          initialX: 40,
          exitY: 50,
          exitX: 40,
          hoverY: -3,
          tapY: 2,
        };
    }
  };

  const animValues = getAnimationValues();

  // Responsive text and spacing values
  const getTextSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          cardText: 'text-xl', // larger than mobile text-lg
          ribbonText: 'text-sm', // larger than mobile text-xs
          imageSize: 'max-h-20', // larger than mobile max-h-16
          ribbonImageSize: 'h-10', // larger than mobile h-8
          cardPadding: 'px-4 py-5', // larger than mobile px-3 py-4
        };
      case 'tablet':
        return {
          cardText: 'text-[34px]', // slightly larger than mobile
          ribbonText: 'text-xs', // same as mobile but will look better with larger container
          imageSize: 'max-h-18', // slightly larger than mobile max-h-16
          ribbonImageSize: 'h-9', // slightly larger than mobile h-8
          cardPadding: 'px-3 py-4', // same as mobile
        };
      default: // mobile
        return {
          cardText: 'text-[24px]',
          ribbonText: 'text-xs',
          imageSize: 'max-h-16',
          ribbonImageSize: 'h-8',
          cardPadding: 'px-3 py-4',
        };
    }
  };

  const textSizes = getTextSizes();

  return (
    <div className={`relative mx-auto ${width} ${height} select-none`}>
      <AnimatePresence mode="popLayout">
        {visible.map((card, depth) => {
          const isFront = depth === 0;

          // --- RESPONSIVE VISUALS ---
          const yMove = animValues.yMove * depth;    // responsive vertical gap
          const scale = 1 - depth * 0.08;            // same scaling ratio
          const z = 100 - depth;                     // same z-index idea
          const opacity = 1 - depth * 0.15;          // same opacity falloff
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
                  x: animValues.dismissX, // responsive dismiss distance
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
                y: yMove + animValues.initialY, // responsive initial position
                scale: scale * 0.85,
                x: animValues.initialX, // responsive initial x
                rotate: 5,
              }}
              animate={dismissTransform}
              exit={{
                opacity: 0,
                y: yMove + animValues.exitY, // responsive exit position
                scale: scale * 0.85,
                x: animValues.exitX, // responsive exit x
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
                      y: yMove + animValues.hoverY, // responsive hover lift
                      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                    }
                  : {}
              }
              whileTap={
                isFront && !isDismissing
                  ? {
                      scale: scale * 0.97,
                      y: yMove + animValues.tapY, // responsive tap press
                      transition: { duration: 0.15 },
                    }
                  : {}
              }
            >
              {/* Main card container - mobile optimized */}
              <div
                className={`
                  relative flex flex-col justify-between h-full rounded-4xl 
                  bg-[#1E1E1E] text-white overflow-hidden 
                  ${isFront ? 'shadow-2xl shadow-black/40' : depth === 1 ? 'shadow-xl shadow-black/30' : 'shadow-lg shadow-black/20'}
                `}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Top section - responsive */}
                <div className={`flex-1 flex items-center justify-center ${textSizes.cardPadding}`}>
                  <div className="text-center space-y-2">
                    {card.topImage && (
                      <div>
                        <img 
                          src={card.topImage} 
                          alt="Top section" 
                          className={`mx-auto max-w-full h-auto ${textSizes.imageSize} object-contain`}
                        />
                      </div>
                    )}
                    {card.top && (
                      <div className={`${textSizes.cardText} font-light leading-tight text-white`}>
                        {card.top}
                      </div>
                    )}
                  </div>
                </div>

                {/* Ribbon section - mobile optimized */}
                {(card.ribbon || card.ribbonImage) && (
                  <div className={`relative w-full overflow-hidden flex items-center ${
                    card.ribbonImage ? 'py-3' : 'py-2 bg-gradient-to-r from-teal-600 to-teal-500'
                  }`}>
                    <div className="relative w-full flex items-center">
                      {card.ribbonImage ? (
                        // Static image in ribbon without background
                        <div className="w-full flex justify-center">
                          <img 
                            src={card.ribbonImage} 
                            alt="Ribbon" 
                            className={`${textSizes.ribbonImageSize} object-contain`}
                          />
                        </div>
                      ) : (
                        // Scrolling text marquee - responsive
                        <div className="flex animate-marquee whitespace-nowrap items-center">
                          <span className={`text-white font-semibold ${textSizes.ribbonText} uppercase tracking-wide mx-4`}>
                            {card.ribbon}
                          </span>
                          <span className={`text-white font-semibold ${textSizes.ribbonText} uppercase tracking-wide mx-4`}>
                            {card.ribbon}
                          </span>
                          <span className={`text-white font-semibold ${textSizes.ribbonText} uppercase tracking-wide mx-4`}>
                            {card.ribbon}
                          </span>
                          <span className={`text-white font-semibold ${textSizes.ribbonText} uppercase tracking-wide mx-4`}>
                            {card.ribbon}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom section - responsive */}
                <div className={`flex-1 flex items-center justify-center ${textSizes.cardPadding}`}>
                  <div className="text-center space-y-2">
                    {card.bottomImage && (
                      <div>
                        <img 
                          src={card.bottomImage} 
                          alt="Bottom section" 
                          className={`mx-auto max-w-full h-auto ${textSizes.imageSize} object-contain`}
                        />
                      </div>
                    )}
                    {card.bottom && (
                      <div className={`${textSizes.cardText} font-light leading-tight text-white`}>
                        {card.bottom}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Subtle glow effect for front card */}
              {/* {isFront && !isDismissing && (
                <div className="absolute inset-0 rounded-2xl ring-1 ring-teal-500/20 pointer-events-none" />
              )} */}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Click blocker during dismiss animation */}
      {isDismissing && <div className="absolute inset-0 z-50 pointer-events-auto" />}

      {/* Marquee CSS */}
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