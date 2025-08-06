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
        const yMove = -35 * depth; // Increased gap between cards
        const scale = 1 - depth * 0.08; // More pronounced scaling
        const z = 100 - depth;
        const opacity = 1 - depth * 0.15; // Slightly less opacity reduction
        const blur = depth > 0 ? Math.min(depth * 2, 4) : 0; // Progressive blur

        // Optimized animations - only transform properties
        const baseTransform = {
          y: yMove,
          scale,
          opacity,
          x: 0,
          rotate: 0,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
        };

        const dismissTransform = isFront && isDismissing
          ? {
              x: -180,
              opacity: 0,
              rotate: -6,
              scale: scale * 0.95,
              y: yMove + 10,
              filter: 'none', // No blur during dismiss
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
              willChange: 'transform, opacity, filter', // Add filter to will-change for optimization
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
            {/* Main card container */}
            <div 
              className={`
                relative flex flex-col justify-between h-full rounded-3xl 
                bg-[#1E1E1E] text-white overflow-hidden 
                
                ${isFront ? 'shadow-2xl shadow-black/40' : depth === 1 ? 'shadow-xl shadow-black/30' : 'shadow-lg shadow-black/20'}
              `}
              style={{
                transform: 'translateZ(0)', // Hardware acceleration
                backfaceVisibility: 'hidden', // Optimize for blur
              }}
            >
              {/* Top section */}
              <div className="flex-1 flex items-center justify-center px-8 py-10">
                <div className="text-center">
                  <div className="text-3xl font-bold leading-tight text-white">
                    {card.top}
                  </div>
                </div>
              </div>

              {/* Teal ribbon with scrolling marquee */}
              <div className="relative w-full py-6 bg-gradient-to-r from-teal-600 to-teal-500 overflow-hidden">
                <div className="relative">
                  {/* Scrolling marquee */}
                  <div className="flex animate-marquee whitespace-nowrap">
                    <span className="text-white font-semibold text-lg uppercase tracking-widest mx-8">
                      {card.ribbon}
                    </span>
                    <span className="text-white font-semibold text-lg uppercase tracking-widest mx-8">
                      {card.ribbon}
                    </span>
                    <span className="text-white font-semibold text-lg uppercase tracking-widest mx-8">
                      {card.ribbon}
                    </span>
                    <span className="text-white font-semibold text-lg uppercase tracking-widest mx-8">
                      {card.ribbon}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex-1 flex items-center justify-center px-8 py-10">
                <div className="text-center">
                  <div className="text-3xl font-bold leading-tight text-white">
                    {card.bottom}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle glow effect for front card */}
            {isFront && (
              <div className="absolute inset-0 rounded-3xl ring-1 ring-teal-500/20 pointer-events-none" />
            )}
          </motion.div>
        );
      })}

      {/* Click blocker during dismiss animation */}
      {isDismissing && (
        <div className="absolute inset-0 z-50 pointer-events-auto" />
      )}
      
      {/* Add custom CSS for marquee animation */}
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
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
