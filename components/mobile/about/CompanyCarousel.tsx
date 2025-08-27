"use client";
import React from 'react';
import Image from 'next/image';

// Company logos data - can be extended with more logos
const COMPANY_LOGOS = [
  { id: 1, src: '/image/mobile/Home/Teleperformance4.png', alt: 'Company 1', width: 120 },
  { id: 2, src: '/image/mobile/Home/Mindsprint2.png', alt: 'Company 2', width: 100 },
  { id: 3, src: '/image/mobile/Home/excelencia2.png', alt: 'Company 3', width: 110 },
  { id: 4, src: '/image/mobile/Home/cognizant2.png', alt: 'Company 4', width: 90 },
  { id: 5, src: '/image/mobile/Home/wipro3.png', alt: 'Company 4', width: 85 },
  { id: 6, src: '/image/mobile/Home/LTIMindtree2.png', alt: 'Company 4', width: 130 },
  { id: 7, src: '/image/mobile/Home/Citius2.png', alt: 'Company 4', width: 95 },
  { id: 8, src: '/image/mobile/Home/Mphasis2.png', alt: 'Company 4', width: 105 },
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
            width={logo.width}
            height={32}
            className="object-contain"
            style={{ height: '31.75px', width: 'auto' }}
          />
        </div>
        <div 
          className="rounded-full mx-4 flex-shrink-0"
          style={{
            width: '12.13px',
            height: '12.13px',
            backgroundColor: '#028374'
          }}
        />
      </React.Fragment>
    ));
  };

  return (
    <div className="w-full overflow-hidden" style={{ height: '60px', backgroundColor: '#FFFF'}}>
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