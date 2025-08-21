"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SpaceComets } from "./SpaceComets";

type TiltProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  /** max tilt in degrees */
  maxTilt?: number;
  /** perspective in px */
  perspective?: number;
  /** hover scale */
  hoverScale?: number;
  /** floating animation */
  floating?: boolean;
};

export const TiltImage = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  maxTilt = 14,
  perspective = 900,
  hoverScale = 1.04,
  floating = false,
}: TiltProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dims, setDims] = useState({ w: width, h: height });

  // Track actual DOM size so mapping is always correct
  useEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      setDims({ w, h });
    });
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  // Raw mouse deltas from center
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth them
  const x = useSpring(rawX, { stiffness: 140, damping: 18, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 140, damping: 18, mass: 0.5 });

  // Map to rotations using *actual* size
  const rotateX = useTransform(y, [-dims.h / 2, dims.h / 2], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-dims.w / 2, dims.w / 2], [-maxTilt, maxTilt]);

  // Optional subtle highlight following the cursor
  const glare = useMotionTemplate`radial-gradient(220px 140px at calc(50% + ${x}px) calc(50% + ${y}px),
    rgba(255,255,255,0.18), rgba(255,255,255,0.08) 35%, transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - (r.left + r.width / 2));
    rawY.set(e.clientY - (r.top + r.height / 2));
  };

  const onLeave = () => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  // Calculate hover dimensions (315x447)
  const hoverWidth = 315;
  const hoverHeight = 447;

  return (
    // PERSPECTIVE MUST BE ON THE PARENT (not the rotating element)
    <div
      ref={rootRef}
      className={className}
      style={{ ...style, perspective, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        animate={{ 
          scale: isHovered ? hoverScale : 1,
          y: floating ? [0, -8, 0] : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 22,
          y: floating ? {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}
        }}
      >
        {/* Content plane moved slightly forward for real depth */}
        <div style={{ transform: "translateZ(24px)", backfaceVisibility: "hidden" }}>
          <motion.div
            animate={{
              width: isHovered ? hoverWidth : width,
              height: isHovered ? hoverHeight : height,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut"
            }}
            style={{
              overflow: "hidden",
              borderRadius: "12px"
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={hoverWidth}
              height={hoverHeight}
              draggable={false}
              style={{ 
                display: "block", 
                userSelect: "none",
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </motion.div>
        </div>

        {/* Soft glare layer (optional) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: glare,
            pointerEvents: "none",
            transform: "translateZ(26px)",
            borderRadius: 12,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>
    </div>
  );
};

// Animated Icon Component (inspired by FeatureCard.tsx)
const AnimatedIcon = ({ lordicon, className, style }: {
  lordicon: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

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
      lordIconElement.style.width = '130px';
      lordIconElement.style.height = '130px';
      
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
        y: [0, -8, 0] 
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: Math.random() * 2
      }}
    />
  );
};

// Flippable Card Component
const FlippableCard = ({ 
  frontSrc, 
  backSrc, 
  alt, 
  width, 
  height, 
  backWidth = 389,
  backHeight = 552,
  className, 
  style,
  floating = false,
  icons = []
}: {
  frontSrc: string;
  backSrc: string;
  alt: string;
  width: number;
  height: number;
  backWidth?: number;
  backHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  floating?: boolean;
  icons?: Array<{
    lordicon: string;
    position: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
      transform?: string;
    };
  }>;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const handleCardClick = () => {
    if (isFlipped) {
      // When closing, first trigger the blur exit, then flip
      setIsBlurred(false);
      setTimeout(() => {
        setIsFlipped(false);
      }, 100); // Small delay for smoother transition
    } else {
      // When opening, flip first, then blur
      setIsFlipped(true);
      setTimeout(() => {
        setIsBlurred(true);
      }, 200); // Delay blur to let card start flipping first
    }
  };

  return (
    <>
      {/* Background blur overlay */}
      <AnimatePresence>
        {isBlurred && (
          <motion.div
            className="fixed inset-0 z-40"
            style={{
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ 
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1],
              backdropFilter: { duration: 0.5 }
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
        animate={floating && !isFlipped ? { 
          y: [0, -8, 0] 
        } : {}}
        transition={floating ? { 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        } : {}}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            scale: isFlipped ? 1.2 : 1,
            width: isFlipped ? backWidth : width,
            height: isFlipped ? backHeight : height,
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for smoother animation
            scale: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
            width: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
            height: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
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
            <TiltImage
              src={frontSrc}
              alt={alt}
              width={width}
              height={height}
              floating={false}
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
                src={backSrc}
                alt={`${alt} back`}
                width={backWidth}
                height={backHeight}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
              />
              
              {/* Dynamic animated icons */}
              {icons.map((icon, index) => (
                <AnimatedIcon
                  key={index}
                  lordicon={icon.lordicon}
                  className="absolute"
                  style={icon.position}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

type OrbitProps = {
  /** Seconds per full lap (lower = faster) */
  lapSeconds?: number;
  /** Fraction of the ellipse visible as the moving arc (0..1) */
  segment?: number;
  /** Stroke thickness in px */
  strokeWidth?: number;
  /** Teal color */
  color?: string;
  /** Glow strength in px */
  glow?: number;
  /** 1 = CCW, -1 = CW */
  direction?: 1 | -1;

  fadePx?: number;     // fade length at each end (px)
  fadeGamma?: number;  // 1.0 = linear, 1.6–2.2 = smoother fade
};

export default function EllipseOrbit({
  lapSeconds = 15,
  segment = 0.7,
  strokeWidth = 2, // Reduced from 4 to 2
  color = "#04BBA6",
  glow = 4,
  direction = -1, // -1 matches your original (dashoffset decreasing)
}: OrbitProps) {
  const viewW = 1309; // Increased by 10% from 1190
  const viewH = 706;
  const cx = 654.5; // Adjusted center X for new width
  const cy = 353;
  const rx = 652.3; // Increased by 10% from 593
  const ry = 351;
  // Defaults
  

  // Keep segment within (0,1) for a valid dash
  const seg = Math.max(0.01, Math.min(0.99, segment));

  return (
    <section className="w-full h-[1994px] bg-black flex items-center justify-center relative z-50">
      {/* Background glow images - behind stars but above black bg */}
      <Image
        src="/image/space/BG/BG_Glow1.png"
        alt="Background Glow 1"
        width={1920}
        height={1080}
        className="absolute"
        style={{
          width: "100%",
          height: "auto",
          top: "0%",
          left: "-20%",
          objectFit: "cover",
          zIndex: 1
        }}
      />
      
      <Image
        src="/image/space/BG/BG_Glow2.png"
        alt="Background Glow 2"
        width={1920}
        height={1080}
        className="absolute"
        style={{
          width: "100%",
          height: "auto",
          top: "25%",
          left: "40%",
          objectFit: "cover",
          zIndex: 2
        }}
      />
      
      {/* Background stars image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/image/space/BG_Stars.png')",
          zIndex: 3
        }}
        animate={{
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Ellipse 30 */}
      {/* White ellipse matching Ellipse 30 */}
      <div
        className="absolute"
        style={{
          width: "1049.4px", // Increased by 10% from 954px
          height: "534px",
          top: "50%",
          left: "45%",
          transform: "translate(-50%, -50%)",
          border: "4px solid rgba(255, 255, 255, 0.04)",
          borderRadius: "50%"
        }}
      />
      
      {/* From Apply To Offer Text */}
      <div 
        className="absolute z-40 text-center"
        style={{
          top: "30%",
          left: "20%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="font-['Dogica_Pixel'] text-2xl tracking-[1px] text-white">
          From
          <br />
          Apply
        </div>
      </div>
      
      <div 
        className="absolute z-40 text-center"
        style={{
          top: "75%",
          left: "55%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className="font-['Dogica_Pixel'] text-2xl tracking-[1px] text-white">
          To
          <br />
          Offer
        </div>
      </div>
      
      {/* White ellipse matching Ellipse 30 */}
      <div
        className="absolute"
        style={{
          width: "847px", // Increased by 10% from 770px
          height: "354px",
          top: "50%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          border: "4px solid rgba(255, 255, 255, 0.03)",
          borderRadius: "50%"
        }}
      />
      
      {/* Glow effect behind logo */}
      <motion.div
        className="absolute z-10"
        style={{
          top: "43%",
          left: "12%",
          transform: "translate(-50%, -50%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image
          src="/image/space/Logo/glow.png"
          alt="Glow effect"
          width={290}
          height={290}
        />
      </motion.div>
      
      {/* Logo on top of glow */}
      <Image
        src="/image/space/Logo/logo.png"
        alt="Logo"
        className="absolute z-20"
        width={150}
        height={150}
        style={{
          top: "50%",
          left: "22%",
          transform: "translate(-50%, -50%)"
        }}
      />
      
      {/* Connect1 card */}
      <FlippableCard
        frontSrc="/image/space/FrontCards/Connect1.png"
        backSrc="/image/space/BackCards/Connect2.png"
        alt="Connect1 card"
        width={280}
        height={396}
        backWidth={389}
        backHeight={552}
        className="absolute z-30"
        style={{
          top: "25%",
          left: "25%",
          transform: "translate(-50%, -50%)"
        }}
        floating={true}
        icons={[
          {
            lordicon: "https://cdn.lordicon.com/vpbspaec.json",
            position: {
              top: "-25%",
              left: "85%",
              transform: "translate(-50%, -50%)"
            }
          },
          {
            lordicon: "https://cdn.lordicon.com/odpyouay.json",
            position: {
              top: "30%",
              right: "-35%",
              transform: "translate(50%, -50%)"
            }
          },
          {
            lordicon: "https://cdn.lordicon.com/adbkylwa.json",
            position: {
              bottom: "-15%",
              left: "100%",
              transform: "translate(-50%, 50%)"
            }
          }
        ]}
      />
      
      {/* Search1 card */}
      <FlippableCard
        frontSrc="/image/space/FrontCards/Search1.png"
        backSrc="/image/space/BackCards/Search2.png"
        alt="Search1 card"
        width={280}
        height={396}
        backWidth={389}
        backHeight={552}
        className="absolute z-30"
        style={{
          top: "22%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
        floating={true}
        icons={[
          {
            lordicon: "https://cdn.lordicon.com/ypagsvdy.json",
            position: {
              top: "-10%",
              left: "-40%",
              transform: "translate(-50%, -50%)"
            }
          },
          {
            lordicon: "https://cdn.lordicon.com/hcsnfpqp.json",
            position: {
              top: "35%",
              right: "130%",
              transform: "translate(50%, -50%)"
            }
          },
          {
            lordicon: "https://cdn.lordicon.com/gnxqymui.json",
            position: {
              bottom: "-20%",
              left: "-35%",
              transform: "translate(-50%, 50%)"
            }
          }
        ]}
      />
      
      {/* Mastermind1 card */}
      <FlippableCard
        frontSrc="/image/space/FrontCards/Mastermind1.png"
        backSrc="/image/space/BackCards/Mastermind2.png"
        alt="Mastermind1 card"
        width={280}
        height={396}
        backWidth={389}
        backHeight={552}
        className="absolute z-30"
        style={{
          top: "35%",
          left: "73%",
          transform: "translate(-50%, -50%)"
        }}
        floating={true}
        icons={[
          {
            lordicon: "https://cdn.lordicon.com/ailnzwyn.json",
            position: {
              top: "-25%",
              left: "-35%",
              transform: "translate(-50%, -50%)"
            }
          },
          {
            lordicon: "https://cdn.lordicon.com/idpbgtvy.json",
            position: {
              top: "25%",
              right: "130%",
              transform: "translate(50%, -50%)"
            }
          },
          {
            lordicon: "https://cdn.lordicon.com/euflfcqp.json",
            position: {
              bottom: "-10%",
              left: "-35%",
              transform: "translate(-50%, 50%)"
            }
          }
        ]}
      />
      
      {/* Proctor1 card */}
      <FlippableCard
        frontSrc="/image/space/FrontCards/Proctor1.png"
        backSrc="/image/space/BackCards/Proctor2.png"
        alt="Proctor1 card"
        width={280}
        height={396}
        backWidth={389}
        backHeight={552}
        className="absolute z-30"
        style={{
          top: "58%",
          left: "62%",
          transform: "translate(-50%, -50%)"
        }}
        floating={true}
        icons={[
          {
            lordicon: "https://cdn.lordicon.com/gjopwtdp.json",
            position: {
              top: "-30%",
              left: "-35%",
              transform: "translate(-50%, -50%)"
            }
          },
          {
            lordicon: "https://cdn.lordicon.com/kdibbosx.json",
            position: {
              top: "40%",
              right: "125%",
              transform: "translate(50%, -50%)"
            }
          },
          {
            lordicon: "https://cdn.lordicon.com/nwwurnnq.json",
            position: {
              bottom: "-25%",
              left: "-30%",
              transform: "translate(-50%, 50%)"
            }
          }
        ]}
      />
      
      
      
      <svg
        width={viewW}
        height={viewH}
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="relative"
      >
        <defs>
          {/* Soft glow for the teal stroke */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Blur to feather the mask edges so the arc fades at start/end */}
          <filter id="soften" x="-50%" y="-50%" width="200%" height="200%">
            {/* Reduced blur for better visibility */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={3} />
          </filter>

          {/* Animated mask that reveals only a blurred dash segment */}
          <mask id="movingSoftDash" maskUnits="userSpaceOnUse">
            <motion.ellipse
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="white"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              // Normalize path length to 1 so dash values are easy
              pathLength={1}
              strokeDasharray={`${seg} ${1 - seg}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: direction === 1 ? 1 : -1 }}
              transition={{ duration: lapSeconds, repeat: Infinity, ease: "linear" }}
              // Reduced blur on mask for brighter effect
              filter="url(#soften)"
            />
          </mask>
        </defs>

        {/* Base track */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="#101010"
          strokeWidth={strokeWidth}
        />

        {/* Teal arc + glow, revealed by the soft dash mask */}
        <g mask="url(#movingSoftDash)">
          {/* Main bright ellipse with enhanced glow */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            style={{
              filter: 'drop-shadow(0 0 8px #04BBA6) drop-shadow(0 0 16px #04BBA6) drop-shadow(0 0 32px #04BBA6) drop-shadow(0 0 64px #04BBA6) drop-shadow(0 0 120px rgba(4, 187, 166, 0.8))',
              opacity: 1
            }}
          />
          {/* Secondary ellipse for extra brightness */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 1.5}
            style={{
              opacity: 0.9
            }}
          />
          {/* Third ellipse for maximum glow */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 2}
            style={{
              filter: 'blur(1px)',
              opacity: 0.6
            }}
          />
        </g>
      </svg>
      {/* <SpaceComets color="#04BBA6" maxConcurrent={3} spawnRatePerMin={18} /> */}
    </section>
  );
}
