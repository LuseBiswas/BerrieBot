'use client';

import { useEffect, Suspense } from 'react';
import { trackProductPageView, trackScrollDepth } from '@/utils/analytics';
import HeroSection from "@/components/desktop/product/HeroSection";
import CTASection from "@/components/desktop/product/CTASection";
import ProductFeature from "@/components/desktop/product/ProductFeature";
import ComparisonSection from "@/components/desktop/product/ComparisonSection";
import CompanyTestimonialSection from "@/components/desktop/product/CompanyTestimonialSection";
import LineSection from "@/components/desktop/product/LineSection";
import BottomBanner from "@/components/desktop/product/BottomBanner";
import CommentCarousel from "@/components/desktop/product/CommentCarousel";

export default function Product() {
  // Track product page view on component mount
  useEffect(() => {
    trackProductPageView();
  }, []);

  // Track scroll depth
  useEffect(() => {
    const scrollDepthMarkers: Record<number, boolean> = { 25: false, 50: false, 75: false, 100: false };
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      // Track scroll depth milestones
      Object.keys(scrollDepthMarkers).forEach(depth => {
        const depthNum = parseInt(depth);
        if (scrollPercent >= depthNum && !scrollDepthMarkers[depthNum]) {
          scrollDepthMarkers[depthNum] = true;
          trackScrollDepth(depthNum, 'product');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeroSection /> 
      <Suspense fallback={<div>Loading...</div>}>
        <CommentCarousel/>
      </Suspense>
      <ProductFeature/>
      
      <ComparisonSection/>
      <CompanyTestimonialSection/>
      <LineSection/>
      <div className="mb-[-180px]">
      <BottomBanner/>
      </div>
      <CTASection />
      
    </>
  );
} 