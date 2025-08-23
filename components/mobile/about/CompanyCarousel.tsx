"use client";
import React from 'react';
import Image from 'next/image';

// Company logos data - can be extended with more logos
const COMPANY_LOGOS = [
  { id: 1, src: '/image/mobile/Home/Teleperformer_3.png', alt: 'Company 1' },
  { id: 2, src: '/image/mobile/Home/VIT_2.png', alt: 'Company 2' },
  { id: 3, src: '/image/mobile/Home/encora.png', alt: 'Company 3' },
  { id: 4, src: '/image/mobile/Home/indium.png', alt: 'Company 4' },
  { id: 5, src: '/image/mobile/Home/excelencia.png', alt: 'Company 4' },
  { id: 6, src: '/image/mobile/Home/cognizant.png', alt: 'Company 4' },
  { id: 7, src: '/image/mobile/Home/LTIMindtree_3.png', alt: 'Company 4' },
  { id: 8, src: '/image/mobile/Home/Mindsprint_2.png', alt: 'Company 4' },
];

export default function MobileCompanyCarousel() {
  // Create the repeating pattern: Logo -> Dot -> Logo -> Dot -> etc.
  const createLogoPattern = (keyPrefix: string) => {
    return COMPANY_LOGOS.map((logo) => (
      <React.Fragment key={`${keyPrefix}-${logo.id}`}>
        <div className="flex items-center justify-center mx-8 flex-shrink-0">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={32}
            sizes="96px"
            className="object-contain filter brightness-0 invert w-24 h-6"
            style={{ maxHeight: '24px', width: 'auto' }}
          />
        </div>
        <div 
          className="rounded-full mx-4 flex-shrink-0"
          style={{
            width: '12.13px',
            height: '12.13px',
            backgroundColor: '#0BECD2'
          }}
        />
      </React.Fragment>
    ));
  };

  return (
    <div className="w-full overflow-hidden" style={{ height: '60px', backgroundColor: '#028374' }}>
      <div className="flex items-center h-full animate-scroll">
        {/* First set */}
        {createLogoPattern('first')}
        {/* Second set - exact duplicate for seamless loop */}
        {createLogoPattern('second')}
        {/* Third set - extra safety for perfect loop */}
        {createLogoPattern('third')}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
} 