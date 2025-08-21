// add useReducedMotion to your framer-motion import
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  };
  
  export const SpaceComets: React.FC<SpaceCometsProps> = ({
    color = "#04BBA6",
    maxConcurrent = 3,
    spawnRatePerMin = 20,
    speedRange = [380, 900],
    tailRange = [120, 340],
    sizeRange = [2, 5],
    depthLayers = 3,
    zIndex = 35,
    safeZones = [],
  }) => {
    const reduce = useReducedMotion() ?? false;
    const wrapRef = useRef<HTMLDivElement>(null);
    const [bounds, setBounds] = useState({ w: 0, h: 0 });
    const [comets, setComets] = useState<CometKF[]>([]);
    const timersRef = useRef<number[]>([]);
    const spawnTORef = useRef<number | null>(null);
  
    // Measure container (px) and keep it fresh
    useEffect(() => {
      const el = wrapRef.current;
      if (!el) return;
  
      const applySize = () => {
        const r = el.getBoundingClientRect();
        setBounds({ w: Math.max(1, r.width), h: Math.max(1, r.height) });
      };
      applySize();
  
      const ro = new ResizeObserver(() => {
        // batch into RAF to avoid layout thrash
        requestAnimationFrame(applySize);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, []);
  
    // Spawn scheduler (Poisson-ish + micro-bursts)
    useEffect(() => {
      if (!bounds.w || !bounds.h) return;
  
      let killed = false;
  
      const meanMs = (60_000 / Math.max(1, spawnRatePerMin)) | 0;
      const nextDelay = () => expRand(meanMs); // exponential
  
      const schedule = (delay: number) => {
        if (spawnTORef.current) window.clearTimeout(spawnTORef.current);
        spawnTORef.current = window.setTimeout(() => {
          if (killed) return;
          if (document.visibilityState === "visible") {
            setComets((prev: CometKF[]) => {
              if (prev.length >= maxConcurrent) return prev;
  
              // Occasionally spawn 2–3 quick comets (micro-shower)
              const burst = Math.random() < 0.12 ? randInt(2, 3) : 1;
              const next: CometKF[] = [];
              for (let i = 0; i < burst; i++) {
                next.push(makeComet(bounds, { color, speedRange, tailRange, sizeRange, depthLayers, reduce, safeZones }));
              }
              return [...prev, ...next].slice(0, maxConcurrent);
            });
          }
          schedule(nextDelay());
        }, delay) as unknown as number;
      };
  
      schedule(600); // quick first spawn
  
      return () => {
        killed = true;
        if (spawnTORef.current) window.clearTimeout(spawnTORef.current);
      };
    }, [bounds, color, maxConcurrent, spawnRatePerMin, speedRange, tailRange, sizeRange, depthLayers, reduce, safeZones]);
  
    // Cleanup timers per comet
    useEffect(() => {
      // clear old timers
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
  
      comets.forEach((c: CometKF) => {
        const t = window.setTimeout(() => {
          setComets((prev: CometKF[]) => prev.filter((x: CometKF) => x.id !== c.id));
        }, c.duration * 1000 + 120) as unknown as number;
        timersRef.current.push(t);
      });
  
      return () => {
        timersRef.current.forEach((t) => window.clearTimeout(t));
        timersRef.current = [];
      };
    }, [comets]);
  
    if (!bounds.w || !bounds.h) {
      return <div ref={wrapRef} className="absolute inset-0 pointer-events-none" style={{ zIndex }} />;
    }
  
    return (
      <div ref={wrapRef} className="absolute inset-0 pointer-events-none" style={{ zIndex }}>
        {comets.map((c: CometKF) => (
          <motion.div
            key={c.id}
            className="absolute"
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0 }}
            animate={{
              x: c.xKF,
              y: c.yKF,
              rotate: c.rKF,
              opacity: c.opacityKF,
            }}
            transition={{
              duration: c.duration,
              ease: "linear",
              x: { times: c.tKF },
              y: { times: c.tKF },
              rotate: { times: c.tKF },
              opacity: { times: [0, 0.08, 0.85, 1] },
            }}
          >
            {/* Head */}
            <div
              className="absolute rounded-full"
              style={{
                width: c.size,
                height: c.size,
                background: color,
                mixBlendMode: "screen" as any,
                boxShadow: `
                  0 0 ${c.size * 3}px ${color},
                  0 0 ${c.size * 7}px ${hexToRgba(color, 0.6)}
                `,
              }}
            />
            {/* Core Tail */}
            <div
              className="absolute"
              style={{
                left: -c.tail,
                top: c.size / 2 - Math.max(1, c.size * 0.35),
                width: c.tail,
                height: Math.max(2, c.size - 1),
                transformOrigin: "right center",
                background: `linear-gradient(90deg,
                  ${hexToRgba(color, 0)} 0%,
                  ${hexToRgba(color, 0.15)} 25%,
                  ${hexToRgba(color, 0.5)} 65%,
                  ${color} 100%
                )`,
                filter: "blur(0.7px)",
              }}
            />
            {/* Bloom Tail */}
            <div
              className="absolute"
              style={{
                left: -c.tail * 0.8,
                top: c.size / 2 - 3,
                width: c.tail * 0.8,
                height: Math.max(6, c.size + 2),
                transformOrigin: "right center",
                background: `linear-gradient(90deg,
                  ${hexToRgba(color, 0)} 0%,
                  ${hexToRgba(color, 0.06)} 30%,
                  ${hexToRgba(color, 0.25)} 100%
                )`,
                filter: "blur(2.2px)",
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  };
  
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
    }
  ): CometKF {
    const { w: W, h: H } = bounds;
    const { speedRange, tailRange, sizeRange, depthLayers, reduce } = opts;
  
    // Depth (0=far,1=mid,2=near)
    const depth = Math.min(depthLayers - 1, Math.floor(Math.random() * depthLayers));
    const depthSpeedMul = [0.65, 0.85, 1.0][depth] ?? 1.0;
    const depthOpacity = [0.55, 0.75, 0.95][depth] ?? 0.85;
  
    const pad = 120;
    const entry = randInt(0, 3); // 0=L,1=T,2=R,3=B
    const start = edgePoint(entry, W, H, pad);
    const exit = ((entry + 2 + (Math.random() < 0.25 ? (Math.random() < 0.5 ? 1 : 3) : 0)) % 4) as 0 | 1 | 2 | 3;
    const end = edgePoint(exit, W, H, pad);
  
    // Control points for gentle curve (normal to path)
    const dir = Math.atan2(end.y - start.y, end.x - start.x);
    const nx = -Math.sin(dir), ny = Math.cos(dir);
    const amp = rand(20, 60);
    const p0 = start;
    const p3 = end;
    const p1 = add(lerpPoint(p0, p3, 0.33), { x: nx * amp, y: ny * amp });
    const p2 = add(lerpPoint(p0, p3, 0.66), { x: -nx * amp, y: -ny * amp });
  
    const samples = reduce ? 8 : 20;
    const { xs, ys, rs, ts } = sampleCubicBezier(p0, p1, p2, p3, samples);
  
    // Duration from distance / speed
    const dist = totalDistance(xs, ys);
    const speed = (reduce ? 200 : rand(speedRange[0], speedRange[1])) * depthSpeedMul;
    const duration = Math.max(1.2, dist / speed);
  
    const size = reduce ? 2 : rand(sizeRange[0], sizeRange[1]);
    const tail = clamp(speed * 0.35, tailRange[0], tailRange[1]);
  
    // Opacity KF with depth scaling
    const opacityKF = [0, depthOpacity, depthOpacity, 0];
  
    return {
      id: `comet-${Math.random().toString(36).slice(2)}`,
      xKF: xs,
      yKF: ys,
      rKF: rs,
      tKF: ts,
      duration,
      size,
      tail,
      opacityKF,
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
  