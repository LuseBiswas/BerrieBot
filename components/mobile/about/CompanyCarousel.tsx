"use client";
import React from 'react';
import Image from 'next/image';

// Company logos data - can be extended with more logos
const COMPANY_LOGOS = [
  { id: 1, src: '/image/mobile/About/1.png', alt: 'Company 1' },
  { id: 2, src: '/image/mobile/About/2.png', alt: 'Company 2' },
  { id: 3, src: '/image/mobile/About/3.png', alt: 'Company 3' },
  { id: 4, src: '/image/mobile/About/4.png', alt: 'Company 4' },
];

export default function MobileCompanyCarousel() {
  return (
    <div className="w-full overflow-hidden" style={{ height: '60px', backgroundColor: '#00C7BE' }}>
      <div className="flex items-center h-full animate-scroll">
        {/* First set of logos */}
        {COMPANY_LOGOS.map((logo, index) => (
          <React.Fragment key={`first-${logo.id}`}>
            <div className="flex items-center justify-center mx-8">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={32}
                className="object-contain"
                style={{ height: '31.75px', width: 'auto' }}
              />
            </div>
            {/* Separator circle (except after last logo) */}
            {index < COMPANY_LOGOS.length - 1 && (
              <div 
                className="rounded-full mx-4"
                style={{
                  width: '12.13px',
                  height: '12.13px',
                  backgroundColor: '#0BECD2'
                }}
              />
            )}
          </React.Fragment>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {COMPANY_LOGOS.map((logo, index) => (
          <React.Fragment key={`second-${logo.id}`}>
            <div 
              className="rounded-full mx-4"
              style={{
                width: '12.13px',
                height: '12.13px',
                backgroundColor: '#0BECD2'
              }}
            />
            <div className="flex items-center justify-center mx-8">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={32}
                className="object-contain"
                style={{ height: '31.75px', width: 'auto' }}
              />
            </div>
            {/* Separator circle (except after last logo) */}
            {index < COMPANY_LOGOS.length - 1 && (
              <div 
                className="rounded-full mx-4"
                style={{
                  width: '12.13px',
                  height: '12.13px',
                  backgroundColor: '#0BECD2'
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
} 