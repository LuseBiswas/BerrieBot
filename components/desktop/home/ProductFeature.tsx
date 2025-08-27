'use client';
import React from 'react';
import StackByStack, { StackCard } from './StackByStack';

const PRODUCT_FEATURES: StackCard[] = [
  {
    id: 'sec-speed',
    top: <>Enterprise-Grade<br/><span className="text-[#028374]">Security</span></>,
    ribbon: <>ISO 27001&nbsp;•&nbsp;Soc2Type2&nbsp;•&nbsp;GDPR&nbsp;•&nbsp;DPDP</>,
    bottom: <>Startup-Grade<br/><span className="text-[#028374]">Speed</span></>,
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

export default function ProductFeature() {
  return (
    <section className="py-20 bg-white ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Tagline */}
        <div className="text-center font-inter text-[64px]  md:text-7xl lg:text-8xl tracking-[-2.5px] sm:tracking-[-2.5px] sm:text-6xl mb-8 font-medium text-[#252527] bg-clip-text " style={{ fontFamily: 'Manrope, sans-serif' }}>
          <h2 className=" text-black mb-4">
            Built on Trust.
          </h2>
          <p className=" text-black">
            Secured by Design.
          </p>
        </div>

        {/* StackByStack Component */}
        <div className="relative flex justify-center h-[396px] mt-55 mb-12">
          <div className="relative left-[-300px]">
            <StackByStack 
              cards={PRODUCT_FEATURES}
              visibleCount={4}
              width="w-[396px]"
              height="h-[396px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 