'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import StackByStack, { StackCard } from '../product/StackByStack';

const PRODUCT_FEATURES: StackCard[] = [
  {
    id: 'sec-speed',
    top: <>Enterprise-Grade<br/><span className="text-[#028374]">Security</span></>,
    ribbon: <>ISO 27001&nbsp;•&nbsp;Soc2Type2&nbsp;•&nbsp;GDPR&nbsp;•&nbsp;DPDP</>,
    bottom: <>Startup-Grade<br/><span className="text-[#028374]">Speed</span></>,
  },
  {
    id: 'ai-ready',
    top: 'Built by AI Natives',
    ribbonStatic: 'Patents, Successful Start-ups, <br/> exits, and 10M+ minutes of AI assessments power this platform.',
  },
  {
    id: 'obs-five',
    top: 'Modular. Scalable. Predictable Pricing.',
    ribbonStatic:'Use what you need, when you need. Flexible prepaid commerical plans.',
  },
  {
    id: 'global-deploy',
    top: 'Zero Vendor Bloat',
    ribbonStatic: 'Why juggle 6 tools when <br/> one platform does it all?'
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
        <div className="text-center mb-32 text-[64px] sm:text-6xl md:text-7xl lg:text-8xl tracking-[-2px] sm:tracking-[-2.25px]  font-normal text-white bg-clip-text "style={{ fontFamily: 'Manrope, sans-serif' }}>
          <h2 className=" mb-4">
            We&apos;re not just
          </h2>
          <p className="">
            another hiring tool
          </p>
        </div>

        {/* StackByStack Component */}
        <div className="relative flex justify-center h-[396px] mt-65 mb-12">
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