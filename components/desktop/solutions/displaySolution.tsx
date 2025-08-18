import React from 'react';
import Image from 'next/image';

interface DisplaySolutionProps {
  theme: 'dark' | 'light';
  position: 'left' | 'right';
  heading: string;
  subheading: string;
  bulletPoints: string[];
  outro: string;
  image: string;
}

const DisplaySolution: React.FC<DisplaySolutionProps> = ({
  theme,
  position,
  heading,
  subheading,
  bulletPoints,
  outro,
  image
}) => {
  const backgroundClass = theme === 'dark' ? 'bg-black' : 'bg-transparent';
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
  
  const ImageComponent = () => (
    <div className="flex justify-center items-center relative z-10">
      <Image 
        src={image} 
        alt="Solution illustration"
        width={526}
        height={669}
        className="object-cover relative z-10"
      />
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
                <p className="text-[19px] font-inter font-light leading-relaxed flex-1 text-left">
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
              <ImageComponent />
              <ContentComponent />
            </>
          ) : (
            <>
              <ContentComponent />
              <ImageComponent />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplaySolution; 