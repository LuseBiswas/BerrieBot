"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ResourceCardProps {
  image: string;
  title: string;
  description: string;
  hoverButtonName: string;
  link: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  image,
  title,
  description,
  hoverButtonName,
  link
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative " 
      style={{ width: '421px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div 
        className="overflow-hidden rounded-2xl shadow-lg bg-[#1A1A1A] relative"
        style={{ width: '421px', height: '532px', zIndex: 2 }}
      >
        {/* Main Image */}
        <div className="p-4 pt-4">
          <div className="relative h-56 w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        
        {/* Card Content */}
        <div className="px-6 pb-6 bg-[#1A1A1A] text-white font-inter" style={{ height: 'calc(532px - 256px)' }}>
          <div>
            <h3 className="text-[36px] font-bold text-white mb-4">{title}</h3>
            <p className="text-[24px] font-extralight text-gray-300 text-base leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      
      {/* Hover Button - Slides down from inside card */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 flex justify-center"
        style={{ top: '482px', zIndex: 1 }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ 
          y: isHovered ? 40 : -30, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Link href={link}>
          <button 
            className="bg-teal-500 hover:bg-teal-600 text-black font-medium flex items-center justify-center transition-colors duration-200 hover:cursor-pointer"
            style={{ 
              width: '272px', 
              height: '50px',
              borderRadius: '15px'
            }}
          >
            {hoverButtonName}
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ResourceCard;
