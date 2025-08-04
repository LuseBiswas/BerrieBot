"use client";

import { useEffect, useRef, useCallback } from "react";
import FeatureCardItem from "./FeatureCardItem";

export default function FeaturesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<number>(0);
  const isResettingRef = useRef(false);

  const features = [
    {
      image: "/image/screenshot_2.png",
      title: "Enterprise hiring at scale",
      description: "Automate thousands of candidate touch-points a day",
    },
    {
      image: "/image/screenshot_2.png",
      title: "Campus recruiting",
      description: "Let students interview when they're ready. No panel overload.",
    },
    {
      image: "/image/screenshot_2.png",
      title: "Tech Hiring",
      description: "Adaptive coding interviews, auto-scoring, and fraud detection baked-in.",
    },
    {
      image: "/image/screenshot_2.png",
      title: "Executive Search",
      description: "Custom workflows and insights for high-stakes roles.",
    },
  ];

  // Just use original features - no copies needed
  const L = features.length;

  const measureStep = () => {
    const container = scrollRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (children.length >= 2) {
      const step = children[1].offsetLeft - children[0].offsetLeft || children[0].offsetWidth;
      stepRef.current = step;
    } else if (children.length === 1) {
      stepRef.current = children[0].offsetWidth;
    }
  };

  const silentSetScrollLeft = (val: number) => {
    const container = scrollRef.current;
    if (!container) return;

    isResettingRef.current = true;
    const prev = container.style.scrollBehavior;
    container.style.scrollBehavior = "auto";
    container.scrollLeft = val;
    container.style.scrollBehavior = prev || "smooth";
    requestAnimationFrame(() => {
      isResettingRef.current = false;
    });
  };

  const ensureInfiniteLoop = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const step = stepRef.current;
    if (!step) return;

    const totalWidth = step * L; // Total width of all original cards
    const scrollLeft = container.scrollLeft;
    
    // When we reach the end, smoothly jump back to the beginning
    if (scrollLeft >= totalWidth) {
      silentSetScrollLeft(0);
    }
    // When we scroll backwards past the beginning, jump to the end
    else if (scrollLeft < 0) {
      silentSetScrollLeft(totalWidth - step);
    }
  }, [L]);

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;

    const step = stepRef.current || 360;
    container.scrollBy({ left: step, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    measureStep();

    // Start at the beginning
    silentSetScrollLeft(0);

    const onScroll = () => {
      if (isResettingRef.current) return;
      ensureInfiniteLoop();
    };

    const ro = new ResizeObserver(() => {
      measureStep();
    });

    ro.observe(container);

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      container.removeEventListener("scroll", onScroll);
    };
  }, [L, ensureInfiniteLoop]);

  return (
    <>
      <section className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid grid-cols-6 gap-8 pointer-events-none opacity-20 z-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <span className="text-4xl text-white font-thin">+</span>
            </div>
          ))}
        </div>

        {/* Arrow Button - Top Right Corner */}
        <div className="absolute top-8 right-8 z-30">
          <button
            onClick={scrollRight}
            className="w-12 h-12 rounded-full bg-[#111111] border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Next"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Left-aligned start point for carousel */}
        <div className="px-4 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* This div breaks out to full width on the right */}
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto space-x-6 no-scrollbar"
                style={{ 
                  scrollBehavior: "smooth",
                  marginRight: "calc(-50vw + 50%)",
                  paddingRight: "calc(50vw - 50%)"
                }}
              >
                {/* Render features twice for seamless loop */}
                {[...features, ...features].map((feature, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-[280px] md:w-[320px] lg:w-[360px]"
                  >
                    <FeatureCardItem
                      icon={feature.image}
                      title={feature.title}
                      description={feature.description}
                      index={index}
                      isInView={true}
                    />
                  </div>
                ))}
                {/* Extra space to ensure infinite scroll */}
                <div className="shrink-0 w-screen"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}