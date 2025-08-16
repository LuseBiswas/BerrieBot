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

export default function FeatureCardItem({ 
  icon, 
  lordicon,
  title, 
  description, 
  index, 
  isInView 
}: FeatureCardItemProps) {
  return (
    <motion.div
      className="bg-[#101010] border border-teal-400/30 rounded-xl p-8 text-left"
      style={{ width: '582px', height: '343px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="flex items-start gap-6">
        {(icon || lordicon) && (
          <div className="flex-shrink-0">
            {lordicon ? (
              <div 
                dangerouslySetInnerHTML={{
                  __html: `<lord-icon
                    src="${lordicon}"
                    trigger="loop"
                    stroke="bold"
                    colors="primary:#ffffff,secondary:#08a88a"
                    style="width:178px;height:178px">
                  </lord-icon>`
                }}
              />
            ) : icon ? (
              <Image 
                src={icon} 
                alt={title}
                width={178}
                height={178}
                className="w-[178px] h-[178px] opacity-80"
              />
            ) : null}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-[30px] font-bold text-white mb-4">
            {title}
          </h3>
          <p className="text-gray-400 text-base leading-relaxed text-[22px]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 