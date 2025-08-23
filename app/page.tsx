import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for better code splitting
const CompaniesSection = dynamic(() => import("@/components/desktop/home/CompaniesSection"));
const FeatureCard = dynamic(() => import("@/components/desktop/home/FeatureCard"));
const ComparisonSection = dynamic(() => import("@/components/desktop/home/ComparisonSection"));
const TestimonialSection = dynamic(() => import("@/components/desktop/home/TestimonialSection"));
const ProductFeature = dynamic(() => import("@/components/desktop/home/ProductFeature"));
const StatsSection = dynamic(() => import("@/components/desktop/home/StatsSection"));
const CompanyTestimonialSection = dynamic(() => import("@/components/desktop/home/CompanyTestimonialSection"));
const CTASection = dynamic(() => import("@/components/desktop/home/CTASection"));
const CarouselSection_2 = dynamic(() => import("@/components/desktop/product/CarouselSection"));

// Critical components - load immediately
const YtTestimonial = dynamic(() => import("@/components/desktop/product/ytTestimonial"), {
  ssr: true // Keep SSR for above-fold content
});
const AgeticSpcae = dynamic(() => import("@/components/desktop/home/AgeticSpcae"), {
  ssr: true // Keep SSR for important visual component
});

export default function Home() {
  return (
    <>
      {/* Critical above-fold content - loads immediately */}
      <YtTestimonial />
      <AgeticSpcae />
      
      {/* Important content - loads with minimal delay */}
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <CarouselSection_2 />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <CompaniesSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <TestimonialSection />
      </Suspense>
      
      {/* Below-fold content - loads as user scrolls */}
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <FeatureCard />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <ComparisonSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <ProductFeature />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <StatsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <CompanyTestimonialSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <CTASection />
      </Suspense>
    </>
  );
}
