"use client";

import { useEffect, useRef } from "react";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<number>(0); // distance between consecutive cards
  const isResettingRef = useRef(false); // guard to ignore scroll events during silent resets

  const features = [
    {
      image: "/image/screenshot_1.png",
      title: "Enterprise hiring at scale",
      description: "Automate thousands of candidate touch-points a day",
    },
    {
      image: "/image/screenshot_1.png",
      title: "Campus recruiting",
      description:
        "Let students interview when they're ready. No panel overload.",
    },
    {
      image: "/image/screenshot_1.png",
      title: "Tech Hiring",
      description:
        "Adaptive coding interviews, auto-scoring, and fraud detection baked-in.",
    },
    {
      image: "/image/screenshot_1.png",
      title: "Executive Search",
      description: "Custom workflows and insights for high-stakes roles.",
    },
  ];

  // [orig][orig][orig] to enable seamless wrap
  const looped = [...features, ...features, ...features];
  const L = features.length;

  const measureStep = () => {
    const container = scrollRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (children.length >= 2) {
      // distance between first two cards' left edges
      const step =
        children[1].offsetLeft - children[0].offsetLeft || children[0].offsetWidth;
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
    // allow one frame for layout settle
    requestAnimationFrame(() => {
      isResettingRef.current = false;
    });
  };

  const ensureInMiddleWindow = () => {
    const container = scrollRef.current;
    if (!container) return;

    const step = stepRef.current;
    if (!step) return;

    const span = step * L; // width of one original set
    const min = 0;
    const max = span * 3; // total virtual width across three sets
    const cur = container.scrollLeft;

    // Middle window is [span, 2*span)
    if (cur >= 2 * span) {
      // crossed into the third copy → bring back by one span
      const target = cur - span;
      silentSetScrollLeft(target);
    } else if (cur < span) {
      // crossed into the first copy ← bring forward by one span
      const target = cur + span;
      silentSetScrollLeft(target);
    }
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;

    const step = stepRef.current || 360; // fallback
    container.scrollBy({ left: step, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Initial measure
    measureStep();

    // Start at the middle copy
    const span = stepRef.current * L || 0;
    if (span) silentSetScrollLeft(span);

    const onScroll = () => {
      if (isResettingRef.current) return;
      ensureInMiddleWindow();
    };

    // Recalculate on resize (responsive widths)
    const ro = new ResizeObserver(() => {
      const prevStep = stepRef.current;
      measureStep();
      // After resize, keep position aligned within middle window
      if (stepRef.current && stepRef.current !== prevStep) {
        const newSpan = stepRef.current * L;
        if (newSpan) silentSetScrollLeft(newSpan); // center again
      }
    });

    ro.observe(container);

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      container.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [L]);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid grid-cols-6 gap-8 pointer-events-none opacity-20 z-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <span className="text-4xl text-white font-thin">+</span>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative">
          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
          {/* Each card should be same width for perfect steps */}
            {looped.map((feature, index) => (
              <div
                key={index}
                className="shrink-0 w-[280px] md:w-[320px] lg:w-[360px]"
              >
                <FeatureCard
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20">
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
        </div>
      </div>
    </section>
  );
}
