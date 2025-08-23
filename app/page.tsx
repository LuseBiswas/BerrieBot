import { Suspense } from "react";
import dynamic from "next/dynamic";
import YtTestimonial from "@/components/desktop/product/ytTestimonial";

// Dynamic imports for bundle splitting - keeping exact same visual hierarchy
const AgeticSpcae = dynamic(() => import("@/components/desktop/home/AgeticSpcae"), {
  loading: () => <div className="min-h-screen bg-black" />, // Matches AgeticSpcae background
});

const CarouselSection_2 = dynamic(() => import("@/components/desktop/product/CarouselSection"), {
  loading: () => <div className="min-h-[600px] bg-black" />, // Estimated height
});

const CompaniesSection = dynamic(() => import("@/components/desktop/home/CompaniesSection"), {
  loading: () => <div className="min-h-[400px] bg-black" />,
});

const TestimonialSection = dynamic(() => import("@/components/desktop/home/TestimonialSection"), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});

const FeatureCard = dynamic(() => import("@/components/desktop/home/FeatureCard"), {
  loading: () => <div className="min-h-[800px] bg-black" />,
});

const ComparisonSection = dynamic(() => import("@/components/desktop/home/ComparisonSection"), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});

const ProductFeature = dynamic(() => import("@/components/desktop/home/ProductFeature"), {
  loading: () => <div className="min-h-[500px] bg-black" />,
});

const StatsSection = dynamic(() => import("@/components/desktop/home/StatsSection"), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});

const CompanyTestimonialSection = dynamic(() => import("@/components/desktop/home/CompanyTestimonialSection"), {
  loading: () => <div className="min-h-[500px] bg-black" />,
});

const CTASection = dynamic(() => import("@/components/desktop/home/CTASection"), {
  loading: () => <div className="min-h-[400px] bg-black" />,
});

export default function Home() {
  return (
    <>
      {/* Keep first component synchronous for critical LCP */}
      <YtTestimonial />
      
      {/* Dynamic components with proper fallbacks to prevent layout shift */}
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <AgeticSpcae />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px] bg-black" />}>
        <CarouselSection_2 />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px] bg-black" />}>
        <CompaniesSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px] bg-black" />}>
        <TestimonialSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[800px] bg-black" />}>
        <FeatureCard />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px] bg-black" />}>
        <ComparisonSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[500px] bg-black" />}>
        <ProductFeature />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px] bg-black" />}>
        <StatsSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[500px] bg-black" />}>
        <CompanyTestimonialSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px] bg-black" />}>
        <CTASection />
      </Suspense>
    </>
  );
}
