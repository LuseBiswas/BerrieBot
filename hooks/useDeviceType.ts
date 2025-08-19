"use client";

import { useState, useEffect } from 'react';

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      // Consider mobile/tablet if screen width is less than 1024px (lg breakpoint)
      // This includes phones (< 768px) and tablets (768px - 1023px)
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsLoading(false);
    };

    // Check immediately
    checkDevice();

    // Add resize listener
    window.addEventListener('resize', checkDevice);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isLoading };
}; 