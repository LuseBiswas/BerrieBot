'use client';
import React from 'react';
import StackByStack, { StackCard } from './StackByStack';

const PRODUCT_FEATURES: StackCard[] = [
  {
    id: 'sec-speed',
    top: <>Enterprise-Grade<br/><span className="text-teal-400">Security</span></>,
    ribbon: <>SOC 2&nbsp;•&nbsp;ISO&nbsp;27001&nbsp;•&nbsp;GDPR&nbsp;•&nbsp;DPDP-complimant&nbsp;•</>,
    bottom: <>Startup-Grade<br/><span className="text-teal-400">Speed</span></>,
  },
  {
    id: 'ai-ready',
    topImage:'/image/Stack/shield-star 1.png',
    bottom: <><span className="text-teal-400">End-to-end</span> <br />encryption</>
  },
  {
    id: 'obs-five',
    topImage:'/image/Stack/scales 1.png',
    ribbon: <>Demographic parity&nbsp;•&nbsp;Bias mitigation&nbsp;Explainaibilty</>,
    bottom: <><span className="text-teal-400">AI Fairness</span><br/>Framework</>,
  },
  {
    id: 'auto-scale',
    top: <>Explainable<br/><span className="text-teal-400">AI logs</span></>,
    ribbonImage: "/image/Stack/&.png",
    bottom: <><span className="text-teal-400">Human-in-loop</span><br/>fallback</>,
  },
];

export default function MobileProductFeature() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-sm mx-auto">
        {/* Tagline */}
        <div className="text-center text-[58px] sm:text-4xl tracking-[-1px] mb-30 font-medium text-[#252527] bg-clip-text leading-none">
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
            width="w-[259.79px]"
            height="h-[259.79px]"
          />
        </div>
      </div>
    </section>
  );
} 