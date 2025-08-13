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
        
        // Enhanced positioning for top-right expansion like in the image
        const xMove = depth * 175; // Move cards to the right - increased gap
        const yMove = -depth * 45; // Move cards up - increased gap
        const scale = 1 - depth * 0.05; // Subtle scaling
        const z = 100 - depth;
        const opacity = 1 - depth * 0.3; // More pronounced opacity reduction
        const blur = depth > 0 ? depth * 3 : 0; // Progressive blur effect
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
            initial={{
              opacity: 0,
              x: xMove + 50,
              y: yMove + 50,
              scale: scale * 0.8,
              rotate: rotation + 10,
            }}
            animate={dismissTransform}
            exit={{
              opacity: 0,
              x: xMove + 50,
              y: yMove + 50,
              scale: scale * 0.8,
            }}
            transition={
              isFront && isDismissing
                ? { 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1] 
                  }
                : { 
                    type: 'spring', 
                    stiffness: 200, 
                    damping: 25,
                    opacity: { duration: 0.3 },
                  }
            }
            style={{ 
              zIndex: z,
              willChange: 'transform, opacity, filter',
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
              scale: scale * 1.03,
              y: yMove - 5,
              transition: { duration: 0.2 }
            } : {}}
            whileTap={isFront ? { 
              scale: scale * 0.97,
              transition: { duration: 0.1 }
            } : {}}
          >
            {/* Main card container with clean design */}
            <div 
              className={`
                relative flex flex-col justify-between h-full rounded-2xl 
                bg-white text-gray-900 overflow-hidden border border-gray-100
                ${isFront 
                  ? 'shadow-2xl shadow-black/25' 
                  : depth === 1 
                    ? 'shadow-xl shadow-black/20' 
                    : 'shadow-lg shadow-black/15'
                }
              `}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Top section */}
              <div className="flex-1 flex items-center justify-center px-6 py-8">
                <div className="text-center space-y-2">
                  <div className="font-mono text-3xl font-extralight leading-tight text-gray-900">
                    {card.top}
                  </div>
                </div>
              </div>

              {/* Teal ribbon section */}
              <div className="relative w-full py-4 bg-gradient-to-r from-teal-500 to-teal-400 overflow-hidden">
                <div className="relative">
                  <div className="flex animate-marquee whitespace-nowrap">
                    <span className="text-white font-semibold text-sm uppercase tracking-wider mx-6">
                      {card.ribbon}
                    </span>
                    <span className="text-white font-semibold text-sm uppercase tracking-wider mx-6">
                      {card.ribbon}
                    </span>
                    <span className="text-white font-semibold text-sm uppercase tracking-wider mx-6">
                      {card.ribbon}
                    </span>
                    <span className="text-white font-semibold text-sm uppercase tracking-wider mx-6">
                      {card.ribbon}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex-1 flex items-center justify-center px-6 py-8">
                <div className="text-center space-y-2">
                  <div className="font-mono text-3xl font-extralight leading-tight text-gray-900">
                    {card.bottom}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced glow effect for front card */}
            {isFront && (
              <div className="absolute inset-0 rounded-2xl ring-1 ring-teal-200/40 pointer-events-none" />
            )}
          </motion.div>
        );
      })}

      {/* Click blocker during dismiss animation */}
      {isDismissing && (
        <div className="absolute inset-0 z-50 pointer-events-auto" />
      )}
      
      {/* Custom CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
