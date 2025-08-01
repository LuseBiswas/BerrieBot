'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export interface DropdownSection {
  title: string;
  items: {
    name: string;
    href: string;
    description?: string;
  }[];
}

interface DropdownProps {
  trigger: React.ReactNode;
  sections: DropdownSection[];
  className?: string;
}

export default function Dropdown({ trigger, sections, className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOffset, setDropdownOffset] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${className}`}
    >
      {/* Trigger */}
      <div ref={triggerRef} className="cursor-pointer" onClick={handleClick}>
        {trigger}
      </div>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-12 z-50"
            style={{ 
              transform: `translateX(-76.24px)` 
            }}
          >
            {/* Arrow pointing up */}
            <div className="absolute -top-2" style={{ left: '30px' }}>
              <div className="w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 min-w-[600px] relative">
              {/* Grid layout for sections */}
              <div className={`grid gap-8 ${sections.length === 2 ? 'grid-cols-2' : sections.length === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
                {sections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    {/* Section Title */}
                    <h3 className="text-[#04BBA6] font-semibold text-lg uppercase tracking-wide">
                      {section.title}
                    </h3>
                    
                    {/* Section Items */}
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className="block group"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="text-gray-700 font-medium group-hover:text-[#04BBA6] transition-colors duration-200">
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-gray-500 text-sm mt-1 leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 