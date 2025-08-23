'use client';

import { useEffect } from 'react';
import Contact from "@/components/desktop/schedule/contact";
import HeroSection from "@/components/desktop/schedule/HeroSection";
import { trackSchedulePageView } from "@/utils/analytics";

export default function ExplorePage() {
  // Track schedule page view on component mount
  useEffect(() => {
    trackSchedulePageView();
  }, []);

  return (
    <>
    <HeroSection />
    <Contact/>
 
    </>
    
  );
} 