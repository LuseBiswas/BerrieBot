"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface SolutionSlide {
  id: number;
  lordicon: string;
  content: string;
  heading?: string;
  subheading?: string;
  description?: string;
  image?: string;
}

const solutionsData: SolutionSlide[] = [
  {
    id: 1,
    lordicon: "https://cdn.lordicon.com/vpbspaec.json",
    content: "Schedules interviews, confirms call letters, and keeps your career site buzzing.",
    heading: "BerriConnect",
    subheading: "Automated Candidate <br/> Communication & Scheduling.",
    description: "Boost your show-up rates, <br/> eliminate manual scheduling,<br/> and more than 7 million minutes <br/> of candidate engagement. ",
    image: "/image/mobile/Product/1.png"
  },
  {
    id: 2,
    lordicon: "https://cdn.lordicon.com/vpbspaec.json", 
    content: "Bulk calling, WhatsApp, <br/> SMS, email follow-ups"
  },
  {
    id: 3,
    lordicon: "https://cdn.lordicon.com/odpyouay.json",
    content: "Live reminders <br/> & interview <br/> confirmations"
  },
  {
    id: 4,
    lordicon: "https://cdn.lordicon.com/sylzqxek.json",
    content: "AI-powered calendar <br/> conflict resolution"
  }
];

const solutionsData2: SolutionSlide[] = [
  {
    id: 1,
    lordicon: "https://cdn.lordicon.com/cfoaotmk.json",
    content: "Second carousel content 1",
    heading: "BerriSearch <br/> & Match",
    subheading: "AI-Powered Resume <br/> Screening & Matching.",
    description: "Shortlist high-fit candidates <br/> in seconds. Minimize <br/> bias and hiring errors.",
    image: "/image/mobile/Product/2.png"
  },
  {
    id: 2,
    lordicon: "https://cdn.lordicon.com/ypagsvdy.json", 
    content: "AI-based skill mapping <br/> and contextual analysis"
  },
  {
    id: 3,
    lordicon: "https://cdn.lordicon.com/hcsnfpqp.json",
    content: "1:1 and 1:N <br/> JD comparisons"
  },
  {
    id: 4,
    lordicon: "https://cdn.lordicon.com/gnxqymui.json",
    content: "ATS integration <br/> with tagging <br/> and auto-suggestions"
  }
];

const solutionsData3: SolutionSlide[] = [
  {
    id: 1,
    lordicon: "https://cdn.lordicon.com/cfoaotmk.json",
    content: "Third carousel content 1",
    heading: "BerriMastermind",
    subheading: "Automated Interviews,<br/> anytime, anywhere.",
    description: "Eliminate scheduling <br/> bottlenecks. Standardize quality.<br/> Scale L1 interviews infinitely.",
    image: "/image/mobile/Product/3.png"
  },
  {
    id: 2,
    lordicon: "https://cdn.lordicon.com/ailnzwyn.json", 
    content: "Adaptive Q&A <br/> + coding environments"
  },
  {
    id: 3,
    lordicon: "https://cdn.lordicon.com/idpbgtvy.json",
    content: "AI scoring for <br/> tech, soft skills,<br/> and communication"
  },
  {
    id: 4,
    lordicon: "https://cdn.lordicon.com/euflfcqp.json",
    content: "24/7 asynchronous <br/> interviews with <br/> auto follow-ups"
  }
];

const solutionsData4: SolutionSlide[] = [
  {
    id: 1,
    lordicon: "https://cdn.lordicon.com/cfoaotmk.json",
    content: "Fourth carousel content 1",
    heading: "BerriProctor",
    subheading: "Real-Time Identity ,<br/> Verification & Fraud Detection",
    description: "Prevent impersonation. <br/> Avoid bad hires.<br/> Ensure 100% audibility.<br/> Over 150,000+ interviews.",
    image: "/image/mobile/Product/4.png"
  },
  {
    id: 2,
    lordicon: "https://cdn.lordicon.com/gjopwtdp.json", 
    content: "Face & voice biometrics"
  },
  {
    id: 3,
    lordicon: "https://cdn.lordicon.com/kdibbosx.json",
    content: "Lip sync, whisper <br/> detection, 3D liveness"
  },
  {
    id: 4,
    lordicon: "https://cdn.lordicon.com/nwwurnnq.json",
    content: "Anomaly alerts<br/>+ full compliance logs"
  }
];

export default function MobileProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [direction2, setDirection2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [direction3, setDirection3] = useState(0);
  const [currentIndex4, setCurrentIndex4] = useState(0);
  const [direction4, setDirection4] = useState(0);

  // Load lordicon script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://cdn.lordicon.com/lordicon.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < solutionsData.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  const paginate2 = (newDirection: number) => {
    const newIndex = currentIndex2 + newDirection;
    if (newIndex >= 0 && newIndex < solutionsData2.length) {
      setDirection2(newDirection);
      setCurrentIndex2(newIndex);
    }
  };

  const paginate3 = (newDirection: number) => {
    const newIndex = currentIndex3 + newDirection;
    if (newIndex >= 0 && newIndex < solutionsData3.length) {
      setDirection3(newDirection);
      setCurrentIndex3(newIndex);
    }
  };

  const paginate4 = (newDirection: number) => {
    const newIndex = currentIndex4 + newDirection;
    if (newIndex >= 0 && newIndex < solutionsData4.length) {
      setDirection4(newDirection);
      setCurrentIndex4(newIndex);
    }
  };

  return (
    <div className="bg-black pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Background Image 1 */}
      <div className="absolute pointer-events-none" style={{ top: '-100px', left: '-200px', zIndex: 1 }}>
        <Image
          src="/image/mobile/5.png"
          alt="Background"
          width={1266}
          height={956}
          className="w-[1266px] h-[956px]"
        />
      </div>
      
      {/* Background Image 2 */}
      <div className="absolute pointer-events-none" style={{ top: '1600px', left: '-500px', zIndex: 0 }}>
        <Image
          src="/image/mobile/7.png"
          alt="Background 2"
          width={800}
          height={600}
          className="w-[800px] h-[600px] opacity-[50%]"
        />
      </div>
      
      {/* Background Image 3 */}
      <div className="absolute pointer-events-none" style={{ top: '700px', right: '-100px', zIndex: 1 }}>
        <Image
          src="/image/mobile/8.png"
          alt="Background 3"
          width={700}
          height={700}
          className="w-[700px] h-[500px] opacity-[50%] rotate-419"
        />
      </div>
      
      <div className="max-w-sm mx-auto mt-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Title */}
          <h1 
            className="font-medium text-white mb-4"
            style={{
              fontSize: '48px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.2'
            }}
          >
            One platform.
            <br />
            Four powerful
            <br />
            products.
          </h1>
          
          {/* Subtitle */}
          {/* <h2 
            className="font-medium text-white mb-6"
            style={{
              fontSize: '24px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.3'
            }}
          >
            The Berri-Suite automates the <br /> entire hiring lifecycle <br /> - so your teams focus on <br /> decisions, not logistics.
          </h2> */}
          
          {/* Description */}
          <p 
            className="text-white font-light leading-relaxed"
            style={{
              fontSize: '16px',
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '1.5'
            }}
          >
            The Berri-Suite automates the entire <br /> hiring lifecycle - so your teams focus on <br /> decisions, not logistics.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative flex items-center justify-center" style={{ minHeight: '400px' }}>
          {/* Left Arrow */}
          <button
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className={`absolute left-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex === 0 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="flex flex-col items-center justify-center mx-12" style={{ minHeight: '350px' }}>
            <div className="relative flex items-center justify-center" style={{ width: '236px', height: '312px' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`first-slide-${currentIndex}`}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {solutionsData[currentIndex].id === 1 ? (
                    // First slide - Card UI
                    <div className="w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-[200px]" style={{ backgroundColor: '#FFFFFF00' }}>
                      {/* Heading */}
                      <h3 
                        className="text-white font-medium text-center mb-2"
                        style={{
                          fontSize: '24px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.2'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData[currentIndex].heading || '' }}
                      />
                      
                      {/* Subheading */}
                      <h4 
                        className="text-white font-light text-center mb-4"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.3'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData[currentIndex].subheading || '' }}
                      />
                      
                      {/* Icon/Image */}
                      <div className="mb-4 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                        {solutionsData[currentIndex].image ? (
                          <Image
                            src={solutionsData[currentIndex].image}
                            alt="Product Icon"
                            width={80}
                            height={80}
                            className="w-[80px] h-[80px]"
                          />
                        ) : (
                          <div 
                            dangerouslySetInnerHTML={{
                              __html: `<lord-icon
                                src="${solutionsData[currentIndex].lordicon}"
                                trigger="loop"
                                stroke="bold"
                                colors="primary:#00AD96,secondary:#ffffff"
                                style="width:80px;height:80px">
                              </lord-icon>`
                            }}
                          />
                        )}
                      </div>
                      
                      {/* Description */}
                      <p 
                        className="text-white font-light text-center"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.4'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData[currentIndex].description || '' }}
                      />
                    </div>
                  ) : (
                    // Other slides - Icon + Content UI
                    <>
                      {/* Icon Container */}
                      <div className="mb-6 flex items-center justify-center" style={{ width: '137px', height: '137px' }}>
                        <div 
                          dangerouslySetInnerHTML={{
                            __html: `<lord-icon
                              src="${solutionsData[currentIndex].lordicon}"
                              trigger="loop"
                              stroke="bold"
                              colors="primary:#00AD96,secondary:#ffffff"
                              style="width:137px;height:137px">
                            </lord-icon>`
                          }}
                        />
                      </div>

                      {/* Content Box */}
                      <div className="rounded-2xl p-4 flex items-center backdrop-blur-[200px]" style={{ width: '226px', height: '126px', backgroundColor: '#FFFFFF00' }}>
                        {/* Tick Icon Section */}
                        <div className="flex items-center justify-center" style={{ width: '20%' }}>
                          <div className="w-6 h-6 bg-transparent rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-[#00AD96]" />
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex items-center" style={{ width: '80%' }}>
                          <p 
                            className="text-white text-left font-light leading-relaxed"
                            style={{
                              fontSize: '14px',
                              fontFamily: 'Manrope, sans-serif',
                              lineHeight: '1.4'
                            }}
                            dangerouslySetInnerHTML={{ __html: solutionsData[currentIndex].content }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => paginate(1)}
            disabled={currentIndex === solutionsData.length - 1}
            className={`absolute right-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex === solutionsData.length - 1 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        
      </div>

      {/* Second Carousel - Duplicate */}
      <div className="max-w-sm mx-auto mt-20 relative z-10">
        {/* Carousel Section */}
        <div className="relative flex items-center justify-center" style={{ minHeight: '400px' }}>
          {/* Left Arrow */}
          <button
            onClick={() => paginate2(-1)}
            disabled={currentIndex2 === 0}
            className={`absolute left-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex2 === 0 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="flex flex-col items-center justify-center mx-12" style={{ minHeight: '350px' }}>
            <div className="relative flex items-center justify-center" style={{ width: '236px', height: '312px' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`second-slide-${currentIndex2}`}
                  initial={{ opacity: 0, x: direction2 > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction2 > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {solutionsData2[currentIndex2].id === 1 ? (
                    // First slide - Card UI
                    <div className="w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-[200px]" style={{ backgroundColor: '#FFFFFF00' }}>
                      {/* Heading */}
                      <h3 
                        className="text-white font-medium text-center mb-2"
                        style={{
                          fontSize: '24px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.2'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData2[currentIndex2].heading || '' }}
                      />
                      
                      {/* Subheading */}
                      <h4 
                        className="text-white font-light text-center mb-4"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.3'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData2[currentIndex2].subheading || '' }}
                      />
                      
                      {/* Icon/Image */}
                      <div className="mb-4 flex items-center justify-center" style={{ width: '100px', height: '80px' }}>
                        {solutionsData2[currentIndex2].image ? (
                          <Image
                            src={solutionsData2[currentIndex2].image}
                            alt="Product Icon"
                            width={150}
                            height={80}
                            className="w-[150px] h-[80px]"
                          />
                        ) : (
                          <div 
                            dangerouslySetInnerHTML={{
                              __html: `<lord-icon
                                src="${solutionsData2[currentIndex2].lordicon}"
                                trigger="loop"
                                stroke="bold"
                                colors="primary:#00AD96,secondary:#ffffff"
                                style="width:80px;height:80px">
                              </lord-icon>`
                            }}
                          />
                        )}
                      </div>
                      
                      {/* Description */}
                      <p 
                        className="text-white font-light text-center"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.4'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData2[currentIndex2].description || '' }}
                      />
                    </div>
                  ) : (
                    // Other slides - Icon + Content UI
                    <>
                      {/* Icon Container */}
                      <div className="mb-6 flex items-center justify-center" style={{ width: '137px', height: '137px' }}>
                        <div 
                          dangerouslySetInnerHTML={{
                            __html: `<lord-icon
                              src="${solutionsData2[currentIndex2].lordicon}"
                              trigger="loop"
                              stroke="bold"
                              colors="primary:#00AD96,secondary:#ffffff"
                              style="width:137px;height:137px">
                            </lord-icon>`
                          }}
                        />
                      </div>

                      {/* Content Box */}
                      <div className="rounded-2xl p-4 flex items-center backdrop-blur-[200px]" style={{ width: '226px', height: '126px', backgroundColor: '#FFFFFF00' }}>
                        {/* Tick Icon Section */}
                        <div className="flex items-center justify-center" style={{ width: '20%' }}>
                          <div className="w-6 h-6 bg-transparent rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-[#00AD96]" />
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex items-center" style={{ width: '80%' }}>
                          <p 
                            className="text-white text-left font-light leading-relaxed"
                            style={{
                              fontSize: '14px',
                              fontFamily: 'Manrope, sans-serif',
                              lineHeight: '1.4'
                            }}
                            dangerouslySetInnerHTML={{ __html: solutionsData2[currentIndex2].content }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => paginate2(1)}
            disabled={currentIndex2 === solutionsData2.length - 1}
            className={`absolute right-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex2 === solutionsData2.length - 1 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        
      </div>

      {/* Third Carousel */}
      <div className="max-w-sm mx-auto mt-20 relative z-10">
        {/* Carousel Section */}
        <div className="relative flex items-center justify-center" style={{ minHeight: '400px' }}>
          {/* Left Arrow */}
          <button
            onClick={() => paginate3(-1)}
            disabled={currentIndex3 === 0}
            className={`absolute left-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex3 === 0 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="flex flex-col items-center justify-center mx-12" style={{ minHeight: '350px' }}>
            <div className="relative flex items-center justify-center" style={{ width: '236px', height: '312px' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`third-slide-${currentIndex3}`}
                  initial={{ opacity: 0, x: direction3 > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction3 > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {solutionsData3[currentIndex3].id === 1 ? (
                    // First slide - Card UI
                    <div className="w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-[200px]" style={{ backgroundColor: '#FFFFFF00' }}>
                      {/* Heading */}
                      <h3 
                        className="text-white font-medium text-center mb-2"
                        style={{
                          fontSize: '24px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.2'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData3[currentIndex3].heading || '' }}
                      />
                      
                      {/* Subheading */}
                      <h4 
                        className="text-white font-light text-center mb-4"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.3'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData3[currentIndex3].subheading || '' }}
                      />
                      
                                             {/* Icon/Image */}
                       <div className="mb-4 flex items-center justify-center" style={{ width: '110px', height: '80px' }}>
                         {solutionsData3[currentIndex3].image ? (
                           <Image
                             src={solutionsData3[currentIndex3].image}
                             alt="Product Icon"
                             width={110}
                             height={80}
                             className="w-[110px] h-[80px]"
                           />
                         ) : (
                           <div 
                             dangerouslySetInnerHTML={{
                               __html: `<lord-icon
                                 src="${solutionsData3[currentIndex3].lordicon}"
                                 trigger="loop"
                                 stroke="bold"
                                 colors="primary:#00AD96,secondary:#ffffff"
                                 style="width:80px;height:80px">
                               </lord-icon>`
                             }}
                           />
                         )}
                       </div>
                      
                      {/* Description */}
                      <p 
                        className="text-white font-light text-center"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.4'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData3[currentIndex3].description || '' }}
                      />
                    </div>
                  ) : (
                    // Other slides - Icon + Content UI
                    <>
                      {/* Icon Container */}
                      <div className="mb-6 flex items-center justify-center" style={{ width: '137px', height: '137px' }}>
                        <div 
                          dangerouslySetInnerHTML={{
                            __html: `<lord-icon
                              src="${solutionsData3[currentIndex3].lordicon}"
                              trigger="loop"
                              stroke="bold"
                              colors="primary:#00AD96,secondary:#ffffff"
                              style="width:137px;height:137px">
                            </lord-icon>`
                          }}
                        />
                      </div>

                      {/* Content Box */}
                      <div className="rounded-2xl p-4 flex items-center backdrop-blur-[200px]" style={{ width: '226px', height: '126px', backgroundColor: '#FFFFFF00' }}>
                        {/* Tick Icon Section */}
                        <div className="flex items-center justify-center" style={{ width: '20%' }}>
                          <div className="w-6 h-6 bg-transparent rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-[#00AD96]" />
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex items-center" style={{ width: '80%' }}>
                          <p 
                            className="text-white text-left font-light leading-relaxed"
                            style={{
                              fontSize: '14px',
                              fontFamily: 'Manrope, sans-serif',
                              lineHeight: '1.4'
                            }}
                            dangerouslySetInnerHTML={{ __html: solutionsData3[currentIndex3].content }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => paginate3(1)}
            disabled={currentIndex3 === solutionsData3.length - 1}
            className={`absolute right-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex3 === solutionsData3.length - 1 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        
      </div>

      {/* Fourth Carousel */}
      <div className="max-w-sm mx-auto mt-20 relative z-10">
        {/* Carousel Section */}
        <div className="relative flex items-center justify-center" style={{ minHeight: '400px' }}>
          {/* Left Arrow */}
          <button
            onClick={() => paginate4(-1)}
            disabled={currentIndex4 === 0}
            className={`absolute left-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex4 === 0 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Carousel Content */}
          <div className="flex flex-col items-center justify-center mx-12" style={{ minHeight: '350px' }}>
            <div className="relative flex items-center justify-center" style={{ width: '236px', height: '312px' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`fourth-slide-${currentIndex4}`}
                  initial={{ opacity: 0, x: direction4 > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction4 > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {solutionsData4[currentIndex4].id === 1 ? (
                    // First slide - Card UI
                    <div className="w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-[200px]" style={{ backgroundColor: '#FFFFFF00' }}>
                      {/* Heading */}
                      <h3 
                        className="text-white font-medium text-center mb-2"
                        style={{
                          fontSize: '24px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.2'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData4[currentIndex4].heading || '' }}
                      />
                      
                      {/* Subheading */}
                      <h4 
                        className="text-white font-light text-center mb-4"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.3'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData4[currentIndex4].subheading || '' }}
                      />
                      
                                             {/* Icon/Image */}
                       <div className="mb-4 flex items-center justify-center" style={{ width: '90px', height: '80px' }}>
                         {solutionsData4[currentIndex4].image ? (
                           <Image
                             src={solutionsData4[currentIndex4].image}
                             alt="Product Icon"
                             width={90}
                             height={80}
                             className="w-[90px] h-[80px]"
                           />
                         ) : (
                           <div 
                             dangerouslySetInnerHTML={{
                               __html: `<lord-icon
                                 src="${solutionsData4[currentIndex4].lordicon}"
                                 trigger="loop"
                                 stroke="bold"
                                 colors="primary:#00AD96,secondary:#ffffff"
                                 style="width:80px;height:80px">
                               </lord-icon>`
                             }}
                           />
                         )}
                       </div>
                      
                      {/* Description */}
                      <p 
                        className="text-white font-light text-center"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.4'
                        }}
                        dangerouslySetInnerHTML={{ __html: solutionsData4[currentIndex4].description || '' }}
                      />
                    </div>
                  ) : (
                    // Other slides - Icon + Content UI
                    <>
                      {/* Icon Container */}
                      <div className="mb-6 flex items-center justify-center" style={{ width: '137px', height: '137px' }}>
                        <div 
                          dangerouslySetInnerHTML={{
                            __html: `<lord-icon
                              src="${solutionsData4[currentIndex4].lordicon}"
                              trigger="loop"
                              stroke="bold"
                              colors="primary:#00AD96,secondary:#ffffff"
                              style="width:137px;height:137px">
                            </lord-icon>`
                          }}
                        />
                      </div>

                      {/* Content Box */}
                      <div className="rounded-2xl p-4 flex items-center backdrop-blur-[200px]" style={{ width: '226px', height: '126px', backgroundColor: '#FFFFFF00' }}>
                        {/* Tick Icon Section */}
                        <div className="flex items-center justify-center" style={{ width: '20%' }}>
                          <div className="w-6 h-6 bg-transparent rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-[#00AD96]" />
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="flex items-center" style={{ width: '80%' }}>
                          <p 
                            className="text-white text-left font-light leading-relaxed"
                            style={{
                              fontSize: '14px',
                              fontFamily: 'Manrope, sans-serif',
                              lineHeight: '1.4'
                            }}
                            dangerouslySetInnerHTML={{ __html: solutionsData4[currentIndex4].content }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => paginate4(1)}
            disabled={currentIndex4 === solutionsData4.length - 1}
            className={`absolute right-0 z-10 p-2 rounded-full transition-colors ${
              currentIndex4 === solutionsData4.length - 1 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        
      </div>
    </div>
  );
} 