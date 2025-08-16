'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface CardProps {
  heading: string;
  description: string;
  className?: string;
  showOrbit?: boolean;
  orbitRadiusPx?: number;   // distance from center for the arrow
  orbitPeriodSec?: number;  // seconds per revolution
  hoverScale?: number;      // shared hover scale
  tiltMaxDeg?: number;      // max tilt at the corners
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const Card: React.FC<CardProps> = ({
  heading,
  description,
  className = '',
  showOrbit = true,
  orbitRadiusPx = 140,
  orbitPeriodSec = 6,
  hoverScale = 1.05,
  tiltMaxDeg = 14,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  // Smooth springs for tilt
  const rotX = useSpring(0, { stiffness: 260, damping: 24, mass: 0.6 });
  const rotY = useSpring(0, { stiffness: 260, damping: 24, mass: 0.6 });

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = sceneRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Normalized -1..1 from center
    const nx = clamp((e.clientX - cx) / (rect.width / 2), -1, 1);
    const ny = clamp((e.clientY - cy) / (rect.height / 2), -1, 1);

    // Deadzone to avoid jitter near center
    const DEADZONE = 0.06;
    const dx = Math.abs(nx) < DEADZONE ? 0 : nx;
    const dy = Math.abs(ny) < DEADZONE ? 0 : ny;

    // Tilt toward cursor (natural feel: up = +rotateX, right = +rotateY)
    rotY.set(dx * tiltMaxDeg);
    rotX.set(-dy * tiltMaxDeg);
  };

  const handlePointerLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <div className={`relative ${className}`}>
      {/* PERSPECTIVE must be on a non-rotating parent */}
      <div className="perspective-1000">
        {/* Shared 3D scene: tilt + hover scale here so orbit + card move together */}
        <motion.div
          ref={sceneRef}
          className="relative w-64 h-80"
          style={{ transformStyle: 'preserve-3d', rotateX: rotX, rotateY: rotY, willChange: 'transform' }}
          whileHover={{ scale: hoverScale }}
          whileTap={{ scale: 0.95 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* ORBIT — right -> left (negative Y rotation), infinite loop */}
          {showOrbit && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              animate={{ rotateY: [0, -360] }}
              transition={{ duration: orbitPeriodSec, ease: 'linear', repeat: Infinity }}
            >
              {/* Place the satellite out on Z so it passes in front/behind the card */}
              <div style={{ transformStyle: 'preserve-3d', transform: `translateZ(${orbitRadiusPx}px)` }}>
                {/* Face along the travel direction for right->left */}
                <div style={{ transformStyle: 'preserve-3d', transform: 'rotateY(180deg)' }}>
                  {/* Tiny bob for life */}
                  <motion.div
                    animate={{ y: [0, -2, 0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                      style={{ color: 'rgba(255,255,255,0.95)' }}
                    >
                      <path d="M3 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* FLIP CARD */}
          <motion.div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsFlipped((v) => !v)}
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Front */}
            <motion.div
              className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h3 className="text-lg font-semibold text-white text-center">
                {heading}
              </h3>
            </motion.div>

            {/* Back */}
            <motion.div
              className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg flex flex-col justify-center"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <p className="text-sm text-gray-200 leading-relaxed text-center">
                {description}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Card;
