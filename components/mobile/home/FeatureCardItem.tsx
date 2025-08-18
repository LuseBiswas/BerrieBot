'use client';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

interface FeatureCardItemProps {
  icon?: string;
  lordicon?: string; // URL for lordicon animation
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

export default function MobileFeatureCardItem({ 
  icon, 
  lordicon,
  title, 
  description, 
  index, 
  isInView 
}: FeatureCardItemProps) {
  return (
    <motion.div
      className="bg-[#101010] border border-teal-400/30 rounded-xl p-4 text-left mx-4"
      style={{ width: '237px', height: '256px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-start">
        {(icon || lordicon) && (
          <div className="flex-shrink-0 mb-3">
            {lordicon ? (
              <div 
                dangerouslySetInnerHTML={{
                  __html: `<lord-icon
                    src="${lordicon}"
                    trigger="loop"
                    stroke="bold"
                    colors="primary:#ffffff,secondary:#08a88a"
                    style="width:69px;height:69px">
                  </lord-icon>`
                }}
              />
            ) : icon ? (
              <Image 
                src={icon} 
                alt={title}
                width={69}
                height={69}
                className="w-[69px] h-[69px] opacity-80"
              />
            ) : null}
          </div>
        )}
        <div className="w-full text-left">
          <h3 className="font-bold text-white mb-2 leading-tight" style={{ fontSize: '18px' }}>
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed" style={{ fontSize: '14px' }}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 