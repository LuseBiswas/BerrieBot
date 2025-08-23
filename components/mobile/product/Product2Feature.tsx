'use client';
import React, { useState, useEffect } from 'react';
import StackByStack, { StackCard } from './StackByStack';

const PRODUCT_FEATURES: StackCard[] = [
  {
    id: 'sec-speed',
    top: <>Enterprise-Grade<br/><span className="text-teal-400">Security</span></>,
    ribbon: "SOC 2&nbsp;ISO&nbsp;27001",
    bottom: <>Startup-Grade<br/><span className="text-teal-400">Speed</span></>,
  },
  {
    id: 'ai-ready',
    top: 'Built by AI Natives',
    ribbonStatic: 'Patents, exits, and 10M+ minutes of AI assessments power this platform.',
  },
  {
    id: 'obs-five',
    top: 'Modular. Scalable. Predictable Pricing.',
    ribbonStatic:'Use what you need, when you need. Flexible prepaid commerical plans.',
  },
  {
    id: 'global-deploy',
    top: 'Zero Vendor Bloat',
    ribbonStatic: 'Why juggle 6 tools when one platform does it all?'
  },
];

export default function MobileProductXFeature() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'large'>('mobile');

  // Screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('large');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Responsive sizing - keeping exact proportions
  const getResponsiveSizes = () => {
    switch (screenSize) {
      case 'large':
        return {
          containerMaxWidth: 'max-w-lg', // 512px vs mobile 384px (1.33x)
          stackWidth: 'w-[346px]', // 259.79 * 1.33 ≈ 346px
          stackHeight: 'h-[346px]', // 259.79 * 1.33 ≈ 346px
        };
      case 'tablet':
        return {
          containerMaxWidth: 'max-w-md', // 448px vs mobile 384px (1.17x)
          stackWidth: 'w-[304px]', // 259.79 * 1.17 ≈ 304px
          stackHeight: 'h-[304px]', // 259.79 * 1.17 ≈ 304px
        };
      default: // mobile
        return {
          containerMaxWidth: 'max-w-sm',
          stackWidth: 'w-[259.79px]',
          stackHeight: 'h-[259.79px]',
        };
    }
  };

  const sizes = getResponsiveSizes();

  return (
    <section className="py-10 px-4 bg-white">
      <div className={`${sizes.containerMaxWidth} mx-auto`}>
        {/* Tagline */}
        <div className="text-center text-[58px] md:text-[68px] lg:text-[77px] tracking-[-1px] mb-30 font-medium text-[#252527] bg-clip-text leading-none">
          <h2 className="text-black mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Built on <br />Trust.
          </h2>
          <p className="text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Secured by <br /> Design.
          </p>
        </div>

        {/* StackByStack Component */}
        <div className="flex justify-center mt-16">
          <StackByStack 
            cards={PRODUCT_FEATURES}
            visibleCount={4}
            width={sizes.stackWidth}
            height={sizes.stackHeight}
            screenSize={screenSize}
          />
        </div>
      </div>
    </section>
  );
} 