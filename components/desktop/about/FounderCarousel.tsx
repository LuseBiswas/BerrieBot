'use client';
import React from 'react';
import Image from 'next/image';

// JSON data structure for founder carousel
const FOUNDERS = [
  {
    id: 1,
    image: "/image/profile/Raja.png",
    name: "Raja Lingappaa",
    company: "Founder and CEO,<br/> AI innovator, ex-Meta & SAP, 5 AI patents, 7 books",
    link: "https://www.linkedin.com/in/rajacheers" // Add actual LinkedIn URL
  },
  {
    id: 2,
    image: "/image/profile/Vishnu.png",
    name: "Vishnuvardhan M",
    company: "Founder and COO,<br/> serial entrepreneur, built large-scale hiring ops.",
    link: "https://www.linkedin.com/in/vishnuvardhan-m-9bb6aa20a/" // Add actual LinkedIn URL
  },
  {
    id: 3,
    image: "/image/profile/Satish.png",
    name: "Satish Jeyaraman",
    company: "Cofounder and CGO,<br/> ex-Cognizant HR leader, scaled hiring to 60K+ annually.",
    link: "https://www.linkedin.com/in/satishjeyaraman" // Add actual LinkedIn URL
  }
];

export default function MobileAboutFounderCarousel() {
  return (
    <section className="relative bg-black py-16 px-4 overflow-hidden">
      {/* Heading and Sub-heading Section - Above all decorative elements */}
      <div className="text-center mb-16 relative z-20">
        {/* Main Heading */}
        <h1 
          className="tracking-tight font-medium text-white text-center mb-6"
          style={{
            fontSize: '76px',
            fontFamily: 'Manrope, sans-serif',
            lineHeight: '1.2'
          }}
        >
          Our
          Team
        </h1>

        {/* Description */}
        <div className="text-center max-w-2xl mx-auto">
          <p 
            className="leading-[1.4] font-light text-white mb-4"
            style={{
              fontSize: '26px',
              fontFamily: 'Manrope, sans-serif'
            }}
          >
            Berribot is led by a team with <br /> decades of experience in AI, recruiting, <br /> and scaling global businesses
          </p>
        </div>
      </div>

      {/* Bottom Left - 7.png */}
      <div className="absolute z-1 pointer-events-none" style={{ bottom: '500px', left: '-350px' }}>
        <Image 
          src="/image/mobile/7.png"
          alt="Background Image Bottom Left"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]  opacity-[40%]"
        />
      </div>
      
      {/* Top Right - 8.png */}
      <div className="absolute z-1 pointer-events-none" style={{ top: '-300px', right: '-200px' }}>
        <Image 
          src="/image/mobile/9.png"
          alt="Background Image Top Right"
          width={544}
          height={462}
          className="w-[543.6px] h-[462px]  opacity-[50%]"
        />
      </div>

      {/* Top Left Image - Positioned below subheading */}
      <div className="absolute z-1" style={{ top: '350px', left: '0px' }}>
        <Image 
          src="/image/mobile/line_1.png"
          alt="Top Left Lines"
          width={248}
          height={99}
          className="w-[248px] h-[99px]"
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto relative z-10 mt-52 mb-52">
        {/* Founders Grid */}
        <div className="grid grid-cols-3 gap-8 px-8">
          {FOUNDERS.map((founder) => (
            <div key={founder.id} className="text-center space-y-6">
              {/* Circular Image */}
              <div className="flex justify-center">
                <a 
                  href={founder.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer"
                >
                  <div 
                    className="rounded-full overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105"
                    style={{
                      width: '250px',
                      height: '250px',
                      backgroundColor: '#D9D9D9'
                    }}
                  >
                    <Image 
                      src={founder.image}
                      alt={founder.name}
                      width={250}
                      height={250}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </a>
              </div>

              {/* Person Name */}
              <div 
                className="text-white font-medium"
                style={{ 
                  fontSize: '28px', 
                  fontFamily: 'Manrope, sans-serif' 
                }}
              >
                {founder.name}
              </div>

              {/* Company Name */}
              <div 
                className="text-white/80"
                style={{ 
                  fontSize: '20px', 
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: '300'
                }}
                dangerouslySetInnerHTML={{ __html: founder.company }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right Image */}
      <div className="absolute bottom-0 right-0">
        <Image 
          src="/image/mobile/line_2.png"
          alt="Bottom Right Lines"
          width={248}
          height={99}
          className="w-[248px] h-[99px]"
        />
      </div>
    </section>
  );
} 