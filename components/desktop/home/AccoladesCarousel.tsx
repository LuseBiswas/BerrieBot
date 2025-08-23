"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { debounce } from "@/utils/performanceUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  bullets?: string[]; // for the G2-style multi-line list
  href?: string;
  // Use either image src or gradient class for the media area
  imageSrc?: string;
  imageAlt?: string;
  gradientClass?: string; // Tailwind arbitrary bg for soft wash
};

const SLIDES: Slide[] = [
  {
    id: "forbes",
    title: "Forbes",
    subtitle: "AI 50",
    href: "#",
    imageSrc: "/image/screenshot_2.png",
    imageAlt: "Forbes AI 50",
  },
  {
    id: "et30",
    title: "Enterprise Tech 30",
    subtitle: "Mid Stage",
    href: "#",
    imageSrc: "/image/screenshot_2.png",
  },
  {
    id: "g2-high-performer",
    title: "G2 High Performer",
    bullets: ["AI Agents", "AI Chatbots", "Conversational Support"],
    imageSrc: "/image/screenshot_2.png",
    href: "#",
  },
  {
    id: "g2-easiest",
    title: "Easiest To Do Business With",
    bullets: ["AI Agents", "AI Chatbots", "Conversational Support"],
    imageSrc: "/image/screenshot_2.png",
    href: "#",
  },
  {
    id: "bi",
    title: "Business Insider",
    subtitle: "Startups to bet your career on in 2025",
    href: "#",
    imageSrc: "/image/screenshot_2.png",
  },
];

export default function AccoladesCarousel() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [idx, setIdx] = useState(0);
  const [lefts, setLefts] = useState<number[]>([]); // each card's left offset
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Optimized recomputation with batched DOM reads
  const computePositions = useCallback(() => {
    if (!listRef.current) return;
    
    // Batch all DOM reads to prevent forced reflows
    requestAnimationFrame(() => {
      const nodes = Array.from(listRef.current!.querySelectorAll<HTMLElement>("[data-card]"));
      const positions = nodes.map((n) => n.offsetLeft);
      setLefts(positions);
    });
  }, []);
  
  // Recompute card positions on mount & resize with optimized observers
  useLayoutEffect(() => {
    computePositions();
    
    // Use ResizeObserver for better performance than window resize
    const resizeObserver = new ResizeObserver((_entries) => {
      // Debounce the computation to prevent excessive reflows
      const debouncedCompute = debounce(computePositions, 150);
      debouncedCompute();
    });
    
    if (listRef.current) {
      resizeObserver.observe(listRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [computePositions]);

  // Snap to idx
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !lefts.length) return;
    
    const clamped = Math.max(0, Math.min(idx, lefts.length - 1));
    if (clamped !== idx) {
      setIdx(clamped);
      return;
    }
    
    const targetLeft = lefts[clamped];
    if (Math.abs(el.scrollLeft - targetLeft) > 10) {
      el.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  }, [idx, lefts]);

  // Improved scroll handling with debouncing
  useEffect(() => {
    const scroller = trackRef.current;
    if (!scroller || !lefts.length) return;

    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce the scroll handling
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollLeft = scroller.scrollLeft;
        
        // Find nearest card
        let nearestIndex = 0;
        let minDistance = Infinity;
        
        lefts.forEach((left, i) => {
          const distance = Math.abs(scrollLeft - left);
          if (distance < minDistance) {
            minDistance = distance;
            nearestIndex = i;
          }
        });

        setIdx(nearestIndex);
      }, 150);
    };

    // Use scroll event with debouncing
    scroller.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lefts]);

  const atStart = idx === 0;
  const atEnd = idx === SLIDES.length - 1;

  const fadeUp = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 } };

  const goToPrev = () => {
    if (!atStart) {
      setIdx(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (!atEnd) {
      setIdx(prev => prev + 1);
    }
  };

  return (
    <section className="py-16 sm:py-20" aria-labelledby="accolades-heading">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <motion.h2
          id="accolades-heading"
          className="mb-8 text-4xl font-medium tracking-tight text-white sm:mb-10 sm:text-5xl"
          {...fadeUp}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          Accolades
        </motion.h2>

        {/* Viewport */}
        <div className="relative">
          {/* Horizontal track (native snap + smooth scroll) */}
          <div
            ref={trackRef}
            className="
              overflow-x-auto scroll-smooth snap-x snap-mandatory
              [scrollbar-width:none] [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
            style={{ scrollBehavior: 'smooth' }}
          >
            <ul
              ref={listRef}
              className="flex gap-6 md:gap-8 lg:gap-10 pb-4"
              aria-live="polite"
            >
              {SLIDES.map((s, i) => (
                <motion.li
                  key={s.id}
                  data-card
                  className="
                    snap-start shrink-0
                    w-[84vw] sm:w-[520px] lg:w-[560px]
                  "
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <article
                    className="
                      h-full rounded-[28px] bg-neutral-100 ring-1 ring-black/10
                      shadow-sm p-4 sm:p-5
                    "
                  >
                    {/* Media area */}
                    <div
                      className="
                        relative mb-5 overflow-hidden
                        rounded-[24px] ring-1 ring-black/10
                        aspect-[16/11]
                      "
                    >
                      {/* If image provided, use it; else render gradient wash */}
                      {s.imageSrc ? (
                        <Image
                          src={s.imageSrc}
                          alt={s.imageAlt ?? s.title}
                          fill
                          className="object-cover"
                          sizes="(min-width:1280px) 560px, (min-width:640px) 520px, 84vw"
                          priority={i < 2}
                        />
                      ) : (
                        <div className={`h-full w-full ${s.gradientClass ?? "bg-gray-100"}`} />
                      )}
                    </div>

                    {/* Text */}
                    <div className="px-1 pb-1">
                      <h3 className="text-[1.45rem] sm:text-[1.6rem] font-medium text-neutral-900">
                        {s.title}
                      </h3>

                      {s.subtitle && (
                        <p className="mt-1 text-sm text-neutral-500">{s.subtitle}</p>
                      )}

                      {s.bullets && (
                        <ul className="mt-1 text-sm text-neutral-500 space-y-1">
                          {s.bullets.map((b) => (
                            <li key={b}>• {b}</li>
                          ))}
                        </ul>
                      )}

                      {s.href && (
                        <a
                          href={s.href}
                          className="
                            mt-4 inline-flex items-center gap-2 text-[0.95rem]
                            text-indigo-600 underline underline-offset-4 hover:no-underline
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded-md
                          "
                        >
                          Read article <span aria-hidden="true">→</span>
                        </a>
                      )}
                    </div>
                  </article>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Prev / Next buttons */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <button
                type="button"
                aria-label="Previous slide"
                disabled={atStart}
                onClick={goToPrev}
                className="
                  pointer-events-auto grid size-14 place-items-center rounded-full
                  bg-white text-indigo-600 ring-1 ring-black/10 shadow-lg
                  transition disabled:opacity-40 disabled:cursor-not-allowed
                  hover:shadow-xl hover:scale-105 active:scale-95
                "
              >
                <ChevronLeft className="size-6" />
              </button>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                type="button"
                aria-label="Next slide"
                disabled={atEnd}
                onClick={goToNext}
                className="
                  pointer-events-auto grid size-14 place-items-center rounded-full
                  bg-white text-indigo-600 ring-1 ring-black/10 shadow-lg
                  transition disabled:opacity-40 disabled:cursor-not-allowed
                  hover:shadow-xl hover:scale-105 active:scale-95
                "
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
