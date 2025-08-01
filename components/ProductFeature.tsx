'use client';
import React from 'react';
import StackByStack, { StackCard } from './StackByStack';

const PRODUCT_FEATURES: StackCard[] = [
  {
    id: 'sec-speed',
    top: <>Enterprise-Grade<br/><span className="text-teal-400">Security</span></>,
    ribbon: <>SOC 2&nbsp;•&nbsp;ISO&nbsp;27001</>,
    bottom: <>Startup-Grade<br/><span className="text-teal-400">Speed</span></>,
  },
  {
    id: 'ai-ready',
    top: 'AI-Ready APIs',
    ribbon: '99.99 % uptime',
    bottom: 'Scale without ops',
  },
  {
    id: 'obs-five',
    top: 'Observability',
    ribbon: 'Zero-config tracing',
    bottom: 'Data-driven fixes',
  },
];

export default function ProductFeature() {
  return (
    <section className="py-20 bg-[#D9D9D9] ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Tagline */}
        <div className="text-center mb-16 text-[64px] sm:text-6xl md:text-7xl lg:text-8xl font-inter font-medium leading-24 ">
          <h2 className=" text-neutral-700 mb-4">
            Built on <span className="text-[#04BBA6]">Trust.</span>
          </h2>
          <p className=" text-neutral-700">
            <span className="text-[#04BBA6]">Secured</span> by Design.
          </p>
        </div>

        {/* StackByStack Component */}
        <div className="flex justify-center">
          <StackByStack 
            cards={PRODUCT_FEATURES}
            visibleCount={3}
            width="w-[22rem]"
            height="h-[28rem]"
          />
        </div>
      </div>
    </section>
  );
} 