import React from 'react';
import { motion } from 'framer-motion';

interface DisplaySolutionProps {
  theme: 'dark' | 'light';
  position: 'left' | 'right';
  heading: string;
  subheading: string;
  bulletPoints: string[];
  outro: string;
  lordicons: string[]; // Replace image with lordicons array
}

const DisplaySolution: React.FC<DisplaySolutionProps> = ({
  theme,
  position,
  heading,
  subheading,
  bulletPoints,
  outro,
  lordicons
}) => {
  const backgroundClass = theme === 'dark' ? 'bg-black' : 'bg-transparent';
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
  
  const AnimatedBoxesComponent = () => (
    <div className="flex justify-center items-center relative z-10">
      <div className="w-[526px] h-[669px] relative">
        {/* Box 1 - Top Left */}
        <motion.div
          className="absolute bg-[#1E1E1E] rounded-[20px] flex items-center justify-center"
          style={{ 
            width: '252px', 
            height: '167.8px',
            top: '0px',
            left: '20px',
            boxShadow: '0 0 22.2px rgba(4, 187, 166, 0.3)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            dangerouslySetInnerHTML={{
              __html: `<lord-icon
                src="${lordicons[0]}"
                trigger="loop"
                stroke="bold"
                colors="primary:#ffffff,secondary:#04BBA6"
                style="width:144px;height:144px">
              </lord-icon>`
            }}
          />
        </motion.div>

        {/* Box 2 - Top Right */}
        <motion.div
          className="absolute bg-[#1E1E1E] rounded-[20px] flex items-center justify-center"
          style={{ 
            width: '252px', 
            height: '167.8px',
            top: '210px',
            left: '280px',
            boxShadow: '0 0 22.2px rgba(4, 187, 166, 0.3)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div 
            dangerouslySetInnerHTML={{
              __html: `<lord-icon
                src="${lordicons[1]}"
                trigger="loop"
                stroke="bold"
                colors="primary:#ffffff,secondary:#04BBA6"
                style="width:144px;height:144px">
              </lord-icon>`
            }}
          />
        </motion.div>

        {/* Box 3 - Bottom Center */}
        <motion.div
          className="absolute bg-[#1E1E1E] rounded-[20px] flex items-center justify-center"
          style={{ 
            width: '252px', 
            height: '167.8px',
            top: '450px',
            left: '137px',
            boxShadow: '0 0 22.2px rgba(4, 187, 166, 0.3)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div 
            dangerouslySetInnerHTML={{
              __html: `<lord-icon
                src="${lordicons[2]}"
                trigger="loop"
                stroke="bold"
                colors="primary:#ffffff,secondary:#04BBA6"
                style="width:144px;height:144px">
              </lord-icon>`
            }}
          />
        </motion.div>
      </div>
    </div>
  );

  const ContentComponent = () => (
    <div className={`flex flex-col justify-start space-y-6 px-8 ${textColorClass} h-[669px]`}>
      <div className="flex-1 flex flex-col justify-start space-y-6 pt-4">
        <h1 className="text-[34px] font-inter font-light leading-tight text-center">
          {heading}
        </h1>
        
        <p className="text-[20px] font-inter font-extralight leading-relaxed opacity-90 text-center">
          {subheading}
        </p>
        
        <div className="space-y-6">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-4 max-w-md">
                <div className={`flex-shrink-0 w-[20px] h-[20px] rounded-full flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-black'} text-[20px] font-inter font-light`}>
                  {index + 1}
                </div>
                <p className={`text-[19px] font-inter font-light leading-relaxed flex-1 text-left ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {point}
                </p>
              </div>
              {index < bulletPoints.length - 1 && (
                <div className="w-full max-w-md h-[1px] bg-[#04BBA666]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <p className="text-[20px] font-inter font-extralight leading-relaxed text-center max-w-lg">
          <span>{outro}</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className={`${backgroundClass} min-h-screen py-16`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[669px]">
          {position === 'left' ? (
            <>
              <AnimatedBoxesComponent />
              <ContentComponent />
            </>
          ) : (
            <>
              <ContentComponent />
              <AnimatedBoxesComponent />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplaySolution; 