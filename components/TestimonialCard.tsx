"use client"
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TestimonialCardProps {
  title: string;
  description: string;
  buttonText: string;
  variant: 'blue' | 'gray';
  profileImage?: {
    src: string;
    alt: string;
  };
}

export default function TestimonialCard({ 
  title, 
  description, 
  buttonText, 
  variant,
  profileImage 
}: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const baseClasses = "rounded-[32px] p-8 relative overflow-hidden backdrop-blur-md";
  const variantClasses = variant === 'blue' 
    ? "bg-[#04BBA6]" 
    : "bg-gray-800/10 border border-gray-600/50";
  
  const textColor = variant === 'blue' ? "text-black" : "text-white";

  // Split title into two parts if it contains a space
  const [firstWord, ...restWords] = title.split(' ');

  return (
    <motion.div 
      layout
      className={`${baseClasses} ${variantClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div layout="position" className="flex items-center gap-6 mb-6">
        {profileImage && (
          <div className={`w-20 h-20 flex-shrink-0 rounded-full overflow-hidden ${variant === 'blue' ? 'bg-white/20' : 'bg-white/10'} flex items-center justify-center`}>
            <Image
              src={profileImage.src}
              alt={profileImage.alt}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <motion.h3 layout="position" className={`text-2xl sm:text-3xl font-inter font-[500] ${textColor} leading-tight`}>
          {firstWord}<br />
          {restWords.join(' ')}
        </motion.h3>
      </motion.div>

      <motion.p layout="position" className={`${textColor} font-inter ${variant === 'blue' ? 'opacity-90' : 'opacity-80'} mb-8 leading-relaxed`}>
        {description}
      </motion.p>

      {/* Animated Button */}
      <AnimatePresence>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="font-inter font-[500] px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2
                     bg-white/10 hover:bg-[#04BBA6] text-white hover:text-black cursor-pointer group"
            whileHover={{ scale: 1.02 }}
          >
            {buttonText}
            <motion.svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 