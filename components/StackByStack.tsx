'use client';
import React, { useCallback, useState } from 'react';
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
  width = 'w-[22rem]',
  height = 'h-[28rem]',
}: StackByStackProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDir] = useState<1 | -1>(1);
  const [isDismissing, setIsDismissing] = useState(false); // NEW

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
    // Trigger the left-slide fade first; when it completes we call advance()
    if (!isDismissing) setIsDismissing(true);
  }, [isDismissing]);

  const visible = cards
    .map((c, i) => ({ card: c, offset: i - index }))
    .filter((_, i) => Math.abs(i - index) < visibleCount); // keep order; zIndex handles stacking

  return (
    <div className={`relative mx-auto ${width} ${height} select-none`} style={{ perspective: '1200px' }}>
      {visible.map(({ card, offset }) => {
        const isFront = offset === 0;
        const depth = Math.min(Math.max(offset, 0), visibleCount - 1);
        const yMove = -32 * depth;
        const scale = 1 - depth * 0.06;
        const blur = depth * 2;
        const z = 100 - depth;

        // Base (stack) animation
        const baseAnim = { opacity: 1, y: yMove, scale, filter: `blur(${blur}px)`, x: 0, rotate: 0 };

        // Dismiss-left animation for the front card
        const dismissAnim =
          isFront && isDismissing
            ? { x: -180, opacity: 0, rotate: -6, scale: scale * 0.98, y: yMove + 4 }
            : baseAnim;

        return (
          <AnimatePresence key={card.id}>
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: yMove + 60, scale, filter: `blur(${blur}px)`, x: 0 }}
              animate={dismissAnim}
              exit={{ opacity: 0, y: yMove + 80, scale: scale * 0.9, filter: `blur(${blur + 4}px)` }}
              transition={
                isFront && isDismissing
                  ? { type: 'tween', duration: 0.35, ease: 'easeOut' } // left-slide timing
                  : { type: 'spring', stiffness: 600, damping: 40 }
              }
              style={{ zIndex: z }}
              className={`absolute inset-0 ${isFront ? 'cursor-pointer' : 'pointer-events-none'}`}
              onClick={isFront ? onFrontClick : undefined}
              onAnimationComplete={() => {
                // When the dismiss animation finishes, advance the stack and reset the flag
                if (isFront && isDismissing) {
                  setIsDismissing(false);
                  advance();
                }
              }}
            >
              <div className="relative flex flex-col justify-between h-full rounded-3xl bg-neutral-900 text-white shadow-2xl overflow-hidden">
                <div className="px-6 pt-10 text-center leading-tight">{card.top}</div>
                <div className="w-full py-3 bg-teal-600 text-center font-medium tracking-wide">{card.ribbon}</div>
                <div className="px-6 pb-10 text-center leading-tight">{card.bottom}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })}
      {/* Optional: block clicks during the short dismiss animation to avoid double taps */}
      {isDismissing && <div className="absolute inset-0" style={{ pointerEvents: 'auto' }} />}
    </div>
  );
}
