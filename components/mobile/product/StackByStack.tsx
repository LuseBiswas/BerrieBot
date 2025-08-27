'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface StackCard {
  id: string;
  top?: React.ReactNode;
  ribbon?: React.ReactNode;
  ribbonStatic?: React.ReactNode; // Added ribbonStatic like desktop
  bottom?: React.ReactNode;
  topImage?: string; // Keep for backward compatibility
  bottomImage?: string; // Keep for backward compatibility
  ribbonImage?: string; // Keep for backward compatibility
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
          cardText: 'text-[40px]', // Closer to desktop 45px
          ribbonText: 'text-sm',
          imageSize: 'max-h-20',
          ribbonImageSize: 'h-10',
          cardPadding: 'px-6 py-8', // Match desktop padding
        };
      case 'tablet':
        return {
          cardText: 'text-[32px]', // Larger for better desktop match
          ribbonText: 'text-sm',
          imageSize: 'max-h-18',
          ribbonImageSize: 'h-9',
          cardPadding: 'px-5 py-6',
        };
      default: // mobile
        return {
          cardText: 'text-[28px]', // Larger for better visual match
          ribbonText: 'text-sm', // Larger ribbon text
          imageSize: 'max-h-16',
          ribbonImageSize: 'h-8',
          cardPadding: 'px-4 py-6', // Better padding
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
              {/* Main card container - white design like desktop */}
              <div
                className={`
                  relative flex flex-col justify-between h-full rounded-2xl 
                  bg-[#1E1E1E] text-white overflow-hidden 
                  ${isFront ? 'shadow-2xl shadow-black/25' : depth === 1 ? 'shadow-xl shadow-black/20' : 'shadow-lg shadow-black/15'}
                `}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Top section - dynamic sizing based on bottom content */}
                <div className={`${card.bottom ? 'flex-1' : 'flex-[2]'} flex items-center justify-center ${textSizes.cardPadding}`}>
                  <div className="text-center space-y-2">
                    {card.topImage && (
                      <div>
                        <Image 
                          src={card.topImage} 
                          alt="Top section" 
                          width={96}
                          height={96}
                          className={`mx-auto max-w-full h-auto ${textSizes.imageSize} object-contain`}
                        />
                      </div>
                    )}
                    {card.top && (
                      <div className={`${textSizes.cardText} font-light leading-tight text-white break-words`}>
                        {card.top}
                      </div>
                    )}
                  </div>
                </div>

                {/* Teal ribbon section - simplified for debugging */}
                {(card.ribbon || card.ribbonStatic || card.ribbonImage) && (
                  <div className="relative w-full py-4 bg-[#028374] overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                      {card.ribbonStatic ? (
                        // Static ribbon without marquee effect - like desktop
                        <div className="text-center w-full">
                          <span className="text-white font-semibold text-sm uppercase tracking-wider" style={{ color: '#FFFFFF', fontSize: '14px' }}>
                            {card.ribbonStatic}
                          </span>
                        </div>
                      ) : card.ribbonImage ? (
                        // Static image in ribbon
                        <div className="w-full flex justify-center items-center">
                          <Image 
                            src={card.ribbonImage} 
                            alt="Ribbon" 
                            width={48}
                            height={48}
                            className={`${textSizes.ribbonImageSize} object-contain`}
                          />
                        </div>
                      ) : (
                        // Framer Motion marquee ribbon with keyword replacement
                        <div className="relative w-full overflow-hidden">
                          <motion.div 
                            className="flex items-center whitespace-nowrap"
                            animate={{ x: [0, -300] }}
                            transition={{
                              duration: 15,
                              ease: "linear",
                              repeat: Infinity
                            }}
                          >
                            {(() => {
                              // Function to process ribbon content and replace keywords with dots
                              const processRibbonContent = (content: React.ReactNode) => {
                                // Convert React content to string for processing
                                let textContent = '';
                                if (typeof content === 'string') {
                                  textContent = content;
                                } else if (React.isValidElement(content)) {
                                  // Extract text from JSX like <>SOC 2&nbsp;ISO&nbsp;27001</>
                                  const extractText = (node: React.ReactNode): string => {
                                    if (typeof node === 'string') return node;
                                    if (typeof node === 'number') return node.toString();
                                    if (React.isValidElement(node)) {
                                      const element = node as React.ReactElement<{ children?: React.ReactNode }>;
                                      if (typeof element.props.children === 'string') {
                                        return element.props.children;
                                      }
                                      if (Array.isArray(element.props.children)) {
                                        return element.props.children.map(extractText).join('');
                                      }
                                      return extractText(element.props.children);
                                    }
                                    if (Array.isArray(node)) {
                                      return node.map(extractText).join('');
                                    }
                                    return '';
                                  };
                                  textContent = extractText(content);
                                }

                                // Replace &nbsp; or •DOT• with our special marker
                                const parts = textContent.replace(/&nbsp;/g, '•DOT•').split('•DOT•');
                                
                                return parts.map((part, index) => (
                                  <React.Fragment key={index}>
                                    <span className="text-white font-semibold text-sm uppercase tracking-wider" style={{ color: '#FFFFFF', fontSize: '14px' }}>
                                      {part}
                                    </span>
                                    {index < parts.length - 1 && (
                                      <span className="mx-2" style={{ color: '#0BECD2', fontSize: '14px' }}>•</span>
                                    )}
                                  </React.Fragment>
                                ));
                              };

                              const processedContent = processRibbonContent(card.ribbon);
                              
                              // Create multiple repetitions for seamless scroll
                              return (
                                <>
                                  {[...Array(6)].map((_, index) => (
                                    <React.Fragment key={index}>
                                      {processedContent}
                                      <span className="mx-4" style={{ color: '#0BECD2', fontSize: '14px' }}>•</span>
                                    </React.Fragment>
                                  ))}
                                </>
                              );
                            })()}
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom section - only render if content exists */}
                {(card.bottom || card.bottomImage) && (
                  <div className={`flex-1 flex items-center justify-center ${textSizes.cardPadding}`}>
                    <div className="text-center space-y-2">
                      {card.bottomImage && (
                        <div>
                          <Image 
                            src={card.bottomImage} 
                            alt="Bottom section" 
                            width={96}
                            height={96}
                            className={`mx-auto max-w-full h-auto ${textSizes.imageSize} object-contain`}
                          />
                        </div>
                      )}
                      {card.bottom && (
                        <div className={`${textSizes.cardText} font-light leading-tight text-white break-words`}>
                          {card.bottom}
                        </div>
                      )}
                    </div>
                  </div>
                )}
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

      {/* Marquee CSS - simpler approach for reliable visibility */}
      <style jsx>{`
        @keyframes marquee-simple {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-simple {
          animation: marquee-simple 20s linear infinite;
          white-space: nowrap;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 16s linear infinite;
        }
      `}</style>
    </div>
  );
} 