'use client';
import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

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
  width = 'w-[22rem]',
  height = 'h-[28rem]',
}: StackByStackProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDir] = useState<1 | -1>(1);
  const [isDismissing, setIsDismissing] = useState(false);

  const advance = useCallback(() => {
    const last = cards.length - 1;
    if (direction === 1 && index === last) {
      setDir(-1);
      setIndex(index - 1);
    } else if (direction === -1 && index === 0) {
      setDir(1);
      setIndex(1);
    } else {
      setIndex(i => i + direction);
    }
  }, [cards.length, direction, index]);

  const onFrontClick = useCallback(() => {
    if (!isDismissing) setIsDismissing(true);
  }, [isDismissing]);

  const visible = cards
    .map((c, i) => ({ card: c, offset: i - index }))
    .filter((_, i) => Math.abs(i - index) < visibleCount);

  return (
    <div className={`relative mx-auto ${width} ${height} select-none`}>
        {visible.map(({ card, offset }) => {
          const isFront = offset === 0;
          const depth = Math.min(Math.max(offset, 0), visibleCount - 1);
          const yMove = -20 * depth;
          const scale = 1 - depth * 0.05;
          const z = 100 - depth;
          const opacity = 1 - depth * 0.2;

          // Optimized animations - only transform properties
          const baseTransform = {
            y: yMove,
            scale,
            opacity,
            x: 0,
            rotate: 0,
          };

          const dismissTransform = isFront && isDismissing
            ? {
                x: -180,
                opacity: 0,
                rotate: -6,
                scale: scale * 0.95,
                y: yMove + 10,
              }
            : baseTransform;

          return (
            <motion.div
              key={card.id}
              initial={{
                opacity: 0,
                y: yMove + 60,
                scale: scale * 0.9,
                x: 40,
              }}
              animate={dismissTransform}
              exit={{
                opacity: 0,
                y: yMove + 60,
                scale: scale * 0.9,
              }}
              transition={
                isFront && isDismissing
                  ? { 
                      duration: 0.35, 
                      ease: [0.4, 0, 0.2, 1] 
                    }
                  : { 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 30,
                      opacity: { duration: 0.2 },
                    }
              }
              style={{ 
                zIndex: z,
                willChange: 'transform, opacity', // Optimize for animations
              }}
              className={`absolute inset-0 ${isFront ? 'cursor-pointer' : 'pointer-events-none'}`}
              onClick={isFront ? onFrontClick : undefined}
              onAnimationComplete={() => {
                if (isFront && isDismissing) {
                  setIsDismissing(false);
                  advance();
                }
              }}
              whileHover={isFront ? { 
                scale: scale * 1.02,
                y: yMove - 3,
                transition: { duration: 0.2 }
              } : {}}
              whileTap={isFront ? { 
                scale: scale * 0.98,
                transition: { duration: 0.1 }
              } : {}}
            >
              {/* Pre-calculated shadow classes instead of dynamic filters */}
              <div 
                className={`
                  relative flex flex-col justify-between h-full rounded-2xl 
                  bg-gradient-to-b from-neutral-800 to-neutral-900 
                  text-white overflow-hidden border border-neutral-700/30
                  ${isFront ? 'shadow-2xl' : depth === 1 ? 'shadow-xl' : 'shadow-lg'}
                `}
                style={{
                  transform: 'translateZ(0)', // Force hardware acceleration
                }}
              >
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-400/20 to-transparent" />
                
                {/* Top content - no individual animations */}
                <div className="px-8 pt-12 text-center">
                  <div className="text-lg font-medium leading-relaxed text-neutral-100">
                    {card.top}
                  </div>
                </div>

                {/* Ribbon - simplified */}
                <div className="relative w-full py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-center font-semibold tracking-wider text-white">
                  <div className="text-sm uppercase">
                    {card.ribbon}
                  </div>
                </div>

                {/* Bottom content */}
                <div className="px-8 pb-12 text-center">
                  <div className="text-base leading-relaxed text-neutral-200">
                    {card.bottom}
                  </div>
                </div>

                {/* Bottom highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent" />
              </div>

              {/* Simplified glow effect - only for front card */}
              {isFront && (
                <div className="absolute inset-0 rounded-2xl ring-1 ring-teal-500/20 pointer-events-none" />
              )}
            </motion.div>
          );
        })}

                 {/* Click blocker */}
         {isDismissing && (
           <div className="absolute inset-0 z-50 pointer-events-auto" />
         )}
       </div>
  );
}
