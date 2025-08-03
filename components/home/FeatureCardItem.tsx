'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface FeatureCardItemProps {
  icon?: string;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

export default function FeatureCardItem({ 
  icon, 
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
        {icon && (
          <div className="flex-shrink-0">
            <img 
              src={icon} 
              alt={title}
              className="w-[178px] h-[178px] opacity-80"
            />
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