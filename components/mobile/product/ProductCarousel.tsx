"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface ProductData {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  frontImage: string;
  backImage: string;
  features: Array<{
    lordicon: string;
    content: string;
    position: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
      transform?: string;
    };
  }>;
}

const productsData: ProductData[] = [
  {
    id: 1,
    heading: "BerriConnect",
    subheading: "Automated Candidate <br/> Communication & Scheduling.",
    description: "Boost your show-up rates, <br/> eliminate manual scheduling,<br/> and more than 7 million minutes <br/> of candidate engagement.",
    frontImage: "/image/space/FrontCards/Connect1.png",
    backImage: "/image/space/BackCards/Connect2.png",
    features: [
      {
        lordicon: "https://cdn.lordicon.com/vpbspaec.json",
        content: "Bulk calling, WhatsApp, <br/> SMS, email follow-ups",
        position: {
          top: "-30%",
          left: "0%",
          transform: "translate(-50%, -50%)"
        }
      },
      {
        lordicon: "https://cdn.lordicon.com/odpyouay.json",
        content: "Live reminders <br/> & interview <br/> confirmations",
        position: {
          top: "-20%",
          right: "-40%",
          transform: "translate(50%, -50%)"
        }
      },
      {
        lordicon: "https://cdn.lordicon.com/adbkylwa.json",
        content: "AI-powered calendar <br/> conflict resolution",
        position: {
          bottom: "25%",
          left: "110%",
          transform: "translate(-50%, 50%)"
        }
      }
    ]
  },
  {
    id: 2,
    heading: "BerriSearch <br/> & Match",
    subheading: "AI-Powered Resume <br/> Screening & Matching.",
    description: "Shortlist high-fit candidates <br/> in seconds. Minimize <br/> bias and hiring errors.",
    frontImage: "/image/space/FrontCards/Search1.png",
    backImage: "/image/space/BackCards/Search2.png",
    features: [
      {
        lordicon: "https://cdn.lordicon.com/ypagsvdy.json",
        content: "AI-based skill mapping <br/> and contextual analysis",
        position: {
          top: "-30%",
          left: "65%",
          transform: "translate(-50%, -50%)"
        }
      },
      {
        lordicon: "https://cdn.lordicon.com/hcsnfpqp.json",
        content: "1:1 and 1:N <br/> JD comparisons",
        position: {
          top: "-25%",
          right: "100%",
          transform: "translate(50%, -50%)"
        }
      },
      {
        lordicon: "https://cdn.lordicon.com/gnxqymui.json",
        content: "ATS integration <br/> with tagging <br/> and auto-suggestions",
        position: {
          bottom: "30%",
          left: "-50%",
          transform: "translate(-50%, 50%)"
        }
      }
    ]
  },
  {
    id: 3,
    heading: "BerriMastermind",
    subheading: "Automated Interviews,<br/> anytime, anywhere.",
    description: "Eliminate scheduling <br/> bottlenecks. Standardize quality.<br/> Scale L1 interviews infinitely.",
    frontImage: "/image/space/FrontCards/Mastermind1.png",
    backImage: "/image/space/BackCards/Mastermind2.png",
    features: [
      {
        lordicon: "https://cdn.lordicon.com/ailnzwyn.json",
        content: "Adaptive Q&A <br/> + coding environments",
        position: {
          top: "40%",
          left: "-45%",
          transform: "translate(-50%, -50%)"
        }
      },
      {
        lordicon: "https://cdn.lordicon.com/idpbgtvy.json",
        content: "AI scoring for <br/> tech, soft skills,<br/> and communication",
        position: {
          top: "100%",
          right: "100%",
          transform: "translate(50%, -50%)"
        }
      },
      {
        lordicon: "https://cdn.lordicon.com/euflfcqp.json",
        content: "24/7 asynchronous <br/> interviews with <br/> auto follow-ups",
        position: {
          bottom: "-35%",
          left: "55%",
          transform: "translate(-50%, 50%)"
        }
      }
    ]
  },
  {
    id: 4,
    heading: "BerriProctor",
    subheading: "Real-Time Identity,<br/> Verification & Fraud Detection",
    description: "Prevent impersonation. <br/> Avoid bad hires.<br/> Ensure 100% audibility.<br/> Over 150,000+ interviews.",
    frontImage: "/image/space/FrontCards/Proctor1.png",
    backImage: "/image/space/BackCards/Proctor2.png",
    features: [
      {
        lordicon: "https://cdn.lordicon.com/gjopwtdp.json",
        content: "Face & voice biometrics",
        position: {
          top: "-30%",
          left: "60%",
          transform: "translate(-50%, -50%)"
        }
      },
      {
        lordicon: "https://cdn.lordicon.com/kdibbosx.json",
        content: "Lip sync, whisper <br/> detection, 3D liveness",
        position: {
          top: "-30%",
          right: "100%",
          transform: "translate(50%, -50%)"
        }
      },
      {
        lordicon: "https://cdn.lordicon.com/nwwurnnq.json",
        content: "Anomaly alerts<br/>+ full compliance logs",
        position: {
          bottom: "40%",
          left: "-40%",
          transform: "translate(-50%, 50%)"
        }
      }
    ]
  }
];

// Animated Icon Component for mobile - matches AgeticSpace
const MobileAnimatedIcon = React.memo(({ lordicon, className, style }: {
  lordicon: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const iconRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== 'undefined' && iconRef.current) {
      // Clear any existing content first
      iconRef.current.innerHTML = '';
      
      // Create and append the lord-icon element
      const lordIconElement = document.createElement('lord-icon');
      lordIconElement.setAttribute('src', lordicon);
      lordIconElement.setAttribute('trigger', 'loop');
      lordIconElement.setAttribute('delay', '2000');
      lordIconElement.setAttribute('colors', 'primary:#04BBA6,secondary:#ffffff');
      lordIconElement.style.width = '80px';
      lordIconElement.style.height = '80px';
      
      iconRef.current.appendChild(lordIconElement);
      
      // Store the current ref value for cleanup
      const currentIconRef = iconRef.current;
      return () => {
        if (currentIconRef) {
          currentIconRef.innerHTML = '';
        }
      };
    }
  }, [lordicon]);

  return (
    <motion.div
      ref={iconRef}
      className={className}
      style={style}
      animate={{ 
        y: !shouldReduceMotion ? [0, -8, 0] : 0
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: Math.random() * 2
      }}
    />
  );
});

MobileAnimatedIcon.displayName = 'MobileAnimatedIcon';

// Mobile FlippableCard Component
const MobileFlippableCard = React.memo(({ 
  product, 
  className, 
  style
}: {
  product: ProductData;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCardClick = useCallback(() => {
    if (isFlipped) {
      // When closing, first trigger the blur exit, then flip
      setIsBlurred(false);
      setTimeout(() => {
        setIsFlipped(false);
      }, 100);
    } else {
      // When opening, flip first, then blur
      setIsFlipped(true);
      setTimeout(() => {
        setIsBlurred(true);
      }, 200);
    }
  }, [isFlipped]);

  // Card dimensions
  const frontWidth = 236;
  const frontHeight = 312;
  const backWidth = 200;
  const backHeight = 280;

  return (
    <>
      {/* Background blur overlay */}
      <AnimatePresence>
        {isBlurred && (
          <motion.div
            className="fixed inset-0 z-40"
            style={{
              backdropFilter: shouldReduceMotion ? "none" : "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
            initial={{ opacity: 0, backdropFilter: shouldReduceMotion ? "none" : "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: shouldReduceMotion ? "none" : "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: shouldReduceMotion ? "none" : "blur(0px)" }}
            transition={{ 
              duration: shouldReduceMotion ? 0.1 : 0.4,
              ease: [0.23, 1, 0.32, 1]
            }}
            onClick={handleCardClick}
          />
        )}
      </AnimatePresence>

      {/* Card container */}
      <motion.div
        className={`${className} cursor-pointer`}
        style={{
          ...style,
          perspective: 1000,
          zIndex: isFlipped ? 50 : 30
        }}
        onClick={handleCardClick}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            scale: isFlipped ? 1.1 : 1,
            width: isFlipped ? backWidth : frontWidth,
            height: isFlipped ? backHeight : frontHeight,
          }}
          transition={{ 
            duration: shouldReduceMotion ? 0.2 : 0.8, 
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {/* Front of card */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)"
            }}
          >
            <Image
              src={product.frontImage}
              alt={`${product.heading} front`}
              width={frontWidth}
              height={frontHeight}
              priority={true}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px"
              }}
            />
          </div>

          {/* Back of card */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={product.backImage}
                alt={`${product.heading} back`}
                width={backWidth}
                height={backHeight}
                priority={true}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
              />
              
              {/* Dynamic animated icons */}
              {product.features.map((feature, index) => (
                <MobileAnimatedIcon
                  key={`${product.id}-feature-${index}`}
                  lordicon={feature.lordicon}
                  className="absolute"
                  style={feature.position}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
});

MobileFlippableCard.displayName = 'MobileFlippableCard';

export default function MobileProductCarousel() {
  // Load lordicon script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://cdn.lordicon.com/lordicon.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="bg-black pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Background Image 1 */}
      <div className="absolute pointer-events-none" style={{ top: '-100px', left: '-200px', zIndex: 1 }}>
        <Image
          src="/image/mobile/5.png"
          alt="Background"
          width={750}
          height={1184}
          sizes="(max-width: 768px) 412px, (max-width: 1024px) 750px, 1200px"
          priority={false}
          className="w-[412px] h-[650px] object-cover"
        />
      </div>
      
      {/* Background Image 2 */}
      <div className="absolute pointer-events-none" style={{ top: '1600px', left: '-500px', zIndex: 0 }}>
        <Image
          src="/image/mobile/7.png"
          alt="Background 2"
          width={800}
          height={600}
          className="w-[800px] h-[600px] opacity-[50%]"
        />
      </div>
      
      {/* Background Image 3 */}
      <div className="absolute pointer-events-none" style={{ top: '700px', right: '-100px', zIndex: 1 }}>
        <Image
          src="/image/mobile/8.png"
          alt="Background 3"
          width={700}
          height={700}
          className="w-[700px] h-[500px] opacity-[50%] rotate-419"
        />
      </div>
      
      <div className="max-w-sm mx-auto mt-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Title */}
          <h1 
            className="font-medium text-white mb-4"
            style={{
              fontSize: '48px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.2'
            }}
          >
            One platform.
            <br />
            Four powerful
            <br />
            products.
          </h1>
          
          {/* Description */}
          <p 
            className="text-white font-light leading-relaxed"
            style={{
              fontSize: '16px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.5'
            }}
          >
            The Berri-Suite automates the entire <br /> hiring lifecycle - so your teams focus on <br /> decisions, not logistics.
          </p>
        </div>

        {/* FlippableCards Grid */}
        <div className="space-y-8">
          {productsData.map((product) => (
            <div key={product.id} className="flex justify-center">
              <div id={`${product.heading.toLowerCase().replace(/\s+/g, '').replace('<br/>', '')}`}>
                <MobileFlippableCard
                  product={product}
                  className="relative"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 