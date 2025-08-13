'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import StackByStack, { StackCard } from '../product/StackByStack';

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
  {
    id: 'global-deploy',
    top: <>Global<br/><span className="text-teal-400">Deployment</span></>,
    ribbon: 'Multi-region support',
    bottom: <>Instant<br/><span className="text-teal-400">Scaling</span></>,
  },
];

export default function ProductFeature() {
  return (
    <section className="relative py-20 bg-[#101010]">
      {/* Background grid pattern - same as CarouselSection */}
      <div className="absolute inset-0 bg-pinstripes bg-fixed opacity-20" />
      
      {/* Grid pattern with + signs at grid intersections */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
          {Array.from({ length: 144 }, (_, i) => (
            <div key={i} className="border border-white/20 opacity-[5%]" />
          ))}
        </div>
        
        {/* + signs at every grid intersection */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 13 }, (_, row) => 
            Array.from({ length: 13 }, (_, col) => (
              <div 
                key={`${row}-${col}`}
                className="absolute text-white/20 opacity-[10%]"
                style={{
                  top: `${row * (100/12)}%`,
                  left: `${col * (100/12)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Plus className="w-9 h-9" />
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Tagline */}
        <div className="text-center mb-32 text-[64px] sm:text-6xl md:text-7xl lg:text-8xl font-inter font-medium leading-24 ">
          <h2 className=" text-neutral-700 mb-4">
            We&apos;re <span className="text-[#04BBA6]">Not</span> Just
          </h2>
          <p className=" text-neutral-700">
            <span className="text-[#04BBA6]">Another Hiring Tool</span>
          </p>
        </div>

        {/* StackByStack Component */}
        <div className="flex justify-center">
          <StackByStack 
            cards={PRODUCT_FEATURES}
            visibleCount={4}
            width="w-[396px]"
            height="h-[396px]"
          />
        </div>
      </div>
    </section>
  );
} 