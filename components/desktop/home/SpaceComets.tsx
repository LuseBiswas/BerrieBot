// add useReducedMotion to your framer-motion import
import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

// ========================= SpaceComets.tsx =========================
type SpaceCometsProps = {
    color?: string;                 // comet color
    maxConcurrent?: number;         // cap # of comets on screen
    spawnRatePerMin?: number;       // average spawn rate (Poisson-ish)
    speedRange?: [number, number];  // px/s
    tailRange?: [number, number];   // px (min..max clamp)
    sizeRange?: [number, number];   // px head diameter
    depthLayers?: 1 | 2 | 3;        // parallax depth buckets
    zIndex?: number;                // layer above cards (z-30)
    safeZones?: Array<{ x: number; y: number; w: number; h: number }>; // optional no-fly rects
    performanceMode?: 'high' | 'balanced' | 'low'; // performance optimization level
  };
  
  export const SpaceComets: React.FC<SpaceCometsProps> = ({
    color = "#04BBA6",
    maxConcurrent = 2, // Reduced from 3 for better performance
    spawnRatePerMin = 12, // Reduced from 18 for better performance
    speedRange = [380, 900],
    tailRange = [80, 240], // Reduced tail length for better performance
    sizeRange = [2, 4], // Reduced max size
    depthLayers = 2, // Reduced from 3 for better performance
    zIndex = 35,
    safeZones = [],
    performanceMode = 'balanced',
  }) => {
    const reduce = useReducedMotion() || false;
    const wrapRef = useRef<HTMLDivElement>(null);
    const [bounds, setBounds] = useState({ w: 0, h: 0 });
    const [comets, setComets] = useState<CometKF[]>([]);
    const timersRef = useRef<number[]>([]);
    const spawnTORef = useRef<number | null>(null);
    const frameRef = useRef<number | undefined>(undefined);
    const lastResizeRef = useRef<number>(0);

    // Performance-aware settings based on mode
    const perfSettings = useMemo(() => {
      switch (performanceMode) {
        case 'high':
          return {
            maxConcurrent: Math.min(maxConcurrent, 1),
            spawnRate: Math.min(spawnRatePerMin, 8),
            samples: 6,
            blurLevel: 1,
            updateFreq: 2, // Update every 2 frames
          };
        case 'low':
          return {
            maxConcurrent: Math.min(maxConcurrent, 4),
            spawnRate: spawnRatePerMin,
            samples: 16,
            blurLevel: 2,
            updateFreq: 1, // Update every frame
          };
        default: // balanced
          return {
            maxConcurrent: Math.min(maxConcurrent, 2),
            spawnRate: Math.min(spawnRatePerMin, 12),
            samples: 10,
            blurLevel: 1.5,
            updateFreq: 1,
          };
      }
    }, [performanceMode, maxConcurrent, spawnRatePerMin]);

    // Throttled resize observer with debouncing
    const handleResize = useCallback(() => {
      const now = Date.now();
      if (now - lastResizeRef.current < 100) return; // Throttle to 10fps for resize
      lastResizeRef.current = now;

      const el = wrapRef.current;
      if (!el) return;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setBounds(prev => {
          const newW = Math.max(1, r.width);
          const newH = Math.max(1, r.height);
          // Only update if change is significant
          if (Math.abs(prev.w - newW) > 10 || Math.abs(prev.h - newH) > 10) {
            return { w: newW, h: newH };
          }
          return prev;
        });
      });
    }, []);

    // Measure container with optimized resize observer
    useEffect(() => {
      const el = wrapRef.current;
      if (!el) return;

      handleResize(); // Initial measurement

      const ro = new ResizeObserver(handleResize);
      ro.observe(el);
      
      return () => {
        ro.disconnect();
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }, [handleResize]);

    // Optimized spawn scheduler with performance awareness
    useEffect(() => {
      if (!bounds.w || !bounds.h || reduce) return;

      let killed = false;
      let frameCounter = 0;

      const meanMs = (60_000 / Math.max(1, perfSettings.spawnRate)) | 0;
      const nextDelay = () => expRand(meanMs * 1.5); // Increased delay multiplier

      const schedule = (delay: number) => {
        if (spawnTORef.current) window.clearTimeout(spawnTORef.current);
        spawnTORef.current = window.setTimeout(() => {
          if (killed) return;
          
          // Check frame rate and skip spawning if performance is poor
          frameCounter++;
          if (frameCounter % perfSettings.updateFreq !== 0) {
            schedule(nextDelay());
            return;
          }

          if (document.visibilityState === "visible") {
            setComets((prev: CometKF[]) => {
              if (prev.length >= perfSettings.maxConcurrent) return prev;

              // Reduced burst frequency for better performance
              const burst = Math.random() < 0.05 ? 2 : 1;
              const next: CometKF[] = [];
              for (let i = 0; i < burst; i++) {
                next.push(makeComet(bounds, { 
                  color, 
                  speedRange, 
                  tailRange, 
                  sizeRange, 
                  depthLayers, 
                  reduce, 
                  safeZones,
                  samples: perfSettings.samples,
                  blurLevel: perfSettings.blurLevel
                }));
              }
              return [...prev, ...next].slice(0, perfSettings.maxConcurrent);
            });
          }
          schedule(nextDelay());
        }, delay) as unknown as number;
      };

      schedule(1000); // Slightly longer initial delay

      return () => {
        killed = true;
        if (spawnTORef.current) window.clearTimeout(spawnTORef.current);
      };
    }, [bounds, color, speedRange, tailRange, sizeRange, depthLayers, reduce, safeZones, perfSettings]);

    // Optimized cleanup with batch operations
    useEffect(() => {
      // Capture ref value at the beginning of the effect
      const timers = timersRef.current;
      
      // Clear old timers in batch
      if (timers.length > 0) {
        timers.forEach((t) => window.clearTimeout(t));
        timers.length = 0; // More efficient than creating new array
      }

      comets.forEach((c: CometKF) => {
        const t = window.setTimeout(() => {
          setComets((prev: CometKF[]) => prev.filter((x: CometKF) => x.id !== c.id));
        }, c.duration * 1000 + 150) as unknown as number; // Slightly longer cleanup delay
        timers.push(t);
      });

      return () => {
        // Use the captured timers array in cleanup
        timers.forEach((t) => window.clearTimeout(t));
        timers.length = 0;
      };
    }, [comets]);

    // Memoized styles for better performance
    const containerStyle = useMemo(() => ({ zIndex }), [zIndex]);

    if (!bounds.w || !bounds.h || reduce) {
      return <div ref={wrapRef} className="absolute inset-0 pointer-events-none" style={containerStyle} />;
    }

    return (
      <div ref={wrapRef} className="absolute inset-0 pointer-events-none" style={containerStyle}>
        {comets.map((c: CometKF) => (
          <CometElement key={c.id} comet={c} color={color} />
        ))}
      </div>
    );
  };

  // Separate memoized comet component to prevent unnecessary re-renders
  const CometElement = React.memo(({ comet, color }: { comet: CometKF; color: string }) => {
    // Memoized styles
    const headStyle = useMemo(() => ({
      width: comet.size,
      height: comet.size,
      background: color,
      mixBlendMode: "screen" as React.CSSProperties["mixBlendMode"],
      boxShadow: `0 0 ${comet.size * 2}px ${color}, 0 0 ${comet.size * 4}px ${hexToRgba(color, 0.4)}`, // Reduced glow intensity
    }), [comet.size, color]);

    const coreStyle = useMemo(() => ({
      left: -comet.tail,
      top: comet.size / 2 - Math.max(1, comet.size * 0.35),
      width: comet.tail,
      height: Math.max(2, comet.size - 1),
      transformOrigin: "right center",
      background: `linear-gradient(90deg,
        ${hexToRgba(color, 0)} 0%,
        ${hexToRgba(color, 0.1)} 25%,
        ${hexToRgba(color, 0.4)} 65%,
        ${color} 100%
      )`,
      filter: `blur(${comet.blurLevel * 0.5}px)`, // Dynamic blur based on performance
    }), [comet.tail, comet.size, comet.blurLevel, color]);

    const bloomStyle = useMemo(() => ({
      left: -comet.tail * 0.7,
      top: comet.size / 2 - 2,
      width: comet.tail * 0.7,
      height: Math.max(4, comet.size + 1),
      transformOrigin: "right center",
      background: `linear-gradient(90deg,
        ${hexToRgba(color, 0)} 0%,
        ${hexToRgba(color, 0.04)} 30%,
        ${hexToRgba(color, 0.15)} 100%
      )`,
      filter: `blur(${comet.blurLevel}px)`,
    }), [comet.tail, comet.size, comet.blurLevel, color]);

    return (
      <motion.div
        className="absolute"
        style={{ 
          willChange: "transform",
          transform: "translate3d(0,0,0)", // Force hardware acceleration
        }}
        initial={{ opacity: 0 }}
        animate={{
          x: comet.xKF,
          y: comet.yKF,
          rotate: comet.rKF,
          opacity: comet.opacityKF,
        }}
        transition={{
          duration: comet.duration,
          ease: "linear",
          x: { times: comet.tKF },
          y: { times: comet.tKF },
          rotate: { times: comet.tKF },
          opacity: { times: [0, 0.1, 0.8, 1] }, // Faster fade in/out
        }}
      >
        {/* Head */}
        <div className="absolute rounded-full" style={headStyle} />
        {/* Core Tail */}
        <div className="absolute" style={coreStyle} />
        {/* Bloom Tail - Only render if performance allows */}
        {comet.blurLevel > 1 && (
          <div className="absolute" style={bloomStyle} />
        )}
      </motion.div>
    );
  });

  CometElement.displayName = 'CometElement';
  
  // ========================= Types & helpers =========================
  type CometKF = {
    id: string;
    xKF: number[];
    yKF: number[];
    rKF: number[];
    tKF: number[];
    duration: number;
    size: number;
    tail: number;
    opacityKF: number[];
    blurLevel: number;
  };
  
  function makeComet(
    bounds: { w: number; h: number },
    opts: {
      color: string;
      speedRange: [number, number];
      tailRange: [number, number];
      sizeRange: [number, number];
      depthLayers: 1 | 2 | 3;
      reduce: boolean;
      safeZones: Array<{ x: number; y: number; w: number; h: number }>;
      samples: number;
      blurLevel: number;
    }
  ): CometKF {
    const { w: W, h: H } = bounds;
    const { speedRange, tailRange, sizeRange, depthLayers, reduce, samples, blurLevel } = opts;
  
    // Depth (0=far,1=mid,2=near)
    const depth = Math.min(depthLayers - 1, Math.floor(Math.random() * depthLayers));
    const depthSpeedMul = [0.7, 0.9, 1.0][depth] ?? 1.0;
    const depthOpacity = [0.6, 0.8, 1.0][depth] ?? 0.85;
  
    const pad = 100; // Reduced padding for tighter bounds
    const entry = randInt(0, 3); // 0=L,1=T,2=R,3=B
    const start = edgePoint(entry, W, H, pad);
    const exit = ((entry + 2 + (Math.random() < 0.2 ? (Math.random() < 0.5 ? 1 : 3) : 0)) % 4) as 0 | 1 | 2 | 3;
    const end = edgePoint(exit, W, H, pad);
  
    // Reduced curve amplitude for straighter paths (better performance)
    const dir = Math.atan2(end.y - start.y, end.x - start.x);
    const nx = -Math.sin(dir), ny = Math.cos(dir);
    const amp = rand(15, 40); // Reduced from 20-60
    const p0 = start;
    const p3 = end;
    const p1 = add(lerpPoint(p0, p3, 0.33), { x: nx * amp, y: ny * amp });
    const p2 = add(lerpPoint(p0, p3, 0.66), { x: -nx * amp, y: -ny * amp });
  
    const { xs, ys, rs, ts } = sampleCubicBezier(p0, p1, p2, p3, samples);
  
    // Duration from distance / speed
    const dist = totalDistance(xs, ys);
    const speed = (reduce ? 200 : rand(speedRange[0], speedRange[1])) * depthSpeedMul;
    const duration = Math.max(1.0, Math.min(4.0, dist / speed)); // Clamped duration
  
    const size = reduce ? 2 : rand(sizeRange[0], sizeRange[1]);
    const tail = clamp(speed * 0.25, tailRange[0], tailRange[1]); // Reduced tail multiplier
  
    // Opacity KF with depth scaling
    const opacityKF = [0, depthOpacity * 0.8, depthOpacity * 0.8, 0]; // Slightly reduced opacity
  
    return {
      id: `comet-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, // More efficient ID
      xKF: xs,
      yKF: ys,
      rKF: rs,
      tKF: ts,
      duration,
      size,
      tail,
      opacityKF,
      blurLevel,
    };
  }
  
  function edgePoint(edge: number, W: number, H: number, pad: number) {
    switch (edge) {
      case 0: return { x: -pad, y: rand(-pad, H + pad) };          // left
      case 1: return { x: rand(-pad, W + pad), y: -pad };           // top
      case 2: return { x: W + pad, y: rand(-pad, H + pad) };        // right
      default: return { x: rand(-pad, W + pad), y: H + pad };       // bottom
    }
  }
  
  function sampleCubicBezier(
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number },
    n: number
  ) {
    const xs: number[] = [];
    const ys: number[] = [];
    const rs: number[] = [];
    const ts: number[] = [];
    let prevX = p0.x, prevY = p0.y;
  
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const mt = 1 - t;
      const x = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
      const y = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;
      xs.push(x); ys.push(y);
  
      const dx = x - prevX, dy = y - prevY;
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;
      rs.push(i === 0 ? ang : ang); // good enough; first step uses small segment
      prevX = x; prevY = y;
  
      ts.push(t);
    }
    return { xs, ys, rs, ts };
  }
  
  function totalDistance(xs: number[], ys: number[]) {
    let d = 0;
    for (let i = 1; i < xs.length; i++) {
      d += Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]);
    }
    return d;
  }
  
  function hexToRgba(hex: string, alpha = 1) {
    let h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
  function randInt(min: number, max: number) { return Math.floor(rand(min, max + 1)); }
  function clamp(n: number, a: number, b: number) { return Math.max(a, Math.min(b, n)); }
  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
  function add(a: { x: number; y: number }, b: { x: number; y: number }) { return { x: a.x + b.x, y: a.y + b.y }; }
  function lerpPoint(a: { x: number; y: number }, b: { x: number; y: number }, t: number) { return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }; }
  function expRand(meanMs: number) { return -Math.log(1 - Math.random()) * meanMs; }
  // ======================= /SpaceComets.tsx =========================
  